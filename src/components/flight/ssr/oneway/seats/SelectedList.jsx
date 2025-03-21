import React, { useEffect } from "react";
import { Typography, Box, Stack } from "@mui/material";
// import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { RiCloseCircleFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { removeSeatDetails } from "@/redux/reducers/seatsInformation";
import {COLORS} from "@/utils/colors.js";
import { nunito } from "@/utils/fonts";

const SelectedList = () => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector(
    (state) => state.SeatsInformation?.seats || []
  );

  useEffect(() => {
    // console.log("seats from reducer: ", selectedSeats);
  }, [selectedSeats]);

  function handleSeatRemove(seat) {
    dispatch(removeSeatDetails(seat));
  }

  return (
    <Stack
      direction={"row"}
      sx={{
        mt: 2,
        backgroundColor: "#E8F2FF",
        justifyContent: "center",
        gap:"20px",
        width:'100%',
        flexWrap:"wrap",
        borderRadius: "4px",
        alignItems: "center",
        border: "1px solid grey",
        my: 1,
        px: 1,
        py: 1,
      }}
    >
      {!selectedSeats || selectedSeats.length === 0 ? (
        // Show message when selectedSeats is undefined, null, or empty
        <Typography variant="h6" sx={{ color: "gray", fontFamily:nunito.style }}>
          There is no seat selected
        </Typography>
      ) : (
        selectedSeats.map((seat) => (
         
            <Box
              key={seat.Code || `${seat.row}-${seat.col}`}
              sx={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                borderRadius: "4px",
                background: COLORS.SECONDARY,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                position: "relative",
                fontFamily:nunito.style
              }}
            >
              {seat.Code || `${seat.row}${seat.col}`}
              <Box
                onClick={() => handleSeatRemove(seat)}
                sx={{
                  cursor: "pointer",
                  width: "5px",
                  position: "absolute",
                  top: "-5px",
                  right: "8px",
                  color:"black"
                }}
              >
                <RiCloseCircleFill style={{fontSize:"20px",color:"white"}} />
              </Box>
            </Box>
         
        ))
      )}
    </Stack>
  );
};

export default SelectedList;
