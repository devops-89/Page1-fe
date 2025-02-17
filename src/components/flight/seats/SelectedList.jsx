import React, { useEffect } from "react";
import { Typography, Box, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector, useDispatch } from "react-redux";
import { removeSeatDetails } from "@/redux/reducers/seatsInformation";

const SelectedList = () => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.SeatsInformation?.seats || []); // Ensure default to []

  useEffect(() => {
    console.log("seats from reducer: ", selectedSeats);
  }, [selectedSeats]);

  function handleSeatRemove(seat) {
    dispatch(removeSeatDetails(seat));
  }

  return (
    <Stack direction={"column"} sx={{ mt: 2 }}>
      {(!selectedSeats || selectedSeats.length === 0) ? ( 
        // Show message when selectedSeats is undefined, null, or empty
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          There is no seat selected
        </Typography>
      ) : (
        selectedSeats.map((seat) => (
          <Stack
            key={seat.Code || `${seat.row}-${seat.col}`} // Unique key fallback
            direction={"row"}
            sx={{
              backgroundColor: "#E8F2FF",
              width: "380px",
              justifyContent: "space-between",
              borderRadius: "4px",
              alignItems: "center",
              border: "1px solid grey",
              my: 1,
              px: 1,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                border: "1px solid black",
                borderRadius: "4px",
                background: "blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {seat.Code || `${seat.row}${seat.col}`} {/* Fallback for seat identification */}
            </Box>

            <Box onClick={() => handleSeatRemove(seat)} sx={{ cursor: "pointer" }}>
              <CancelIcon />
            </Box>
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default SelectedList;
