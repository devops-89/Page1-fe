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
import { useEffect } from "react";
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
  newFormData,
  defaultRoute
}) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === defaultRoute && newFormData) {
      setState((prevState) => ({
        ...prevState,
        cabin_class: newFormData.cabin_class || e.target.value
      }));
    }
  }, [router.pathname, defaultRoute, newFormData]);


  const flightClassHandler = (e) => {
    setState((prevState) => ({
      ...prevState,
      cabin_class: e.target.value
    }));
  };

  const adultIncreaseCounter = () => {
    setAdultValue((prev) => prev + 1);
    setState((prev) => ({ ...prev, adult: prev.adult + 1 }));
  };
  const adultDecreaseCounter = () => {
    if (adultValue > 1) {
      setAdultValue((prev) => prev - 1);
      setState((prev) => ({ ...prev, adult: prev.adult - 1 }));
    }
  };
  const childIncreaseCounter = () => {
    setChildValue((prev) => prev + 1);
    setState((prev) => ({ ...prev, child: prev.child + 1 }));
  };
  const childDecreaseCounter = () => {
    if (childValue > 0) {
      setChildValue((prev) => prev - 1);
      setState((prev) => ({ ...prev, child: prev.child - 1 }));
    }
  };
  const infantIncreaseCounter = () => {
    setInfantValue((prev) => prev + 1);
    setState((prev) => ({ ...prev, infant: prev.infant + 1 }));
  };
  const infantDecreaseCounter = () => {
    if (infantValue > 0) {
      setInfantValue((prev) => prev - 1);
      setState((prev) => ({ ...prev, infant: prev.infant - 1 }));
    }
  };

  return (
    <div >
      <Typography
       sx={{ fontFamily: nunito.style, fontSize: {lg:20,xs:15,sm:20 ,md:20}, fontWeight: 600 , textAlign:{xs:"center"}}}>
        Select Travelers & Class
      </Typography>

      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, m:1 }}>
        <Typography sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}>
          Travellers
        </Typography>
        <Grid2 container spacing={{lg:4 ,md:4 ,sm:4 ,xs:1}}  >
          <Grid2 size={{lg:4 ,md:4 ,sm:4 ,xs:6}}>
            <TravellorCounter
              heading={"Adults ( 12+ Yrs )"}
              value={adultValue}
              setValue={setAdultValue}
              onIncrease={adultIncreaseCounter}
              onDecrease={adultDecreaseCounter}
              initialValue={initialValue.adult}
            />
          </Grid2>
          <Grid2 size={{lg:4 ,md:4 ,sm:4 ,xs:6}}>
            <TravellorCounter
              heading={"Childrens ( 2-12 Yrs )"}
              value={childValue}
              setValue={setChildValue}
              onIncrease={childIncreaseCounter}
              onDecrease={childDecreaseCounter}
              initialValue={initialValue.child}
            />
          </Grid2>
          <Grid2 size={{lg:4 ,md:4 ,sm:4 ,xs:6}}>
            <TravellorCounter
              heading={"Infants( 0-2 Yrs )"}
              value={infantValue}
              setValue={setInfantValue}
              onIncrease={infantIncreaseCounter}
              onDecrease={infantDecreaseCounter}
              initialValue={initialValue.infant}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, mt: 2 ,m:1 }}>
        <Typography sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}>
          Flight Class
        </Typography>
        <RadioGroup 
          row 
          value={state.cabin_class} 
          onChange={flightClassHandler} // Properly updating state
        >
          {data.FLIGHT_CLASS_DATA.map((val, i) => (
            <FormControlLabel
              key={i}
              value={val.value}
              control={<Radio />}
              label={<Typography sx={{ fontSize: 14 }}>{val.label}</Typography>}
            />
          ))}
        </RadioGroup>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={{lg:4 ,md:4,sm:4,xs:2}} m={2}>
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
          onClick={() => setAnchorEl(null)}
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;
