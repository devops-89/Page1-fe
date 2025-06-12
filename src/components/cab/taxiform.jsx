import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
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
  const [activeStep, setActiveStep] = useState(0);
    
  const [taxiType, setTaxiType] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [phone, setPhone] = useState(null);
  const [date, setDate] = useState(null);

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
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const body = {
        enquiry_type: BOOKING_ENQUIRY.CABS,
        enquiry_description: values,
      };

      try {
        await userSendEnquiry({
          data: body,
          setLoading,
          dispatch,
          setActiveStep: setActiveStep,
        });
        resetForm(); 
        setTaxiType(null);
        setCapacity(null);
        setPhone(null);
        setDate(null);
      } catch (error) {
        console.error("Error sending enquiry:", error);
      } finally {
        setLoading(false); 
      }
    },
  });

  const taxiTypeChangeHandler = (e, newValue) => {
    formik.setFieldValue("taxiType", newValue?.label || ""); 
    setTaxiType(newValue); 
  };

  const capacityChangeHandler = (e, newValue) => {
    formik.setFieldValue("capacity", newValue?.label || ""); 
    setCapacity(newValue); 
  };

  const phoneChangeHandler = (newPhone) => {
    setPhone(newPhone); 
    const validPhone = matchIsValidTel(newPhone);
    if (validPhone) {
      formik.setFieldValue("phoneNumber", newPhone);
      formik.setFieldError("phoneNumber", ""); 
    } else {
      formik.setFieldError("phoneNumber", "Please Enter Valid Phone Number");
    }
    formik.setFieldTouched("phoneNumber", true, false);
  };

  const handleChangeDate = (newDate) => {
    setDate(newDate); 
    const validDate = moment(newDate).isValid();

    if (validDate) {
      formik.setFieldValue(
        "date",
        moment(newDate).format("DD-MM-YYYY, hh:mm A")
      );
      formik.setFieldError("date", ""); 
    } else {
      formik.setFieldError("date", "Please Enter Valid Date");
    }
    
    formik.setFieldTouched("date", true, false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Background Image Box */}
      <Box
        sx={{
          backgroundImage: `url(${cab.src})`, 
          border: 1,
          height: { xs: "auto", md: "100vh" }, 
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex", 
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 5, md: 0 }, 
        }}
      >
        <Container maxWidth="lg"> 
          <Grid container justifyContent="flex-start"> 
            {/* Form Card Grid Item */}
            <Grid item lg={6} xs={12}>
              <Card sx={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", p: 3 }}> 
                <Typography
                  sx={{
                    fontSize: { xs: 24, md: 30 }, 
                    fontWeight: 800,
                    fontFamily: nunito.style,
                    mb: 1, // Margin bottom
                  }}
                >
                  Book Your Taxi Ride
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 }, 
                    fontWeight: 500,
                    fontFamily: nunito.style,
                    color: COLORS.LIGHTGREY,
                    mb: 3, // Margin bottom
                  }}
                >
                  To get the ride of your taxi please select from the
                  following:
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    {/* Taxi Type Autocomplete */}
                    <Grid item xs={12}>
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
                              formik.touched.taxiType && formik.errors.taxiType
                            }
                          />
                        )}
                        options={data.taxiOptions} 
                        getOptionLabel={(option) => option.label} 
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
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <TextField
                        label="Pickup Location"
                        sx={{ ...loginTextField }}
                        fullWidth
                        id="pickup"
                        name="pickup" 
                        error={
                          formik.touched.pickup && Boolean(formik.errors.pickup)
                        }
                        helperText={
                          formik.touched.pickup && formik.errors.pickup
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.pickup}
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <TextField
                        label="Drop Location"
                        sx={{ ...loginTextField }}
                        fullWidth
                        id="drop"
                        name="drop"
                        error={formik.touched.drop && Boolean(formik.errors.drop)}
                        helperText={formik.touched.drop && formik.errors.drop}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.drop}
                      />
                    </Grid>

                    {/* Full Name TextField */}
                    <Grid item lg={6} xs={12}>
                      <TextField
                        label="Full Name"
                        sx={{ ...loginTextField }}
                        fullWidth
                        id="fullName"
                        name="fullName" 
                        error={
                          formik.touched.fullName &&
                          Boolean(formik.errors.fullName)
                        }
                        helperText={
                          formik.touched.fullName && formik.errors.fullName
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.fullName}
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <TextField
                        label="Email"
                        sx={{ ...loginTextField }}
                        fullWidth
                        id="email"
                        name="email" 
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        value={formik.values.email}
                      />
                    </Grid>

                    {/* Phone Number MuiTelInput */}
                    <Grid item lg={6} xs={12}>
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
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                        }
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
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
                              formik.touched.capacity && formik.errors.capacity
                            }
                          />
                        )}
                        options={data.capacity} 
                        getOptionLabel={(option) => option.label}
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
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                      />
                    </Grid>

                    {/* Date and Time Picker */}
                    <Grid item xs={12}>
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
                                formik.touched.date && Boolean(formik.errors.date),
                              helperText: formik.touched.date && formik.errors.date,
                              onBlur: () => formik.setFieldTouched('date', true), 
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          fontSize: 12,
                          fontFamily: nunito.style,
                          color: COLORS.WHITE,
                          backgroundColor: COLORS.PRIMARY,
                          width: 200,
                          p: 1,
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: COLORS.PRIMARY_DARK, 
                          },
                        }}
                        type="submit"
                        disabled={loading} 
                      >
                        {loading ? (
                          <Loading
                            type="bars" 
                            color={COLORS.WHITE} 
                            width={20}
                            height={20}
                          />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Taxiform;