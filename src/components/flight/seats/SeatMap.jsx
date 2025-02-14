import React, { useState } from "react";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import SeatDetail from "./SeatDetail";
import Seat from "./Seat";

const columns = ["A", "B", "C", "D", "E", "F"];

const seatsData = [
  { row: 1, col: "A", price: 9, status: "available" },
  { row: 1, col: "B", price: 9, status: "available" },
  { row: 1, col: "C", price: 9, status: "available" },
  { row: 1, col: "D", price: 9, status: "available" },
  { row: 1, col: "E", price: 9, status: "available" },
  { row: 1, col: "F", price: 9, status: "available" },
  { row: 2, col: "A", price: 5, status: "unavailable" },
  { row: 2, col: "B", price: 5, status: "available" },
  { row: 2, col: "C", price: 5, status: "available" },
  { row: 2, col: "D", price: 9, status: "available" },
  { row: 2, col: "E", price: 9, status: "available" },
  { row: 2, col: "F", price: 9, status: "available" },
  { row: 3, col: "A", price: 5, status: "unavailable" },
  { row: 3, col: "B", price: 5, status: "unavailable" },
  { row: 3, col: "C", price: 5, status: "available" },
  { row: 3, col: "D", price: 9, status: "available" },
  { row: 3, col: "E", price: 9, status: "available" },
  { row: 3, col: "F", price: 9, status: "available" },
  { row: 4, col: "A", price: 12, status: "available" },
  { row: 4, col: "B", price: 12, status: "available" },
  { row: 4, col: "C", price: 12, status: "available" },
  { row: 4, col: "D", price: 9, status: "available" },
  { row: 4, col: "E", price: 9, status: "available" },
  { row: 4, col: "F", price: 9, status: "available" },
  { row: 5, col: "A", price: 12, status: "available" },
  { row: 5, col: "B", price: 5, status: "selected" },
  { row: 5, col: "C", price: 5, status: "available" },
  { row: 5, col: "D", price: 5, status: "available" },
  { row: 5, col: "E", price: 9, status: "available" },
  { row: 5, col: "F", price: 9, status: "available" },
];



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
            <Grid2 container spacing={6}>
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
              <Seat seatsData={seatsData} />
            }
          </Grid2>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatMap;
