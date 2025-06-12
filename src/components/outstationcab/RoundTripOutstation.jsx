import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { COLORS } from "@/utils/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { roboto } from "@/utils/fonts";
import { BOOKING_ENQUIRY, TOAST_STATUS } from "@/utils/enum";
import { useDispatch } from "react-redux";
import { authenticationController } from "@/api/auth";
import { setToast } from "@/redux/reducers/toast";
import dayjs from "dayjs"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  pickupLocation: Yup.string().required("Pickup Location is required"),
  dropLocation: Yup.string().required("Drop Location is required"),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile Number is required"),
  numberOfPerson: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than zero")
    .integer("Must be an integer")
    .required("Number of Person is required"),
  pickupDate: Yup.date().required("Pickup Date is required"),
  returnDate: Yup.date()
    .nullable()
    .min(Yup.ref("pickupDate"), "Return Date must be after Pickup Date"),
  pickupTime: Yup.date().required("Pickup Time is required"),
});

const RoundTripOutstation = () => {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      pickupLocation: "",
      dropLocation: "",
      mobileNumber: "",
      numberOfPerson: "",
      pickupDate: null,
      returnDate: null,
      pickupTime: null,
    },
    validationSchema,
   onSubmit: (values, { resetForm }) => {
  const formattedDate = dayjs(values.pickupDate).format("DD-MM-YYYY");
  const formattedReturnDate = values.returnDate
    ? dayjs(values.returnDate).format("DD-MM-YYYY")
    : null;
  const formattedTime = dayjs(values.pickupTime).format("HH:mm");

  const body = {
    enquiry_type: BOOKING_ENQUIRY.OUTSTATION_CABS,
    enquiry_description: {
      ...values,
      pickupDate: formattedDate,
      returnDate: formattedReturnDate,
      pickupTime: formattedTime,
    },
  };

 

  sendEnquiry(body);
  resetForm();
}
        
  });

   const sendEnquiry = (body) => {
        setLoading(true);
        authenticationController
          .sendEnquiry(body)
          .then((res) => {
            // console.log("res", res);
            dispatch(
              setToast({
                open: true,
                message: "Enquiry Submitted Successfully",
                severity: TOAST_STATUS.SUCCESS,
              })
            );
            setLoading(false);
          })
          .catch((err) => {
            // console.log("err", err);
            dispatch(
              setToast({
                open: true,
                message: err.message,
                severity: TOAST_STATUS.ERROR,
              })
            );
            setLoading(false);
          });
      };



  return (
    <form onSubmit={formik.handleSubmit}>
      {console.log("errors", formik)}
      <Box>
        <TextField
          name="email"
          size="small"
          label="Email"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="pickupLocation"
          size="small"
          label="Pickup Location"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.pickupLocation}
          onChange={formik.handleChange}
          error={formik.touched.pickupLocation && Boolean(formik.errors.pickupLocation)}
          helperText={formik.touched.pickupLocation && formik.errors.pickupLocation}
        />
        <TextField
          name="dropLocation"
          size="small"
          label="Drop Location"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.dropLocation}
          onChange={formik.handleChange}
          error={formik.touched.dropLocation && Boolean(formik.errors.dropLocation)}
          helperText={formik.touched.dropLocation && formik.errors.dropLocation}
        />
        <TextField
          name="mobileNumber"
          size="small"
          label="Mobile Number"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
        />
        <TextField
          name="numberOfPerson"
          size="small"
          label="Number Of Person"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.numberOfPerson}
          onChange={formik.handleChange}
          error={formik.touched.numberOfPerson && Boolean(formik.errors.numberOfPerson)}
          helperText={formik.touched.numberOfPerson && formik.errors.numberOfPerson}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Pickup Date"
            value={formik.values.pickupDate}
            onChange={(value) => formik.setFieldValue("pickupDate", value)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: formik.touched.pickupDate && Boolean(formik.errors.pickupDate),
                helperText: formik.touched.pickupDate && formik.errors.pickupDate,
              },
            }}
            sx={{ my: 1 }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Return Date"
            value={formik.values.returnDate}
            onChange={(value) => formik.setFieldValue("returnDate", value)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: formik.touched.returnDate && Boolean(formik.errors.returnDate),
                helperText: formik.touched.returnDate && formik.errors.returnDate,
              },
            }}
            sx={{ my: 1 }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Select Time"
            value={formik.values.pickupTime}
            onChange={(value) => formik.setFieldValue("pickupTime", value)}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                error: formik.touched.pickupTime && Boolean(formik.errors.pickupTime),
                helperText: formik.touched.pickupTime && formik.errors.pickupTime,
              },
            }}
            sx={{ my: 1 }}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          fullWidth
          size="small"
          sx={{
            bgcolor: COLORS.PRIMARY,
            color: COLORS.WHITE,
            fontFamily: roboto.style,
            my: 1,
            py: 1,
          }}
        >
          Book Now
        </Button>
      </Box>
    </form>
  );
};

export default RoundTripOutstation;
