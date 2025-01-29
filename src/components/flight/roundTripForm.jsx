import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {useState,useEffect} from "react";
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

import TravellerSelector from "./travellerSelector";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { JOURNEY_TYPE, PREFERRED_TIME, TOAST_STATUS } from "@/utils/enum";

const RoundTrip = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
    return_date:"",
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
  const [returnDate,setReturnDate]=useState(null);
  const [cabin_class, setCabinClass] = useState("");

  // fields change handler
  const originhandler = (e, newValue) => {
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

  // setting cabin_class
  useEffect(() => {
    let cabinClass = data.FLIGHT_CLASS_DATA.find((val) => {
      console.log(val.value == state.cabin_class);
      return val.value == state.cabin_class;
    });
    console.log("cabin class", cabinClass);

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
            options={data.airportData}

            getOptionLabel={(option) => option.primary}
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
                      {option.primary}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: nunito.style,
                        fontWeight: 400,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.secondary}
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
            options={data.airportData}
            getOptionLabel={(option) => option.primary}
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
                      {option.primary}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: nunito.style,
                        fontWeight: 400,
                        color: COLORS.DARKGREY,
                      }}
                    >
                      {option.secondary}
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
                label: {
                  fontSize: 14,
                  fontFamily: nunito.style,
                },
              }}
              disablePast
              onChange={departureDateHandler}
              value={departureDate}
              format="DD-MM-YYYY"
              //   label="Select Departure Date"
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
            Return
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
                label: {
                  fontSize: 14,
                  fontFamily: nunito.style,
                },
              }}
              onChange={returnDateHandler}
              value={returnDate}
              disablePast
              format="DD-MM-YYYY"
              //   label="Select Return Date"
            />
          </LocalizationProvider>
        </Grid2>
        {/* <Grid2
          size={4}
          sx={{
            border: "1px solid #808080",
            height:90,
            position: "relative",
            borderRight: "none",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker
                localeText={{ start: "Departure", end: "Return" }}
                sx={{
                  fieldset: {
                    border: "none",
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid2> */}
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
              fontSize: 13,
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
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default RoundTrip;
