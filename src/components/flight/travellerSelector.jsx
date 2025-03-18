import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TravellorCounter from "./travellorCounter";
import { useRouter } from "next/router";
import useTravellerValidation from "@/custom-hook/useTravellerValidation";

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
  defaultRoute,
}) => {
  const router = useRouter();
  const validateTravelers = useTravellerValidation();
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState({ errorStatus: false, errorMessage: "" });

  // Temporary state for traveler counts
  const [tempAdult, setTempAdult] = useState(adultValue);
  const [tempChild, setTempChild] = useState(childValue);
  const [tempInfant, setTempInfant] = useState(infantValue);

  useEffect(() => {
    if (router.pathname === defaultRoute && newFormData) {
      setState((prevState) => ({
        ...prevState,
        cabin_class: newFormData.cabin_class || "",
      }));
    }
  }, [router.pathname, defaultRoute, newFormData, setState]);

  useEffect(() => {
    let { errorMessage, errorStatus } = validateTravelers(tempAdult, tempChild, tempInfant);
    setError((prev) => ({ ...prev, errorStatus, errorMessage }));
  }, [tempAdult, tempChild, tempInfant]);

  const flightClassHandler = (e) => {
    setState((prevState) => ({
      ...prevState,
      cabin_class: e.target.value,
    }));
  };

  const updateTravellerCount = (type, action) => {
    let updatedValue = 0;

    if (type === "adult") {
      updatedValue = action === "increase" ? tempAdult + 1 : tempAdult - 1;
      if (updatedValue >= 1) setTempAdult(updatedValue);
    } else if (type === "child") {
      updatedValue = action === "increase" ? tempChild + 1 : tempChild - 1;
      if (updatedValue >= 0) setTempChild(updatedValue);
    } else if (type === "infant") {
      updatedValue = action === "increase" ? tempInfant + 1 : tempInfant - 1;
      if (updatedValue >= 0) setTempInfant(updatedValue);
    }
  };

  const handleApply = () => {
    if (!error.errorStatus) {
      setAdultValue(tempAdult);
      setChildValue(tempChild);
      setInfantValue(tempInfant);

      setState((prev) => ({
        ...prev,
        adult: tempAdult,
        child: tempChild,
        infant: tempInfant,
      }));

      setAnchorEl(null);
      setValidationErrors(null);
    } else {
      setValidationErrors(error.errorMessage);
      console.log("Validation errors:", error.errorMessage);
    }
  };

  return (
    <div>
      <Typography sx={{ fontFamily: nunito.style, fontSize: { lg: 20, xs: 15, sm: 20, md: 20 }, fontWeight: 600, textAlign: { xs: "center" } }}>
        Select Travelers & Class
      </Typography>

      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, m: 1 }}>
        <Typography sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}>Travellers</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TravellorCounter heading="Adults (12+ Yrs)" value={tempAdult} onIncrease={() => updateTravellerCount("adult", "increase")} onDecrease={() => updateTravellerCount("adult", "decrease")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TravellorCounter heading="Children (2-12 Yrs)" value={tempChild} onIncrease={() => updateTravellerCount("child", "increase")} onDecrease={() => updateTravellerCount("child", "decrease")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TravellorCounter heading="Infants (0-2 Yrs)" value={tempInfant} onIncrease={() => updateTravellerCount("infant", "increase")} onDecrease={() => updateTravellerCount("infant", "decrease")} />
          </Grid>
        </Grid>

        {error.errorMessage && <Box sx={{ mt: 2, color: "red" }}><Typography>{error.errorMessage}</Typography></Box>}
      </Box>

      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, mt: 2, m: 1 }}>
        <Typography sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}>Flight Class</Typography>
        <RadioGroup row value={state.cabin_class} onChange={flightClassHandler}>
          {data.FLIGHT_CLASS_DATA.map((val, i) => (
            <FormControlLabel key={i} value={val.value} control={<Radio />} label={<Typography sx={{ fontSize: 14 }}>{val.label}</Typography>} />
          ))}
        </RadioGroup>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} m={2}>
        <Button sx={{ backgroundColor: COLORS.GREY, color: COLORS.BLACK, fontSize: 12, fontFamily: nunito.style, fontWeight: 600, borderRadius: 6, width: 80 }} onClick={() => setAnchorEl(null)}>
          Cancel
        </Button>
        <Button disabled={error.errorStatus} sx={{ backgroundColor: COLORS.SECONDARY, color: COLORS.WHITE, fontSize: 12, fontFamily: nunito.style, fontWeight: 600, borderRadius: 6, width: 80 }} onClick={handleApply}>
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;
