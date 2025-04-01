import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";
import BaggageCard from "../../baggageCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LuggageIcon from '@mui/icons-material/Luggage';
import { COLORS } from "@/utils/colors";
import { removeBaggageDetails, setBaggageDetails } from "@/redux/reducers/baggagesInformation";

export default function BaggageSelection({ baggageData, passengerId, passengerType }) {
  const dispatch = useDispatch();

  // Create a unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  // Get selected baggage items from the store
  const selectedBaggages = useSelector((state) => state.BaggagesInformation.baggages || {});

  // Safe check to ensure that the selectedBaggages[uniquePassengerKey] is not undefined
  const selectedPassengerBaggages = selectedBaggages[uniquePassengerKey] || { baggages: [] };

    console.log('selectedPassengerBaggages------------',selectedPassengerBaggages)


  // Handle baggage click (select or remove)
  const handleBaggageClick = (baggage, flightNumber) => {
    console.log('baggage-----------', baggage, flightNumber);
    const passengerBaggages = selectedPassengerBaggages.baggages;
    const existingBaggage = passengerBaggages.find((b) => b.flightId === flightNumber);

    if (existingBaggage?.baggage.Code === baggage.Code) {
      // Deselect the baggage if it's already selected
      console.log('--------select-------')
      dispatch(removeBaggageDetails({ passengerType, passengerId, flightId: flightNumber, baggageCode: baggage.Code }));
    } else {
      // Ensure only one baggage is selected per flight
      if (existingBaggage) {
        console.log('existingBaggage-----------', passengerId, flightNumber, existingBaggage)
        dispatch(removeBaggageDetails({ passengerType, passengerId, flightId: flightNumber, baggageCode: existingBaggage.baggage.Code }));
      }
      dispatch(setBaggageDetails({ passengerType, passengerId, flightId: flightNumber, selected: baggage }));
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
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LuggageIcon sx={{ color: COLORS.PRIMARY, marginRight: '10px' }} /> Baggage
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px" }}>
        {baggageData?.map((singleBaggage, baggageIndex) => {
          return (
            <Grid2
              container
              spacing={2}
              sx={{ flexWrap: "wrap", mb: '10px' }}
              key={baggageIndex}
            >
              {singleBaggage?.map((baggage, baggageIndex) => {
                return (
                  <Grid2 size={{ lg: 6, xs: 12 }} key={baggageIndex}>
                    <BaggageCard
                      baggage={baggage}
                      handleBaggageValue={() => handleBaggageClick(baggage, baggage?.FlightNumber)}
                      isSelected={selectedPassengerBaggages.baggages?.some(
                        (b) => b.flightId === baggage.FlightNumber && b.baggage.Code === baggage.Code
                      )}
                    />
                  </Grid2>
                );
              })}
            </Grid2>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
