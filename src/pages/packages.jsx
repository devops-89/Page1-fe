import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import packageBanner from "@/tours/banner-tour.png";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import Packagescard from "@/components/packages/packagesCard";
import Head from "next/head";
import { data } from "@/assests/data";
import InnerBanner from "@/components/innerBanner";
import { holidayPackageSchema } from "../utils/validationSchema.js";
import { useFormik } from "formik";

const destinations = ["Paris", "New York", "Tokyo"];
const durations = ["3 Days", "7 Days", "14 Days"];
const months = ["January", "June", "December"];
const packagetypes = ["Domestic", "International"];
const packagecategorys = ["Solo", "Couple", "Friends", "Family"];

const Packages = () => {
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [month, setMonth] = useState(null);
  const [packageType, setPackageType] = useState(null);
  const [packageCategory, setPackageCategory] = useState(null);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);

  useEffect(() => {
    if (destination && duration && month && packageType && packageCategory) {
      setSubmitBtnDisable(false);
    } else {
      setSubmitBtnDisable(true);
    }
  }, [destination, duration, month, packageType, packageCategory]);

  const formik = useFormik({
    initialValues: {
      destination: "",
      duration: "",
      month: "",
      packagetype: "",
      packagecategory: "",
    },
    validationSchema: holidayPackageSchema,
    onSubmit: (values, {resetForm}) => {
      console.log("Form Data Submitted:", {
        destination,
        duration,
        month,
        packageType,
        packageCategory,
      });
      resetForm({
        destination: "",
        duration: "",
        month: "",
        packagetype: "",
        packagecategory: "",
      })
    },
  });

  return (
    <div>
      <Head>
        <title>Packages</title>
      </Head>

      <InnerBanner img={packageBanner.src} heading={"Packages"} />
      <Box sx={{ pt: 10, pb: 10 }}>
        <Container>
          <Grid2 container sx={{ mb: "20px" }}>
            <Grid2 size={{ xs: 12 }} sx={{ p: 3 }} component={Paper}>
              <Typography
                variant="h5"
                sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "20px" }}
              >
                Find Your Packages
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={0.5}>
                  <Grid2
                    size={{ xs: 12, sm: 3, md: 2 }}
                    sx={{
                      border: "1px solid #808080",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: nunito.style,
                        color: COLORS.DARKGREY,
                        px: 2,
                        pt: 1,
                      }}
                    >
                      Destination
                    </Typography>
                    <Autocomplete
                      options={destinations}
                      value={destination}
                      onChange={(event, newValue) => setDestination(newValue)}
                      renderInput={(params) => <TextField {...params} placeholder="Search..."   sx={{
                        fieldset: { border: "none" },
                        input: { textAlign: "start" },
                      }}/>}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }} sx={{ border: "1px solid #808080", borderRadius: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: nunito.style,
                        color: COLORS.DARKGREY,
                        px: 2,
                        pt: 1,
                      }}
                    >
                      Duration
                    </Typography>
                    <Autocomplete
                      options={durations}
                      value={duration}
                      onChange={(event, newValue) => setDuration(newValue)}
                      renderInput={(params) => <TextField {...params} placeholder="Search..."  sx={{
                        fieldset: { border: "none" },
                        input: { textAlign: "start" },
                      }}/>}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }} sx={{ border: "1px solid #808080", borderRadius: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: nunito.style,
                        color: COLORS.DARKGREY,
                        px: 2,
                        pt: 1,
                      }}
                    >
                      Months
                    </Typography>
                    <Autocomplete
                      options={months}
                      value={month}
                      onChange={(event, newValue) => setMonth(newValue)}
                      renderInput={(params) => <TextField {...params} placeholder="Search..."  sx={{
                        fieldset: { border: "none" },
                        input: { textAlign: "start" },
                      }}/>}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }} sx={{ border: "1px solid #808080", borderRadius: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: nunito.style,
                        color: COLORS.DARKGREY,
                        px: 2,
                        pt: 1,
                      }}
                    >
                      Package Type
                    </Typography>
                    <Autocomplete
                      options={packagetypes}
                      value={packageType}
                      onChange={(event, newValue) => setPackageType(newValue)}
                      renderInput={(params) => <TextField {...params} placeholder="Search..."  sx={{
                        fieldset: { border: "none" },
                        input: { textAlign: "start" },
                      }}/>}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }} sx={{ border: "1px solid #808080", borderRadius: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: nunito.style,
                        color: COLORS.DARKGREY,
                        px: 2,
                        pt: 1,
                      }}
                    >
                      Category
                    </Typography>
                    <Autocomplete
                      options={packagecategorys}
                      value={packageCategory}
                      onChange={(event, newValue) => setPackageCategory(newValue)}
                      renderInput={(params) => <TextField {...params} placeholder="Search..."  sx={{
                        fieldset: { border: "none" },
                        input: { textAlign: "start" },
                      }}/>}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 3, md: 2 }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      disabled={submitBtnDisable}
                      sx={{
                        color: COLORS.WHITE,
                        backgroundColor: COLORS.SECONDARY,
                        width: 150,
                        p: 2,
                      }}
                    >
                      Search
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </Grid2>
          </Grid2>

          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: 15, color: COLORS.DARKGREY, textTransform: "capitalize", fontFamily: nunito.style }}>
              24 tours found
            </Typography>
          </Stack>

          <Grid2 container mt={4} spacing={3}>
            {data.toursData.map((val, i) => (
              <Grid2 size={3} key={i}>
                <Packagescard title={val.title} img={val.img} location={val.location} rating={val.rating} price={val.price} duration={val.duration} />
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Packages;
