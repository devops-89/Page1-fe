import { COLORS } from "@/utils/colors";
import { Box, Card, Grid2 } from "@mui/material";
import React from "react";
import footer from "@/banner/footer.svg";
import RegistrationForm from "@/components/registrationForm";
import Image from "next/image";
import logo from "@/logo/logo.png";
import Link from "next/link";
import LoginForm from "@/components/loginForm";
const Login = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundColor: COLORS.LIGHTBLUE,
          height: "100vh",
          pb: 3,
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
          //   transform: "translate(-50%,50%)",
          //   left: "50%",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, mt: 1 }}>
          <Link href={"/"}>
            <Image src={logo} width={100} />
          </Link>
        </Box>
        <Grid2 container>
          <Grid2 size={4} margin="auto">
            <Card>
              <LoginForm />
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Login;
