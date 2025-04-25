import { data } from "@/assests/data";
import { setDestinationFormDetails } from "@/redux/reducers/destinationWedding";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { basicInformationValidationSchema } from "@/utils/validationSchema";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DestinationWeddingSecondForm = ({ activeStep, setActiveStep }) => {
  const selector = useSelector((state) => state.destinationWedding);
  const dispatch = useDispatch();
  //   console.log("selector", selector);
  const formik = useFormik({
    initialValues: {
      weddingSide: "",
      destination: "",
      numberOfGuests: "",
      budget: "",
    },
    validationSchema: basicInformationValidationSchema,
    onSubmit: (values) => {
    //   console.log("test", values);
      dispatch(setDestinationFormDetails({ ...selector, ...values }));
      setActiveStep(activeStep + 1);
    },
  });
  const [weddingSide, setWeddingSide] = useState(null);
  const [destination, setDestination] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [budget, setBudget] = useState(null);
  const handleChangeHandler = (e, newValue, id) => {
    formik.setFieldValue(id, newValue?.label);
    if (id === "weddingSide") {
      setWeddingSide(newValue);
    }
    if (id === "destination") {
      setDestination(newValue);
    }
    if (id === "numberOfGuests") {
      setNumberOfGuests(newValue);
    }

    if (id === "budget") {
      setBudget(newValue);
    }
  };
  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <Typography
          sx={{
            textAlign: "center",
            mb: 2,
            fontFamily: roboto.style,
            fontSize: 20,
          }}
        >
          Basic Information
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Wedding Side"
                    sx={{ ...loginTextField }}
                    error={
                      formik.errors.weddingSide &&
                      Boolean(formik.errors.weddingSide)
                    }
                    helperText={
                      formik.errors.weddingSide && formik.errors.weddingSide
                    }
                  />
                )}
                options={data.WeddingSide}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                onChange={(e, newValue) =>
                  handleChangeHandler(e, newValue, "weddingSide")
                }
                value={weddingSide}
              />
            </Grid2>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Wedding Destination"
                    sx={{ ...loginTextField }}
                    error={
                      formik.errors.destination &&
                      Boolean(formik.errors.destination)
                    }
                    helperText={
                      formik.errors.destination && formik.errors.destination
                    }
                  />
                )}
                options={data.WEDDING_DESTINATION}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                onChange={(e, newValue) =>
                  handleChangeHandler(e, newValue, "destination")
                }
                value={destination}
              />
            </Grid2>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Wedding Guests"
                    sx={{ ...loginTextField }}
                    error={
                      formik.errors.numberOfGuests &&
                      Boolean(formik.errors.numberOfGuests)
                    }
                    helperText={
                      formik.errors.numberOfGuests &&
                      formik.errors.numberOfGuests
                    }
                  />
                )}
                options={data.WEDDING_GUESTS}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                onChange={(e, newValue) =>
                  handleChangeHandler(e, newValue, "numberOfGuests")
                }
                value={numberOfGuests}
              />
            </Grid2>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Wedding Budget"
                    sx={{ ...loginTextField }}
                    error={
                      formik.errors.budget && Boolean(formik.errors.budget)
                    }
                    helperText={formik.errors.budget && formik.errors.budget}
                  />
                )}
                options={data.WEDDING_BUDGET}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                onChange={(e, newValue) =>
                  handleChangeHandler(e, newValue, "budget")
                }
                value={budget}
              />
            </Grid2>
            <Box sx={{ textAlign: "start" }}>
              <Button
                sx={{
                  fontSize: 14,
                  fontWeight: 550,
                  fontFamily: roboto.style,
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  width: 150,
                }}
                type="submit"
              >
                Continue
              </Button>
            </Box>
          </Grid2>
        </form>
      </Card>
    </Box>
  );
};

export default DestinationWeddingSecondForm;
