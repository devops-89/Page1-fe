import React, { useState } from "react";
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
}) {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);

  // console.log("mealData-------------", mealData);

  // Create unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  const selectedMeals = useSelector(
    (state) => state.Flight.MealsInformation.meals || {}
  );

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // console.log("selectedMeals----------", selectedMeals);

  let filteredDataOutgoing = {};
  let filteredDataReturn = {};

  const handleMealClick = (meal, flightNumber) => {
    // console.log('meal-----',meal)
    const passengerMeals = selectedMeals[uniquePassengerKey]?.meals || [];
    const existingMeal = passengerMeals.find(
      (m) => m.flightId === flightNumber
    );

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

  if (isLCC) {
    mealData?.[0]?.forEach((singleMeal) => {
      //   console.log("singleMeal----------------", singleMeal);
      if (!filteredDataOutgoing[singleMeal.FlightNumber]) {
        filteredDataOutgoing[singleMeal.FlightNumber] = [];
      }
      filteredDataOutgoing[singleMeal.FlightNumber].push(singleMeal);
    });
  }

  if (isLCC) {
    mealData?.[1]?.forEach((singleMeal) => {
      // console.log("singleMeal----------------", singleMeal);
      if (!filteredDataReturn[singleMeal.FlightNumber]) {
        filteredDataReturn[singleMeal.FlightNumber] = [];
      }
      filteredDataReturn[singleMeal.FlightNumber].push(singleMeal);
    });
  }

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

        {/* Tab Content */}
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
                      {/* {console.log("filteredDataOutgoing------------", filteredDataOutgoing)} */}
                      {filteredDataOutgoing[flightNumber][0].FlightNumber ? (
                        filteredDataOutgoing[flightNumber]?.map(
                          (meal, mealIndex) => (
                            (meal?.Price!=0)?(
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
                              />
                            </Grid2>
                            ):(null)
                            
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
                {mealData?.[0]?.FlightNumber ? (
                  mealData?.map((meal, mealIndex) => (
                    (meal?.Price!=0)?(
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
                      />
                    </Grid2>
                    ):(null)
                   
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
                              (meal?.Price!=0)?(
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
                                />
                              </Grid2>
                              ):(null)
                            
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
                {mealData?.[0]?.FlightNumber ? (
                  mealData.map((meal, mealIndex) => (
                    (meal?.Price!=0)?(
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
                      />
                    </Grid2>
                    ):(null)
                   
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
