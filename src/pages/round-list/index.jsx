import InnerBanner from "@/components/innerBanner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import banner from "@/banner/flight.jpg";
import {
  Box,
  Card,
  Grid2,
  Typography,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Slider,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import FlightForm from "@/components/flight/flightForm";
import Loading from "react-loading";
import { COLORS } from "@/utils/colors";
import RoundFlightListBox from "@/components/flight/roundFlightListBox";
import { nunito } from "@/utils/fonts";
import InternationalRoundFlightBox from "@/components/flight/internationalRoundFlightBox";
import moment from "moment";
import { useRouter } from "next/router";
const FlightList = () => {
  const router = useRouter();
  const [flightList, setFlightList] = useState(null);
  const [traceId, setTraceId] = useState("");
  const [priceRange, setPriceRange] = useState([500, 2000]);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("roundflightData")) {
      setTimeout(() => {
        setFlightList(JSON.parse(localStorage.getItem("roundflightData")));
        setTraceId(
          JSON.parse(localStorage.getItem("roundflightData")).trace_id
        );
      }, 1500);
    }
  }, []);

  // default select
  useEffect(() => {
    if (flightList?.flight_list?.departure_flights?.flightData?.length > 0) {
      setSelectedDeparture(
        flightList.flight_list.departure_flights.flightData[0]
      );
    }
    if (flightList?.flight_list?.arrival_flights?.flightData?.length > 0) {
      setSelectedArrival(flightList.flight_list.arrival_flights.flightData[0]);
    }
  }, [flightList]);


  const handleFlightSelection = (type, flight) => {
    if (type === "departure") {
      setSelectedDeparture(flight);
      console.log(selectedDeparture);
    } else if (type === "arrival") {
      setSelectedArrival(flight);
      // console.log(selectedArrival)
    }
  };

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const newResultIndex = {
    arrival: selectedArrival?.ResultIndex,
    departure: selectedDeparture?.ResultIndex,
  };

  const routetoAnotherPage = () => {
    router.push({
      pathname: `/round-list/${selectedDeparture?.AirlineCode}/view-details`,
      query: {
        ResultIndex: JSON.stringify(newResultIndex),
        traceId: traceId,
        journey: flightList?.type,
      },
    });
  };

  console.log("flightList round Trip", flightList)
  return (
    <>
      <InnerBanner img={banner.src} heading={"Round Flight Trip"} />

      <Box sx={{ pt: 10, px: 4 }}>
        <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
          <Typography sx={{ fontSize: 18 }}> Search Flight</Typography>
          <FlightForm />
        </Card>
      </Box>

      {flightList ? (
        <Box sx={{ pt: 10, pb: 10, px: 4 }}>
          <Grid2 container spacing={4}>
            <Grid2 size={3} sx={{ position: "relative" }}>
              {/* filter card start */}
              <Card
                variant="outlined"
                sx={{ position: "sticky", top: "75px" }}
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                }}
              >
                <CardHeader
                  title="Filters"
                  action={
                    <Button variant="text" color="primary" size="small">
                      Reset
                    </Button>
                  }
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Search by Airline Names
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="search"
                    placeholder="Search by Airline Names"
                    InputProps={{
                      startAdornment: (
                        <SearchIcon style={{ marginRight: "8px" }} />
                      ),
                    }}
                  />

                  {/* Popular Section */}
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="subtitle1">Popular</Typography>
                    {[
                      "Breakfast Included",
                      "Budget",
                      "4 Star Hotels",
                      "5 Star Hotels",
                    ].map((label) => (
                      <FormControlLabel
                        key={label}
                        control={
                          <Checkbox
                            defaultChecked={label === "Breakfast Included"}
                          />
                        }
                        label={label}
                      />
                    ))}
                  </div>

                  {/* Price Range Section */}
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="subtitle1">Price Per Night</Typography>
                    <Slider
                      value={priceRange}
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      min={200}
                      max={5695}
                    />
                    <Typography>
                      Range: ${priceRange[0]} - ${priceRange[1]}
                    </Typography>
                  </div>

                  {/* Airline Names Section */}
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="subtitle1">Airline Names</Typography>
                    {[
                      "American Airlines",
                      "Delta Air Lines",
                      "Emirates",
                      "Air France",
                    ].map((label) => (
                      <FormControlLabel
                        key={label}
                        control={<Checkbox />}
                        label={label}
                      />
                    ))}
                  </div>

                  {/* Reviews Section */}
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="subtitle1">Reviews</Typography>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <FormControlLabel
                        key={stars}
                        control={<Checkbox />}
                        label={
                          <Typography>
                            {[...Array(stars)].map((_, i) => (
                              <StarIcon key={i} style={{ color: "gold" }} />
                            ))}
                          </Typography>
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* filter card end */}
            </Grid2>

            {/* Round Flight List Data Domestic and International  */}
            {flightList?.type === "INTERNATIONAL" ? (
              <Grid2 size={9} container>
                <Grid2 size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.origin} - ${flightList.destination}`}</Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "15px",
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.flight_list.departure_flights.length} flights available`}</Typography>
                  </Box>
                  {flightList?.flight_list?.departure_flights.map((val, i) => (
                    <Grid2 size={12} key={i}>
                      <InternationalRoundFlightBox
                        details={val}
                        traceId={traceId}
                        journey={flightList?.type}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
            ) : (
              <Grid2 size={9} container>
                <Grid2 size={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.origin} - ${flightList.destination}`}</Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "15px",
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.flight_list.departure_flights.flightData.length} flights available`}</Typography>
                  </Box>
                  <Grid2 container spacing={6}>
                    {flightList?.flight_list?.departure_flights?.flightData.map(
                      (val, i) => (
                        <Grid2 size={12} key={i}>
                          <RoundFlightListBox
                            details={val}
                            traceId={traceId}
                            isSelected={
                              selectedDeparture?.ResultIndex === val.ResultIndex
                            }
                            onSelect={() =>
                              handleFlightSelection("departure", val)
                            }
                          />
                        </Grid2>
                      )
                    )}
                  </Grid2>
                </Grid2>
                <Grid2 size={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.destination} - ${flightList.origin}`}</Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "15px",
                        fontFamily: nunito.style,
                        mb: "20px",
                      }}
                    >{`${flightList.flight_list.arrival_flights.flightData.length} flights available`}</Typography>
                  </Box>
                  <Grid2 container spacing={6}>
                    {flightList?.flight_list?.arrival_flights?.flightData.map(
                      (val, i) => (
                        <Grid2 size={12} key={i}>
                          <RoundFlightListBox
                            details={val}
                            traceId={traceId}
                            isSelected={
                              selectedArrival?.ResultIndex === val.ResultIndex
                            }
                            onSelect={() =>
                              handleFlightSelection("arrival", val)
                            }
                          />
                        </Grid2>
                      )
                    )}
                  </Grid2>
                </Grid2>
              </Grid2>
            )}
          </Grid2>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Loading type="bars" width={50} height={50} color={COLORS.PRIMARY} />
        </Box>
      )}

      {/* Footer Flight Detail section  */}
      {flightList?.type === "DOMESTIC" ? (
        <Grid2 container sx={{ position: "fixed", bottom: "0", width: "100%", zIndex:9999 }}>
          <Grid2 size={3}></Grid2>
          <Grid2
            size={9}
            spacing={3}
            container
            sx={{
              px: 4,
              py: 2,
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              backgroundColor: COLORS.SEMIGREY,
              boxShadow: `0px 0px 10px #b2a8a8`,
            }}
          >
            {/* Onward */}
            <Grid2 size={4} sx={{ borderRight: `1px solid` }}>
              <Stack direction={"row"} spacing={1} sx={{ mb: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 1 }}
                >
                  Onwards
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontFamily: nunito.style,
                    fontWeight: 550,
                  }}
                >
                  {`${selectedDeparture?.departure[0]?.Airline?.AirlineName} Airline`}{" "}
                  {`(${selectedDeparture?.AirlineCode} ${selectedDeparture?.departure[0]?.Airline?.FlightNumber})`}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Image
                  src={selectedDeparture?.AirlineLogo}
                  alt="Image"
                  width={30}
                  height={30}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: nunito.style,
                    }}
                  >
                    {moment(
                      selectedDeparture?.departure[0]?.Origin?.DepTime
                    ).format("HH:mm")}{" "}
                    -{" "}
                    {moment(
                      selectedDeparture?.departure[
                        selectedDeparture?.departure.length - 1
                      ].Destination?.ArrTime
                    ).format("HH:mm")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: nunito.style,
                    }}
                  >
                    {selectedDeparture?.departure[0]?.Origin?.Airport?.CityName}{" "}
                    -{" "}
                    {
                      selectedDeparture?.departure[
                        selectedDeparture?.departure.length - 1
                      ].Destination?.Airport?.CityName
                    }
                  </Typography>
                </Box>
              </Stack>
            </Grid2>

            {/* Return  */}
            <Grid2 size={4} sx={{ borderRight: `1px solid` }}>
              <Stack direction={"row"} spacing={1} sx={{ mb: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 1 }}
                >
                  Return
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontFamily: nunito.style,
                    fontWeight: 550,
                  }}
                >
                  {`${selectedArrival?.departure[0]?.Airline?.AirlineName} Airline`}{" "}
                  {`(${selectedArrival?.AirlineCode} ${selectedArrival?.departure[0]?.Airline?.FlightNumber})`}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Image
                  src={selectedArrival?.AirlineLogo}
                  alt="Image"
                  width={30}
                  height={30}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      fontFamily: nunito.style,
                    }}
                  >
                    {moment(
                      selectedArrival?.departure[0]?.Origin?.DepTime
                    ).format("HH:mm")}{" "}
                    -{" "}
                    {moment(
                      selectedArrival?.departure[
                        selectedArrival?.departure.length - 1
                      ].Destination?.ArrTime
                    ).format("HH:mm")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: nunito.style,
                    }}
                  >
                    {selectedArrival?.departure[0]?.Origin?.Airport?.CityName} -{" "}
                    {
                      selectedArrival?.departure[
                        selectedArrival?.departure.length - 1
                      ].Destination?.Airport?.CityName
                    }
                  </Typography>
                </Box>
              </Stack>
            </Grid2>

            <Grid2
              size={4}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{ fontSize: 24, fontWeight: 900, fontFamily: nunito.style }}
              >
                {`${(
                  selectedDeparture?.TotalFare + selectedArrival?.TotalFare
                ).toFixed(2)}`}{" "}
                ₹
              </Typography>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.BLACK,
                  fontWeight: 550,
                  fontSize: 16,
                  fontFamily: nunito.style,
                }}
                onClick={routetoAnotherPage}
              >
                Book Now
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      ) : (
        ""
      )}
    </>
  );
};

export default FlightList;
