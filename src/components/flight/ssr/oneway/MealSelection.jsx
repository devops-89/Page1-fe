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

export default function MealSelection({ mealData, isLCC }) {
  const dispatch = useDispatch();
  const selectedMeals = useSelector((state) => state?.MealsInformation?.meals || []);

  console.log("selectedMeals---------", selectedMeals);

  let filtereddata = {};

  // Handling Meal Selection - Only One Meal Per Flight
  const handleMealClick = (meal, flightNumber) => {
    const mealExists = selectedMeals?.some(
      (m) => m.id === flightNumber && m.selectedMeals.some((s) => s.Code === meal.Code)
    );

    if (mealExists) {
      // If the meal is already selected, remove it from the selection
      dispatch(removeMealDetails({ mealsId: flightNumber, mealCode: meal.Code }));
    } else {
      // Otherwise, select the meal
      dispatch(setMealDetails({ mealsId: flightNumber, selected: meal }));
    }
  };

  return (
    <Accordion sx={{ mb: "10px" }}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ backgroundColor: COLORS.SEMIGREY }}>
        <Typography variant="body1" sx={{ fontFamily: nunito.style, fontWeight: 700, display: "flex", alignItems: "center" }}>
          <RestaurantMenuIcon sx={{ color: COLORS.PRIMARY, marginRight: "10px" }} /> Meal
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px" }}>
        {isLCC ? (
          <>
            {/* Organizing meal data by flight */}
            {mealData?.forEach((singleMeal) => {
              singleMeal?.forEach((data) => {
                if (!filtereddata[data.FlightNumber]) {
                  filtereddata[data.FlightNumber] = [];
                }
                filtereddata[data.FlightNumber].push(data);
              });
            })}

            <Swiper spaceBetween={20} slidesPerView={1} navigation={{ clickable: true }} modules={[Navigation]} id="meal_box">
              {Object.keys(filtereddata).map((index) => (
                <SwiperSlide key={index} style={{ overflow: "auto", maxHeight: "240px", position: "relative" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: nunito.style,
                      fontWeight: 800,
                      mb: "20px",
                      p: "10px",
                      position: "sticky",
                      top: "0",
                      width: "100%",
                      backgroundColor: COLORS.SEMIGREY,
                      zIndex: 99,
                    }}
                  >
                    {`${filtereddata[index][0]?.Origin} - ${filtereddata[index][0]?.Destination}`}
                  </Typography>

                  <Grid2 container spacing={2} sx={{ flexWrap: "wrap" }}>
                    {filtereddata[index]?.map((meal, mealIndex) => (
                      <Grid2 size={{xs:12, lg:6}} key={mealIndex}>
                        <MealCard
                          meal={meal}
                          handleMealValue={() => handleMealClick(meal, meal.FlightNumber)}
                          isSelected={
                            selectedMeals?.some(
                              (m) => m.id === meal.FlightNumber && m.selectedMeals[0]?.Code === meal.Code // Ensuring only one meal per flight
                            )
                          }
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Grid2 container spacing={2} sx={{ flexWrap: "wrap" }}>
            {mealData?.map((meal, mealIndex) => (
              <Grid2 size={{xs:12, lg:6}} key={mealIndex}>
                <MealCard
                  meal={meal}
                  handleMealValue={() => handleMealClick(meal, meal.FlightNumber)}
                  isSelected={selectedMeals?.some((m) => m.id === meal.FlightNumber && m.selectedMeals[0]?.Code === meal.Code)}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
