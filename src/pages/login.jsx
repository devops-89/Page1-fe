import footer from "@/banner/footer.svg";
import LoginForm from "@/components/loginForm";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/colors";
import { Box, Card, Grid2 } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Login = () => {
  return (
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
        <Box sx={{ textAlign: "center", mb: 4, mt: 1 }}>
          <Link href={"/"}>
            <Image src={logo} width={100} />
          </Link>
        </Box>
        <Grid2 container sx={{px:4}}>
          <Grid2 size={{lg:4 , md:4 , sm:12 , xs:12}} margin="auto">
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
