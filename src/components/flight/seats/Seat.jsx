import React from 'react';
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";

const Seat = ({seatsData}) => {
  return (
    <Box
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(6, 1fr)`,
      columnGap: 3,
      rowGap: 1,
      p: 2,
    }}
  >
    {seatsData.map((seat) => (
      <Box
        key={`${seat.row}${seat.col}`}
        sx={{
          border: "2px solid rgb(22, 129, 216)",
          borderRadius: "4px",
          p: 1,
          textAlign: "center",
          backgroundColor: "#E8F2FF",

          cursor: "pointer",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            border: "2px solid rgb(5, 76, 153)",
          },
        }}
        onClick={() => alert(`${seat.row}${seat.col}`)}
      >
        <Typography variant="body1" sx={{ color: "black" }}>
          {seat.row}
          {seat.col}
        </Typography>
      </Box>
    ))}
  </Box>
  )
}

export default Seat