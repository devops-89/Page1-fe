import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, Tab, Tabs, Typography } from "@mui/material";
import { roboto } from "@/utils/fonts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LuggageIcon from "@mui/icons-material/Luggage";
import { COLORS } from "@/utils/colors";
import BaggageCard from "@/components/flight/baggageCard";
import {
  removeBaggageDetails,
  setBaggageDetails,
} from "@/redux/reducers/roundDomesticBaggagesInformation";

export default function DomesticBaggageSelection({
  baggageData,
  passengerId,
  passengerType,
}) {
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  // Create a unique passenger key
  const uniquePassengerKey = `${passengerType}-${passengerId}`;

  // Get selected baggage items from the store
  const selectedBaggages = useSelector(
    (state) => state.Flight.RoundDomesticBaggagesInformation || []
  );

  // console.log('selectedPassengerBaggages------------',selectedBaggages);

  // Handle baggage click (select or remove)
  const handleBaggageClick = (baggage, flightNumber, tabIndex) => {
    // console.log("my data --------------",baggage, flightNumber,tabIndex)
    const passengerBaggages =
      selectedBaggages?.[
        tabIndex == 0 ? "outgoingBaggage" : "incomingBaggage"
      ]?.[uniquePassengerKey] || [];
    // console.log("passengerBaggages--------",passengerBaggages)
    const existingBaggage = passengerBaggages?.baggages?.find(
      (b) => b.flightId === flightNumber
    );
    // console.log('---------existingBaggage',existingBaggage)

    if (existingBaggage?.baggage.Code === baggage.Code) {
      // Deselect the baggage if it's already selected
      dispatch(
        removeBaggageDetails({
          passengerType,
          passengerId,
          baggageId: flightNumber,
          baggageCode: baggage.Code,
          tabIndex: tabIndex,
        })
      );
    } else {
      // Ensure only one baggage is selected per flight
      if (existingBaggage) {
        dispatch(
          removeBaggageDetails({
            passengerType,
            passengerId,
            baggageId: flightNumber,
            baggageCode: existingBaggage.baggage.Code,
            tabIndex: tabIndex,
          })
        );
      }

      dispatch(
        setBaggageDetails({
          passengerType,
          passengerId,
          baggageId: flightNumber,
          selected: baggage,
          tabIndex: tabIndex,
        })
      );
    }
  };

  // console.log("baggageData-----------------", baggageData);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
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
            fontFamily:roboto.style,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LuggageIcon sx={{ color: COLORS.PRIMARY, marginRight: "10px" }} />{" "}
          Baggage
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, overflowY: "auto", maxHeight: "240px",fontFamily:roboto.style }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            color: COLORS.PRIMARY,
            "& .MuiTabs-indicator": {
              backgroundColor: COLORS.PRIMARY,
            },
            "& .MuiTab-root": {
              color: COLORS.BLACK,
            },
            "& .Mui-selected": {
              color: COLORS.PRIMARY,
            },
            fontFamily:roboto.style
          }}
        >
          <Tab label="Outgoing" />
          <Tab label="Return" />
        </Tabs>

        {/* Tab Content */}
        {tabIndex === 0 && (
          <>
            {baggageData?.[0][0]?.Origin && (
              <Typography
                variant="body1"
                sx={{
                 fontFamily:roboto.style,
                  fontWeight: 800,
                  mb: "20px",
                  p: "10px",
                  backgroundColor: COLORS.SEMIGREY,
                }}
              >
                {`${baggageData?.[0][0]?.Origin} - ${baggageData?.[0][0]?.Destination}`}
              </Typography>
            )}

            <Grid2 container spacing={2} sx={{ flexWrap: "wrap", mb: "10px" }}>
              {baggageData?.[0][0]?.FlightNumber ? (
                baggageData?.[0]?.map((baggage, baggageIndex) => {
                  return (
                    (baggage?.Price!=0)?(  <Grid2 size={{ lg: 6, xs: 12 }} key={baggageIndex}>
                      <BaggageCard
                        baggage={baggage}
                        handleBaggageValue={(baggage) => {
                          // console.log("baggage: ",baggage,baggage?.FlightNumber,tabIndex);
                          handleBaggageClick(
                            baggage,
                            baggage?.FlightNumber,
                            tabIndex
                          );
                        }}
                        isSelected={selectedBaggages?.outgoingBaggage?.[
                          uniquePassengerKey
                        ]?.baggages?.some(
                          (b) =>
                            b.flightId === baggage?.FlightNumber &&
                            b.baggage.Code === baggage?.Code
                        )}
                      />
                    </Grid2>):(null)
                  
                  );
                })
              ) : (
                <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", fontFamily:roboto.style }}
                  >
                    No Baggage Available
                  </Typography>
                </Grid2>
              )}
            </Grid2>
          </>
        )}
        {tabIndex === 1 && (
          <>
            {baggageData?.[1][0]?.Origin && (
              <Typography
                variant="body1"
                sx={{
                  fontFamily:roboto.style,
                  fontWeight: 800,
                  mb: "20px",
                  p: "10px",
                  backgroundColor: COLORS.SEMIGREY,
                }}
              >
                {`${baggageData?.[1][0]?.Origin} - ${baggageData?.[1][0]?.Destination}`}
              </Typography>
            )}
            <Grid2 container spacing={2} sx={{ flexWrap: "wrap", mb: "10px" }}>
              {baggageData?.[1][0]?.FlightNumber ? (
                baggageData?.[1]?.map((baggage, baggageIndex) => {
                  return (
                    (baggage?.Price!=0)?(
                       <Grid2 size={{ lg: 6, xs: 12 }} key={baggageIndex}>
                      <BaggageCard
                        baggage={baggage}
                        handleBaggageValue={(baggage) => {
                          // console.log("Baggage Details: ",baggage);
                          handleBaggageClick(
                            baggage,
                            baggage?.FlightNumber,
                            tabIndex
                          );
                        }}
                        isSelected={selectedBaggages?.incomingBaggage?.[
                          uniquePassengerKey
                        ]?.baggages?.some(
                          (b) =>
                            b.flightId === baggage?.FlightNumber &&
                            b.baggage.Code === baggage?.Code
                        )}
                      />
                    </Grid2>
                    ):(null)
                   
                  );
                })
              ) : (
                <Grid2 size={{ xs: 12 }} sx={{ py: "20px" }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", fontFamily:roboto.style }}
                  >
                    No Baggage Available
                  </Typography>
                </Grid2>
              )}
            </Grid2>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
