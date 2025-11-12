// Multiway.jsx
import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { flightController } from "@/api/flightController";
import { customFilter } from "@/utils/regex";
import { JOURNEY_TYPE, PREFERRED_TIME, TOAST_STATUS } from "@/utils/enum";
import { setFlightDetails } from "@/redux/reducers/flightInformation";
import { setToast } from "@/redux/reducers/toast";
import VirtualList from "./fixedSizeList";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  Grid2,
  Popover,
  Popper,
  styled,
  Portal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ToastBar from "../toastBar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import TravellerSelector from "./travellerSelector";
import NewLoader from "../NewLoader";

const Multiway = ({ setUiLocked, uiLocked }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const CustomPopper = styled(Popper)(({ theme }) => ({
    width: "310px !important",
    zIndex: 1300,
  }));

  const initialState = {
    ip_address: "",
    journey_type: JOURNEY_TYPE.MULTIWAY,
    preferred_time: PREFERRED_TIME.AnyTime,
    multicity: [
      {
        origin: "",
        destination: "",
        departure_date: "",
        cabin_class: "1",
      },
    ],
    adult: 1,
    child: 0,
    infant: 0,
    direct_flight: false,
    one_stop_flight: false,
    cabin_class: "1",
  };

  const [forms, setForms] = useState([
    { origin: "", destination: "", departure_date: null, cabin_class: "1" },
  ]);
  const maxForms = 4;
  const [state, setState] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [defaultRoute] = useState("/multitrip-flightlist");
  const [airportList, setAirportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cabin_class, setCabinClass] = useState("");

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    if (uiLocked) return;
    setAnchorEl(e.currentTarget);
  };

  const navigatedRef = useRef(false);

  // lock body scroll while uiLocked
  useEffect(() => {
    document.body.style.overflow = uiLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [uiLocked]);

  // unlock when route finishes (success or error)
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

  const addForm = () => {
    if (uiLocked) return;
    if (forms.length < maxForms) {
      setForms([
        ...forms,
        { origin: "", destination: "", departure_date: null, cabin_class: "1" },
      ]);
    }
  };

  const removeForm = (index) => {
    if (uiLocked) return;
    if (forms.length > 1) {
      const updatedForms = forms.filter((_, i) => i !== index);
      setForms(updatedForms);
      // keep state.multicity in sync
      setState((prev) => ({
        ...prev,
        multicity: prev.multicity.filter((_, i) => i !== index),
      }));
    }
  };

  const originhandler = (e, newValue, index) => {
    const updatedForms = [...forms];
    updatedForms[index].origin = newValue?.iata_code || "";
    setForms(updatedForms);

    if (newValue) {
      setState((prevState) => {
        const updatedMulticity = [...prevState.multicity];
        if (!updatedMulticity[index]) updatedMulticity[index] = {};
        updatedMulticity[index].origin = newValue.iata_code;
        return { ...prevState, multicity: updatedMulticity };
      });
    }
  };

  const destinationHandler = (e, newValue, index) => {
    const updatedForms = [...forms];
    updatedForms[index].destination = newValue?.iata_code || "";
    setForms(updatedForms);

    if (newValue) {
      setState((prevState) => {
        const updatedMulticity = [...prevState.multicity];
        if (!updatedMulticity[index]) updatedMulticity[index] = {};
        updatedMulticity[index].destination = newValue.iata_code;
        return { ...prevState, multicity: updatedMulticity };
      });
    }
  };

  const departureDateHandler = (newDate, index) => {
    const updatedForms = [...forms];
    updatedForms[index].departure_date = newDate;
    setForms(updatedForms);

    const isValid = moment(newDate).isValid();
    if (isValid && newDate) {
      setState((prevState) => {
        const updatedMulticity = [...prevState.multicity];
        if (!updatedMulticity[index]) updatedMulticity[index] = {};
        updatedMulticity[index].departure_date = moment(newDate._d).format(
          "YYYY-MM-DD"
        );
        return { ...prevState, multicity: updatedMulticity };
      });
    }
  };

  const getAllAirport = () => {
    flightController
      .getAllAirports()
      .then((res) => {
        let response = res.data.data;
        setAirportList(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching airports:", err);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: "Failed to load airport list.",
            severity: TOAST_STATUS.ERROR,
          })
        );
      });
  };

  const fetchApi = () => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) =>{
        setState((prevState) => ({ ...prevState, ip_address: data.ip }));
        localStorage.setItem("ip",data.ip);
      }
       
      )
      .catch((err) => {
        console.error("Error fetching IP address:", err);
      });
  };

  

  const searchFlight = async (payload) => {
    // full-page loader ON
    setUiLocked(true);
    navigatedRef.current = false;

    try {
      const res = await flightController.searchFlight(payload);
      const response = res?.data?.data;
      dispatch(setFlightDetails({ ...response }));
      localStorage.setItem("multiwayData", JSON.stringify(response));

      if (router.pathname !== defaultRoute) {
        const ok = await router.push(defaultRoute);
        if (ok) navigatedRef.current = true;
      } else {
        // same route -> reload to refresh list
        window.location.reload();
      }
    } catch (err) {
      let errMessage =
        (err?.response && err?.response?.data?.message) || err?.message;
      dispatch(
        setToast({
          open: true,
          message: errMessage || "Flight search failed.",
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

    // Close any open popovers before locking/showing loader
    if (anchorEl) setAnchorEl(null);

    // field validation
    const emptyFields = state.multicity.reduce((acc, city, index) => {
      if (!city.origin) acc.push(`Origin for form ${index + 1}`);
      if (!city.destination) acc.push(`Destination for form ${index + 1}`);
      if (!city.departure_date) acc.push(`Departure Date for form ${index + 1}`);
      return acc;
    }, []);

    // chronological date order check
    for (let i = 1; i < forms.length; i++) {
      if (forms[i].departure_date && forms[i - 1].departure_date) {
        if (moment(forms[i].departure_date).isBefore(forms[i - 1].departure_date)) {
          dispatch(
            setToast({
              open: true,
              message: "Departure dates should be listed from earliest to latest.",
              severity: TOAST_STATUS.ERROR,
            })
          );
          return;
        }
      }
    }

    if (emptyFields.length > 0) {
      dispatch(
        setToast({
          open: true,
          message: `Please Enter the Required Fields`,
          severity: TOAST_STATUS.ERROR,
        })
      );
      return;
    }

    localStorage.setItem("multistate", JSON.stringify(state));

    const modifiedState = { ...state };
    modifiedState.multicity = modifiedState.multicity.map((city) => {
      const cityWithCabinClass = { ...city, cabin_class: state.cabin_class };
      delete cityWithCabinClass.cabin_class_top_level;
      return cityWithCabinClass;
    });
    delete modifiedState.cabin_class;

    searchFlight(modifiedState);
  };

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
    <>
      {/* full-screen blur overlay + NewLoader (matches Oneway) */}
      <Portal>
        {uiLocked && (
          <Box
            role="dialog"
            aria-label="Loading"
            aria-modal="true"
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
                role="status"
                aria-live="assertive"
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

      <Box
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          borderRadius: 4,
          pointerEvents: uiLocked ? "none" : "auto",
          userSelect: uiLocked ? "none" : "auto",
        }}
      >
        {forms.map((form, index) => (
          <Grid2
            container
            alignItems={"center"}
            justifyContent={"center"}
            key={index}
            sx={{
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              overflow: "visible",
              justifyContent: "center",
              gap: { xs: 0.5, lg: 1 },
            }}
            spacing={2}
          >
            {/* From */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
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
                    sx={{ fieldset: { border: "none" }, input: { textAlign: "start" } }}
                  />
                )}
                onChange={(e, newValue) => originhandler(e, newValue, index)}
                value={
                  airportList.find((option) => option.iata_code === form.origin) ||
                  null
                }
                ListboxComponent={VirtualList}
                loading={loading}
                PopperComponent={CustomPopper}
                filterOptions={customFilter}
                options={airportList}
                getOptionLabel={(option) =>
                  `${option.airport_name} (${option.iata_code}) - ${option.city_name}`
                }
                renderOption={(props, option) => (
                  <Box {...props}>
                    <Grid2
                      container
                      sx={{ width: "100%", borderBottom: `1px solid ${COLORS.SEMIGREY}` }}
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
                slotProps={{ popper: { sx: { zIndex: 100 } } }}
              />
            </Grid2>

            {/* To */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F9F9F9",
                borderTopLeftRadius: { xs: 6, sm: 4 },
                borderBottomLeftRadius: { xs: 6, sm: 4 },
                borderTopRightRadius: { xs: 6, sm: 4 },
                borderBottomRightRadius: { xs: 6, sm: 4 },
                overflow: "visible",
                position: "relative",
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
                    sx={{ fieldset: { border: "none" }, input: { textAlign: "start" } }}
                  />
                )}
                onChange={(e, newValue) => destinationHandler(e, newValue, index)}
                value={
                  airportList.find((option) => option.iata_code === form.destination) ||
                  null
                }
                ListboxComponent={VirtualList}
                filterOptions={customFilter}
                PopperComponent={CustomPopper}
                loading={loading}
                options={airportList}
                getOptionLabel={(option) =>
                  `${option.airport_name} (${option.iata_code}) - ${option.city_name}`
                }
                renderOption={(props, option) => (
                  <Box {...props}>
                    <Grid2
                      container
                      sx={{ width: "100%", borderBottom: `1px solid ${COLORS.SEMIGREY}` }}
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
                slotProps={{ popper: { sx: { zIndex: 100 } } }}
              />
            </Grid2>

            {/* Departure */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F9F9F9",
                borderTopLeftRadius: { xs: 6, sm: 4 },
                borderBottomLeftRadius: { xs: 6, sm: 4 },
                borderTopRightRadius: { xs: 6, sm: 4 },
                borderBottomRightRadius: { xs: 6, sm: 4 },
                overflow: "visible",
                position: "relative",
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
                  sx={{ fieldset: { border: "none" } }}
                  disablePast
                  maxDate={moment().add(90, "days")}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => departureDateHandler(newDate, index)}
                  value={form.departure_date}
                  minDate={index > 0 ? forms[index - 1].departure_date : null}
                  slotProps={{
                    textField: { size: "small" },
                    popper: { sx: { zIndex: 100 } },
                  }}
                />
              </LocalizationProvider>
            </Grid2>

            {/* Travellers/Cabin (first row) or Remove (others) */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F9F9F9",
                borderTopLeftRadius: { xs: 6, sm: 4 },
                borderBottomLeftRadius: { xs: 6, sm: 4 },
                borderTopRightRadius: { xs: 6, sm: 4 },
                borderBottomRightRadius: { xs: 6, sm: 4 },
                overflow: "visible",
                position: "relative",
              }}
            >
              {index === 0 ? (
                <>
                  <Typography
                    sx={{
                      fontSize: { lg: 15, md: 13, sm: 12, xs: 12 },
                      fontFamily: nunito.style,
                      color: COLORS.DARKGREY,
                      px: 1,
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
                      {state.infant !== 0 && `, ${state.infant} infant`},
                      {` ${cabin_class?.label || ""} Class`}
                    </Typography>
                  </CardActionArea>
                </>
              ) : (
                <Box
                  sx={{
                    pb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeForm(index)}
                    sx={{
                      marginTop: 1,
                      display: "block",
                      marginX: "auto",
                      fontSize: { lg: 15, md: 14, sm: 10, xs: 10 },
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </Grid2>

            {/* Add another flight button */}
            <Grid2 size={{ xs: 12 }}>
              {index === forms.length - 1 && forms.length < maxForms && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={addForm}
                    sx={{
                      fontSize: { lg: 15, md: 14, sm: 10, xs: 9.5 },
                      mr: { xs: 0, md: 1.6 },
                    }}
                  >
                    Add Another Flight
                  </Button>
                </Box>
              )}
            </Grid2>
          </Grid2>
        ))}

        {/* Search button (no inline spinner; uses full-page loader) */}
        <Grid2 size={{ lg: 12, xs: 12, sm: 12, md: 12 }} textAlign={"center"}>
          <Button
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              width: { lg: 150, md: 150, sm: 120, xs: 120 },
              py: { lg: 1.5, md: 1.5, sm: 1, xs: 1 },
              cursor: uiLocked ? "not-allowed" : "pointer",
            }}
            onClick={submitHandler}
            disabled={uiLocked}
          >
            Search
          </Button>
        </Grid2>

        {/* Travellers popover */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => setAnchorEl(null)}
          sx={{
            "& .MuiPopover-paper": {
              boxShadow:
                " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              py: 2,
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
      </Box>

      <ToastBar />
    </>
  );
};

export default Multiway;
