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
  const [validationErrors, setValidationErrors] = useState(null);

  useEffect(() => {
    if (router.pathname === defaultRoute && newFormData) {
      setState((prevState) => ({
        ...prevState,
        cabin_class: newFormData.cabin_class || "",
      }));
    }
  }, [router.pathname, defaultRoute, newFormData, setState]);

  const flightClassHandler = (e) => {
    setState((prevState) => ({
      ...prevState,
      cabin_class: e.target.value,
    }));
  };

  const { errors, validateTravelers } = useTravellerValidation({
    adultValue,
    childValue,
    infantValue,
  });

  const updateTravellerCount = (type, action) => {
    let updatedValue = 0;

    if (type === "adult") {
      updatedValue = action === "increase" ? adultValue + 1 : adultValue - 1;
      if (updatedValue >= 1) setAdultValue(updatedValue);
    } else if (type === "child") {
      updatedValue = action === "increase" ? childValue + 1 : childValue - 1;
      if (updatedValue >= 0) setChildValue(updatedValue);
    } else if (type === "infant") {
      updatedValue = action === "increase" ? infantValue + 1 : infantValue - 1;
      if (updatedValue >= 0) setInfantValue(updatedValue);
    }

    setState((prev) => ({ ...prev, [type]: updatedValue }));

    if (!validateTravelers()) {
      setValidationErrors(errors);
    } else {
      setValidationErrors(null);
    }
  };

  const handleApply = () => {
    if (validateTravelers()) {
      setAnchorEl(null);
      setValidationErrors(null);
    } else {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div>
      <Typography
        sx={{
          fontFamily: nunito.style,
          fontSize: { lg: 20, xs: 15, sm: 20, md: 20 },
          fontWeight: 600,
          textAlign: { xs: "center" },
        }}
      >
        Select Travelers & Class
      </Typography>

      <Box sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, m: 1 }}>
        <Typography
          sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}
        >
          Travellers
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TravellorCounter
              heading="Adults (12+ Yrs)"
              value={adultValue}
              setValue={setAdultValue}
              onIncrease={() => updateTravellerCount("adult", "increase")}
              onDecrease={() => updateTravellerCount("adult", "decrease")}
              initialValue={initialValue.adult}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TravellorCounter
              heading="Children (2-12 Yrs)"
              value={childValue}
              setValue={setChildValue}
              onIncrease={() => updateTravellerCount("child", "increase")}
              onDecrease={() => updateTravellerCount("child", "decrease")}
              initialValue={initialValue.child}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TravellorCounter
              heading="Infants (0-2 Yrs)"
              value={infantValue}
              setValue={setInfantValue}
              onIncrease={() => updateTravellerCount("infant", "increase")}
              onDecrease={() => updateTravellerCount("infant", "decrease")}
              initialValue={initialValue.infant}
            />
          </Grid>
        </Grid>

        {validationErrors && (
          <Box sx={{ mt: 2, color: "red" }}>
            {validationErrors.maxTravelers && (
              <Typography>Total travelers cannot exceed 9.</Typography>
            )}
            {validationErrors.infantLimit && (
              <Typography>
                Infants cannot exceed total adults and children.
              </Typography>
            )}
            {validationErrors.adultInfantRatio && (
              <Typography>
                Adults must be more than the sum of children and infants.
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Box
        sx={{ border: "1px solid #808080", borderRadius: 2, p: 2, mt: 2, m: 1 }}
      >
        <Typography
          sx={{ fontFamily: nunito.style, fontSize: 17, fontWeight: 600 }}
        >
          Flight Class
        </Typography>
        <RadioGroup row value={state.cabin_class} onChange={flightClassHandler}>
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        m={2}
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
          disabled={!!validationErrors}
          sx={{
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.WHITE,
            fontSize: 12,
            fontFamily: nunito.style,
            fontWeight: 600,
            borderRadius: 6,
            width: 80,
          }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Stack>
    </div>
  );
};

export default TravellerSelector;
