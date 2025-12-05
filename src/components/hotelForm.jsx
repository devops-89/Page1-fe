import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import TravellerSelector from "./hotels/travellerSelector";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { hotelController } from "@/api/hotelController";
import { hotelslist } from "@/utils/hotelcitycodes";
import { useDispatch } from "react-redux";
import { setHotelList } from "@/redux/reducers/hotel-reducers/HotelList";
import { TOAST_STATUS } from "@/utils/enum";
import { setToast } from "@/redux/reducers/toast";
import { setHotelFormData } from "@/redux/reducers/hotel-reducers/HotelSearchData";
import React, { useEffect, useRef, useState } from "react";
// import NewLoader from "./NewLoader";
import ReactLoading from "react-loading";
import {
  Autocomplete,
  Box,
  Button,
  CardActionArea,
  Grid2,
  Popover,
  Portal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useFetchIP from "@/custom-hook/useFetchIp";
import { useRouter } from "next/router";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const HotelForm = ({ setUiLocked, uiLocked }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [paxRoom, setPaxRoom] = useState([
    { Adults: 1, Children: 0, ChildrenAges: [] },
  ]);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [userIp, setUserIp] = useState("");
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [nationalityLoading, setNationalityLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");
  const navigatedRef = useRef(false);
  const [cityLoading, setCityLoading] = useState(false);
  // debounce the input that we want to send in query for city and hotel search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);

    return () => clearTimeout(handler);
  }, [inputValue]);

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

  useFetchIP(setUserIp);

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    if (uiLocked) return;
    setAnchorEl(e.currentTarget);
  };

  // nationality list
  useEffect(() => {
    let mounted = true;
    async function fetchNationalities() {
      setNationalityLoading(true);
      try {
        const res = await hotelController.searchCountry();
        const raw = res?.data?.data ?? res?.data ?? res ?? [];
        const normalized = (Array.isArray(raw) ? raw : [])
          .map((c) => ({
            country_code:
              c.country_code || c.code || c.countryCode || c.iso || c.iso2,
            country_name:
              c.country_name ||
              c.name ||
              c.countryName ||
              c.label ||
              c.country ||
              c.country_fullname,
          }))
          .filter((c) => c.country_code && c.country_name);
        if (mounted) setNationalityOptions(normalized);
      } catch (error) {
        console.error("Failed to load nationality list:", error);
        dispatch(
          setToast({
            open: true,
            message: "Unable to load nationality list.",
            severity: TOAST_STATUS.ERROR,
          })
        );
      } finally {
        if (mounted) setNationalityLoading(false);
      }
    }
    fetchNationalities();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // city filter
  // const filteredOptions = useMemo(() => {
  //   if (!inputValue) return hotelslist.slice(0, 20);
  //   const q = inputValue.toLowerCase();
  //   return hotelslist
  //     .filter(
  //       (item) =>
  //         item.city_name?.toLowerCase().includes(q) ||
  //         item.country_name?.toLowerCase().includes(q) ||
  //         item.country_code?.toLowerCase().includes(q)
  //     )
  //     .slice(0, 100);
  // }, [inputValue]);

  useEffect(() => {
    let mounted = true;

    async function fetchHotels() {
      setCityLoading(true);
      try {
        const response = await hotelController.searchCityHotelCodes(
          debouncedValue
        );
        if (!mounted) return;
        setFilteredOptions(response.data || []);
      } catch (error) {
        console.log("API Error:", error);
        if (mounted) setFilteredOptions([]);
      } finally {
        if (mounted) setCityLoading(false);
      }
    }
    fetchHotels();

    return () => {
      mounted = false;
    };
  }, [debouncedValue]);

  const totalAdults = paxRoom.reduce((s, r) => s + r.Adults, 0);
  const totalChildren = paxRoom.reduce((s, r) => s + r.Children, 0);
  const totalRooms = paxRoom.length;
  const totalPeople = totalAdults + totalChildren;

  // search
  async function handleSearch() {
    if (uiLocked) return;
    if (
      !checkIn ||
      !checkOut ||
      !selectedCity ||
      !userIp ||
      !selectedNationality
    ) {
      dispatch(
        setToast({
          open: true,
          message: "Please fill all required fields.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      return;
    }

    setAnchorEl(null);
    setUiLocked(true);
    navigatedRef.current = false;
    const cityCodeString = selectedCity?.cityCode
      ? String(selectedCity.cityCode)
      : selectedCity?.hotelCode
        ? String(selectedCity.hotelCode)
        : "";
    const payload = {
      CheckIn: checkIn.format("YYYY-MM-DD"),
      CheckOut: checkOut.format("YYYY-MM-DD"),
      CityCodes: cityCodeString,
      GuestNationality: selectedNationality.country_code,
      EndUserIp: userIp,
      PaxRooms: paxRoom,
      ResponseTime: 23.0,
      IsDetailedResponse: true,
      Filters: {
        Refundable: false,
        NoOfRooms: 0,
        MealType: 0,
        OrderBy: 0,
        StarRating: 0,
        HotelName: null,
      },
    };

    dispatch(
      setHotelFormData({
        selectedCity,
        paxRoom,
        checkIn: checkIn.format("DD-MM-YYYY"),
        checkOut: checkOut.format("DD-MM-YYYY"),
        userIp,
        nationality: selectedNationality,
      })
    );

    try {
      const response = await hotelController.searchHotel(payload);
      const list = response?.data?.data ?? [];
      if (Array.isArray(list) && list.length > 0) {
        dispatch(setHotelList(list));
        // router.push("/hotel-list").then((ok) => {
        //   if (ok) navigatedRef.current = true;
        // });
        if (selectedCity?.type === "hotel") {
          const hotelId = String(
            selectedCity.hotelCode || selectedCity.hotelCode
          );
          // router.push(`/hotel-list/${hotelId}`).then((ok) => {
          //   if (ok) navigatedRef.current = true;
          // });
          router.push({
            pathname: "/hotel-list",
            query: { hotelCode: hotelId },
          });
        } else {
          router.push("/hotel-list").then((ok) => {
            if (ok) navigatedRef.current = true;
          });
        }
      } else {
        dispatch(
          setToast({
            open: true,
            message: "No Hotel Available",
            severity: TOAST_STATUS.ERROR,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: error?.message || "An error occurred during the search.",
          severity: TOAST_STATUS.ERROR,
        })
      );
    } finally {
      if (!navigatedRef.current) setUiLocked(false);
    }
  }

  function handleCheckin(v) {
    setCheckIn(v);
    if (checkOut && v && moment(checkOut).isSameOrBefore(v, "day")) {
      setCheckOut(moment(v).add(1, "day"));
    }
  }
  function handleCheckout(v) {
    setCheckOut(v);
  }
  console.log("selected city : ", selectedCity);
  return (
    <Box sx={{ p: 2, position: "relative" }} aria-busy={uiLocked}>
      {/* Full-screen blur overlay + NewLoader (replaces Backdrop) */}
      <Portal>
        {uiLocked && (
          <Box
            role="dialog"
            aria-label="Loading"
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: (t) => t.zIndex.modal + 10,
              // blur the whole app behind, keep content dimmed
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              backgroundColor: "rgba(0,0,0,0.25)",
              display: "grid",
              placeItems: "center",
              pointerEvents: "auto",
            }}
          >
            <Stack alignItems="center" spacing={2}>
              {/* <NewLoader open /> */}
              <ReactLoading
                type="bars"
                color={COLORS.PRIMARY}
                height={50}
                width={50}
              />
              <Typography
                sx={{
                  fontFamily: nunito.style,
                  fontWeight: 700,
                  color: "#FFF",
                  fontSize: 20,
                }}
              >
                Searching hotels…
              </Typography>
            </Stack>
          </Box>
        )}
      </Portal>

      <Typography sx={{ fontSize: 16, fontFamily: raleway.style, mb: 2 }}>
        Book Hotels, Villas & Apartments
      </Typography>

      <Grid2
        container
        alignItems="center"
        spacing={{ xs: 1, md: 2 }}
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: { lg: 0.5 },
          pointerEvents: uiLocked ? "none" : "auto",
          userSelect: uiLocked ? "none" : "auto",
        }}
      >
        {/* city */}
        <Grid2
          size={{ lg: 2.5, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            // border: "1px solid #D9D9D9",
            // background: "#F9F9F9",
            // borderTopLeftRadius: { xs: 6, sm: 4 },
            // borderBottomLeftRadius: { xs: 6, sm: 4 },
            // borderTopRightRadius: { xs: 6, sm: 4 },
            // borderBottomRightRadius: { xs: 6, sm: 4 },
            background: COLORS.SEMIGREY,
            borderRadius: { xs: 2, lg: 0 },
            borderTopLeftRadius: { lg: 12 },
            borderBottomLeftRadius: { lg: 12 },
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
            Property Name or Location
          </Typography>
          <Autocomplete
            options={filteredOptions}
            // value={selectedCity}
            inputValue={inputValue}
            onChange={(_, value) => setSelectedCity(value)}
            onInputChange={(_, value) => setInputValue(value)}
            // getOptionLabel={(option) => option?.name || ""}
            getOptionLabel={(option) =>
              option
                ? option.type === "city"
                  ? option.cityName || ""
                  : option.hotelName || ""
                : ""
            }
            isOptionEqualToValue={(option, value) =>
              option.cityCode === value.cityCode
            }
            loading={cityLoading}
            loadingText="Loading..."
            noOptionsText={cityLoading ? "Loading..." : "No options"}
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
            renderOption={(props, option) => {
              const label =
                option.type === "city" ? option.cityName : option.hotelName;
              return (
                <Box component="li" {...props}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {/* CONDITIONAL ICON */}
                      {option.type === "city" ? (
                        <LocationOnIcon sx={{ color: COLORS.PRIMARY }} />
                      ) : (
                        <ApartmentIcon sx={{ color: COLORS.PRIMARY }} />
                      )}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 800,
                            fontFamily: nunito.style,
                          }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 800,
                            fontFamily: nunito.style,
                          }}
                        >
                          {option.countryName}
                          {/* {option.type === "city"
                            ? option.cityName
                            : option.HotelName} */}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              );
            }}
          />
        </Grid2>

        {/* check-in */}
        <Grid2
          size={{ lg: 2, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            // border: "1px solid #D9D9D9",
            // background: "#F9F9F9",
            // borderTopLeftRadius: { xs: 6, sm: 4 },
            // borderBottomLeftRadius: { xs: 6, sm: 4 },
            // borderTopRightRadius: { xs: 6, sm: 4 },
            // borderBottomRightRadius: { xs: 6, sm: 4 },
            background: COLORS.SEMIGREY,
            overflow: "visible",
            borderRadius: { xs: 2, lg: 0 },
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
            Check In
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{ fieldset: { border: "none" } }}
              disablePast
              value={checkIn}
              onChange={handleCheckin}
              maxDate={moment().add(90, "days")}
              minDate={moment()}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Grid2>

        {/* check-out */}
        <Grid2
          size={{ lg: 2, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            // border: "1px solid #D9D9D9",
            // background: "#F9F9F9",
            // borderTopLeftRadius: { xs: 6, sm: 4 },
            // borderBottomLeftRadius: { xs: 6, sm: 4 },
            // borderTopRightRadius: { xs: 6, sm: 4 },
            // borderBottomRightRadius: { xs: 6, sm: 4 },
            background: COLORS.SEMIGREY,
            overflow: "visible",
            borderRadius: { xs: 2, lg: 0 },
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
            Check Out
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{ fieldset: { border: "none" } }}
              maxDate={moment().add(90, "days")}
              minDate={checkIn ? moment(checkIn).add(1, "day") : moment()}
              value={checkOut}
              onChange={handleCheckout}
              disablePast
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Grid2>

        {/* nationality */}
        <Grid2
          size={{ lg: 2, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            // border: "1px solid #D9D9D9",
            // background: "#F9F9F9",
            // borderTopLeftRadius: { xs: 6, sm: 4 },
            // borderBottomLeftRadius: { xs: 6, sm: 4 },
            // borderTopRightRadius: { xs: 6, sm: 4 },
            // borderBottomRightRadius: { xs: 6, sm: 4 },
            background: COLORS.SEMIGREY,
            overflow: "visible",
            borderRadius: { xs: 2, lg: 0 },
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
            Nationality
          </Typography>
          <Autocomplete
            options={nationalityOptions}
            loading={nationalityLoading}
            getOptionLabel={(option) =>
              option.country_name || option.country_code
            }
            isOptionEqualToValue={(option, value) =>
              option.country_code === value.country_code
            }
            onChange={(_, value) => setSelectedNationality(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select nationality"
                sx={{ fieldset: { border: "none" } }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography sx={{ fontFamily: nunito.style }}>
                    {option.country_name}
                  </Typography>
                  <Typography sx={{ fontFamily: nunito.style }}>
                    {option.country_code}
                  </Typography>
                </Stack>
              </Box>
            )}
          />
        </Grid2>

        {/* travellers */}
        <Grid2
          size={{ lg: 2.1, xs: 12, sm: 6, md: 2.4 }}
          sx={{
            // border: "1px solid #D9D9D9",
            // background: "#F9F9F9",
            // borderTopLeftRadius: { xs: 6, sm: 4 },
            // borderBottomLeftRadius: { xs: 6, sm: 4 },
            // borderTopRightRadius: { xs: 6, sm: 4 },
            // borderBottomRightRadius: { xs: 6, sm: 4 },
            background: COLORS.SEMIGREY,
            overflow: "visible",
            borderRadius: { xs: 2, lg: 0 },
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
            Travellers Selection
          </Typography>
          <CardActionArea sx={{ px: 2 }} onClick={openPopover}>
            <Typography sx={{ fontSize: 17, fontFamily: nunito.style }}>
              {totalPeople} {totalPeople === 1 ? "Person" : "People"},{" "}
              {paxRoom.length} {paxRoom.length === 1 ? "Room" : "Rooms"}
            </Typography>
            <Typography fontSize={13} fontFamily={nunito.style}>
              {totalAdults} {totalAdults === 1 ? "Adult" : "Adults"}
              {totalChildren > 0
                ? `, ${totalChildren} ${totalChildren === 1 ? "Child" : "Children"
                }`
                : ""}
            </Typography>
          </CardActionArea>

          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setAnchorEl(null)}
            sx={{
              "& .MuiPopover-paper": {
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                p: 2,
                width: { lg: "40%", md: "60%", sm: "80%", xs: "95%" },
              },
            }}
          >
            <TravellerSelector
              setPaxRoom={setPaxRoom}
              setAnchorEl={setAnchorEl}
              paxRoom={paxRoom}
            />
          </Popover>
        </Grid2>

        {/* search button */}
        <Grid2 size={{ lg: 2, md: 2.4, xs: 12, sm: 12 }} textAlign="center">
          <Button
            disabled={uiLocked}
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              // width: { lg: 150, md: 150, sm: 120, xs: 120 },
              width: "100%",
              height: "100%",
              // mt: { lg: 2, sm: 1, xs: 2 },
              cursor: uiLocked ? "not-allowed" : "pointer",
              fontSize: { lg: 16, md: 16, sm: 16, xs: 14 },
              py: { lg: 1.5, md: 1.5, sm: 1, xs: 1 },
              borderRadius: { xs: 2, lg: 0 },
              borderTopRightRadius: { lg: 12 },
              borderBottomRightRadius: { lg: 12 },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HotelForm;
