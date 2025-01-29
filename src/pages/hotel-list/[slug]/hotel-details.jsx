import banner from "@/banner/hotel.jpg";
import { Box, Typography, Paper, Container, Grid2, Stack,Button } from "@mui/material";
import { nunito } from "@/utils/fonts";
import React from "react";

const HotelDetails = () => {
  return (
    <div>
      {/* Banner background */}
      <Box
        sx={{
          height: "200px",
          backgroundImage: `url(${banner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative", // Required for overlay positioning
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            zIndex: 2,
            textAlign: "center",
            fontFamily: nunito.style,
          }}
        >
          Hotel Details
        </Typography>
      </Box>

      {/* Hotel Details  */}
      <Container>
        <Paper
          elevation={3}
          sx={{ padding: 2, my: 10, fontFamily: nunito.style }}
        >
          <Typography variant="h4">
            ibis Styles Goa Vagator - An Accor Brand
          </Typography>

          {/* Main Hotel Details */}

          <Grid2 container spacing={2} my={4}>
            <Grid2
              size={8}
              sx={{ border: "1px solid gray", borderRadius: 1, p: 1 }}
            >
              Left
            </Grid2>
            <Grid2
              size={4}
              sx={{ border: "1px solid gray", borderRadius: 1, p: 1 }}
            >
              <Box>
                <Typography
                  variant="subtitle"
                  sx={{ fontWeight: "bold",color:"black", fontFamily: nunito.style }}
                >
                  2 Rooms Combo with Free Cancellation
                </Typography>
                <Typography variant="subtitle1">Fits 4 Adults</Typography>
              </Box>
              <Box sx={{my:2}}>
                <Typography variant="subtitle">
                Per night for 2 Rooms:
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "flex-end" }}
                >
                  <Typography variant="h4" sx={{ fontFamily: nunito.style,fontWeight: "bold",color:"black", }}>
                    ₹11,198
                  </Typography>
                  <Typography variant="p">+ ₹ 1,344 taxes & fees</Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{my:2}} >
                <Button variant="contained" sx={{width:"100%"}}>View Combo</Button>
                <Button variant="contained" sx={{width:"100%"}}>Other Rooms</Button>
                </Stack>
              </Box>
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </div>
  );
};

export default HotelDetails;
