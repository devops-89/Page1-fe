import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import cab from "@/cabs/cab4.jpg";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { loginTextField } from "@/utils/styles";
import { data } from "@/assests/data";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import { taxiFormValidationSchema } from "@/utils/validationSchema";
import moment from "moment";
import { useDispatch } from "react-redux";
import { BOOKING_ENQUIRY } from "@/utils/enum";
import { userSendEnquiry } from "@/assests/apicalling/enquiry";
import Loading from "react-loading";
const Taxiform = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      taxiType: "",
      pickup: "",
      drop: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      capacity: "",
      date: "",
    },
    validationSchema: taxiFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        enquiry_type: BOOKING_ENQUIRY.CABS,
        enquiry_description: values,
      };
      // console.log("values", values);
      await userSendEnquiry({ data: body, setLoading, dispatch });
      formik.resetForm();
    },
  });

  const [taxiType, setTaxiType] = useState(null);

  const taxiTypeChangeHandler = (e, newValue) => {
    formik.setFieldValue("taxiType", newValue?.label);
    setTaxiType(newValue);
  };

  const [capacity, setCapacity] = useState(null);
  const capacityChangeHandler = (e, newValue) => {
    formik.setFieldValue("capacity", newValue?.label);
    setCapacity(newValue);
  };

  const [phone, setPhone] = useState(null);

  const phoneChangeHandler = (newPhone, countryData) => {
    setPhone(newPhone);
    const validPhone = matchIsValidTel(newPhone);
    if (validPhone) {
      formik.setFieldValue("phoneNumber", newPhone);
    } else {
      formik.setFieldError("phoneNumber", "Please Enter Valid Phone Number");
    }
  };

  const [date, setDate] = useState(null);
  const handleChangeDate = (newDate) => {
    setDate(newDate);
    const validDate = moment(newDate).isValid();

    if (validDate) {
      formik.setFieldValue(
        "date",
        moment(newDate).format("DD-MM-YYYY, hh:mm A")
      );
    } else {
      formik.setFieldError("date", "Please Enter Valid Date");
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url(${cab.src})`,
          border: 1,
          height: "auto",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* hhh */}

        <Box sx={{ width: "100%", top: "1%", my: 5 }}>
          <Container>
            <Grid2 container>
              <Grid2 size={{ lg: 6, xs: 12 }}>
                <Card sx={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", p: 2 }}>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 800,
                      fontFamily: nunito.style,
                    }}
                  >
                    Book Your Taxi Ride
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                      color: COLORS.LIGHTGREY,
                    }}
                  >
                    To get the ride of your taxi please select from the
                    following:
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid2 container mt={2} spacing={2}>
                      <Grid2 size={12}>
                        <Autocomplete
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose Taxi Type"
                              sx={{ ...loginTextField }}
                              fullWidth
                              error={
                                formik.touched.taxiType &&
                                Boolean(formik.errors.taxiType)
                              }
                              helperText={
                                formik.touched.taxiType &&
                                formik.errors.taxiType
                              }
                            />
                          )}
                          options={data.taxiOptions}
                          renderOption={(props, option) => (
                            <Box {...props} component={"li"}>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: nunito.style,
                                }}
                              >
                                {option.label}
                              </Typography>
                            </Box>
                          )}
                          onChange={taxiTypeChangeHandler}
                          value={taxiType}
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <TextField
                          label="Pickup Location"
                          sx={{ ...loginTextField }}
                          fullWidth
                          id="pickup"
                          error={
                            formik.touched.pickup &&
                            Boolean(formik.errors.pickup)
                          }
                          helperText={
                            formik.touched.pickup && formik.errors.pickup
                          }
                          onChange={formik.handleChange}
                          value={formik.values.pickup}
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <TextField
                          label="Drop Location"
                          sx={{ ...loginTextField }}
                          fullWidth
                          id="drop"
                          error={
                            formik.touched.drop && Boolean(formik.errors.drop)
                          }
                          helperText={formik.touched.drop && formik.errors.drop}
                          onChange={formik.handleChange}
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <TextField
                          label="Full Name"
                          sx={{ ...loginTextField }}
                          fullWidth
                          id="fullName"
                          error={
                            formik.touched.fullName &&
                            Boolean(formik.errors.fullName)
                          }
                          helperText={
                            formik.touched.fullName && formik.errors.fullName
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <TextField
                          label="Email"
                          sx={{ ...loginTextField }}
                          fullWidth
                          id="email"
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <MuiTelInput
                          sx={{ ...loginTextField }}
                          label="Phone Number"
                          fullWidth
                          defaultCountry="IN"
                          onChange={phoneChangeHandler}
                          value={phone}
                          error={
                            formik.touched.phoneNumber &&
                            Boolean(formik.errors.phoneNumber)
                          }
                          helperText={
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                          }
                        />
                      </Grid2>
                      <Grid2 size={{ lg: 6, xs: 12 }}>
                        <Autocomplete
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Capacity"
                              sx={{ ...loginTextField }}
                              fullWidth
                              error={
                                formik.touched.capacity &&
                                Boolean(formik.errors.capacity)
                              }
                              helperText={
                                formik.touched.capacity &&
                                formik.errors.capacity
                              }
                            />
                          )}
                          options={data.capacity}
                          renderOption={(props, option) => (
                            <Box {...props} component={"li"}>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: nunito.style,
                                }}
                              >
                                {option.label}
                              </Typography>
                            </Box>
                          )}
                          onChange={capacityChangeHandler}
                          value={capacity}
                        />
                      </Grid2>
                      <Grid2 size={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DateTimePicker
                            sx={{ ...loginTextField, width: "100%" }}
                            disablePast
                            label="Select Date and Time"
                            onChange={handleChangeDate}
                            value={date}
                            format="DD/MM/YYYY hh:mm A"
                            slotProps={{
                              textField: {
                                error:
                                  formik.touched.date &&
                                  Boolean(formik.errors.date),
                                helperText:
                                  formik.touched.date && formik.errors.date,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid2>
                      <Grid2 size={12}>
                        <Button
                          sx={{
                            fontSize: 12,
                            fontFamily: nunito.style,
                            color: COLORS.WHITE,
                            backgroundColor: COLORS.PRIMARY,
                            width: 200,
                            p: 1,
                            fontWeight: 600,
                          }}
                          type="submit"
                        >
                          {loading ? (
                            <Loading
                              type="bars"
                              color={COLORS.BLACK}
                              width={20}
                              height={20}
                            />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </Grid2>
                    </Grid2>
                  </form>
                </Card>
              </Grid2>
            </Grid2>
          </Container>
        </Box>
        {/* hhh */}
      </Box>
      {/* <Box sx={{ position: "absolute", width: "100%", top: "1%", my:5}}>
        <Container>
          <Grid2 container >
            <Grid2  size={{lg:6 , xs:12}} >
              <Card sx={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", p: 2 }}>
                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: 800,
                    fontFamily: nunito.style,
                  }}
                >
                  Book Your Taxi Ride
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: nunito.style,
                    color: COLORS.LIGHTGREY,
                  }}
                >
                  To get the ride of your taxi please select from the following:
                </Typography>
                <Grid2 container mt={2} spacing={2}>
                  <Grid2 size={12}>
                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Taxi Type"
                          sx={{ ...loginTextField }}
                          fullWidth
                        />
                      )}
                      options={data.taxiOptions}
                      renderOption={(props, option) => (
                        <Box {...props} component={"li"}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: nunito.style,
                            }}
                          >
                            {option.label}
                          </Typography>
                        </Box>
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <TextField
                      label="Pickup Location"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <TextField
                      label="Drop Location"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <TextField
                      label="Full Name"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <TextField
                      label="Email"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <MuiTelInput
                      sx={{ ...loginTextField }}
                      label="Phone Number"
                      fullWidth
                      defaultCountry="IN"
                    />
                  </Grid2>
                  <Grid2 size={{lg:6 , xs:12}}>
                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Capacity"
                          sx={{ ...loginTextField }}
                          fullWidth
                        />
                      )}
                      options={data.capacity}
                      renderOption={(props, option) => (
                        <Box {...props} component={"li"}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: nunito.style,
                            }}
                          >
                            {option.label}
                          </Typography>
                        </Box>
                      )}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DateTimePicker
                        sx={{ ...loginTextField, width: "100%" }}
                        disablePast
                        label="Select Date and Time"
                      />
                    </LocalizationProvider>
                  </Grid2>
                  <Grid2 size={12}>
                    <Button
                      sx={{
                        fontSize: 12,
                        fontFamily: nunito.style,
                        color: COLORS.WHITE,
                        backgroundColor: COLORS.PRIMARY,
                        width: 200,
                        p: 1,
                        fontWeight: 600,
                      }}
                    >
                      Submit
                    </Button>
                  </Grid2>
                </Grid2>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </Box> */}
    </Box>
  );
};

export default Taxiform;
