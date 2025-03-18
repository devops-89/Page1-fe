import { authenticationController } from "@/api/auth";
import { setToast } from "@/redux/reducers/toast";
import { COLORS } from "@/utils/colors";
import { TOAST_STATUS } from "@/utils/enum";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { forgetPasswordSchema } from "@/utils/validationSchema";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Form, useFormik } from "formik";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import OTPVerify from "./register/OTPVerify";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const getOtpForPassword = (body) => {
    setLoading(true);
    authenticationController
      .forgotPassword(body)
      .then((res) => {
        localStorage.setItem("reference_id", res.data.data.reference_id);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );
        setShowOtp(true);
      })
      .catch((err) => {
        // console.log("err", err);
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            severity: TOAST_STATUS.ERROR,
            message: errMessage,
          })
        );
        setLoading(false);
        setShowOtp(false);
      });
  };

  const [otpLoading, setOtpLoading] = useState(false);

  const verifyOtpPassword = ({ body }) => {
    setOtpLoading(true);
    authenticationController
      .verifyForgotPasswordOTP(body)
      .then((res) => {
        dispatch(
          setToast({
            open: true,
            severity: TOAST_STATUS.SUCCESS,
            message: res.data.message,
          })
        );
        setOtpLoading(false);
        setTimeout(()=>{
          router.replace('/login')
        },1500)
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            severity: TOAST_STATUS.ERROR,
            message: errMessage,
          })
        );
        setOtpLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      getOtpForPassword(values);
    },
  });
  //

  return (
    <div>
      {showOtp ? (
        <OTPVerify
          show={showOtp}
          loading={otpLoading}
          submitOtp={verifyOtpPassword}
          onClose={() => setShowOtp(false)}
        />
      ) : (
        <Box sx={{ p: 2 }}>
          <Box sx={{ textAlign: "end" }}>
            <IconButton onClick={() => router.back()}>
              <Close sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
          <Typography
            sx={{
              fontSize: 20,
              fontFamily: nunito.style,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: nunito.style,
              fontWeight: 600,
              textAlign: "center",
              mt: 1,
            }}
          >
            Enter your email to receive an OTP and reset your password.
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mt: 2, ...loginTextField }}
              label="Email*"
              fullWidth
              id="email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              sx={{
                mt: 2,
                fontFamily: nunito.style,
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
              }}
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loading
                  type="bars"
                  width={20}
                  height={20}
                  color={COLORS.BLACK}
                />
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
