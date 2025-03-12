import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, Grid2, Stack } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import Image from "next/image";
import foodImage from "@/../public/images/food.png";

export default function MealCard({ meal, handleMealValue, isSelected }) {
  return (
    <Grid2 container spacing={2} component={Card} sx={{ maxHeight: "150px" }}>
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
            fontFamily: nunito.style,
            fontWeight: 600,
            color: COLORS.PRIMARY,
            mb: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {`${meal?.AirlineDescription?.substring(0, 20)}...` || "--"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: nunito.style, fontWeight: 600 }}
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
            sx={{ fontFamily: nunito.style, fontWeight: 600 }}
          >
            {meal?.Price} {meal?.Currency}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: isSelected ? COLORS.SECONDARY : COLORS.GRAY,
            }}
            onClick={() => handleMealValue(meal)}
          >
            {isSelected ? "Added" : "Add"}
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
