import React from "react";
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
import { removeMealDetails, setMealDetails } from "@/redux/reducers/mealsInformation";

export default function MealSelection({ mealData, isLCC, passengerId, passengerType }) {
  const dispatch = useDispatch();
  
  // Create unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  const selectedMeals = useSelector((state) => state.MealsInformation.meals || {});

  // console.log("selectedMeals----------", selectedMeals);

  let filteredData = {};

  const handleMealClick = (meal, flightNumber) => {
    // console.log('meal-----',meal)
    const passengerMeals = selectedMeals[uniquePassengerKey]?.meals || [];
    const existingMeal = passengerMeals.find((m) => m.flightId === flightNumber);

    if (existingMeal?.meal.Code === meal.Code) {
      // Deselect the meal if it's already selected
      dispatch(removeMealDetails({ passengerType, passengerId, mealsId: flightNumber, mealCode: meal.Code }));
    } else {
      // Ensure only one meal is selected per flight
      if (existingMeal) {
        dispatch(removeMealDetails({ passengerType, passengerId, mealsId: flightNumber, mealCode: existingMeal.meal.Code }));
      }
      dispatch(setMealDetails({ passengerType, passengerId, mealsId: flightNumber, selected: meal }));
    }
  };

  if (isLCC) {
    mealData?.forEach((singleMeal) => {
      singleMeal?.forEach((data) => {
        if (!filteredData[data.FlightNumber]) {
          filteredData[data.FlightNumber] = [];
        }
        filteredData[data.FlightNumber].push(data);
      });
    });
  }

  return (
    <Accordion sx={{ mb: "10px" }}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />} sx={{ backgroundColor: COLORS.SEMIGREY }}>
        <Typography variant="body1" sx={{ fontFamily: nunito.style, fontWeight: 700, display: "flex", alignItems: "center" }}>
          <RestaurantMenuIcon sx={{ color: COLORS.PRIMARY, marginRight: "10px" }} />
          Meal
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px" }}>
        {isLCC ? (
          <Swiper spaceBetween={20} slidesPerView={1} navigation={{ clickable: true }} modules={[Navigation]} id="meal_box">
            {Object.keys(filteredData).map((flightNumber) => (
              <SwiperSlide key={flightNumber} style={{ overflow: "auto", maxHeight: "240px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: nunito.style, fontWeight: 800, mb: "20px", p: "10px", backgroundColor: COLORS.SEMIGREY }}
                >
                  {`${filteredData[flightNumber][0]?.Origin} - ${filteredData[flightNumber][0]?.Destination}`}
                </Typography>
                <Grid2 container spacing={2}>
                  {filteredData[flightNumber]?.map((meal, mealIndex) => (
                    <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                      <MealCard
                        meal={meal}
                        handleMealValue={() => handleMealClick(meal, flightNumber)}
                        isSelected={
                          selectedMeals[uniquePassengerKey]?.meals?.some(
                            (m) => m.flightId === flightNumber && m.meal.Code === meal.Code
                          ) || false
                        }
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Grid2 container spacing={2}>
            {mealData?.map((meal, mealIndex) => (
              <Grid2 size={{ xs: 12, lg: 6 }} key={mealIndex}>
                <MealCard
                  meal={meal}
                  handleMealValue={() => handleMealClick(meal, meal.FlightNumber)}
                  isSelected={
                    selectedMeals[uniquePassengerKey]?.meals?.some(
                      (m) => m.flightId === meal.FlightNumber && m.meal.Code === meal.Code
                    ) || false
                  }
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
