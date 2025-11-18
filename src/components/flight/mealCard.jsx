import * as React from "react";
import Card from "@mui/material/Card";
import { roboto } from "@/utils/fonts.js";
import Typography from "@mui/material/Typography";
import { Button, Grid2, Stack } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import Image from "next/image";
import foodImage from "@/../public/images/food.png";

export default function MealCard({
  meal,
  handleMealValue,
  isSelected,
  radioMode = false,
}) {
  // console.log("isSelected", isSelected)
  const isNoMeal = String(meal?.Code) === "NoMeal";
  return (
    <Grid2 container spacing={1} component={Card} sx={{ maxHeight: "150px" }}>
      <Grid2
        size={4}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Image src={foodImage} alt="food" width={"100"} height={"100"} />
      </Grid2>
      <Grid2 size={8} sx={{ p: "10px" }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: roboto.style,
            fontWeight: 600,
            color: COLORS.PRIMARY,
            mb: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {meal?.AirlineDescription
            ? `${meal.AirlineDescription.substring(0, 20)}...`
            : "--"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: roboto.style, fontWeight: 600 }}
        >
          {meal?.Code || "--"}
        </Typography>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontFamily: roboto.style, fontWeight: 600 }}
          >
            {meal?.Price} {meal?.Currency}
          </Typography>
          <Button
            variant="contained"
            size="small"
            disabled={isNoMeal}
            sx={{
              backgroundColor: isSelected ? COLORS.SECONDARY : COLORS.GRAY,
              fontFamily: roboto.style,
            }}
            onClick={() => handleMealValue(meal)}
          >
            {radioMode
              ? isSelected
                ? "Selected"
                : "Select"
              : isSelected
              ? "Remove"
              : "Add"}
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
