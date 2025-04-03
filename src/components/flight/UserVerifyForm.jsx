import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { authenticationController } from "@/api/auth";
import { COLORS } from "@/utils/colors";
import { loginTextField } from "@/utils/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "@/redux/reducers/user.js";
import { nunito } from "@/utils/fonts";
import Loading from "react-loading";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";

const UserVerifyForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(null);
  const [enableOtpButton, setEnableOtpButton] = useState(false);
  const [loading, setLoading] = useState(false);

  function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email. Please enter a valid email address.");
      return;
    }

    setLoading(true);
    let payload = { email: email, user_type: "USER" };

    authenticationController
      .signUpLoginViaEmail(payload)
      .then((response) => {
        setOtpSent(response.data);
        setLoading(false);
        // console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: error,
            severity: TOAST_STATUS.ERROR,
          })
        );
      });
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    let payload = {
      reference_id: otpSent?.data?.reference_id,
      otp: otp,
    };

    authenticationController.verifyEmailOtp(payload).then((response) => {
      if (response.statusText === "OK") {
        dispatch(setAuthenticated(true));
        localStorage.setItem("accesstoken", response?.data?.data?.access_token);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: response?.data?.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );
      } else {
        setLoading(false)
        dispatch(
          setToast({
            open: true,
            message: response?.response?.data?.message,
            severity: TOAST_STATUS.ERROR,
          })
        );
        setOtp('')
      }
    });
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ mb: "12px", fontWeight: 700, fontFamily: nunito.style }}
      >
        Enter Your Email to Continue Booking
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        size="small"
        error={!!emailError}
        helperText={emailError}
        sx={{
          mb: 2,
          ...loginTextField,
          "& fieldset": { borderWidth: "2px!important" },
        }}
        type="email"
      />

      {otpSent ? (
        <>
          <Typography sx={{ color: COLORS.GREEN }}>
            {otpSent?.message}
          </Typography>
          <MuiOtpInput
            className="custom-otp-input"
            value={otp}
            autoFocus
            sx={{
              ...loginTextField,
              "& fieldset": { borderWidth: "2px!important" },
              mb: 2,
              mt: 2,
              "& .MuiOtpInput-TextField": {
                width: "40px",
                height: "40px",
              },
              "& .MuiOtpInput-TextField .MuiOutlinedInput-root": {
                fontSize: "14px",
                padding: "5px",
              },
              "& .MuiOtpInput-TextField input": {
                textAlign: "center",
                padding: "5px",
              },
            }}
            onChange={handleChange}
            onComplete={() => setEnableOtpButton(true)}
            length={6}
            validateChar={validateChar}
            disabled={otpSent ? false : true}
          />
          <Button
            variant="contained"
            type="button"
            size="small"
            fullWidth
            onClick={handleVerifyOtp}
            disabled={!enableOtpButton}
            sx={{
              backgroundColor: COLORS.PRIMARY,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <Loading
                type="spin"
                width={25}
                height={25}
                color={COLORS.WHITE}
              />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="contained"
          onClick={handleSendOtp}
          disabled={!email || emailError}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            width: "150px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <Loading type="spin" width={25} height={25} color={COLORS.WHITE} />
          ) : (
            "Send OTP"
          )}
        </Button>
      )}
    </>
  );
};

export default UserVerifyForm;
