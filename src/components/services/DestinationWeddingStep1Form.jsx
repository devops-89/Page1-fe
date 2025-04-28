import { DestinationWedding, setDestinationFormDetails } from "@/redux/reducers/destinationWedding";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { destinationWeddingFirstStep } from "@/utils/validationSchema";
import { Button, Card, Grid2, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import moment from "moment";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DestinationWeddingStep1Form = ({ activeStep, setActiveStep }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      date: "",
    },
    validationSchema: destinationWeddingFirstStep,
    onSubmit: (values,{resetForm}) => {
      dispatch(setDestinationFormDetails({ ...values }));
      // reset Formik Values
      resetForm();

      // Reset Local States
      setPhone(null);
      setDate(null);

      // console.log("values", values);
      setActiveStep(activeStep + 1);
    },
  });

  // console.log("active", activeStep);
  const [phone, setPhone] = useState(null);
  const handlePhoneNumber = (newPhone, countryData) => {
    setPhone(newPhone);
    const validPhone = matchIsValidTel(newPhone);
    if (validPhone) {
      formik.setFieldValue("phoneNumber", countryData?.nationalNumber);
    } else {
      formik.setFieldError("phoneNumber", "Please Enter Valid Phone Number");
    }
  };

  const [date, setDate] = useState(null);
  const handleChangeDate = (newDate) => {
    setDate(newDate);
    const validDate = moment(newDate).isValid();

    if (validDate) {
      formik.setFieldValue("date", moment(newDate).format("DD-MM-YYYY"));
    } else {
      formik.setFieldError("date", "Please Enter Valid Date");
    }
  };
  return (
    <>
      <Card
        sx={{
          boxShadow: "0px 0px 2px 2px #00000010",
          width: "100%",
          p: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontFamily: roboto.style,
            textAlign: "center",
            fontWeight: 550,
          }}
        >
          Contact Information
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container mt={2} spacing={4}>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <TextField
                sx={{ ...loginTextField }}
                label="Full Name"
                fullWidth
                id="fullName"
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <TextField
                sx={{ ...loginTextField }}
                label="Email"
                fullWidth
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <MuiTelInput
                sx={{ ...loginTextField }}
                label="Phone Number"
                defaultCountry="IN"
                fullWidth
                onChange={handlePhoneNumber}
                value={phone}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  sx={{ ...loginTextField, width: "100%" }}
                  label="Date"
                  disablePast
                  onChange={handleChangeDate}
                  value={date}
                  slotProps={{
                    textField: {
                      error: formik.touched.date && Boolean(formik.errors.date),
                      helperText: formik.touched.date && formik.errors.date,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Button
                sx={{
                  width: 150,
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.BLACK,
                  fontFamily: roboto.style,
                }}
                type="submit"
              >
                Continue
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </>
  );
};

export default DestinationWeddingStep1Form;
