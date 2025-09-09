import { COLORS } from "@/utils/colors";
import { Box, Card, Grid2 } from "@mui/material";
import React from "react";
import footer from "@/banner/footer.svg";
import RegistrationForm from "@/components/registrationForm";
import Image from "next/image";
import logo from "@/logo/logo.png";
import Link from "next/link";
import Head from "next/head";
const Register = () => {
  return (
    <div>
      <Head>
        <title>Registration</title>
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
              position: "fixed",
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
            top: 0,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
            <Link href={"/"}>
              <Image src={logo} width={100} alt="" />
            </Link>
          </Box>
          <Grid2 container sx={{ px: 4 }}>
            <Grid2 size={{ lg: 4, md: 4, sm: 12, xs: 12 }} margin="auto">
              <Card>
                <RegistrationForm />
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
