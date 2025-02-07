import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  Grid2,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useRouter } from "next/router";

import TravellerSelector from "./travellerSelector";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { JOURNEY_TYPE, PREFERRED_TIME, TOAST_STATUS } from "@/utils/enum";
import { flightController } from "@/api/flightController";
import VirtualList from "./fixedSizeList";
import { customFilter } from "@/utils/regex";
import ToastBar from "../toastBar";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import Loading from "react-loading";
import { setFlightDetails } from "@/redux/reducers/flightInformation";

const RoundTrip = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [airportList, setAirportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // state for round-trip form for gender and cabin class
  const initialState = {
    ip_address: "",
    journey_type: JOURNEY_TYPE.ROUNDTRIP,
    preferred_time: PREFERRED_TIME.AnyTime,
    origin: "",
    destination: "",
    departure_date: "",
    return_date: "",
    cabin_class: "1",
    adult: 1,
    child: 0,
    infant: 0,
    direct_flight: false,
    one_stop_flight: false,
  };

  const [state, setState] = useState(initialState);

  // fields states
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cabin_class, setCabinClass] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();

  // fields change handler
  const originhandler = (e, newValue) => {
    // console.log("origin ", newValue);
    setOrigin(newValue);
    if (newValue) {
      setState({ ...state, origin: newValue.iata_code });
    }
  };
  const destinationHandler = (e, newValue) => {
    setDestination(newValue);
    if (newValue) {
      setState({ ...state, destination: newValue.iata_code });
    }
  };

  const departureDateHandler = (newDate) => {
    setDepartureDate(newDate);
    const isValid = moment(newDate).isValid();
    if (isValid) {
      setState({
        ...state,
        departure_date: moment(newDate._d).format("YYYY-MM-DD"),
      });
    }
  };

  const returnDateHandler = (newDate) => {
    setReturnDate(newDate);
    const isValid = moment(newDate).isValid();
    if (isValid) {
      setState({
        ...state,
        return_date: moment(newDate._d).format("YYYY-MM-DD"),
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
        console.log("err", err);
      });
  };


  const searchFlight = () => {
    setButtonLoading(true);
    flightController
      .roundTrip(state)
      .then((res) => {
        // console.log("res", res);
        let response = res.data.data;
        dispatch(setFlightDetails({ ...response }));
        console.log("response ", response)
        localStorage.setItem("roundflightData", JSON.stringify(response));
        setButtonLoading(false);
        router.pathname !== "/round-list"
        ? router.push("/round-list")
        : window.location.reload();
      })
      .catch((err) => {
        // console.log("first", err);
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: TOAST_STATUS.ERROR,
          })
        );
        setButtonLoading(false);
      });
  };








  const submitHandler = () => {
    const emptyFields = Object.keys(state).filter(
      (key) =>
        state[key] === "" || state[key] === null || state[key] === undefined
    );

    if (emptyFields.length > 0) {
      dispatch(
        setToast({
          open: true,
          message: `Please Enter the Required Fields : ${emptyFields}`,
          severity: TOAST_STATUS.ERROR,
        })
      );
    } else {
      searchFlight();
    }
  };

  useEffect(() => {
    getAllAirport();
    fetchApi();
  }, []);

  // setting cabin_class
  useEffect(() => {
    let cabinClass = data.FLIGHT_CLASS_DATA.find((val) => {
      // console.log(val.value == state.cabin_class);
      return val.value == state.cabin_class;
    });
    // console.log("cabin class", cabinClass);

    setCabinClass(cabinClass);
  }, [state.cabin_class]);

  // fetching ip address for sending the request to backend
  const fetchApi = () => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setState({ ...state, ip_address: data.ip }));
  };

  return (
    <div>
      {/* {console.log("cabin class:", cabin_class)} */}
      <Grid2 container alignItems={"center"}>
        <Grid2
          size={2}
          sx={{
            border: "1px solid #808080",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderRight: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
            }}
          >
            From
          </Typography>

          <Autocomplete
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  component="li"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 600,
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
                        fontWeight: 400,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.airport_name}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
            disableListWrap
          />
        </Grid2>
        <Grid2
          size={2}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            borderRight: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
            }}
          >
            To
          </Typography>

          <Autocomplete
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
            ListboxComponent={VirtualList}
            filterOptions={customFilter}
            loading={loading}
            options={airportList}
            getOptionLabel={(option) =>
              `${option.airport_name} (${option.iata_code}) - ${option.city_name}`
            }
            renderOption={(props, option) => (
              <Box {...props}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  component="li"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight: 600,
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
                        fontWeight: 400,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.airport_name}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          />
        </Grid2>

        <Grid2
          size={2}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            borderRight: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
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
              }}
              disablePast
              onChange={departureDateHandler}
              value={departureDate}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2
          size={2}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            borderRight: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
            }}
          >
            Return Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
              }}
              disablePast
              onChange={returnDateHandler}
              value={returnDate}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2
          size={2}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            height: 90,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
            }}
          >
            Travellers and cabin class
          </Typography>
          <CardActionArea sx={{ px: 2 }} onClick={openPopover}>
            <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
              {state.adult + state.child + state.infant} Persons
            </Typography>
            <Typography fontSize={13} fontFamily={nunito.style}>
              {state.adult}adult {state.child !== 0 && `,${state.child} child`}{" "}
              {state.infant !== 0 && `,${state.infant} infant`},{" "}
              {`${cabin_class.label} Class`}
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
                p: 2,
                width: "40%",
              },
            }}
          >
            <TravellerSelector
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              initialState={initialState}
              state={state}
              setState={setState}
            />
          </Popover>
          {/* popover end */}
        </Grid2>

        <Grid2 size={2} textAlign={"center"}>
          <Button
            sx={{
              color: COLORS.WHITE,
              backgroundColor: COLORS.SECONDARY,
              width: 150,
              p: 2,
            }}
            onClick={submitHandler}
          >
            {buttonLoading ? (
              <Loading
                type="bars"
                width={20}
                height={20}
                color={COLORS.WHITE}
              />
            ) : (
              "Search"
            )}
          </Button>
        </Grid2>
      </Grid2>
      <ToastBar />
    </div>
  );
};

export default RoundTrip;
