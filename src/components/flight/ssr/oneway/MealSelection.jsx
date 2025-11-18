import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";
import MealCard from "../../mealCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { COLORS } from "@/utils/colors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  removeMealDetails,
  setMealDetails,
} from "@/redux/reducers/mealsInformation";

export default function MealSelection({
  mealData,
  isLCC,
  passengerId,
  passengerType,
  specialFareForMeal,
}) {
  const dispatch = useDispatch();
  const radioEnabled = Boolean(specialFareForMeal);
  // console.log('mealData------------',mealData)

  // Create unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  const selectedMeals = useSelector(
    (state) => state.Flight.MealsInformation.meals || {}
  );

  // console.log("selectedMeals----------", selectedMeals);

  // let filteredData = {};

  const handleMealClick = (meal, flightNumber) => {
    const currentCode = selectedByFlightId.get(String(flightNumber));

    if (radioEnabled) {
      // radio mode: replace selection; never toggle to none
      if (currentCode === meal.Code) return; // no-op if same
      if (currentCode) {
        dispatch(
          removeMealDetails({
            passengerType,
            passengerId,
            mealsId: flightNumber,
            mealCode: currentCode,
          })
        );
      }
      dispatch(
        setMealDetails({
          passengerType,
          passengerId,
          mealsId: flightNumber,
          selected: meal,
        })
      );
      return;
    }

    // non-radio (your existing toggle/replace behavior)
    const passengerMeals = selectedMeals[uniquePassengerKey]?.meals || [];
    const existingMeal = passengerMeals.find(
      (m) => m.flightId === flightNumber
    );

    if (existingMeal?.meal.Code === meal.Code) {
      dispatch(
        removeMealDetails({
          passengerType,
          passengerId,
          mealsId: flightNumber,
          mealCode: meal.Code,
        })
      );
    } else {
      if (existingMeal) {
        dispatch(
          removeMealDetails({
            passengerType,
            passengerId,
            mealsId: flightNumber,
            mealCode: existingMeal.meal.Code,
          })
        );
      }
      dispatch(
        setMealDetails({
          passengerType,
          passengerId,
          mealsId: flightNumber,
          selected: meal,
        })
      );
    }
  };

  // Safely read a numeric price (adjust keys if your API differs)
  const getMealPrice = (m) => {
    const raw = m?.Price ?? m?.Amount ?? m?.TotalAmount ?? m?.Fare ?? null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null; // null => treat as "no price"
  };

  const compareByPriceAsc = (a, b) => {
    const pa = getMealPrice(a);
    const pb = getMealPrice(b);
    if (pa === null && pb === null) return 0;
    if (pa === null) return 1; // no-price goes last
    if (pb === null) return -1; // no-price goes last
    return pa - pb; // ascending
  };
  const mealsByFlight = useMemo(() => {
    const grouped = {};
    if (isLCC) {
      // your old filteredData behavior
      mealData?.forEach((singleMeal) => {
        singleMeal?.forEach((data) => {
          if (!grouped[data.FlightNumber]) grouped[data.FlightNumber] = [];
          grouped[data.FlightNumber].push(data);
        });
      });
    } else {
      // non-LCC: group by FlightNumber
      (mealData ?? []).forEach((m) => {
        const fn = m?.FlightNumber;
        if (!fn) return;
        if (!grouped[fn]) grouped[fn] = [];
        grouped[fn].push(m);
      });
    }
    // sort each flight list by price asc
    Object.keys(grouped).forEach((fn) => {
      grouped[fn] = grouped[fn].slice().sort(compareByPriceAsc);
    });
    return grouped;
  }, [isLCC, mealData]);

  // --- map: flightId -> selected meal code (like baggage) ---
  const selectedByFlightId = useMemo(() => {
    const map = new Map();
    const entry = selectedMeals[uniquePassengerKey]?.meals || [];
    entry.forEach((m) => {
      const fid = m.flightId;
      const code = m.meal?.Code;
      if (fid != null && code) map.set(String(fid), code);
    });
    return map;
  }, [selectedMeals, uniquePassengerKey]);

  useEffect(() => {
    if (!radioEnabled) return;

    Object.entries(mealsByFlight).forEach(([flightNumber, meals]) => {
      if (!Array.isArray(meals) || meals.length === 0) return;

      const alreadySelectedCode = selectedByFlightId.get(String(flightNumber));
      if (alreadySelectedCode) return;

      const sorted = [...meals].sort(compareByPriceAsc);
      // Prefer a free meal that is NOT the "NoMeal" placeholder
      const firstFreeValid = sorted.find(
        (m) => Number(getMealPrice(m)) === 0 && String(m?.Code) !== "NoMeal"
      );

      // If no free valid meal, fallback to first non-NoMeal item
      const firstNonNoMeal = sorted.find((m) => String(m?.Code) !== "NoMeal");

      const toSelect = firstFreeValid || firstNonNoMeal || null;

      if (toSelect) {
        dispatch(
          setMealDetails({
            passengerType,
            passengerId,
            mealsId: flightNumber,
            selected: toSelect,
          })
        );
      }
    });
  }, [
    radioEnabled,
    mealsByFlight,
    selectedByFlightId,
    passengerId,
    passengerType,
  ]);

  return (
    <Accordion sx={{ mb: "10px" }}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        sx={{ backgroundColor: COLORS.SEMIGREY }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: nunito.style,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          <RestaurantMenuIcon
            sx={{ color: COLORS.PRIMARY, marginRight: "10px" }}
          />
          Meal
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px" }}>
        {isLCC ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={{ clickable: true }}
            modules={[Navigation]}
            id="meal_box"
          >
            {Object.keys(mealsByFlight).map((flightNumber) => {
              const sortedMeals = mealsByFlight[flightNumber];
              return (
                <SwiperSlide
                  key={flightNumber}
                  style={{ overflow: "auto", maxHeight: "240px" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: nunito.style,
                      fontWeight: 800,
                      mb: "20px",
                      p: "10px",
                      backgroundColor: COLORS.SEMIGREY,
                    }}
                  >
                    {`${sortedMeals?.[0]?.Origin ?? ""} - ${
                      sortedMeals?.[0]?.Destination ?? ""
                    }`}
                  </Typography>
                  <Grid2 container spacing={2}>
                    {sortedMeals?.[0]?.FlightNumber ? (
                      sortedMeals?.map((meal, mealIndex) => (
                        <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                          <MealCard
                            meal={meal}
                            handleMealValue={() =>
                              handleMealClick(meal, flightNumber)
                            }
                            isSelected={
                              selectedByFlightId.get(String(flightNumber)) ===
                              meal.Code
                            }
                            radioMode={radioEnabled}
                          />
                        </Grid2>
                      ))
                    ) : (
                      <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                        <Typography
                          variant="body1"
                          sx={{ textAlign: "center", fontFamily: nunito.style }}
                        >
                          No Meal Available
                        </Typography>
                      </Grid2>
                    )}
                  </Grid2>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Grid2 container spacing={2}>
            {Array.isArray(mealData) && mealData.length > 0 ? (
              mealsByFlight[Object.keys(mealsByFlight)[0]] ? ( // just render flat as before
                Object.entries(mealsByFlight).flatMap(([flightNumber, list]) =>
                  list.map((meal, mealIndex) => (
                    <Grid2
                      size={{ xs: 12, lg: 6 }}
                      key={`${flightNumber}-${mealIndex}`}
                    >
                      <MealCard
                        meal={meal}
                        handleMealValue={() =>
                          handleMealClick(meal, meal.FlightNumber)
                        }
                        isSelected={
                          selectedByFlightId.get(String(meal.FlightNumber)) ===
                          meal.Code
                        }
                        radioMode={radioEnabled}
                      />
                    </Grid2>
                  ))
                )
              ) : (
                mealData.map(
                  (
                    meal,
                    mealIndex // fallback; should rarely hit
                  ) => (
                    <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                      <MealCard
                        meal={meal}
                        handleMealValue={() =>
                          handleMealClick(meal, meal.FlightNumber)
                        }
                        isSelected={
                          selectedByFlightId.get(String(meal.FlightNumber)) ===
                          meal.Code
                        }
                      />
                    </Grid2>
                  )
                )
              )
            ) : (
              <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", fontFamily: nunito.style }}
                >
                  No Meal Available
                </Typography>
              </Grid2>
            )}
          </Grid2>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
