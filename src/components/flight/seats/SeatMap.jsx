import React, { useState } from "react";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import SeatDetail from "./SeatDetail";
import Seat from "./Seat";


const columns = ["A", "B", "C", "D", "E", "F"];




const SeatMap = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.status === "unavailable") return;
    setSelectedSeat(seat);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ p: 2 }}>
        Flight Seat Selection
      </Typography>
      <Stack
        direction={"row"}
        spacing={40}
        px={10}
        sx={{ alignItems: "start" }}
      >
        {/* Seat Detail Section  */}
        <Box>
          <SeatDetail />
          <Typography variant="subtitle1" sx={{ p: 1 }}>
            Conveniently select your seats now for Free.
          </Typography>
        </Box>

        {/* flight map */}
        <Box item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid2 container direction="column" spacing={1} alignItems="center">
            {/* printing columns  */}
            <Grid2 container spacing={9}>
              {columns.map((column, index) => {
                return (
                  <Grid2 item key={index}>
                    <Typography variant="h5" sx={{ color: "gray" }}>
                      {column}
                    </Typography>
                  </Grid2>
                );
              })}
            </Grid2>

            {/* pinting seats */}
            {
              <Seat />
            }
          </Grid2>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatMap;
