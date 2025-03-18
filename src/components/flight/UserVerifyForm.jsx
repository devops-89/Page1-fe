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

const UserVerifyForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
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

  const handleSendOtp = () => {
    setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error in email verification: ", error);
        });
    }
  };

  const handleVerifyOtp = () => {
    setLoading(true);
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
        dispatch(setAuthenticated(true));
        localStorage.setItem(
          "access_token",
          response?.data?.data?.access_token
        );
        setLoading(false);
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
        onChange={(e) => setEmail(e.target.value)}
        size="small"
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
            sx={{ backgroundColor: COLORS.PRIMARY,
              cursor: loading ? "not-allowed" : "pointer",
             }}
          >
            {loading ? (
              <Loading
                type="spin"
                width={25} height={25}
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
          disabled={!email}
          sx={{ backgroundColor: COLORS.PRIMARY, width: "150px",
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
