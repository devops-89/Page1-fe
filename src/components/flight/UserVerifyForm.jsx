import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { authenticationController } from "@/api/auth";
import { COLORS } from "@/utils/colors";
import { loginTextField } from "@/utils/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

const UserVerifyForm = ({ setVerifiedData }) => {
  const [otpSent, setOtpSent] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!otpSent?.data?.reference_id) return;

      let payload = {
        reference_id: otpSent.data.reference_id,
        otp: otpSent?.data?.OTP,
      };

      try {
        const response = await authenticationController.verifyEmailOtp(payload);
        if (response.status === 200) {
          // console.log(response.data.data.access_token)
          setVerifiedData(response.data.data);
          localStorage.setItem("access_token", response.data.data.access_token);
        }
      } catch (error) {
        console.error("OTP verification failed: ", error);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.email) return;

    let payload = {
      email: formik.values.email,
      user_type: "USER",
    };

    try {
      const response = await authenticationController.signUpLoginViaEmail(payload);
      setOtpSent(response.data);
    } catch (error) {
      console.error("Error in email verification: ", error);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: "12px", fontWeight: 600 }}>
        Verify Your Email
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{
          mb: 2,
          ...loginTextField,
          "& fieldset": { borderWidth: "2px!important" },
        }}
        type="email"
      />

      {otpSent ? (
        <>
          <Typography sx={{ color: COLORS.GREEN }}>{otpSent?.message}</Typography>

          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            sx={{
              ...loginTextField,
              "& fieldset": { borderWidth: "2px!important" },
              mb: 2,
              mt: 2,
            }}
          />

          <Button
            variant="contained"
            type="button"
            fullWidth
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !formik.values.otp}
            sx={{ backgroundColor: COLORS.PRIMARY }}
          >
            Verify OTP
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="contained"
          onClick={handleSendOtp}
          disabled={!formik.values.email || Boolean(formik.errors.email)}
          sx={{ backgroundColor: COLORS.PRIMARY, width: "150px" }}
        >
          Send OTP
        </Button>
      )}
    </>
  );
};

export default UserVerifyForm;
