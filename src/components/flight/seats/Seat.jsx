import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSeatDetails } from "@/redux/reducers/seatsInformation.js";
import { COLORS } from "@/utils/colors.js";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactLoading, { spin } from "react-loading";
import { nunito } from "@/utils/fonts";

const SeatColors = {
  0: "red", // Not set
  1: "white", // open
  3: "orange", // Reserved
  4: "red", // Blocked
};

const AvailablityStatus = {
  0: "Not Set",
  1: "Available",
  3: "Reserved",
  4: "Blocked",
  5: "Empty Space",
};

const Seat = ({extraDetails}) => {
  const [reservedSeats, setReservedSeats] = useState([]);
  const dispatch = useDispatch();
  let value = useSelector((state) => state.SeatsInformation.seats);
  console.log("test", value);
  3;
  useEffect(() => {
    setReservedSeats(value);
    console.log("redux values: ", value);
  }, [value]);


  return (
    <Box sx={{ backgroundColor: COLORS.WHITE, minWidth: "300px" }}>
      {extraDetails ? (
        <Stack direction="column" spacing={2} p={2}>
          {extraDetails?.SeatDynamic[0]?.SegmentSeat[0]?.RowSeats?.map(
            (seats, rowIndex) => (
              <Stack key={rowIndex} direction="row" spacing={2}>
                {seats.Seats.map(
                  (seat, colIndex) =>
                    seat.AvailablityType !== 5 &&
                    seat.AvailablityType !== 0 && (
                      <HtmlTooltip
                        key={seat.Code}
                        title={
                          <Stack direction="column" gap={'3px'}>
                            <Stack direction="row" gap={1}>
                              <Typography
                                color="inherit"
                                sx={{ fontWeight: "bold", fontFamily:nunito.style }}
                              >
                                {seat.Code}
                              </Typography>
                             
                              <Typography color="inherit">
                              Status:{" "}
                              {AvailablityStatus[seat.AvailablityType]}
                            </Typography>
                            </Stack>

                            <Typography
                                color="inherit"
                                sx={{ fontWeight: "bold", fontFamily:nunito.style }}
                              >
                                Price: {seat?.Price} {" "} {seat?.Currency}
                              </Typography>
                          </Stack>
                        }
                        disableInteractive
                      >
                        <span>
                          <Button
                            disabled={[3, 4, 0].includes(seat.AvailablityType)}
                            sx={{
                              border: "2px solid rgb(22, 129, 216)",
                              borderRadius: "4px",
                              width: "30px",
                              height: "30px",
                              minWidth: "20px",
                              backgroundColor: reservedSeats.some(
                                (s) => s.Code === seat.Code
                              )
                                ? "green"
                                : SeatColors[seat.AvailablityType],
                              cursor: "pointer",
                              transition: "box-shadow 0.3s ease-in-out",
                              "&:hover": {
                                border: "2px solid rgb(5, 76, 153)",
                              },
                            }}
                            onClick={() => {
                              dispatch(setSeatDetails(seat));
                            }}
                          >
                            {seat.AvailablityType === 4 ? (
                              <CancelIcon sx={{ color: "white" }} />
                            ) : (
                              ""
                            )}
                            {seat.AvailablityType === 3 ? (
                              <PersonOutlineIcon sx={{ color: "white" }} />
                            ) : (
                              ""
                            )}
                          </Button>
                        </span>
                      </HtmlTooltip>
                    )
                )}
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
