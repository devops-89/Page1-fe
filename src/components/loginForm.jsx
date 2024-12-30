import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { loginSchema } from "@/utils/validationSchema";
import {
  Box,
  Button,
  Divider,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import React from "react";

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("test", values);
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
          Sign in to Start Manage your Page1Travels Account
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
                label="Email"
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                label="Password"
                type="password"
                sx={{ ...loginTextField, width: "100%" }}
                id="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
              >
                {" "}
                Forgot Password ?
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  fontSize: 14,

                  p: 1,
                  color: COLORS.WHITE,
                  fontFamily: nunito.style,
                }}
                fullWidth
                type="submit"
              >
                Login
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
                Don't you have an account ?{" "}
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
