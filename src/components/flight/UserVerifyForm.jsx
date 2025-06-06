import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
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
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showOtpMessage, setShowOtpMessage] = useState(true); 

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && otpSent) {
      setShowOtpMessage(false); 
    }

    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };

  const validateChar = (value) => matchIsNumeric(value);
  const handleChange = (newValue) => setOtp(newValue);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Please enter a valid email address.");
  };

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email. Please enter a valid email address.");
      return;
    }

    setLoadingResend(true);
    const payload = { email: email, user_type: "USER" };

    authenticationController
      .signUpLoginViaEmail(payload)
      .then((response) => {
        setOtpSent(response.data);
        setLoadingResend(false);
        setEnableOtpButton(false);
        setShowOtpMessage(true); 
        setTimer(90);
      })
      .catch((error) => {
        setLoadingResend(false);
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
    setLoadingVerify(true);
    const payload = {
      reference_id: otpSent?.data?.reference_id,
      otp: otp,
    };

    authenticationController.verifyEmailOtp(payload).then((response) => {
      if (response.statusText === "OK") {
        dispatch(setAuthenticated(true));
        localStorage.setItem("accesstoken", response?.data?.data?.access_token);
        setLoadingVerify(false);
        dispatch(
          setToast({
            open: true,
            message: response?.data?.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );
      } else {
        setLoadingVerify(false);
        dispatch(
          setToast({
            open: true,
            message: response?.response?.data?.message,
            severity: TOAST_STATUS.ERROR,
          })
        );
        setOtp("");
      }
    });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(1, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
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
          {showOtpMessage && (
            <Typography sx={{ color: COLORS.GREEN }}>
              {otpSent?.message}
            </Typography>
          )}

          {timer > 0 && (
            <Typography sx={{ mt: 1 }}>
              Time remaining: {formatTime(timer)}
            </Typography>
          )}

          {timer > 0 && (
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
              disabled={!otpSent}
            />
          )}

          <Box sx={{ display: "flex", gap: "10px" }}>
            {timer > 0 && (
              <Button
                variant="contained"
                type="button"
                size="small"
                onClick={handleVerifyOtp}
                disabled={!enableOtpButton || loadingVerify}
                sx={{
                  width: "150px",
                  backgroundColor: COLORS.PRIMARY,
                  cursor: loadingVerify ? "not-allowed" : "pointer",
                }}
              >
                {loadingVerify ? (
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
            )}

            {timer === 0 && (
              <Button
                variant="contained"
                type="button"
                size="small"
                onClick={handleSendOtp}
                disabled={loadingResend}
                sx={{
                  width: "150px",
                  backgroundColor: COLORS.SECONDARY,
                  cursor: loadingResend ? "not-allowed" : "pointer",
                }}
              >
                {loadingResend ? (
                  <Loading
                    type="spin"
                    width={25}
                    height={25}
                    color={COLORS.WHITE}
                  />
                ) : (
                  "Resend Code"
                )}
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Button
          type="button"
          variant="contained"
          onClick={handleSendOtp}
          disabled={!email || emailError || loadingResend}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            width: "150px",
            cursor: loadingResend ? "not-allowed" : "pointer",
          }}
        >
          {loadingResend ? (
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
