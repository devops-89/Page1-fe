import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, Tab, Tabs, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";
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
import MealCard from "@/components/flight/mealCard";

export default function InternationalMealSelection({
  mealData,
  isLCC,
  passengerId,
  passengerType,
  specialFareForMeal,
}) {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);

  // radio mode enabled when specialFareForMeal is truthy
  const radioEnabled = Boolean(specialFareForMeal);

  // Create unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  const selectedMeals = useSelector(
    (state) => state.Flight.MealsInformation.meals || {}
  );

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  let filteredDataOutgoing = {};
  let filteredDataReturn = {};

  // Helper to safely parse numeric price
  const getMealPrice = (m) => {
    const raw = m?.Price ?? m?.Amount ?? m?.TotalAmount ?? m?.Fare ?? null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  const compareByPriceAsc = (a, b) => {
    const pa = getMealPrice(a);
    const pb = getMealPrice(b);
    if (pa === null && pb === null) return 0;
    if (pa === null) return 1;
    if (pb === null) return -1;
    return pa - pb;
  };

  // Build outgoing/return groups for LCC (same grouping you had)
  if (isLCC) {
    mealData?.[0]?.forEach((singleMeal) => {
      if (!filteredDataOutgoing[singleMeal.FlightNumber]) {
        filteredDataOutgoing[singleMeal.FlightNumber] = [];
      }
      filteredDataOutgoing[singleMeal.FlightNumber].push(singleMeal);
    });

    mealData?.[1]?.forEach((singleMeal) => {
      if (!filteredDataReturn[singleMeal.FlightNumber]) {
        filteredDataReturn[singleMeal.FlightNumber] = [];
      }
      filteredDataReturn[singleMeal.FlightNumber].push(singleMeal);
    });

    // sort meals per flight by price ascending (so cheapest/free come first)
    Object.keys(filteredDataOutgoing).forEach((fn) => {
      filteredDataOutgoing[fn] = filteredDataOutgoing[fn]
        .slice()
        .sort(compareByPriceAsc);
    });
    Object.keys(filteredDataReturn).forEach((fn) => {
      filteredDataReturn[fn] = filteredDataReturn[fn]
        .slice()
        .sort(compareByPriceAsc);
    });
  }

  // Build a simple map of selected codes by flight to use in radio logic
  const selectedByFlightId = new Map();
  (selectedMeals[uniquePassengerKey]?.meals || []).forEach((m) => {
    if (m?.flightId != null && m?.meal?.Code)
      selectedByFlightId.set(String(m.flightId), m.meal.Code);
  });

  const handleMealClick = (meal, flightNumber) => {
    // radio behavior: when enabled, act like single-choice and never deselect to none
    const passengerMeals = selectedMeals[uniquePassengerKey]?.meals || [];
    const existingMeal = passengerMeals.find(
      (m) => m.flightId === flightNumber
    );

    if (radioEnabled) {
      const currentCode = existingMeal?.meal?.Code;
      // if already selected same code, do nothing
      if (currentCode === meal.Code) return;
      // if different selected exists, remove it first
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
      // set new selection
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

    // original non-radio behavior (toggle/deselect allowed)
    if (existingMeal?.meal.Code === meal.Code) {
      // Deselect the meal if it's already selected
      dispatch(
        removeMealDetails({
          passengerType,
          passengerId,
          mealsId: flightNumber,
          mealCode: meal.Code,
        })
      );
    } else {
      // Ensure only one meal is selected per flight
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

  // When radio is enabled, auto-select default per flight (prefer free non-NoMeal)
  useEffect(() => {
    if (!radioEnabled) return;

    const processGroup = (group) => {
      Object.entries(group).forEach(([flightNumber, meals]) => {
        if (!Array.isArray(meals) || meals.length === 0) return;
        const alreadySelectedCode = selectedByFlightId.get(
          String(flightNumber)
        );
        if (alreadySelectedCode) return;

        const sorted = [...meals].sort(compareByPriceAsc);
        // prefer a free meal that is NOT the "NoMeal" placeholder
        const firstFreeValid = sorted.find(
          (m) => Number(getMealPrice(m)) === 0 && String(m?.Code) !== "NoMeal"
        );
        // fallback to first non-NoMeal
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
    };

    // process both groups (LCC outgoing & return)
    processGroup(filteredDataOutgoing);
    processGroup(filteredDataReturn);

    // also handle non-LCC single-array case: group by FlightNumber from mealData if provided
    if (!isLCC && Array.isArray(mealData)) {
      const nonlccGroups = {};
      mealData.forEach((m) => {
        if (!m?.FlightNumber) return;
        if (!nonlccGroups[m.FlightNumber]) nonlccGroups[m.FlightNumber] = [];
        nonlccGroups[m.FlightNumber].push(m);
      });
      Object.keys(nonlccGroups).forEach((fn) => {
        nonlccGroups[fn] = nonlccGroups[fn].slice().sort(compareByPriceAsc);
      });
      processGroup(nonlccGroups);
    }
  }, [
    radioEnabled,
    filteredDataOutgoing,
    filteredDataReturn,
    selectedMeals,
    mealData,
    isLCC,
    passengerId,
    passengerType,
    dispatch,
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
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            color: COLORS.PRIMARY,
            "& .MuiTabs-indicator": {
              backgroundColor: COLORS.PRIMARY,
            },
            "& .MuiTab-root": {
              color: COLORS.BLACK,
            },
            "& .Mui-selected": {
              color: COLORS.PRIMARY,
            },
          }}
        >
          <Tab label="Outgoing" />
          <Tab label="Return" />
        </Tabs>

        {/* Outgoing Tab */}
        {tabIndex === 0 && (
          <>
            {isLCC ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation={{ clickable: true }}
                modules={[Navigation]}
                id="meal_box"
                tabIndex={tabIndex}
              >
                {Object.keys(filteredDataOutgoing).map((flightNumber) => (
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
                      {`${filteredDataOutgoing[flightNumber][0]?.Origin} - ${filteredDataOutgoing[flightNumber][0]?.Destination}`}
                    </Typography>
                    <Grid2 container spacing={2}>
                      {filteredDataOutgoing[flightNumber][0].FlightNumber ? (
                        filteredDataOutgoing[flightNumber]?.map(
                          (meal, mealIndex) => (
                            <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                              <MealCard
                                meal={meal}
                                handleMealValue={() =>
                                  handleMealClick(meal, flightNumber)
                                }
                                isSelected={
                                  selectedMeals[
                                    uniquePassengerKey
                                  ]?.meals?.some(
                                    (m) =>
                                      m.flightId === flightNumber &&
                                      m.meal.Code === meal.Code
                                  ) || false
                                }
                                radioMode={radioEnabled}
                              />
                            </Grid2>
                          )
                        )
                      ) : (
                        <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: "center",
                              fontFamily: nunito.style,
                            }}
                          >
                            No Meal Available
                          </Typography>
                        </Grid2>
                      )}
                    </Grid2>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Grid2 container spacing={2}>
                {Array.isArray(mealData) && mealData.length > 0 ? (
                  // render sorted mealData (non-LCC) grouped as flat list
                  mealData
                    .slice()
                    .sort(compareByPriceAsc)
                    .map((meal, mealIndex) => (
                      <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                        <MealCard
                          meal={meal}
                          handleMealValue={() =>
                            handleMealClick(meal, meal.FlightNumber)
                          }
                          isSelected={
                            selectedMeals[uniquePassengerKey]?.meals?.some(
                              (m) =>
                                m.flightId === meal.FlightNumber &&
                                m.meal.Code === meal.Code
                            ) || false
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
            )}
          </>
        )}

        {/* Return Tab */}
        {tabIndex === 1 && (
          <>
            {isLCC ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation={{ clickable: true }}
                modules={[Navigation]}
                id="meal_box"
                tabIndex={tabIndex}
              >
                {Object.keys(filteredDataReturn).length > 0 ? (
                  Object.keys(filteredDataReturn).map((flightNumber) => (
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
                        {`${filteredDataReturn[flightNumber][0]?.Destination} - ${filteredDataReturn[flightNumber][0]?.Origin}`}
                      </Typography>

                      <Grid2 container spacing={2}>
                        {filteredDataReturn[flightNumber]?.length > 0 ? (
                          filteredDataReturn[flightNumber].map(
                            (meal, mealIndex) => (
                              <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                                <MealCard
                                  meal={meal}
                                  handleMealValue={() =>
                                    handleMealClick(meal, flightNumber)
                                  }
                                  isSelected={
                                    selectedMeals[
                                      uniquePassengerKey
                                    ]?.meals?.some(
                                      (m) =>
                                        m.flightId === flightNumber &&
                                        m.meal.Code === meal.Code
                                    ) || false
                                  }
                                  radioMode={radioEnabled}
                                />
                              </Grid2>
                            )
                          )
                        ) : (
                          <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                textAlign: "center",
                                fontFamily: nunito.style,
                              }}
                            >
                              No Meal Available
                            </Typography>
                          </Grid2>
                        )}
                      </Grid2>
                    </SwiperSlide>
                  ))
                ) : (
                  <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        fontFamily: nunito.style,
                      }}
                    >
                      No Meal Available
                    </Typography>
                  </Grid2>
                )}
              </Swiper>
            ) : (
              <Grid2 container spacing={2}>
                {Array.isArray(mealData) && mealData.length > 0 ? (
                  mealData.map((meal, mealIndex) => (
                    <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                      <MealCard
                        meal={meal}
                        handleMealValue={() =>
                          handleMealClick(meal, meal.FlightNumber)
                        }
                        isSelected={
                          selectedMeals[uniquePassengerKey]?.meals?.some(
                            (m) =>
                              m.flightId === meal.FlightNumber &&
                              m.meal.Code === meal.Code
                          ) || false
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
            )}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
