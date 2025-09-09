import { COLORS } from "@/utils/colors";
import { Box, Card, Grid2 } from "@mui/material";
import React, { useState } from "react";
import footer from "@/banner/footer.svg";
import RegistrationForm from "@/components/registrationForm";
import Image from "next/image";
import logo from "@/logo/logo.png";
import Link from "next/link";
import Head from "next/head";
import OTPVerify from "@/components/register/OTPVerify";
import ToastBar from "@/components/toastBar";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";
import { authenticationController } from "@/api/auth";
import { useRouter } from "next/router";
const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const verifyOneTimePassword = ({ body }) => {
    setLoading(true);
    authenticationController
      .verifyOtp(body)
      .then((res) => {
        localStorage.setItem("access_token", res.data.data.accessToken);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );
        router.replace("/login");
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
  return (
    <div>
      <Head>
        <title>Verify OTP</title>
      </Head>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            backgroundColor: COLORS.LIGHTBLUE,
            height: "100vh",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${footer.src})`,
              height: "100%",
              width: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: "10%",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
            <Link href={"/"}>
              <Image src={logo} width={100} alt="" />
            </Link>
          </Box>
          <Grid2 container>
            <Grid2 size={3.5} margin="auto">
              <Card>
                <OTPVerify
                  submitOtp={verifyOneTimePassword}
                  loading={loading}
                />
              </Card>
              <ToastBar />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default VerifyOtp;
