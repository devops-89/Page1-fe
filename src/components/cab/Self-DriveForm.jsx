import { userSendEnquiry } from "@/assests/apicalling/enquiry";
import { COLORS } from "@/utils/colors";
import { BOOKING_ENQUIRY } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { selfDriveValidationSchema } from "@/utils/validationSchema";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import moment from "moment";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const SelfDriveForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [phone, setPhone] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: selfDriveValidationSchema,
    onSubmit: async (values, { resetForm }) => { 
      setLoading(true);
      const data = {
        enquiry_type: BOOKING_ENQUIRY.SELF_DRIVE,
        enquiry_description: values,
      };

      try {
        await userSendEnquiry({
          setLoading,
          data,
          dispatch,
          setActiveStep: setActiveStep, 
        });
        resetForm(); 
        setToDate(null);
        setFromDate(null);
        setPhone(null);
      } catch (error) {
        console.error("Error sending self-drive enquiry:", error);
      } finally {
        setLoading(false); 
      }
    },
  });

  const handlePhoneNumber = (newPhone) => {
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

  const dateChangeHandler = (newDate, id) => {
    if (id === "toDate") {
      setToDate(newDate);
    }
    if (id === "fromDate") {
      setFromDate(newDate);
    }

    const validDate = moment(newDate).isValid();
    if (validDate) {
      formik.setFieldValue(id, moment(newDate).format("DD-MM-YYYY"));
      formik.setFieldError(id, ""); 
    } else {
      formik.setFieldError(id, "Please Enter Valid Date");
    }
    formik.setFieldTouched(id, true, false); 
  };

  return (
    <div>
      <Card>
        <CardHeader
          title="Self Drive Form"
          titleTypographyProps={{
            variant: "h5",
            fontWeight: 600,
            fontFamily: roboto.style,
            color: COLORS.WHITE, 
          }}
          sx={{ textAlign: "center", mb: 2, backgroundColor: COLORS.PRIMARY }}
        />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                sx={{ ...loginTextField }}
                label="Full Name"
                id="fullName"
                name="fullName" 
                value={formik.values.fullName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              {/* Email TextField */}
              <TextField
                sx={{ ...loginTextField }}
                label="Email"
                id="email"
                name="email" 
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              {/* Phone Number MuiTelInput */}
              <MuiTelInput
                defaultCountry="IN"
                label="Phone Number" 
                sx={{ ...loginTextField }}
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

              {/* From Date DatePicker */}
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="From Date"
                  sx={{ ...loginTextField, width: "100%" }}
                  disablePast
                  format="DD/MM/YYYY"
                  onChange={(newDate) => dateChangeHandler(newDate, "fromDate")}
                  value={fromDate} 
                  slotProps={{
                    textField: {
                      error:
                        formik.touched.fromDate &&
                        Boolean(formik.errors.fromDate),
                      helperText:
                        formik.touched.fromDate && formik.errors.fromDate,
                      onBlur: () => formik.setFieldTouched('fromDate', true), 
                    },
                  }}
                />
              </LocalizationProvider>

              {/* To Date DatePicker */}
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="To Date"
                  sx={{ ...loginTextField, width: "100%" }}
                  disablePast
                  format="DD/MM/YYYY"
                  onChange={(newDate) => dateChangeHandler(newDate, "toDate")}
                  value={toDate} 
                  slotProps={{
                    textField: {
                      error:
                        formik.touched.toDate && Boolean(formik.errors.toDate),
                      helperText: formik.touched.toDate && formik.errors.toDate,
                      onBlur: () => formik.setFieldTouched('toDate', true), 
                    },
                  }}
                />
              </LocalizationProvider>

              {/* Submit Button */}
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE, 
                  fontFamily: roboto.style,
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
                    width={20}
                    height={20}
                    color={COLORS.WHITE} 
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfDriveForm;