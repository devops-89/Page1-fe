import {
  Autocomplete,
  Box,
  Card,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import cab from "@/cabs/cab4.jpg";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { loginTextField } from "@/utils/styles";
import { data } from "@/assests/data";
import { MuiTelInput } from "mui-tel-input";
const Taxiform = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url(${cab.src})`,
          height: "80vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box sx={{ position: "absolute", width: "100%", top: "40%" }}>
        <Container>
          <Grid2 container>
            <Grid2 size={6}>
              <Card sx={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", p: 2 }}>
                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: 800,
                    fontFamily: nunito.style,
                  }}
                >
                  Book Your Taxi Ride
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: nunito.style,
                    color: COLORS.LIGHTGREY,
                  }}
                >
                  To get the ride of your taxi please select from the following:
                </Typography>
                <Grid2 container mt={2} spacing={2}>
                  <Grid2 size={12}>
                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Taxi Type"
                          sx={{ ...loginTextField }}
                          fullWidth
                        />
                      )}
                      options={data.taxiOptions}
                      renderOption={(props, option) => (
                        <Box {...props} component={"li"}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: nunito.style,
                            }}
                          >
                            {option.label}
                          </Typography>
                        </Box>
                      )}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      label="Start Destination"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      label="End Destination"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      label="Full Name"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      label="Email"
                      sx={{ ...loginTextField }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <MuiTelInput
                      sx={{ ...loginTextField }}
                      label="Phone Number"
                      fullWidth
                      defaultCountry="IN"
                    />
                  </Grid2>
                </Grid2>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
};

export default Taxiform;
