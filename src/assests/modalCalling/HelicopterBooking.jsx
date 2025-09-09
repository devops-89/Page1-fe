import { authenticationController } from "@/api/auth";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS } from "@/utils/colors";
import { BOOKING_ENQUIRY, TOAST_STATUS } from "@/utils/enum";
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
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { Grid } from "swiper/modules";

const HelicopterBooking = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

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
    },
    validationSchema: helicopterBookingValidationSchema,
    onSubmit: (values) => {
      // console.log("values", values);
      const body = {
        enquiry_type: BOOKING_ENQUIRY.HELICOPTER,
        enquiry_description: values,
      };
      sendEnquiry(body);
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
  const [loading, setLoading] = useState(false);

  const sendEnquiry = (body) => {
    setLoading(true);
    authenticationController
      .sendEnquiry(body)
      .then((res) => {
        console.log("res", res);
        dispatch(
          setToast({
            open: true,
            message: "Enquiry Submitted Successfully",
            severity: TOAST_STATUS.SUCCESS,
          })
        );
        closeModal();
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };
  return (
    <Box>
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
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Full Name*"
                id="fullName"
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <MuiTelInput
                sx={{ ...loginTextField }}
                fullWidth
                label="Phone Number*"
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
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Email*"
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Origin*"
                id="from"
                onChange={formik.handleChange}
                error={formik.touched.from && Boolean(formik.errors.from)}
                helperText={formik.touched.from && formik.errors.from}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Destination*"
                id="to"
                onChange={formik.handleChange}
                error={formik.touched.to && Boolean(formik.errors.to)}
                helperText={formik.touched.to && formik.errors.to}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date*"
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
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Time*"
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
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label="Number of Adults*"
                sx={{ ...loginTextField }}
                fullWidth
                id="adults"
                type="number"
                onChange={formik.handleChange}
                error={formik.touched.adults && Boolean(formik.errors.adults)}
                helperText={formik.touched.adults && formik.errors.adults}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label="Number of Children"
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
            <Grid2 size={{ xs: 12 }}>
              <TextField
                sx={{
                  ...loginTextField,

                  "& .MuiOutlinedInput-input": {
                    height: "100px !important",
                  },
                }}
                label="Message*"
                fullWidth
                id="message"
                multiline
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  fontFamily: roboto.style,
                }}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    color={COLORS.BLACK}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                onClick={closeModal}
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
