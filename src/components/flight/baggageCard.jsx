import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, Grid2, Stack } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import Image from "next/image";
import baggageImage from "@/../public/images/baggage.png";

export default function BaggageCard({ baggage, handleBaggageValue, isSelected }) {
  // console.log("myCod-----", isSelected)
  return (
    <Grid2 container spacing={2} component={Card} sx={{ maxHeight: "150px" }}>
      <Grid2
        size={4}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Image src={baggageImage} alt="food" width={"100"} height={"100"} />
      </Grid2>
      <Grid2 size={8} sx={{ p: "10px" }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily:roboto.style,
            fontWeight: 600,
            color: COLORS.PRIMARY,
            mb: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {`${baggage?.Weight} kg` || '--'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily:roboto.style, fontWeight: 600 }}
        >
          {baggage?.Code || "--"}
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
            sx={{ fontFamily:roboto.style, fontWeight: 600 }}
          >
            {baggage?.Price} {baggage?.Currency}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: isSelected ? COLORS.SECONDARY : COLORS.GRAY,fontFamily:roboto.style
            }}
            onClick={() => handleBaggageValue(baggage)}
          >
            {isSelected ? "Added" : "Add"}
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
