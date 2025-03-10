import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { authenticationController } from "@/api/auth";

import { COLORS } from "@/utils/colors";
import { loginTextField } from "@/utils/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
const UserVerifyForm = ({ setVerifiedData }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(null);
  const [enableOtpButton, setEnableOtpButton] = useState(false);

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

  const handleSendOtp = () => {
    if (email) {
      let payload = {
        email: email,
        user_type: "USER",
      };

      authenticationController
        .signUpLoginViaEmail(payload)
        .then((response) => {
          //  console.log("Response in the email verification: ",response.data);
          setOtpSent(response.data);
        })
        .catch((error) => {
          console.log("Error in email verification: ", error);
        });
    }
  };

  const handleVerifyOtp = () => {
    console.log(otpSent.data);
    let payload = {
      reference_id: otpSent?.data?.reference_id,
      otp: otpSent?.data?.OTP,
    };
    authenticationController.verifyEmailOtp(payload).then((response) => {
      console.log(
        "Response after the email and otp verification: ",
        response.data.data
      );
      if (response.statusText === "OK") {
        setVerifiedData(response.data.data);
        localStorage.setItem(
          "access_token",
          response?.data?.data?.access_token
        );
      }
    });
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          {/* <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                ...loginTextField,
                "& fieldset": { borderWidth: "2px!important" },
                mb: 2,
                mt: 2,
              }}
              disabled={otpSent ? false : true}
            /> */}
          <MuiOtpInput
            value={otp}
            autoFocus
            sx={{
              ...loginTextField,
              "& fieldset": { borderWidth: "2px!important" },
              mb: 2,
              mt: 2,
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
            fullWidth
            onClick={handleVerifyOtp}
            disabled={!enableOtpButton}
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
          disabled={!email}
          sx={{ backgroundColor: COLORS.PRIMARY, width: "150px" }}
        >
          Send OTP
        </Button>
      )}
    </>
  );
};

export default UserVerifyForm;
