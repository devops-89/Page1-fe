import {
  Autocomplete,
  Box,
  Card,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import packageBanner from "@/tours/banner-tour.png";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import PackageForm from "@/components/packages/packagesForm";
import Packagescard from "@/components/packages/packagesCard";
import Head from "next/head";
const Packages = () => {
  return (
    <div>
      <Head>
        <title>Packages</title>
      </Head>
      <Box
        sx={{
          backgroundImage: `url(${packageBanner.src})`,
          height: 400,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            backgroundColor: COLORS.BLACKDARKOVERLAY,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Card sx={{ width: 850, borderRadius: 10 }}>
            <PackageForm />
          </Card>
        </Box>
      </Box>
      <Box sx={{ pt: 10, pb: 10 }}>
        <Container>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontSize: 15,
                color: COLORS.DARKGREY,
                textTransform: "capitalize",
                fontFamily: nunito.style,
              }}
            >
              24 tours found
            </Typography>
          </Stack>

          <Grid2 container mt={4}>
            <Grid2 size={3}>
              <Packagescard />
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Packages;
