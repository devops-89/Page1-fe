import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { helicopterBookingValidationSchema } from "@/utils/validationSchema";
import { Close, ForkRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import moment from "moment";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "swiper/modules";

const HelicopterBooking = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      from: "",
      to: "",
      date: "",
      time: "",
      adults: "",
      children: "",
      message: "",
      permission: false,
    },
    validationSchema: helicopterBookingValidationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const [phone, setPhone] = useState(null);
  const handleChangePhoneNumber = (phoneNumber, countryData) => {
    setPhone(phoneNumber);
    const validPhone = matchIsValidTel(phoneNumber);

    if (validPhone) {
      formik.setFieldValue("phoneNumber", countryData.nationalNumber);
      formik.setFieldError("phoneNumber", "");
    } else {
      formik.setFieldError("phoneNumber", "Please Enter Valid Phone Number");
    }
  };
  const [date, setDate] = useState(null);
  const handleDateChangeHandler = (newDate) => {
    setDate(newDate);
    const validDate = moment(newDate).isValid();

    if (validDate) {
      formik.setFieldValue("date", moment(newDate).format("DD-MM-YYYY"));
    } else {
      formik.setFieldError("date", "Please Enter Valid Date");
    }
  };

  const [time, setTime] = useState(null);

  const handleTimeChangeHandler = (newTime) => {
    setTime(newTime);
    formik.setFieldValue("time", moment(newTime).format("HH:mm A"));
  };
  return (
    <Box sx={{ width: 800 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
          {" "}
          Helicopter Booking
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ fill: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <Grid2 container spacing={3}>
            <Grid2 size={4}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Full Name"
                id="fullName"
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid2>
            <Grid2 size={4}>
              <MuiTelInput
                sx={{ ...loginTextField }}
                fullWidth
                label="Phone Number"
                defaultCountry="IN"
                onChange={handleChangePhoneNumber}
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
            <Grid2 size={4}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Email"
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Origin"
                id="from"
                onChange={formik.handleChange}
                error={formik.touched.from && Boolean(formik.errors.from)}
                helperText={formik.touched.from && formik.errors.from}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Destination"
                id="to"
                onChange={formik.handleChange}
                error={formik.touched.to && Boolean(formik.errors.to)}
                helperText={formik.touched.to && formik.errors.to}
              />
            </Grid2>
            <Grid2 size={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date"
                  sx={{ ...loginTextField, width: "100%" }}
                  disablePast
                  onChange={handleDateChangeHandler}
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
            <Grid2 size={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Time"
                  sx={{ ...loginTextField, width: "100%" }}
                  onChange={handleTimeChangeHandler}
                  value={time}
                  slotProps={{
                    textField: {
                      error: formik.touched.time && Boolean(formik.errors.time),
                      helperText: formik.touched.time && formik.errors.time,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={4}>
              <TextField
                label="Adults(in Numbers)"
                sx={{ ...loginTextField }}
                fullWidth
                id="adults"
                type="number"
                onChange={formik.handleChange}
                error={formik.touched.adults && Boolean(formik.errors.adults)}
                helperText={formik.touched.adults && formik.errors.adults}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                label="Children(in Numbers)"
                sx={{ ...loginTextField }}
                fullWidth
                id="children"
                type="number"
                onChange={formik.handleChange}
                error={
                  formik.touched.children && Boolean(formik.errors.children)
                }
                helperText={formik.touched.children && formik.errors.children}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                sx={{
                  ...loginTextField,

                  "& .MuiOutlinedInput-input": {
                    height: "100px !important",
                  },
                }}
                label="Message"
                fullWidth
                id="message"
                multiline
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  fontFamily: roboto.style,
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                sx={{
                  border: `1px solid ${COLORS.PRIMARY}`,
                  color: COLORS.PRIMARY,
                }}
                fullWidth
              >
                Cancel
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </form>
    </Box>
  );
};

export default HelicopterBooking;
