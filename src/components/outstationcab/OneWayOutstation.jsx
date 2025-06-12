import React,{useState} from "react";
import { Box, TextField, Button } from "@mui/material";
import { COLORS } from "@/utils/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import { setToast } from "@/redux/reducers/toast";
import * as Yup from "yup";
import { roboto } from "@/utils/fonts";
import dayjs from "dayjs";
import { BOOKING_ENQUIRY, TOAST_STATUS } from "@/utils/enum";
import Loading from "react-loading";
import { authenticationController } from "@/api/auth";
import { useDispatch } from "react-redux";
import moment from "moment";
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
  pickupTime: Yup.date().required("Pickup Time is required"),
});

const OneWayOutstation = () => {
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
    pickupTime: null,
  },
  validationSchema,
 onSubmit: (values, { resetForm }) => {
  const formattedDate = dayjs(values.pickupDate).format("DD-MM-YYYY");
  const formattedTime = dayjs(values.pickupTime).format("HH:mm");

  const body = {
    enquiry_type: BOOKING_ENQUIRY.OUTSTATION_CABS,
    enquiry_description: {
      ...values,
      pickupDate: formattedDate,
      pickupTime: formattedTime,
    },
  };
  
  sendEnquiry(body);
  resetForm();
},
});
  const sendEnquiry = (body) => {
    console.log("body:",body)
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
      <Box>
        <TextField
          name="email"
          label="Email"
          size="small"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="pickupLocation"
          label="Pickup Location"
          size="small"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.pickupLocation}
          onChange={formik.handleChange}
          error={formik.touched.pickupLocation && Boolean(formik.errors.pickupLocation)}
          helperText={formik.touched.pickupLocation && formik.errors.pickupLocation}
        />
        <TextField
          name="dropLocation"
          label="Drop Location"
          size="small"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.dropLocation}
          onChange={formik.handleChange}
          error={formik.touched.dropLocation && Boolean(formik.errors.dropLocation)}
          helperText={formik.touched.dropLocation && formik.errors.dropLocation}
        />
        <TextField
          name="mobileNumber"
          label="Mobile Number"
          size="small"
          fullWidth
          sx={{ my: 1 }}
          value={formik.values.mobileNumber}
          onChange={formik.handleChange}
          error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
        />
        <TextField
          name="numberOfPerson"
          label="Number Of Person"
          size="small"
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
          <TimePicker
            label="Pickup Time"
            value={formik.values.pickupTime}
            onChange={(value) => formik.setFieldValue("pickupTime", value)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
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
          {loading?(
            <Loading
                                          type="bars"
                                          color={COLORS.BLACK}
                                          width={20}
                                          height={20}
                                        />
          ):"BOOK NOW"}
        </Button>
      </Box>
    </form>
  );
};

export default OneWayOutstation;
