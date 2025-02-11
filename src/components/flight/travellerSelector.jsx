import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Box,
  Button,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TravellorCounter from "./travellorCounter";
import { useRouter } from "next/router";

const TravellerSelector = ({
  setAnchorEl,
  setState,
  state,
  adultValue,
  setAdultValue,
  infantValue,
  setInfantValue,
  childValue,
  setChildValue,
  initialValue,
  setIntialValue,
  newFormData,
  defaultRoute
}) => {

  const router = useRouter();
  const adultIncreaseCounter = () => {
    setState({ ...state, adult: adultValue + 1 });
    setAdultValue(adultValue + 1);
  };
  const adultDecreaseCounter = () => {
    setState({ ...state, adult: adultValue - 1 });
    setAdultValue(adultValue - 1);
  };
  const childIncreaseCounter = () => {
    setState({ ...state, child: childValue + 1 });
    setChildValue(childValue + 1);
  };
  const childDecreaseCounter = () => {
    setState({ ...state, child: childValue - 1 });
    setChildValue(childValue - 1);
  };
  const infantIncreaseCounter = () => {
    setState({ ...state, infant: infantValue + 1 });
    setInfantValue(infantValue + 1);
  };
  const infantDecreaseCounter = () => {
    setState({ ...state, infant: infantValue - 1 });
    setInfantValue(infantValue - 1);
  };

  const flightClassHandler = (e) => {
    setState({ ...state, cabin_class: e.target.value });
  };

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
              onIncrease={adultIncreaseCounter}
              onDecrease={adultDecreaseCounter}
              initialValue={initialValue.adult}
            />
          </Grid2>
          <Grid2 size={4}>
            <TravellorCounter
              heading={"Childrens ( 2-12 Yrs )"}
              value={childValue}
              setValue={setChildValue}
              onIncrease={childIncreaseCounter}
              onDecrease={childDecreaseCounter}
              initialValue={initialValue.child}
            />
          </Grid2>
          <Grid2 size={4}>
            <TravellorCounter
              heading={"Infants( 0-12 Yrs )"}
              value={infantValue}
              setValue={setInfantValue}
              onIncrease={infantIncreaseCounter}
              onDecrease={infantDecreaseCounter}
              initialValue={initialValue.infant}
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
        <RadioGroup row value={(router.pathname==defaultRoute && newFormData) ? newFormData.cabin_class : state.cabin_class}>
          {data.FLIGHT_CLASS_DATA.map((val, i) => (
            <FormControlLabel
              value={val.value}
              control={
                <Radio
                  defaultChecked={(router.pathname==defaultRoute && newFormData) ? newFormData.cabin_class : state.cabin_class}
                  defaultValue={(router.pathname==defaultRoute && newFormData) ? newFormData.cabin_class : state.cabin_class}
                  onChange={flightClassHandler}
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>{val.label}</Typography>}
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
            color: COLORS.WHITE,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;
