import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSeatDetails } from "@/redux/reducers/roundInternationalSeatsInformation";
import { COLORS } from "@/utils/colors.js";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactLoading from "react-loading";
import { nunito } from "@/utils/fonts";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

// Define SeatColors and AvailablityStatus as constants outside the component for better organization
const SeatColors = {
  0: "gray",
  1: "#0096FF",
  3: "orange",
  4: "red",
};

const AvailablityStatus = {
  0: "Not Set",
  1: "Available",
  3: "Reserved",
  4: "Blocked",
  5: "Empty Space",
};

const SEAT_TYPE = {
  1 : 'Window',
  2 : 'Aisle',
  3 : 'Middle'
}

const Seat = ({ extraDetails,planeIndex,tabIndex }) => {

  
  // Use useSelector to directly access seats from Redux state
  const reservedSeats = useSelector((state) => {
    // console.log("hello",state.Flight.RoundInternationalSeatsInformation?.outgoingSeats)
    // const airplane = state.SeatsInformation?.seats?.find((ap) => ap.id === planeIndex);
    if(tabIndex===0)
    {
       const airplane = state.Flight.RoundInternationalSeatsInformation?.outgoingSeats?.find((ap) => ap.id === planeIndex);
        // Return selectedSeats if the airplane exists, otherwise return an empty array
    return airplane?.selectedSeats || [];
    }
    else{
      const airplane = state.Flight.RoundInternationalSeatsInformation?.incomingSeats?.find((ap) => ap.id === planeIndex);
      // Return selectedSeats if the airplane exists, otherwise return an empty array
  return airplane?.selectedSeats || [];
    } 
  });

  
  
 
  const dispatch = useDispatch();
  const [maxPassengerCount, setMaxPassengerCount] = useState(null);
  const [columns, setColumns] = useState([]); 

  useEffect(() => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      const passengerData = JSON.parse(storedState);
      setMaxPassengerCount(passengerData);
    }
  }, []); // Fetch passenger count from localStorage only once on component mount

  useEffect(() => {
    // Dynamically determine columns based on seat data
    if (!extraDetails?.RowSeats) {
      setColumns([]); // Set empty array if seat data is not available yet
      return;
    }

    let maxColumns = 0;
    extraDetails?.RowSeats.forEach(row => {
      maxColumns = Math.max(maxColumns, row.Seats.length);
    });

    const columnLetters = [];
    for (let i = 0; i < maxColumns; i++) {
      columnLetters.push(String.fromCharCode(65 + i)); 
    }
    setColumns(columnLetters);
  }, [extraDetails]); 


  // No need for a useEffect to update reservedSeats based on Redux state 'value'
  // reservedSeats is now directly derived from Redux using useSelector

  const handleSeatClick = (seat) => {
    if (!maxPassengerCount) {
      dispatch(
        setToast({
          open: true,
          message: "Passenger count not loaded. Please refresh.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      return; // Exit if passenger count is not loaded
    }

    const totalAllowedSeats =
      parseInt(maxPassengerCount?.adult || 0) +
      parseInt(maxPassengerCount?.child || 0);
    const currentSelectedSeatsCount = reservedSeats.length;                                                                                                     
    const isSeatAlreadyReserved = reservedSeats.some((s) => s.Code === seat.Code);

    // console.log("reservedSeats:",reservedSeats);

    if (
      currentSelectedSeatsCount >= totalAllowedSeats &&
      !isSeatAlreadyReserved
    ) {
      dispatch(
        setToast({
          open: true,
          message: `You can select only seat for ${maxPassengerCount?.adult} adult and ${maxPassengerCount?.child} child`,
          severity: TOAST_STATUS.ERROR,
        })
      );
      return; // Prevent selecting more seats than allowed
    }
  
    dispatch(
      setSeatDetails({
        airplaneId: planeIndex,
        selected: seat,
        journeyType: tabIndex === 0 ? "outgoing" : "incoming", 
      })
    );
   
  };



  
  return (
    <Box sx={{ backgroundColor: COLORS.WHITE, width:"100%", display:'flex', flexDirection:'column', alignItems:'center', py:2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3, gap:1.5 }}>
        {columns.map((column, index) => (
          <Box sx={{
            width: "30px",
            height: "30px",
            backgroundColor:COLORS.SECONDARY,
            color:COLORS.WHITE,
            padding:'2px',
            textAlign:'center'}}>
          <Typography key={index} variant="h6">
            {column}
          </Typography>
          </Box>
        ))}
      </Box>
      {extraDetails ? (
        <Stack direction="column" spacing={2} p={2}>
          {extraDetails?.RowSeats?.map(
            (seats, rowIndex) => (
              <Stack key={rowIndex} direction="row" spacing={1.5}>
                {seats.Seats.map((seat, colIndex) => {
                  return (
                    seat.AvailablityType !== 5 && (
                      <HtmlTooltip
                        key={seat.Code}
                        title={
                          <Stack direction="column" gap={"3px"}>
                            <Stack direction="row" gap={1}>
                              <Typography
                                color="inherit"
                                sx={{
                                  fontWeight: "bold",
                                  fontFamily: nunito.style,
                                }}
                              >
                                {seat.Code} | 
                              </Typography>

                              <Typography color="inherit">
                              {SEAT_TYPE[seat?.SeatType]} | {AvailablityStatus[seat.AvailablityType]}
                              </Typography>
                            </Stack>

                            <Typography
                              color="inherit"
                              sx={{
                                fontWeight: "bold",
                                fontFamily: nunito.style,
                              }}
                            >
                              Price: {seat?.Price} {seat?.Currency}
                            </Typography>
                          </Stack>
                        }
                        disableInteractive
                      >
                        <Box sx={{boxShadow: '0px 0px 2px #727272', paddingX:'2px', borderRadius:1,pointerEvents:  [3, 4, 0].includes(seat.AvailablityType) ? 'none' : 'auto'}}>
                          <AirlineSeatReclineExtraIcon
                            sx={{   
                              fontSize:'30px',                 
                              color: reservedSeats.some(
                                (s) => s.Code === seat.Code
                              )
                                ? "green"
                                : SeatColors[seat.AvailablityType], // Directly use SeatColors
                              cursor: "pointer",
                              transition: "box-shadow 0.3s ease-in-out",
                              // "&:hover": {
                              //   border: "2px solid rgb(5, 76, 153)",
                              // },
                            }}
                            onClick={() => handleSeatClick(seat)} // Use handleSeatClick function
                          >
                            {seat.AvailablityType === 4 ? (
                              <CancelIcon sx={{ color: "white" }} />
                            ) : seat.AvailablityType === 3 ? (
                              <PersonOutlineIcon sx={{ color: "white" }} />
                            ) : (
                              ""
                            )}
                          </AirlineSeatReclineExtraIcon>
                        </Box>
                      </HtmlTooltip>
                    )
                  );
                })}
              </Stack>
            )
          )}
        </Stack>
      ) : (
        <ReactLoading
          type="spin"
          color={COLORS.PRIMARY}
          height={50}
          width={50}
        />
      )}
    </Box>
  );
};

export default Seat;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));