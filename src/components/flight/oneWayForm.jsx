// OnewayForm.jsx
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  Popover,
  Popper,
  TextField,
  Typography,
  styled,
  Portal,
  Stack,
} from "@mui/material";

import { Grid2 } from "@mui/material";

import { flightController } from "@/api/flightController";
import { JOURNEY_TYPE, PREFERRED_TIME, TOAST_STATUS } from "@/utils/enum";
import { customFilter } from "@/utils/regex";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import VirtualList from "./fixedSizeList";
import TravellerSelector from "./travellerSelector";
import { setToast } from "@/redux/reducers/toast";
import { data } from "@/assests/data";
import { setFlightDetails } from "@/redux/reducers/flightInformation";
import { useRouter } from "next/router";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { resetSeatDetails } from "@/redux/reducers/seatsInformation";
import { resetMealDetails } from "@/redux/reducers/mealsInformation";
import { resetBaggageDetails } from "@/redux/reducers/baggagesInformation";
import NewLoader from "../NewLoader";

const OnewayForm = ({ setUiLocked, uiLocked }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [defaultRoute] = useState("/oneway-flightlist");

  const CustomPopper = styled(Popper)(({ theme }) => ({
    width: "310px !important",
    zIndex: 1300,
  }));

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    if (uiLocked) return;
    setAnchorEl(e.currentTarget);
  };

  const initialState = {
    ip_address: "",
    journey_type: JOURNEY_TYPE.ONEWAY,
    preferred_time: PREFERRED_TIME.AnyTime,
    origin: "",
    destination: "",
    departure_date: "",
    cabin_class: "1",
    adult: 1,
    child: 0,
    infant: 0,
    direct_flight: false,
    one_stop_flight: false,
  };

  const [state, setState] = useState(initialState);

  const navigatedRef = useRef(false);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = uiLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [uiLocked]);

  // unlock when route finishes
  useEffect(() => {
    const handleDone = () => {
      navigatedRef.current = true;
      setUiLocked(false);
    };
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return () => {
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router.events, setUiLocked]);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const originhandler = (e, newValue) => {
    setOrigin(newValue);
    if (newValue) {
      setState((s) => ({ ...s, origin: newValue.iata_code }));
    }
  };

  const destinationHandler = (e, newValue) => {
    setDestination(newValue);
    if (newValue) {
      setState((s) => ({ ...s, destination: newValue.iata_code }));
    }
  };

  const departureDateHandler = (newDate) => {
    setDepartureDate(newDate);
    const isValid = moment(newDate).isValid();
    if (isValid) {
      setState((s) => ({
        ...s,
        departure_date: moment(newDate._d).format("YYYY-MM-DD"),
      }));
    }
  };

  const [airportList, setAirportList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAirport = () => {
    flightController
      .getAllAirports()
      .then((res) => {
        let response = res.data.data;
        setAirportList(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const fetchApi = () => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setState((s) => ({ ...s, ip_address: data.ip }));
        localStorage.setItem("ip",data.ip);
      }
      ).catch((err) => {
        console.error("Error fetching IP address:", err);

         // Fallback to hardcoded IP
      const fallbackIp = "157.49.10.4"; // Replace with your preferred fallback IP
      setState((prevState) => ({ ...prevState, ip_address: fallbackIp }));
      localStorage.setItem("ip", fallbackIp);

      });
  };

  const searchFlight = async () => {
    // full-page loader ON
    setUiLocked(true);
    navigatedRef.current = false;

    try {
      const res = await flightController.searchFlight(state);
      let response = res.data.data;
      dispatch(setFlightDetails({ ...response }));
      localStorage.setItem("flightData", JSON.stringify(response));

      if (router.pathname !== defaultRoute) {
        const ok = await router.push(defaultRoute);
        if (ok) navigatedRef.current = true;
      } else {
        // same route -> reload to refresh list
        window.location.reload();
      }
    } catch (err) {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      dispatch(
        setToast({
          open: true,
          message: errMessage,
          severity: TOAST_STATUS.ERROR,
        })
      );
    } finally {
      // if navigation didn't happen (error or same page), unlock
      if (!navigatedRef.current) setUiLocked(false);
    }
  };

  const submitHandler = () => {
    if (uiLocked) return;
    dispatch(resetSeatDetails());
    dispatch(resetMealDetails());
    dispatch(resetBaggageDetails());

    const emptyFields = Object.keys(state).filter(
      (key) =>
        state[key] === "" || state[key] === null || state[key] === undefined
    );

    if (emptyFields.length > 0) {
      dispatch(
        setToast({
          open: true,
          message: `Please Enter the Required Fields`,
          severity: TOAST_STATUS.ERROR,
        })
      );
    } else {
      localStorage.setItem("state", JSON.stringify(state));
      searchFlight();
    }
  };

  const [cabin_class, setCabinClass] = useState("");
  useEffect(() => {
    getAllAirport();
    fetchApi();
  }, []);

  useEffect(() => {
    let cabinClass = data.FLIGHT_CLASS_DATA.find(
      (val) => val.value == state.cabin_class
    );
    setCabinClass(cabinClass);
  }, [state.cabin_class]);

  return (
    <Box sx={{ p: 0, position: "relative" }} aria-busy={uiLocked}>
      {/* Full-screen blur overlay + NewLoader (same as HotelForm) */}
      <Portal>
        {uiLocked && (
          <Box
            role="dialog"
            aria-label="Loading"
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: (t) => t.zIndex.modal + 10,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(0,0,0,0.25)",
              display: "grid",
              placeItems: "center",
              pointerEvents: "auto",
            }}
          >
            <Stack alignItems="center" spacing={2}>
              <NewLoader open />
              <Typography
                sx={{
                  fontFamily: nunito.style,
                  fontWeight: 700,
                  color: "#FFF",
                  fontSize: 20,
                }}
              >
                Searching flights…
              </Typography>
            </Stack>
          </Box>
        )}
      </Portal>

      <Grid2
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          display: "flex",
          alignItems: "stretch",
          overflow: "visible",
          gap: { xs: 0.5, lg: 1 },
          pointerEvents: uiLocked ? "none" : "auto",
          userSelect: uiLocked ? "none" : "auto",
        }}
        spacing={2}
      >
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            border: "1px solid #D9D9D9",
            background: "#F9F9F9",
            borderTopLeftRadius: { xs: 6, sm: 4 },
            borderBottomLeftRadius: { xs: 6, sm: 4 },
            borderTopRightRadius: { xs: 6, sm: 4 },
            borderBottomRightRadius: { xs: 6, sm: 4 },
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
            }}
          >
            From
          </Typography>

          <Autocomplete
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search.."
                sx={{
                  fieldset: { border: "none" },
                  input: { textAlign: "start" },
                }}
              />
            )}
            onChange={originhandler}
            PopperComponent={CustomPopper}
            value={origin}
            ListboxComponent={VirtualList}
            loading={loading}
            filterOptions={customFilter}
            options={airportList}
            getOptionLabel={(option) =>
              `${option.airport_name} (${option.iata_code}) - ${option.city_name}`
            }
            renderOption={(props, option) => (
              <Box {...props}>
                <Grid2
                  container
                  sx={{
                    width: "100%",
                    borderBottom: `1px solid ${COLORS.SEMIGREY}`,
                  }}
                >
                  <Grid2 size={{ xs: 0, sm: 2 }}>
                    <FlightTakeoffIcon
                      sx={{
                        color: COLORS.PRIMARY,
                        marginRight: "10px",
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 700,
                        color: COLORS.BLACK,
                        textAlign: "start",
                      }}
                    >
                      {option.city_name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: nunito.style,
                        fontWeight: 500,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.airport_name}
                    </Typography>
                  </Grid2>

                  <Grid2 size={{ xs: 0, sm: 4 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 800,
                        color: COLORS.BLACK,
                        textAlign: "end",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {option.city_code}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Box>
            )}
            disableListWrap
            slotProps={{
              popper: {
                sx: {
                  zIndex: 100,
                },
              },
            }}
          />
        </Grid2>

        <Grid2
          size={{ lg: 3, md: 2.4, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #D9D9D9",
            background: "#F9F9F9",
            borderTopLeftRadius: { xs: 6, sm: 4 },
            borderBottomLeftRadius: { xs: 6, sm: 4 },
            borderTopRightRadius: { xs: 6, sm: 4 },
            borderBottomRightRadius: { xs: 6, sm: 4 },
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
            }}
          >
            To
          </Typography>

          <Autocomplete
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search.."
                sx={{
                  fieldset: { border: "none" },
                  input: { textAlign: "start" },
                }}
              />
            )}
            onChange={destinationHandler}
            value={destination}
            PopperComponent={CustomPopper}
            ListboxComponent={VirtualList}
            filterOptions={customFilter}
            loading={loading}
            options={airportList}
            getOptionLabel={(option) =>
              `${option.airport_name} (${option.iata_code}) - ${option.city_name}`
            }
            renderOption={(props, option) => (
              <Box {...props}>
                <Grid2
                  container
                  sx={{
                    width: "100%",
                    borderBottom: `1px solid ${COLORS.SEMIGREY}`,
                  }}
                >
                  <Grid2 size={{ xs: 0, sm: 2 }}>
                    <FlightLandIcon
                      sx={{
                        color: COLORS.PRIMARY,
                        marginRight: "10px",
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 700,
                        color: COLORS.BLACK,
                        textAlign: "start",
                      }}
                    >
                      {option.city_name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: nunito.style,
                        fontWeight: 500,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.airport_name}
                    </Typography>
                  </Grid2>

                  <Grid2 size={{ xs: 0, sm: 4 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 800,
                        color: COLORS.BLACK,
                        textAlign: "end",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {option.city_code}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Box>
            )}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 100,
                },
              },
            }}
          />
        </Grid2>

        <Grid2
          size={{ lg: 3, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            border: "1px solid #D9D9D9",
            background: "#F9F9F9",
            borderTopLeftRadius: { xs: 6, sm: 4 },
            borderBottomLeftRadius: { xs: 6, sm: 4 },
            borderTopRightRadius: { xs: 6, sm: 4 },
            borderBottomRightRadius: { xs: 6, sm: 4 },
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
            }}
          >
            Departure
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
                ".MuiSvgIcon-root": {
                  fontSize: "1.5rem",
                },
              }}
              disablePast
              maxDate={moment().add(90, "days")}
              onChange={departureDateHandler}
              value={departureDate}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  size: "small",
                },
                popper: {
                  sx: {
                    zIndex: 100,
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2
          size={{ lg: 3, md: 2.4, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #D9D9D9",
            background: "#F9F9F9",
            borderTopLeftRadius: { xs: 6, sm: 4 },
            borderBottomLeftRadius: { xs: 6, sm: 4 },
            borderTopRightRadius: { xs: 6, sm: 4 },
            borderBottomRightRadius: { xs: 6, sm: 4 },
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 15, md: 13, sm: 12, xs: 12 },
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
            }}
          >
            Travellers and cabin class
          </Typography>
          <CardActionArea sx={{ px: 2 }} onClick={openPopover}>
            <Typography
              sx={{
                fontSize: { lg: 14, md: 13, sm: 10, xs: 12 },
                fontFamily: nunito.style,
              }}
            >
              {state.adult + state.child + state.infant} Persons
            </Typography>

            <Typography
              fontSize={{ lg: 14, md: 13, sm: 10, xs: 12 }}
              fontFamily={nunito.style}
            >
              {state.adult} adult
              {state.child !== 0 && `, ${state.child} child`}
              {state.infant !== 0 && `, ${state.infant} infant`},{" "}
              {`${cabin_class?.label ?? ""} Class`}
            </Typography>
          </CardActionArea>

          {/* popover start */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            onClose={() => setAnchorEl(null)}
            sx={{
              "& .MuiPopover-paper": {
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                p: { lg: 2 },
                py: { xs: 2, sm: 2, md: 2, lg: 2 },
                width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
              },
            }}
          >
            <TravellerSelector
              setAnchorEl={setAnchorEl}
              state={state}
              setState={setState}
              adultValue={adultValue}
              setAdultValue={setAdultValue}
              infantValue={infantValue}
              setInfantValue={setInfantValue}
              childValue={childValue}
              setChildValue={setChildValue}
            />
          </Popover>
          {/* popover end */}
        </Grid2>

        <Grid2 size={{ lg: 12, md: 2.4, xs: 12, sm: 12 }} textAlign={"center"}>
          <Button
            disabled={uiLocked}
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              width: { lg: 150, md: 150, sm: 120, xs: 120 },
              mt: { lg: 2, sm: 1, xs: 2 },
              cursor: uiLocked ? "not-allowed" : "pointer",
              fontSize: { lg: 16, md: 16, sm: 16, xs: 10 },
              py: { lg: 1.5, md: 1.5, sm: 1, xs: 1 },
            }}
            onClick={submitHandler}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default OnewayForm;
