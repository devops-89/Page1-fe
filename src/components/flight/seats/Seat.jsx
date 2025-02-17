import { useState, useEffect } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSeatDetails } from "@/redux/reducers/seatsInformation.js";

const SeatColors = {
  available: "#E8F2FF",
  unavailable: "red",
  reserved: "orange",
  selected: "green",
};



const Seat = () => {
  const [extraDetails, setExtraDetails] = useState(null);
  const dispatch = useDispatch();
  const [reservedSeats, setReservedSeats] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    const flightDetails = localStorage.getItem("oneWayflightDetails");
    if (flightDetails) {
      setExtraDetails(JSON.parse(flightDetails)[1]);
    }
  }, []);

  useEffect(() => {
    console.log("Other details: ", extraDetails);
  }, [extraDetails]);

  return (
    <>
      {extraDetails ? (
        <Stack direction="column" spacing={2} p={2}>
          {/* Loop through rows first */}
          {extraDetails?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats.map((seats, rowIndex) => (
            <Stack key={rowIndex} direction="row" spacing={3}>
              {/* Loop through seats within the row */}
              {seats.Seats.map((seat, colIndex) => (
                <Button
                  key={seat.Code}
                 title={seat.Price}
                 
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
                  onClick={() => {
                   
                      setReservedSeats([...reservedSeats, seat]);
                      dispatch(setSeatDetails(seat));
                 
                  }}
                >
                  <Typography variant="body1" sx={{ color: "black" }}>
                    {/* {rowIndex} {SeatColumns[colIndex]} */}
                    {seat.Code}
                  </Typography>
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>
      ) : (
        <h1>Extra Details Not Found</h1>
      )}
    </>
  );
};

export default Seat;
