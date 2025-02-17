import React, { useState } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import SeatDetail from "./SeatDetail";
import Seat from "./Seat";
import flightFront from "@/assests/flight_image/flight_front.png";
import flightBack from "@/assests/flight_image/flight_back.png";
import {COLORS} from "@/utils/colors.js";

const columns = ["A", "B", "C", "D", "E", "F"];

const SeatMap = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.status === "unavailable") return;
    setSelectedSeat(seat);
  };

  return (
    <Box sx={{backgroundColor:COLORS.SKYBLUE}}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Flight Seat Selection
      </Typography>

      <Stack direction="row" px={10} sx={{ alignItems: "start", justifyContent: "space-between" }}>
        {/* Seat Detail Section */}
        <Box>
          <SeatDetail />
          <Typography variant="subtitle1" sx={{ p: 1 }}>
            Conveniently select your seats now for Free.
          </Typography>
        </Box>

        {/* Flight Map */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          {/* Airplane Front Image */}
          <Box component="img" src={flightFront.src} alt="Airplane Front" sx={{ width: "300px", mb: -2 }} />

          {/* Printing Seat Columns */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            {columns.map((column, index) => (
              <Typography key={index} variant="h6" sx={{ mx: 2, color: "gray" }}>
                {column}
              </Typography>
            ))}
          </Box>

          {/* Printing Seats */}
          <Seat />

          {/* Airplane Back Image */}
          <Box component="img" src={flightBack.src} alt="Airplane Back" sx={{ width: "292px", mt: -2 }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatMap;
