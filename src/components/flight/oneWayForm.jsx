import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
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

import { flightController } from "@/api/flightController";
import { JOURNEY_TYPE, PREFERRED_TIME, TOAST_STATUS } from "@/utils/enum";
import { customFilter } from "@/utils/regex";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import VirtualList from "./fixedSizeList";
import TravellerSelector from "./travellerSelector";
import { setToast } from "@/redux/reducers/toast";
import { data } from "@/assests/data";
import Loading from "react-loading";
import { setFlightDetails } from "@/redux/reducers/flightInformation";
import { useRouter } from "next/router";

const OnewayForm = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState("/oneway-flightlist");

  const [initialValue, setIntialValue] = useState({
    adult: adultValue,
    child: childValue,
    infant: infantValue,
  });

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const initialState = {
    ip_address: "",
    journey_type: JOURNEY_TYPE.ONEWAY,
    preferred_time: PREFERRED_TIME.AnyTime,
    origin: "",
    originAirport: "",
    originCity: "",
    destination: "",
    destinationAirport: "",
    destinationCity: "",
    departure_date: "",
    cabin_class: "1",
    adult: 1,
    child: 0,
    infant: 0,
    direct_flight: false,
    one_stop_flight: false,
  };

  const [state, setState] = useState(initialState);

 

  const dispatch = useDispatch();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const originhandler = (e, newValue) => {
    setOrigin(newValue);
    if (newValue) {
      setState({
        ...state,
        origin: newValue.iata_code,
        originAirport: newValue.airport_name,
        originCity: newValue.city_name,
      });
    //   if(router.pathname===defaultRoute){
    //   setNewFormData((prev)=>{
    //     return ({
    //       ...prev,
    //       origin: newValue.iata_code,
    //       originAirport: newValue.airport_name,
    //       originCity: newValue.city_name,
    //   })
    //   })

    // }
    }
  };
  const destinationHandler = (e, newValue) => {
    setDestination(newValue);
    if (newValue) {
      setState({
        ...state,
        destination: newValue.iata_code,
        destinationAirport: newValue.airport_name,
        destinationCity: newValue.city_name,
      });

      // if(router.pathname===defaultRoute){
      //   setNewFormData((prev)=>{
      //     return ({
      //       ...prev,
      //       destination: newValue.iata_code,
      //     destinationAirport: newValue.airport_name,
      //     destinationCity: newValue.city_name,
      //   })
      //   })
      // }
   
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
      // if(router.pathname===defaultRoute){
      //   setNewFormData((prev)=>{
      //     return ({
      //       ...prev,
      //       departure_date: moment(newDate._d).format("YYYY-MM-DD")
      //   })
      //   })
      // }
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
      .then((data) => setState({ ...state, ip_address: data.ip }));
  };

  const searchFlight = () => {
    setButtonLoading(true);
    flightController
      .searchFlight(state)
      .then((res) => {
        let response = res.data.data;
        dispatch(setFlightDetails({ ...response }));
        localStorage.setItem("flightData", JSON.stringify(response));
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
    // }


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

  // useEffect(() => {
  //   if (localStorage.getItem("state")) {
  //     setNewFormData(JSON.parse(localStorage.getItem("state")));
  //     console.log("set new form data useeffect is running");
  //   }
  // }, []);



  const [cabin_class, setCabinClass] = useState("");
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

  return (
    <>
      <Grid2 container alignItems={"center"} justifyContent={"center"} sx={{ display:"flex" , alignItems:"stretch"}}>
        <Grid2
          size={{ lg: 3, xs: 6, sm: 6, md: 2.4 }}
          sx={{
            border: "1px solid #808080",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
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
          // size={{ lg: 2.4, xs: 6 }}
          size={{ lg: 3, md: 2.4, xs: 6, sm: 6 }}
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
          // size={{ lg: 2.4, xs: 6 }}
          size={{ lg: 3, md: 2.4, xs: 6, sm: 6 }}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            overflow: "visible",
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

                ".MuiSvgIcon-root": {
                  fontSize: "1.5rem", // Adjust icon size
                },
              }}
              disablePast
              onChange={departureDateHandler}
              value={departureDate}
              format="DD/MM/YYYY"
              slotProps={{
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
          // size={{ lg: 2.4, xs: 6 }}
          size={{ lg: 3, md: 2.4, xs: 6, sm: 6 }}
          sx={{
            border: "1px solid #808080",

            position: "relative",
            alignItems:"stretch",
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            flex:1
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 15, md: 13, sm: 12, xs: 12 },
              fontFamily: nunito.style,
              color: COLORS.DARKGREY,
              px: 2,
              pt: 1,
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
                p: { lg: 2 },
                py: { xs: 2, sm: 2, md: 2, lg: 2 },
                width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
              },
            }}
          >
            <TravellerSelector
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              initialState={initialState}
              state={state}
              setState={setState}
              adultValue={adultValue}
              setAdultValue={setAdultValue}
              infantValue={infantValue}
              setInfantValue={setInfantValue}
              childValue={childValue}
              setChildValue={setChildValue}
              initialValue={initialValue}
              setIntialValue={setIntialValue}
              defaultRoute={defaultRoute}
            />
          </Popover>
          {/* popover end */}
        </Grid2>
        <Grid2
          //  size={{ lg: 2.4, xs: 12 }}
          size={{ lg: 12, md: 2.4, xs: 12, sm: 12 }}
          textAlign={"center"}
        >
          <Button
            disabled={buttonLoading}
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              width: 150,
              p: 2,
              mt: { lg: 2, sm: 1, xs: 2 },
              cursor: buttonLoading ? "not-allowed" : "pointer",
              fontSize: { lg: 16, md: 16, sm: 16, xs: 10 },
              py: 1.5,
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
    </>
  );
};

export default OnewayForm;
