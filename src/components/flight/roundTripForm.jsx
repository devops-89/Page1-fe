import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { useState, useEffect } from "react";
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
  useMediaQuery
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useRouter } from "next/router";

import TravellerSelector from "./travellerSelector";
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
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

const RoundTrip = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const phone = useMediaQuery("(max-width:600px)");

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [airportList, setAirportList] = useState([]);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [initialValue, setIntialValue] = useState({
    adult: adultValue,
    child: childValue,
    infant: infantValue,
  });
  const [state, setState] = useState(initialState);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cabin_class, setCabinClass] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [defaultRoute, setDefaultRoute]= useState('/roundtrip-flightlist')
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };




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
  
      if (returnDate && moment(returnDate).isSameOrBefore(newDate, "day")) {
        const updatedReturnDate = moment(newDate).add(1, "day");
        setReturnDate(updatedReturnDate);
        setState({
          ...state,
          return_date: updatedReturnDate.format("YYYY-MM-DD"),
        });
      }
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
        let response = res.data.data;
        dispatch(setFlightDetails({ ...response }));
        // console.log("response ", response)
        localStorage.setItem("roundflightData", JSON.stringify(response));
        setButtonLoading(false);
        router.pathname !== defaultRoute
        ? router.push(defaultRoute)
        : window.location.reload();
      })
      .catch((err) => {
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
          message: `Please Enter the Required Fields`,
          severity: TOAST_STATUS.ERROR,
        })
      );
    } else {
      localStorage.setItem("roundState", JSON.stringify(state));
      searchFlight();
    }
  };

  useEffect(() => {
    getAllAirport();
    fetchApi();
  }, []);

  useEffect(() => {
    let cabinClass = data.FLIGHT_CLASS_DATA.find((val) => {
      return val.value == state.cabin_class;
    });

      setCabinClass(cabinClass);
    }, [state.cabin_class]);
  

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
           size={{ lg: 2.4, md:2.4, xs: 6,sm:6, }}
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
                  <Grid2 container sx={{width:'100%', borderBottom:`1px solid ${COLORS.SEMIGREY}`}}>
                  <Grid2 size={{xs:2}}>
                    <FlightTakeoffIcon sx={{color:COLORS.PRIMARY, marginRight:'10px'}}/>
                  </Grid2>
                 
                  <Grid2 size={{xs:6}}>
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
                  <Grid2 size={{xs:4}}>
                  <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight:800,
                        color: COLORS.BLACK,
                        textAlign: "end",
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
                  zIndex: 100
                }
              }
           }}
          />
        </Grid2>
        <Grid2
          size={{ lg: 2.4, md:2.4, xs: 6,sm:6, }}
          sx={{
            border: "1px solid #808080",

            position: "relative",
          
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
                <Grid2 container sx={{width:'100%', borderBottom:`1px solid ${COLORS.SEMIGREY}`}}>
                  <Grid2 size={{xs:2}}>
                    <FlightLandIcon sx={{color:COLORS.PRIMARY, marginRight:'10px'}}/>
                  </Grid2>
                 
                  <Grid2 size={{xs:6}}>
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
                  <Grid2 size={{xs:4}}>
                  <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: nunito.style,
                        fontWeight:800,
                        color: COLORS.BLACK,
                        textAlign: "end",
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
                  zIndex: 100
                }
              }
           }}
          />
        </Grid2>

        <Grid2
           size={{ lg: 2.4, md:2.4, xs: 6,sm:6, }}
       
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
              minDate={moment()}
              onChange={departureDateHandler}
              value={departureDate}
              format="DD/MM/YYYY"
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 100
                  }
                }
             }}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2
        size={{ lg: 2.4, md:2.4, xs: 6,sm:6, }}
          sx={{
            border: "1px solid #808080",

            position: "relative",
           
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
              minDate={departureDate ? moment(departureDate).add(1, "day") : moment()}
              onChange={returnDateHandler}
              value={returnDate}
              format="DD/MM/YYYY"
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 100
                  }
                }
             }}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2
          size={{ lg: 2.4, md:2.4, xs: 12,sm:6, }}

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
              fontSize: {lg:15, md:13 ,sm:12 ,xs:12},
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
            }}
          >
            Travellers and cabin class
          </Typography>
                  <CardActionArea sx={{ px: 2 }} onClick={openPopover}>
                  <Typography sx={{ fontSize: {lg:14 , md:13 ,sm:10 ,xs:12}, fontFamily: nunito.style }}>
                {state.adult + state.child + state.infant} Persons
              </Typography>

              <Typography fontSize={{lg:14 ,md:13 ,sm:10,xs:12}} fontFamily={nunito.style}>
                {state.adult}adult{" "}
                {state.child !== 0 && `,${state.child} child`}{" "}
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

        <Grid2   size={{ lg: 12, md:12, xs: 12,sm:6, }} textAlign={"center"} mt={{lg:2}} >
          <Button
            disabled={buttonLoading}
            sx={{
              color: COLORS.WHITE,
              backgroundColor: COLORS.SECONDARY,
              width: 150,
              p: 2,
              mt: { lg: 0, sm: 1 ,xs:2 },
              cursor: buttonLoading ? "not-allowed" : "pointer",
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
