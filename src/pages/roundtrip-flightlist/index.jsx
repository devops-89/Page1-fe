import InnerBanner from "@/components/innerBanner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import banner from "@/banner/flight.jpg";
import {
  Box,
  Drawer,
  Card,
  Grid2,
  Typography,
  CardHeader,
  CardContent,
  FormControlLabel,
  useMediaQuery,
  TextField,
  Button,
  Slider,
  Stack,
  RadioGroup,
  Radio,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightForm from "@/components/flight/flightForm";
import { COLORS } from "@/utils/colors";
import RoundFlightListBox from "@/components/flight/roundFlightListBox";
import { nunito } from "@/utils/fonts";
import InternationalRoundFlightBox from "@/components/flight/internationalRoundFlightBox";
import moment from "moment";
import { useRouter } from "next/router";
import Loader from "@/utils/Loader";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Loading from "react-loading";
import filterImage from "@/assests/flight_image/filter.svg";
import { JOURNEY } from "@/utils/enum";

const FlightList = () => {
  const router = useRouter();
  const [flightList, setFlightList] = useState(null);
  const [traceId, setTraceId] = useState("");
  const [journey, setJourney] = useState("");
  const [searchAirline, setSearchAirline] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedTime, setSelectedTime] = useState("Anytime");
  const [loading, setLoading] = useState(true);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [open, setOpen] = useState(false);

  // ---------------Responsive code for mobile start-------------
  const phone = useMediaQuery("(max-width:1100px)");
  const toggleDrawer = (openState) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(openState);
  };
  // ---------------Responsive code for mobile end-------------

  // ---------------Initial Data fetch from localstorage start-------------
  useEffect(() => {
    const fetchInitialData = () => {
      try {
        const flightData = JSON.parse(
          localStorage.getItem("roundflightData") || "{}"
        );
        if (flightData?.flight_list?.departure_flights) {
          setFlightList(flightData);
          setTraceId(flightData.trace_id);
          setJourney(flightData.type);
        } else {
          console.log("No valid flight data found in localStorage");
        }
      } catch (error) {
        console.log("Error parsing flight data from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);
  // ---------------Initial Data fetch from localstorage end-------------

  // ---------------default select flight domestic start---------------
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

  // ---------------default select flight domestic end---------------

  // ---------------handle function to select flight domestic start---------------
  const handleFlightSelection = (type, flight) => {
    if (type === "departure") {
      setSelectedDeparture(flight);
      // console.log(selectedDeparture);
    } else if (type === "arrival") {
      setSelectedArrival(flight);
      // console.log(selectedArrival)
    }
  };
  // ---------------handle function to select flight domestic end---------------

  // ----------set select flight resultIndex in Object start---------
  const newResultIndex = {
    arrival: selectedArrival?.ResultIndex,
    departure: selectedDeparture?.ResultIndex,
  };
  // ----------set select flight resultIndex in Object end---------

  // --------------Redirection start-----------------
  const routetoAnotherPage = () => {
    router.push({
      pathname: `/roundtrip-flightlist/${selectedDeparture?.AirlineCode}/view-details`,
      query: {
        ResultIndex: JSON.stringify(newResultIndex),
        traceId: traceId,
        journey: journey,
      },
    });
  };
  // --------------Redirection end-----------------

  // -----------------set Price Range function Start------------
  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  // -----------------set Price Range function end------------

  // -----------------set time function Start------------
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  // -----------------set time function end------------

  const getTimeCategory = (depTime) => {
    const hours = new Date(depTime).getHours();
    if (hours >= 5 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 17) return "AfterNoon";
    if (hours >= 17 && hours < 21) return "Evening";
    return "Night";
  };

  // -------------filter function start-----------------
  useEffect(() => {
    if (flightList?.flight_list?.departure_flights) {
      setLoading(true);

      let filtered = [];
      if (journey === JOURNEY.INTERNATIONAL) {
        filtered = flightList?.flight_list?.departure_flights.filter(
          (flight) => {
            const airlineMatch =
              flight?.departure[0]?.Airline?.AirlineName?.toLowerCase().includes(
                searchAirline.toLowerCase()
              );

            const priceMatch =
              flight?.TotalFare >= priceRange[0] &&
              flight?.TotalFare <= priceRange[1];

            const departureCategory = getTimeCategory(
              flight?.departure[0]?.Origin?.DepTime
            );
            const departureMatch =
              selectedTime === "Anytime" || selectedTime === departureCategory;

            return priceMatch && airlineMatch && departureMatch;
          }
        );
      } else {
        filtered =
          flightList?.flight_list?.departure_flights?.flightData.filter(
            (flight) => {
              const airlineMatch =
                flight?.departure[0]?.Airline?.AirlineName?.toLowerCase().includes(
                  searchAirline.toLowerCase()
                );

              const priceMatch =
                flight?.TotalFare >= priceRange[0] &&
                flight?.TotalFare <= priceRange[1];

              const departureCategory = getTimeCategory(
                flight?.departure[0]?.Origin?.DepTime
              );
              const departureMatch =
                selectedTime === "Anytime" ||
                selectedTime === departureCategory;

              return priceMatch && airlineMatch && departureMatch;
            }
          );
      }

      setFilteredFlights(filtered);
      setLoading(false);
    }
  }, [priceRange, searchAirline, selectedTime, flightList, journey]);

  // -------------filter function end-----------------

  const handleResetFilters = () => {
    setSearchAirline("");
    setPriceRange([0, 500000]);
    setSelectedTime("Anytime");
  };

  const NoFlightsFound = () => (
    <Grid2
      size={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontFamily: nunito.style, fontWeight: 700, mb: "10px" }}
      >
        No flight available!
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: nunito.style }}>
        Sorry, there are no flights matching this criteria. Please modify the
        filters & try again.
      </Typography>
      <Image src={filterImage.src} alt="Image" width={300} height={300} />
    </Grid2>
  );

  console.log("filteredFlights", filteredFlights);

  const FlightListResults = () => (
    <>
      <Grid2 size={12}>
        <Typography
          variant="body1"
          sx={{ mb: "20px" }}
        >{`Search Results ${filteredFlights.length}`}</Typography>
      </Grid2>
      {filteredFlights.map((val, i) => (
        <Grid2 size={12} key={i}>
          <InternationalRoundFlightBox
            details={val}
            traceId={traceId}
            journey={journey}
          />
        </Grid2>
      ))}
    </>
  );

  const FlightListDomesticResults = () => (
    <>
      <Grid2 size={phone ? 12 : 12} container spacing={2}>
        {/* box one */}
        {phone ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: nunito.style,
                    mb: "20px",
                  }}
                >{`${flightList.origin} - ${flightList.destination}`}</Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2 size={12} borderColor={"green"}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: "20px" }}
                  >{`Search Results ${filteredFlights.length}`}</Typography>
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
            </AccordionDetails>
          </Accordion>
        ) : (
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
                variant="body1"
                sx={{ mb: "20px" }}
              >{`Search Results ${filteredFlights.length}`}</Typography>
            </Box>
            <Grid2 container spacing={6}>
              {filteredFlights.map((val, i) => (
                <Grid2 size={12} key={i}>
                  <RoundFlightListBox
                    details={val}
                    traceId={traceId}
                    isSelected={
                      selectedDeparture?.ResultIndex === val.ResultIndex
                    }
                    onSelect={() => handleFlightSelection("departure", val)}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        )}

        {/* box two */}

        {phone ? (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontFamily: nunito.style,
                          mb: "20px",
                        }}
                      >{`${flightList.destination} - ${flightList.origin}`}</Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2 size={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                          variant="body1"
                          sx={{ mb: "20px" }}
                        >{`Search Result ${flightList.flight_list.arrival_flights.flightData.length}`}</Typography>
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
                          onSelect={() => handleFlightSelection("arrival", val)}
                        />
                      </Grid2>
                    )
                  )}
                </Grid2>
              </Grid2>
            </AccordionDetails>
          </Accordion>
        ) : (
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
                      variant="body1"
                      sx={{ mb: "20px" }}
                    >{`Search Result ${flightList.flight_list.arrival_flights.flightData.length}`}</Typography>
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
                      onSelect={() => handleFlightSelection("arrival", val)}
                    />
                  </Grid2>
                )
              )}
            </Grid2>
          </Grid2>
        )}
      </Grid2>
    </>
  );

  return (
    <>
      <InnerBanner img={banner.src} heading={"Round Flight Trip"} />

      <Box sx={{ pt: { lg: 10, xs: 5 }, px: 4 }}>
        <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
          <Typography sx={{ fontSize: 18 }}> Search Flight</Typography>
          <FlightForm />
        </Card>
      </Box>

      <Box sx={{ pt: { lg: 10, xs: 5 }, pb: 10, px: 4 }}>
        <Grid2 container spacing={4}>
          {phone ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "auto",
              }}
            >
              <Button onClick={toggleDrawer(true)}>
                <FilterAltIcon sx={{ fontSize: 30, color: COLORS.PRIMARY }} />
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <Grid2 size={12} sx={{ position: "relative" }}>
                  {/* filter card start */}
                  <Card
                    variant="outlined"
                    sx={{
                      position: "sticky",
                      top: "75px",
                      width: "100%",
                      overflowY: "scroll",
                      "::-webkit-scrollbar": {
                        width: 5,
                        borderRadius: 4,
                      },
                      "::-webkit-scrollbar-thumb": {
                        backgroundColor: "#A8A8A8",
                        borderRadius: 4,
                        height: 20,
                        width: 20,
                      },
                      marginBottom: "1rem",
                      width: "100%",
                      boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                    }}
                  >
                    <CardHeader
                      action={
                        <Button onClick={toggleDrawer(false)}>
                          <CloseIcon
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginLeft: "auto",
                              fontSize: 30,
                              fontWeight: "bold",
                            }}
                          />
                        </Button>
                      }
                    />
                    <CardHeader
                      title={
                        <Typography
                          variant="h5"
                          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                        >
                          Filters
                        </Typography>
                      }
                      action={
                        <Button
                          variant="text"
                          color="primary"
                          size="small"
                          onClick={handleResetFilters}
                          sx={{ fontFamily: nunito.style }}
                        >
                          Reset
                        </Button>
                      }
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                      >
                        Search by Airline Names
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        sx={{
                          fontFamily: nunito.style,
                          marginBottom: "20px",
                        }}
                        name="search"
                        value={searchAirline}
                        onChange={(e) => setSearchAirline(e.target.value)}
                        placeholder="Search by Airline Names"
                        InputProps={{
                          startAdornment: (
                            <SearchIcon style={{ marginRight: "8px" }} />
                          ),
                        }}
                      />

                      {/* Departure Time */}
                      <Box sx={{ marginBottom: "20px" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                        >
                          Departure Time
                        </Typography>
                        <RadioGroup
                          aria-label="departure-time"
                          name="departureTime"
                          value={selectedTime}
                          onChange={handleTimeChange}
                        >
                          {[
                            "Anytime",
                            "Morning",
                            "AfterNoon",
                            "Evening",
                            "Night",
                          ].map((label) => (
                            <FormControlLabel
                              key={label}
                              value={label}
                              control={
                                <Radio
                                  sx={{
                                    color: COLORS.PRIMARY,
                                    "&.Mui-checked": {
                                      color: COLORS.PRIMARY,
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontFamily: nunito.style,
                                    fontWeight: 500,
                                  }}
                                >
                                  {label}
                                </Typography>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </Box>

                      {/* Price Range Section */}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                        >
                          Flight Price
                        </Typography>
                        <Slider
                          value={priceRange}
                          onChange={handleRangeChange}
                          valueLabelDisplay="auto"
                          min={0}
                          max={500000}
                          sx={{
                            color: "#ff5722",
                            "& .MuiSlider-thumb": {
                              backgroundColor: COLORS.PRIMARY,
                            },
                            "& .MuiSlider-track": {
                              backgroundColor: COLORS.PRIMARY,
                            },
                            "& .MuiSlider-rail": {
                              backgroundColor: COLORS.PRIMARY,
                            },
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, fontFamily: nunito.style }}
                        >
                          Range: ₹ {priceRange[0]} - ₹ {priceRange[1]}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* filter card end */}
                </Grid2>
              </Drawer>
            </Box>
          ) : (
            <Grid2 size={3} sx={{ position: "relative" }}>
              {/* filter card start */}
              <Card
                variant="outlined"
                sx={{
                  position: "sticky",
                  top: "75px",
                  width: "100%",
                  overflowY: "scroll",
                  "::-webkit-scrollbar": {
                    width: 5,
                    borderRadius: 4,
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: "#A8A8A8",
                    borderRadius: 4,
                    height: 20,
                    width: 20,
                  },
                  marginBottom: "1rem",
                  width: "100%",
                  boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h5"
                      sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                    >
                      Filters
                    </Typography>
                  }
                  action={
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={handleResetFilters}
                      sx={{ fontFamily: nunito.style }}
                    >
                      Reset
                    </Button>
                  }
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                  >
                    Search by Airline Names
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    sx={{
                      fontFamily: nunito.style,
                      marginBottom: "20px",
                    }}
                    name="search"
                    value={searchAirline}
                    onChange={(e) => setSearchAirline(e.target.value)}
                    placeholder="Search by Airline Names"
                    InputProps={{
                      startAdornment: (
                        <SearchIcon style={{ marginRight: "8px" }} />
                      ),
                    }}
                  />

                  {/* Departure Time */}
                  <Box sx={{ marginBottom: "20px" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                    >
                      Departure Time
                    </Typography>
                    <RadioGroup
                      aria-label="departure-time"
                      name="departureTime"
                      value={selectedTime}
                      onChange={handleTimeChange}
                    >
                      {[
                        "Anytime",
                        "Morning",
                        "AfterNoon",
                        "Evening",
                        "Night",
                      ].map((label) => (
                        <FormControlLabel
                          key={label}
                          value={label}
                          control={
                            <Radio
                              sx={{
                                color: COLORS.PRIMARY,
                                "&.Mui-checked": {
                                  color: COLORS.PRIMARY,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body1"
                              sx={{
                                fontFamily: nunito.style,
                                fontWeight: 500,
                              }}
                            >
                              {label}
                            </Typography>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </Box>

                  {/* Price Range Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                    >
                      Flight Price
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={500000}
                      sx={{
                        color: "#ff5722",
                        "& .MuiSlider-thumb": {
                          backgroundColor: COLORS.PRIMARY,
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: COLORS.PRIMARY,
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: COLORS.PRIMARY,
                        },
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, fontFamily: nunito.style }}
                    >
                      Range: ₹ {priceRange[0]} - ₹ {priceRange[1]}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* filter card end */}
            </Grid2>
          )}

          {/* Round Flight List Data Domestic and International  */}
          {journey === "INTERNATIONAL" ? (
            <Grid2 size={{ lg: 9, xs: 12 }} container>
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
                      mb: "10px",
                    }}
                  >{`${flightList.origin} - ${flightList.destination}`}</Typography>
                </Box>

                {loading ? (
                  <Grid2
                    size={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <Loading
                      type="bars"
                      width={20}
                      height={20}
                      color={COLORS.PRIMARY}
                    />
                  </Grid2>
                ) : filteredFlights.length > 0 ? (
                  <FlightListResults />
                ) : (
                  <NoFlightsFound />
                )}
              </Grid2>
            </Grid2>
          ) : (
            <>
            <Grid2 size={{ lg: 9, xs: 12 }} container>
              {loading ? (
                <Grid2
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    color={COLORS.PRIMARY}
                  />
                </Grid2>
              ) : filteredFlights.length > 0 ? (
                <FlightListDomesticResults />
              ) : (
                <NoFlightsFound />
              )}
            </Grid2>
            </>
          )}
        </Grid2>
      </Box>
      {loading && !flightList?.flight_list?.departure_flights && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Loader open={true} />
        </Box>
      )}

      {/* Footer Flight Detail section  */}
      {journey === "DOMESTIC" ? (
        <Grid2
          container
          sx={{ position: "fixed", bottom: "0", width: "100%", zIndex: 9999 }}
        >
          <Grid2 size={3}></Grid2>
          <Grid2
            size={{ lg: 9, xs: 12 }}
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
            <Grid2
              size={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              sx={{ borderRight: { lg: "`1px solid`", sm: "none" } }}
            >
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
            <Grid2
              size={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              sx={{ borderRight: { lg: "`1px solid`", sm: "none" } }}
            >
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
              size={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: { lg: "flex-end", xs: "space-between" },
              }}
            >
              <Typography
                sx={{ fontSize: 24, fontWeight: 900, fontFamily: nunito.style }}
              >
                ₹{" "}
                {`${(
                  selectedDeparture?.TotalFare + selectedArrival?.TotalFare
                ).toFixed(2)}`}{" "}
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
