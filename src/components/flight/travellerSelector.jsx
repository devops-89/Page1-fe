import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import {
  Box,
  Button,
  FormControlLabel,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TravellorCounter from "./travellorCounter";

const TravellerSelector = ({ anchorEl, setAnchorEl }) => {
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(1);
  const [infantValue, setInfantValue] = useState(1);

  const flightClass = [
    {
      label: "Economy",
      value: "Economy",
    },
    {
      label: "Premium Economy",
      value: "Premium Economy",
    },
    {
      label: "Business",
      value: "Business",
    },
    {
      label: "First Class",
      value: "First Class",
    },
  ];

  return (
    <div>
      <Typography
        sx={{ fontFamily: nunito.style, fontSize: 20, fontWeight: 600 }}
      >
        Select Travelers & Class
      </Typography>
      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2 }}>
        <Typography
          sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}
        >
          Travellers
        </Typography>
        <Grid2 container spacing={4}>
          <Grid2 size={4}>
            <TravellorCounter
              heading={"Adults ( 12+ Yrs )"}
              value={adultValue}
              setValue={setAdultValue}
            />
          </Grid2>
          <Grid2 size={4}>
            <TravellorCounter
              heading={"Childrens ( 2-12 Yrs )"}
              value={childValue}
              setValue={setChildValue}
            />
          </Grid2>
          <Grid2 size={4}>
            <TravellorCounter
              heading={"Infants( 0-12 Yrs )"}
              value={infantValue}
              setValue={setInfantValue}
            />
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, mt: 2 }}>
        <Typography
          sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}
        >
          Travellers
        </Typography>
        <RadioGroup row>
          {flightClass.map((val, i) => (
            <FormControlLabel
              value={val.value}
              control={
                <Radio defaultChecked={"Economy"} defaultValue={"Economy"} />
              }
              label={<Typography sx={{ fontSize: 14 }}>{val.value}</Typography>}
              key={i}
            />
          ))}
        </RadioGroup>
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        spacing={4}
        mt={2}
      >
        <Button
          sx={{
            backgroundColor: COLORS.GREY,
            color: COLORS.BLACK,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
          onClick={() => setAnchorEl(null)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.PRIMARY,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;
