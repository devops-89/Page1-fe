import { useState,useEffect } from "react";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import {data} from "../../../assests/data.js";

const SeatColors = {
  available: "#E8F2FF",
  unavailable: "red",
  reserved: "orange",
  selected: "green",
};

const Seat = () => {
  const [reservedSeats,setReservedSeats]=useState([]);
  useEffect(()=>{
    console.log(reservedSeats); 
  })
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
    {data.seatsData.map((seat) => (
      <Button
        key={`${seat.row}${seat.col}`}
        disabled={(seat.status==="available")?false:true}
        sx={{
          border: "2px solid rgb(22, 129, 216)",
          borderRadius: "4px",
          p: 1,
          textAlign: "center",
          backgroundColor: SeatColors[seat.status] || "#E8F2FF",

          cursor: "pointer",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            border: "2px solid rgb(5, 76, 153)",
          },
        }}
        onClick={() =>{
          
           setReservedSeats([...reservedSeats,seat])
          }}
      >
        <Typography variant="body1" sx={{ color: "black" }}>
          {seat.row}
          {seat.col}
        </Typography>
      </Button>
    ))}
  </Box>
  )
}

export default Seat