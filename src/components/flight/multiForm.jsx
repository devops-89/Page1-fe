import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  Grid2,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useState } from "react";
import TravellerSelector from "./travellerSelector";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { JOURNEY_TYPE, PREFERRED_TIME } from "@/utils/enum";
import { useRouter } from "next/router";
import { flightController } from "@/api/flightController";
import { useDispatch } from "react-redux";
import VirtualList from "./fixedSizeList";
import { customFilter } from "@/utils/regex";
import Loading from "react-loading";

const Multiway = () => {
  const router = useRouter();
  const [forms, setForms] = useState([1, 2]);
  const maxForms = 4;
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [defaultRoute, setDefaultRoute] = useState("/multi-list");
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
    multicity: [
      {
        origin: "",
        destination: "",
        departure_date: "",
        cabin_class: "1",
      }
    ],
    adult: 1,
    child: 0,
    infant: 0,
    direct_flight: false,
    one_stop_flight: false,
  };

  const [state, setState] = useState(initialState);
  const [newFormData, setNewFormData] = useState(null);

  const addForm = () => {
    if (forms.length < maxForms) {
      setForms([...forms, forms.length + 1]);
    }
  };

  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

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
          localStorage.setItem("multiwayData", JSON.stringify(response));
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
          message: `Please Enter the Required Fields : ${emptyFields}`,
          severity: TOAST_STATUS.ERROR,
        })
      );
    } else {
      localStorage.setItem("multistate", JSON.stringify(state));
      searchFlight();
    }
  };

  const [cabin_class, setCabinClass] = useState("");
  useEffect(() => {
    getAllAirport();
    fetchApi();
  }, []);

  useEffect(() => {
    let cabinClass = data.FLIGHT_CLASS_DATA.find((val) => {
      if (router.pathname === defaultRoute && newFormData) {
        return val.value == newFormData.cabin_class;
      } else {
        return val.value == state.cabin_class;
      }
    });

    setCabinClass(cabinClass);
  }, [state.cabin_class]);

  useEffect(() => {
    if (router.pathname === defaultRoute) {
      if (newFormData) {
        setOrigin({
          airport_name: newFormData.originAirport,
          city_name: newFormData.originCity,
          iata_code: newFormData.origin,
        });
        setDestination({
          airport_name: newFormData.destinationAirport,
          city_name: newFormData.destinationCity,
          iata_code: newFormData.destination,
        });
        setDepartureDate(moment(newFormData.departure_date));
        setAdultValue(newFormData.adult);
        setChildValue(newFormData.child);
        setInfantValue(newFormData.infant);
        setState((prev) => ({
          ...prev,
          cabin_class: newFormData.cabin_class,
        }));
      }
    }
  }, [newFormData]);

  return (
    <Box
      sx={{
        maxHeight: "400px",
        overflowY: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    >
      {forms.map((_, index) => (
        <Grid2
          container
          alignItems="center"
          spacing={2}
          key={index}
          sx={{
            marginBottom: 2,
            border: "1px solid #808080",
            borderRadius: 4,
            padding: 2,
          }}
        >
          {/* From Field */}
          <Grid2
            size={3}
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

          {/* To Field */}
          <Grid2
            size={3}
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

          {/* Departure Field */}
          <Grid2
            size={3}
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

          {/* Add/Remove/Traveller Selector */}
          <Grid2 size={3} textAlign="center">
            {index === 0 ? (
              <>
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
                  {router.pathname === defaultRoute && newFormData ? (
                    <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                      {newFormData.adult +
                        newFormData.child +
                        newFormData.infant}{" "}
                      Persons
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                      {state.adult + state.child + state.infant} Persons
                    </Typography>
                  )}

                  {router.pathname === defaultRoute && newFormData ? (
                    <Typography fontSize={13} fontFamily={nunito.style}>
                      {newFormData.adult}adult{" "}
                      {newFormData.child !== 0 && `,${newFormData.child} child`}{" "}
                      {newFormData.infant !== 0 &&
                        `,${newFormData.infant} infant`}
                      , {`${cabin_class.label} Class`}
                    </Typography>
                  ) : (
                    <Typography fontSize={13} fontFamily={nunito.style}>
                      {state.adult}adult{" "}
                      {state.child !== 0 && `,${state.child} child`}{" "}
                      {state.infant !== 0 && `,${state.infant} infant`},{" "}
                      {`${cabin_class.label} Class`}
                    </Typography>
                  )}
                </CardActionArea>
              </>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeForm(index)}
                sx={{ marginTop: 3 }}
              >
                Remove
              </Button>
            )}
            {index === forms.length - 1 && forms.length < maxForms && (
              <Button
                variant="contained"
                onClick={addForm}
                sx={{ marginTop: 3 }}
              >
                Add Another Flight
              </Button>
            )}
          </Grid2>
        </Grid2>
      ))}
      <Box>
        <Button
          sx={{
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.WHITE,
            width: 150,
            p: 2,
          }}
          onClick={submitHandler}
        >
          {buttonLoading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.WHITE} />
          ) : (
            "Search"
          )}
        </Button>
      </Box>
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
          adultValue={adultValue}
          setAdultValue={setAdultValue}
          infantValue={infantValue}
          setInfantValue={setInfantValue}
          childValue={childValue}
          setChildValue={setChildValue}
          initialValue={initialValue}
          setIntialValue={setIntialValue}
          newFormData={newFormData}
          defaultRoute={defaultRoute}
        />
      </Popover>
      {/* popover end */}
    </Box>
  );
};

export default Multiway;
