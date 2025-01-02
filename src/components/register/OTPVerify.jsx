import { setToast } from "@/redux/reducers/toast";
import { COLORS } from "@/utils/colors";
import { TOAST_STATUS } from "@/utils/enum";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Close,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";

const OTPVerify = ({ submitOtp, loading, onClose, show }) => {
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
  });
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    formik.values.password = e.target.value;
  };

  const submitHander = () => {
    let body = {
      otp: otp,
      reference_id: localStorage.getItem("reference_id"),
    };
    if (show) {
      if (otp === "" || formik.values.password === "") {
        dispatch(
          setToast({
            open: true,
            message: "Please Enter OTP",
            severity: TOAST_STATUS.ERROR,
          })
        );
        formik.errors.password = "Please Enter Password";
      } else {
        if (formik.values.password) {
          body.password = formik.values.password;
        }
        submitOtp({ body });
      }
    } else {
      if (otp === "") {
        dispatch(
          setToast({
            open: true,
            message: "Please Enter OTP",
            severity: TOAST_STATUS.ERROR,
          })
        );
      } else {
        submitOtp({ body });
      }
    }
  };

  return (
    <div>
      <Box sx={{ p: 2, position: "relative" }}>
        <Box sx={{ textAlign: "end" }}>
          <IconButton sx={{ position: "", right: 10 }} onClick={onClose}>
            <Close sx={{ fontSize: 14, fontWeight: 550 }} />
          </IconButton>
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: nunito.style,
            fontWeight: 700,
          }}
        >
          Verify OTP
        </Typography>
        <Typography
          sx={{
            mt: 1,
            textAlign: "center",
            fontSize: 14,
            color: COLORS.DARKGREY,
          }}
        >
          Verify the OTP that has been sent to your Email
        </Typography>

        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={6}
          sx={{ ...loginTextField, mt: 4 }}
        />
        {show && (
          <TextField
            label="Password"
            sx={{ ...loginTextField, mt: 4 }}
            fullWidth
            onChange={handlePasswordChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        {/* <Button
          sx={{
            fontSize: 12,
            backgroundColor: COLORS.PRIMARY,
            mt: 3,
            fontFamily: nunito.style,
            p: 1,
            color: COLORS.SECONDARY,
          }}
          fullWidth
          onClick={submitHander}
        >
          Resend OTP
        </Button> */}
        <Button
          sx={{
            fontSize: 12,
            backgroundColor: COLORS.PRIMARY,
            mt: 3,
            fontFamily: nunito.style,
            p: 1,
            color: COLORS.WHITE,
            fontWeight: 600,
          }}
          fullWidth
          onClick={submitHander}
          disabled={loading}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
          ) : (
            "Verify"
          )}
        </Button>
      </Box>
      <ToastBar />
    </div>
  );
};

export default OTPVerify;
