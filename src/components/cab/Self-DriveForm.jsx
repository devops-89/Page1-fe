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
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: selfDriveValidationSchema,
    onSubmit: (values) => {
      //   console.log("values", values);
      setLoading(true);
      const data = {
        enquiry_type: BOOKING_ENQUIRY.SELF_DRIVE,
        enquiry_description: values,
      };
      userSendEnquiry({ setLoading, data, dispatch });
    },
  });

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [phone, setPhone] = useState(null);
  const handlePhoneNumber = (newPhone) => {
    setPhone(newPhone);
    const validPhone = matchIsValidTel(newPhone);
    if (validPhone) {
      formik.setFieldValue("phoneNumber", newPhone);
    } else {
      formik.setFieldError("phoneNumber", "Please Enter Valid Phone Number");
    }
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
    } else {
      formik.setFieldError(id, "Please Enter Valid Date");
    }
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
            color: "#000",
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
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                onChange={formik.handleChange}
              />
              <TextField
                sx={{ ...loginTextField }}
                label="Email"
                id="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
              <MuiTelInput
                defaultCountry="IN"
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
                    },
                  }}
                />
              </LocalizationProvider>
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
                    },
                  }}
                />
              </LocalizationProvider>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.BLACK,
                  fontFamily: roboto.style,
                }}
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
                  " Submit"
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
