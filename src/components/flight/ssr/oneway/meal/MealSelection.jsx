import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Typography, Grid2 } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";

export default function MealSelection({ mealData }) {
  console.log("mealData", mealData);
  const theme = useTheme();
  const [selectedMeal, setSelectedMeal] = React.useState(null); // Single meal state

  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "20px" }}
      >
        Select Your Meal
      </Typography>

      {mealData?.map((singleMeal, mealIndex) => {
        // Filter meals to remove items with Price === 0
        const availableMeals = singleMeal?.filter((meal) => meal?.Price !== 0);

        return (
          <Autocomplete
            key={mealIndex}
            options={availableMeals}
            getOptionLabel={(meal) => meal?.AirlineDescription}
            value={selectedMeal}
            onChange={(event, newValue) => setSelectedMeal(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Meals" variant="outlined" />
            )}
            renderOption={(props, meal) => (
              <li {...props} key={meal?.AirlineDescription}>
                <Grid2 container spacing={2} sx={{ width: "100%" }}>
                  <Grid2 size={7} sx={{ textAlign: "start", fontWeight:600, fontFamily:nunito.style }}>
                    {meal?.AirlineDescription}
                  </Grid2>
                  <Grid2 size={2} sx={{ textAlign: "center", fontWeight:600, fontFamily:nunito.style }}>
                    {meal?.Code}
                  </Grid2>
                  <Grid2 size={3} sx={{ textAlign: "end", fontWeight:600, fontFamily:nunito.style }}>
                    {meal?.Price} {meal?.Currency}
                  </Grid2>
                </Grid2>
              </li>
            )}
            sx={{
              width: "100%",
              mb: 2,
              fontFamily: nunito.style,
              ...loginTextField,
              "& fieldset": { borderWidth: "2px!important" },
            }}
          />
        );
      })}
    </>
  );
}
