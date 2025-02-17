import React,{ useState, useEffect } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSeatDetails } from "@/redux/reducers/seatsInformation.js";
import {COLORS} from "@/utils/colors.js";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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
    <Box sx={{backgroundColor:COLORS.WHITE}}>
      {extraDetails ? (
        <Stack direction="column" spacing={2} p={2}>
          {/* Loop through rows first */}
          {extraDetails?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats.map((seats, rowIndex) => (
            <Stack key={rowIndex} direction="row" spacing={2} >
              {/* Loop through seats within the row */}
              {seats.Seats.map((seat, colIndex) => (
                 <HtmlTooltip
                 title={
                   <React.Fragment>
                    <Stack direction={"row"}>
                     <Typography color="inherit" sx={{fontWeight:"bold"}}>{seat.Code}</Typography>
                     <Typography color="inherit"  sx={{fontWeight:"bold"}}>|</Typography>
                     <Typography color="inherit">{seat.Price}</Typography>
                     </Stack>
                   </React.Fragment>
                 }
                 
               >
                 <Button
                  key={seat.Code}
                 title={seat.Price}
                 disabled={(seat.Code==="NoSeat")?true:false}
                 
                  sx={{
                    border: "2px solid rgb(22, 129, 216)",
                    borderRadius: "4px",
                    width: "30px",
                    height: "30px",
                    minWidth: "20px",
                    
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
                    {/* {seat.Code} */}
                  </Typography>
                </Button>
                </HtmlTooltip>
              ))}
            </Stack>
          ))}
        </Stack>
      ) : (
        <h1>Extra Details Not Found</h1>
      )}
    </Box>
  );
};

export default Seat;

// Tooltip Component 
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
