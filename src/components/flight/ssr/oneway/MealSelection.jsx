import * as React from "react";
import { Typography, Grid2 } from "@mui/material";
import { nunito } from "@/utils/fonts";
import MealCard from "../../mealCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { COLORS } from "@/utils/colors";

export default function MealSelection({
  mealData,
  handleMealValue,
  selectMeal,
  isLCC,
}) {
  // console.log("mealData", mealData);

  return (
    <>
      <Accordion sx={{ mb: "10px" }}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
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
            />{" "}
            Meal
          </Typography>
        </AccordionSummary>
        {isLCC ? (
          <AccordionDetails
            sx={{ p: 1, maxHeight: "240px", overflowY: "auto" }}
          >
            {mealData?.map((singleMeal, mealIndex) => {
              return (
                <>
                  <Grid2
                    container
                    spacing={2}
                    sx={{ flexWrap: "wrap" }}
                    key={mealIndex}
                  >
                    {singleMeal?.map((meal, mealIndex) => {
                      return (
                        <Grid2 size={{ lg: 6, xs: 12 }}>
                          <MealCard
                            meal={meal}
                            key={mealIndex}
                            handleMealValue={handleMealValue}
                            isSelected={selectMeal?.Code === meal.Code}
                          />
                        </Grid2>
                      );
                    })}
                  </Grid2>
                </>
              );
            })}
          </AccordionDetails>
        ) : (
          <AccordionDetails
            sx={{ p: 1, maxHeight: "240px", overflowY: "auto" }}
          >
                  <Grid2
                    container
                    spacing={2}
                    sx={{ flexWrap: "wrap" }}
                  >
                    {mealData?.map((meal, mealIndex) => {
                      return (
                        <Grid2 size={{ lg: 6, xs: 12 }}>
                          <MealCard
                            meal={meal}
                            key={mealIndex}
                            handleMealValue={handleMealValue}
                            isSelected={selectMeal?.Code === meal.Code}
                          />
                        </Grid2>
                      );
                    })}
                  </Grid2>
              
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
