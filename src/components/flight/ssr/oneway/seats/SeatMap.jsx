import React, { useEffect, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import SeatDetail from "./SeatDetail";
import Seat from "./Seat";
import flightFront from "@/assests/flight_image/flight_front.png";
import flightBack from "@/assests/flight_image/flight_back.png";
import { COLORS } from "@/utils/colors.js";
import { nunito } from "@/utils/fonts";

const SeatMap = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [extraDetails, setExtraDetails] = useState(null);
  const handleSeatClick = (seat) => {
    if (seat.status === "unavailable") return;
    setSelectedSeat(seat);
  };

    useEffect(() => {
      const flightDetails = localStorage.getItem("oneWayflightDetails");
      if (flightDetails) {
        setExtraDetails(JSON.parse(flightDetails));
      }
    }, []);

  return (
    <Box sx={{ backgroundColor: COLORS.BLUEOVERLAY, py: 2 }}>
      <Stack
        direction="row"
        px={10}
        sx={{
          alignItems: "start",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Seat Detail Section */}
        <Box
          sx={{
            height: "100vh",
            overflowY: "auto",
            flexShrink: 0,
            position: "sticky",
            top: "10px",
          }}
        >
          <Box sx={{ p: 2}}>
            <SeatDetail extraDetails={extraDetails?.[0]}/>
            <Typography variant="body1" sx={{ p: 1, fontFamily:nunito.style }}>
              Conveniently select your seats now for Free.
            </Typography>
          </Box>
        </Box>

        {/* Flight Map */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Airplane Front Image */}
          <Box
            component="img"
            src={flightFront.src}
            alt="Airplane Front"
            sx={{ maxWidth: "300px", mb: -2 }}
          />

          {/* Printing Seats */}
          <Seat extraDetails={extraDetails?.[1]}/>

          {/* Airplane Back Image */}
          <Box
            component="img"
            src={flightBack.src}
            alt="Airplane Back"
            sx={{ maxWidth: "300px", mt: -2 }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatMap;
