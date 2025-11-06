import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";
import BaggageCard from "../../baggageCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LuggageIcon from "@mui/icons-material/Luggage";
import { COLORS } from "@/utils/colors";
import {
  removeBaggageDetails,
  setBaggageDetails,
} from "@/redux/reducers/baggagesInformation";

export default function BaggageSelection({
  baggageData,
  passengerId,
  passengerType,
  isLCC,
  isInternationalJourney,
}) {
  // console.log("baggageData-----------", baggageData);
  const dispatch = useDispatch();
  const radioEnabled = Boolean(isLCC) && Boolean(isInternationalJourney);
  // Create a unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  // Get selected baggage items from the store
  const selectedBaggages = useSelector(
    (state) => state.Flight.BaggagesInformation.baggages || {}
  );

  // Safe check to ensure that the selectedBaggages[uniquePassengerKey] is not undefined
  const selectedPassengerBaggages = selectedBaggages[uniquePassengerKey] || {
    selectedBaggages: [],
  };
  const selectedByFlightId = useMemo(() => {
    const map = new Map();
    (selectedPassengerBaggages.selectedBaggages || []).forEach((b) => {
      const code = b.selectedBaggage?.Code ?? b.selected?.Code;
      const fid = b.flightId ?? b.baggageId ?? b.flightNumber; // <-- fallback
      if (fid != null && code) map.set(String(fid), code);
    });
    return map;
  }, [selectedPassengerBaggages]);

  // Auto-select FIRST (cheapest) ONLY in radio mode
  useEffect(() => {
    if (!radioEnabled) return;
    if (!Array.isArray(baggageData)) return;

    baggageData.forEach((singleBaggage) => {
      if (!Array.isArray(singleBaggage) || singleBaggage.length === 0) return;
      const flightNumber = singleBaggage[0]?.FlightNumber;
      if (!flightNumber) return;

      const alreadySelectedCode = selectedByFlightId.get(String(flightNumber));
      if (alreadySelectedCode) return;

      const freeBaggage = singleBaggage.find((b) => Number(b.Price) === 0);

      const sorted = [...singleBaggage].sort(
        (a, b) => Number(a.Price) - Number(b.Price)
      );
      const first = freeBaggage && sorted[0];

      if (first) {
        dispatch(
          setBaggageDetails({
            passengerType,
            passengerId,
            baggageId: flightNumber,
            selected: first,
          })
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    baggageData,
    passengerId,
    passengerType,
    radioEnabled,
    selectedByFlightId,
  ]);
  // console.log('selectedPassengerBaggages------------',selectedPassengerBaggages)

  // Handle baggage click (select or remove)
  const handleBaggageClick = (baggage, flightNumber) => {
    console.log("kedf", flightNumber);
    const currentCode = selectedByFlightId.get(String(flightNumber));

    if (radioEnabled) {
      // Radio mode — only replace, never remove
      if (currentCode === baggage.Code) return;
      dispatch(
        setBaggageDetails({
          passengerType,
          passengerId,
          baggageId: flightNumber,
          selected: baggage,
        })
      );
      return;
    }

    // Non-radio mode (toggle/remove logic)
    const passengerBaggages = selectedPassengerBaggages.selectedBaggages || [];

    // ✅ Safely find any existing baggage for this flight
    const existingBaggage = passengerBaggages.find(
      (b) => String(b.flightId) === String(flightNumber)
    );

    const existingCode =
      existingBaggage?.selectedBaggage?.Code || existingBaggage?.selected?.Code;

    // ✅ Handle toggle safely
    if (existingCode === baggage.Code) {
      // deselect
      dispatch(
        removeBaggageDetails({
          passengerType,
          passengerId,
          baggageId: flightNumber,
          baggageCode: existingCode,
        })
      );
    } else {
      // Replace selection (one per flight)
      if (existingBaggage && existingCode) {
        dispatch(
          removeBaggageDetails({
            passengerType,
            passengerId,
            baggageId: flightNumber,
            baggageCode: existingCode,
          })
        );
      }

      dispatch(
        setBaggageDetails({
          passengerType,
          passengerId,
          baggageId: flightNumber,
          selected: baggage,
        })
      );
    }
  };

  return (
    <Accordion sx={{ mb: "10px" }}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: COLORS.SEMIGREY }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: nunito.style,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LuggageIcon sx={{ color: COLORS.PRIMARY, marginRight: "10px" }} />{" "}
          Baggage
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px" }}>
        {baggageData?.map((singleBaggage, baggageIndex) => {
          const flightNumber = singleBaggage?.[0]?.FlightNumber;
          const sortedBaggage = [...singleBaggage].sort(
            (a, b) => Number(a.Price) - Number(b.Price)
          );
          return (
            <>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: nunito.style,
                  fontWeight: 800,
                  mb: "20px",
                  p: "10px",
                  backgroundColor: COLORS.SEMIGREY,
                }}
              >
                {`${singleBaggage[0]?.Origin} - ${singleBaggage[0]?.Destination}`}
              </Typography>
              <Grid2
                container
                spacing={2}
                sx={{ flexWrap: "wrap", mb: "10px" }}
                key={baggageIndex}
              >
                {singleBaggage[0]?.FlightNumber ? (
                  sortedBaggage?.map((baggage, baggageIndex) => {
                    return (
                      <Grid2 size={{ lg: 6, xs: 12 }} key={baggageIndex}>
                        <BaggageCard
                          baggage={baggage}
                          handleBaggageValue={() =>
                            handleBaggageClick(baggage, baggage?.FlightNumber)
                          }
                          isSelected={
                            selectedByFlightId.get(String(flightNumber)) ===
                            baggage.Code
                          }
                          radioMode={radioEnabled}
                        />
                      </Grid2>
                    );
                  })
                ) : (
                  <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                    <Typography
                      variant="body1"
                      sx={{ textAlign: "center", fontFamily: nunito.style }}
                    >
                      No Baggage Available
                    </Typography>
                  </Grid2>
                )}
              </Grid2>
            </>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
