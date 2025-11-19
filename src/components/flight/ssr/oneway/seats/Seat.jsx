import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSeatDetails,
  removeSeatDetails,
  resetSeatDetails,
} from "@/redux/reducers/seatsInformation.js";
import { COLORS } from "@/utils/colors.js";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactLoading from "react-loading";
import { nunito } from "@/utils/fonts";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";

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
  1: "Window",
  2: "Aisle",
  3: "Middle",
};

// Seat component
export default function Seat({ extraDetails, planeIndex }) {
  const dispatch = useDispatch();

  // specialFareForSeat -> when true seat selection is mandatory for all non-infant passengers
  const specialFareForSeat = useSelector(
    (state) =>
      state.Flight?.FlightValidation?.rules?.specialFare?.isSeatMandatory
  );
  const radioEnabled = Boolean(specialFareForSeat);

  // selected seats for this airplane from redux
  const reservedSeats =
    useSelector((state) => {
      const airplane = state.Flight.SeatsInformation?.seats?.find(
        (ap) => ap.id === planeIndex
      );
      return airplane?.selectedSeats || [];
    }) || [];

  const [maxPassengerCount, setMaxPassengerCount] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      try {
        const passengerData = JSON.parse(storedState);
        setMaxPassengerCount(passengerData);
      } catch (e) {
        console.warn("failed parsing passenger count from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!extraDetails?.RowSeats) {
      setColumns([]);
      return;
    }
    let maxColumns = 0;
    extraDetails.RowSeats.forEach((row) => {
      maxColumns = Math.max(maxColumns, row.Seats.length);
    });
    const columnLetters = [];
    for (let i = 0; i < maxColumns; i++)
      columnLetters.push(String.fromCharCode(65 + i));
    setColumns(columnLetters);
  }, [extraDetails]);

  // compute allowed seats (adult + child), excluding infants
  const totalAllowedSeats = useMemo(() => {
    if (!maxPassengerCount) return 0;
    const adults = parseInt(maxPassengerCount?.adult || 0, 10);
    const children = parseInt(maxPassengerCount?.child || 0, 10);
    return Math.max(0, adults + children);
  }, [maxPassengerCount]);

  // helper: get numeric price
  const getSeatPrice = (s) => {
    const n = Number(s?.Price);
    return Number.isFinite(n) ? n : null;
  };

  // all available seats flattened and sorted ascending by price (nulls last)
  const availableSeatsSorted = useMemo(() => {
    if (!extraDetails?.RowSeats) return [];
    const all = extraDetails.RowSeats.flatMap((r) => r.Seats || []);
    const available = all.filter((s) => s?.AvailablityType === 1);
    return available.slice().sort((a, b) => {
      const pa = getSeatPrice(a);
      const pb = getSeatPrice(b);
      if (pa === null && pb === null) return 0;
      if (pa === null) return 1;
      if (pb === null) return -1;
      return pa - pb;
    });
  }, [extraDetails]);

  // Auto-fill logic when radioEnabled (mandatory) — ensure exactly totalAllowedSeats selected
  useEffect(() => {
    if (!radioEnabled) return;
    if (!totalAllowedSeats || totalAllowedSeats === 0) return;

    // If already enough seats selected -> if more than allowed, remove extras; if less, auto-fill remaining
    if (reservedSeats.length > totalAllowedSeats) {
      // remove extras (remove last ones beyond allowed)
      const extras = reservedSeats.slice(totalAllowedSeats);
      extras.forEach((s) => {
        if (s?.Code)
          dispatch(
            removeSeatDetails({ airplaneId: planeIndex, seatCode: s.Code })
          );
      });
      return;
    }

    if (reservedSeats.length === totalAllowedSeats) return; // already satisfied

    // choose seats to fill (prefer price 0 then ascending)
    const needed = totalAllowedSeats - reservedSeats.length;
    const selectedCodes = new Set(reservedSeats.map((s) => s.Code));

    // Prefer price 0 seats first
    const zeros = availableSeatsSorted.filter(
      (s) => Number(getSeatPrice(s)) === 0 && !selectedCodes.has(s.Code)
    );
    const other = availableSeatsSorted.filter(
      (s) => Number(getSeatPrice(s)) !== 0 && !selectedCodes.has(s.Code)
    );

    const toAutoSelect = [...zeros, ...other].slice(0, needed);
    toAutoSelect.forEach((s) =>
      dispatch(setSeatDetails({ airplaneId: planeIndex, selected: s }))
    );
  }, [
    radioEnabled,
    totalAllowedSeats,
    reservedSeats,
    availableSeatsSorted,
    dispatch,
    planeIndex,
  ]);

  // When radioEnabled is false and user could skip, we still must enforce max count on manual selections only

  const handleSeatClick = (seat) => {
    if (!seat || seat?.AvailablityType !== 1) return; // only available seats clickable

    if (!maxPassengerCount) {
      dispatch(
        setToast({
          open: true,
          message: "Passenger count not loaded. Please refresh.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      return;
    }

    const isSeatAlreadyReserved = reservedSeats.some(
      (s) => s.Code === seat.Code
    );

    if (!radioEnabled) {
      // optional mode: allow toggle until limit
      const currentSelectedSeatsCount = reservedSeats.length;
      if (isSeatAlreadyReserved) {
        // deselect
        dispatch(
          removeSeatDetails({ airplaneId: planeIndex, seatCode: seat.Code })
        );
        return;
      }
      if (currentSelectedSeatsCount >= totalAllowedSeats) {
        dispatch(
          setToast({
            open: true,
            message: `You can select only seats for ${maxPassengerCount?.adult} adult and ${maxPassengerCount?.child} child`,
            severity: TOAST_STATUS.ERROR,
          })
        );
        return;
      }
      dispatch(setSeatDetails({ airplaneId: planeIndex, selected: seat }));
      return;
    }

    // radioEnabled (mandatory) mode: we must end up with exactly totalAllowedSeats seats
    // If seat already selected -> do nothing
    if (isSeatAlreadyReserved) return;

    const currentSelectedSeatsCount = reservedSeats.length;
    if (currentSelectedSeatsCount < totalAllowedSeats) {
      // we still have room -> just add
      dispatch(setSeatDetails({ airplaneId: planeIndex, selected: seat }));
      return;
    }

    // If full and user clicks a different seat -> replace the *oldest* selected seat (simple swap behavior)
    // This keeps count equal to totalAllowedSeats and allows user to change seats.
    const seatToRemove = reservedSeats[0];
    if (seatToRemove?.Code) {
      dispatch(
        removeSeatDetails({
          airplaneId: planeIndex,
          seatCode: seatToRemove.Code,
        })
      );
    }
    dispatch(setSeatDetails({ airplaneId: planeIndex, selected: seat }));
    // dispatch(
    //   setToast({
    //     open: true,
    //     message: `Replaced ${seatToRemove?.Code} with ${seat.Code}`,
    //     severity: TOAST_STATUS.INFO,
    //   })
    // );
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 1.5 }}>
        {columns.map((column, index) => (
          <Box
            key={index}
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              padding: "2px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">{column}</Typography>
          </Box>
        ))}
      </Box>

      {extraDetails ? (
        <Stack direction="column" spacing={2} p={2}>
          {extraDetails?.RowSeats?.map((seats, rowIndex) => (
            <Stack key={rowIndex} direction="row" spacing={1.5}>
              {seats.Seats.map(
                (seat) =>
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
                              {SEAT_TYPE[seat?.SeatType]} |{" "}
                              {AvailablityStatus[seat.AvailablityType]}
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
                      <Box
                        sx={{
                          boxShadow: "0px 0px 2px #727272",
                          paddingX: "2px",
                          borderRadius: 1,
                          pointerEvents: [3, 4, 0].includes(
                            seat.AvailablityType
                          )
                            ? "none"
                            : "auto",
                        }}
                      >
                        <AirlineSeatReclineExtraIcon
                          sx={{
                            fontSize: "30px",
                            color: reservedSeats.some(
                              (s) => s.Code === seat.Code
                            )
                              ? "green"
                              : SeatColors[seat.AvailablityType],
                            cursor: "pointer",
                            transition: "box-shadow 0.3s ease-in-out",
                          }}
                          onClick={() => handleSeatClick(seat)}
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
              )}
            </Stack>
          ))}
        </Stack>
      ) : (
        <ReactLoading
          type="spin"
          color={COLORS.PRIMARY}
          height={50}
          width={50}
        />
      )}

      {/* optional: show summary of selected seats and count */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Selected seats:{" "}
          {reservedSeats.map((s) => s.Code).join(", ") || "None"}
        </Typography>
        <Typography variant="body2">
          Required seats (adult+child): {totalAllowedSeats}
        </Typography>
        <Typography variant="body2">
          Mandatory selection: {radioEnabled ? "Yes" : "No"}
        </Typography>
      </Box>
    </Box>
  );
}

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
