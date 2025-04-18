import { authenticationController } from "@/api/auth";
import { setToast } from "@/redux/reducers/toast";
import { setUserDetails } from "@/redux/reducers/user";
import { COLORS } from "@/utils/colors";    
import { TOAST_STATUS } from "@/utils/enum";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { loginSchema } from "@/utils/validationSchema";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loginUser = (values) => {
    setLoading(true);
    authenticationController
      .login(values)
      .then((res) => {
        localStorage.setItem("access_token", res.data.data.access_token);
        dispatch(setUserDetails({ ...res.data.data, isAuthenticated: true }));
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: TOAST_STATUS.ERROR,
          })
        );
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      let body = {
        identity: values.email,
        password: values.password,
      };
      loginUser(body);
    },
  });
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: nunito.style,
            fontWeight: 700,
          }}
        >
          Login
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            textAlign: "center",
            fontFamily: nunito.style,
            fontWeight: 500,
          }}
        >
          Sign in to Start to Manage your Page1Travels Account
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                label="Email*"
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                label="Password*"
                type={showPassword ? "text" : "password"}
                sx={{ ...loginTextField, width: "100%" }}
                id="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
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
            </Grid2>
            <Grid2 size={12} textAlign={"end"}>
              <Typography
                component={"a"}
                sx={{
                  fontSize: 12,
                  textAlign: "end",
                  color: COLORS.PRIMARY,
                  cursor: "pointer",
                }}
                onClick={() => router.push("/forget-password")}
              >
                {" "}
                Forgot Password?
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  fontSize: 14,

                  p: 1,
                  color: COLORS.BLACK,
                  fontFamily: nunito.style,
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
                  "Login"
                )}
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: nunito.style,
                }}
              >
                Don't you have an account?{" "}
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: 14,
                    color: COLORS.SECONDARY,
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/register")}
                >
                  Sign up
                </Typography>{" "}
              </Typography>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </div>
  );
};

export default LoginForm;
