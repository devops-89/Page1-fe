import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import TravellerSelector from "./hotels/travellerSelector";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { hotelController } from "@/api/hotelController"; 
import { hotelslist } from "@/utils/hotelcitycodes"; 
import { useDispatch } from "react-redux"; 
import { setHotelList } from "@/redux/reducers/hotel-reducers/HotelList"; 
import ToastBar from "./toastBar"; 
import { TOAST_STATUS } from "@/utils/enum"; 
import { setToast } from "@/redux/reducers/toast"; 
import { setHotelFormData } from "@/redux/reducers/hotel-reducers/HotelSearchData";
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
import useFetchIP from "@/custom-hook/useFetchIp"; 
import { useRouter } from "next/router"; 

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"; 
import { useState, useMemo } from "react";
import Loading from "react-loading"; 
import moment from "moment"; 

const HotelForm = () => {
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
  const [buttonLoading, setButtonLoading] = useState(false);

  useFetchIP(setUserIp);

  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const [inputValue, setInputValue] = useState(null);

  // filter the hotel list
  const filteredOptions = useMemo(() => {
    if (!inputValue) return hotelslist.slice(0, 20);

    const cityQuery = inputValue.toLowerCase();
    return hotelslist
      .filter(
        (item) =>
          item.city_name?.toLowerCase().includes(cityQuery) ||
          item.country_name?.toLowerCase().includes(cityQuery) ||
          item.country_code?.toLowerCase().includes(cityQuery)
      )
      .slice(0, 100);
  }, [inputValue]);


  // console.log("paxRoom------------ home",paxRoom)
  const totalAdults = paxRoom.reduce((sum, room) => sum + room.Adults, 0);
  const totalChildren = paxRoom.reduce((sum, room) => sum + room.Children, 0);
  const totalRooms = paxRoom.length;

  

  // -----------Handle Search---------------
  async function handleSearch() {
    if (!checkIn || !checkOut || !selectedCity || !userIp) {
      dispatch(
        setToast({
          open: true,
          message: "Please fill all required fields.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      return;
    }

    const payload = {
      CheckIn: checkIn.format("YYYY-MM-DD"),
      CheckOut: checkOut.format("YYYY-MM-DD"),
      CityCodes: selectedCity.city_code,
      GuestNationality: selectedCity.country_code,
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

    console.log("paload printing:",payload);

    dispatch(setHotelFormData({
      selectedCity,
      paxRoom,
      checkIn:checkIn.format("DD-MM-YYYY"),
      checkOut:checkOut.format("DD-MM-YYYY"),
      userIp
    }));



    try {
      setButtonLoading(true);
      const response = await hotelController.searchHotel(payload); 
      if (response.data?.data?.length > 0) { 
        dispatch(setHotelList(response?.data?.data));
        router.push("/hotel-list");
      } else {
        dispatch(
          setToast({
            open: true,
            message: "No Hotel Available",
            severity: TOAST_STATUS.ERROR,
          })
        );
      }
      setButtonLoading(false);
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: error.message || "An error occurred during the search.",
          severity: TOAST_STATUS.ERROR,
        })
      );
      setButtonLoading(false);
    }
  }

  function handleCheckin(newvalue) {
    setCheckIn(newvalue);
  }

  function handleCheckout(newvalue) {
    setCheckOut(newvalue);
  }

  // console.log("paxRoom----------------",paxRoom)


  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 16, fontFamily: raleway.style, mb: 2 }}>
        Book Hotel - Villas, Apartments & more.
      </Typography>
      <Grid2
        container
        alignItems={"center"}
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #808080",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            flexGrow: { xs: 1, sm: 0, lg: 0 },
            mb: { xs: 1, sm: 0 }, 
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
            Property name or Location
          </Typography>

          <Autocomplete
            options={filteredOptions}
            inputValue={inputValue}
            onChange={(event, value) => setSelectedCity(value)}
            onInputChange={(_, value) => setInputValue(value)}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option?.city_name || ""
            }
            isOptionEqualToValue={(option, value) =>
              option.city_code === value.city_code
            }
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
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ApartmentIcon sx={{ color: COLORS.PRIMARY }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 800,
                          fontFamily: nunito.style,
                        }}
                      >
                        {option.city_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: COLORS.DARKGREY,
                          fontFamily: nunito.style,
                        }}
                      >
                        {option.country_name}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Right: country code */}
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: COLORS.DARKGREY,
                      fontFamily: nunito.style,
                      fontWeight: 600,
                    }}
                  >
                    {option.country_code}
                  </Typography>
                </Stack>
              </Box>
            )}
          />
        </Grid2>
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #808080",
            position: "relative",
            flexGrow: { xs: 1, sm: 0, lg: 0 },
             mb: { xs: 1, sm: 0 },
            borderTopLeftRadius: { sm: 0, xs: 4 },
            borderBottomLeftRadius: { sm: 0, xs: 4 },
             borderTopRightRadius: { sm: 0, xs: 4 },
            borderBottomRightRadius: { sm: 0, xs: 4 },

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
            Check In
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
              }}
              disablePast
              value={checkIn}
              onChange={handleCheckin}
              maxDate={moment().add(90, "days")}
              minDate={moment()}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #808080",
            position: "relative",
            flexGrow: { xs: 1, sm: 0, lg: 0 },
             mb: { xs: 1, sm: 0 },
            borderTopLeftRadius: { sm: 0, xs: 4 },
            borderBottomLeftRadius: { sm: 0, xs: 4 },
             borderTopRightRadius: { sm: 0, xs: 4 },
            borderBottomRightRadius: { sm: 0, xs: 4 },
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
            Check Out
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
              }}
              maxDate={moment().add(90, "days")}
              // Ensure check-out is after check-in
              minDate={checkIn ? moment(checkIn).add(1, "day") : moment()}
              value={checkOut}
              onChange={handleCheckout}
              disablePast
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
          sx={{
            border: "1px solid #808080",
            position: "relative",
            height: 90,
            borderTopLeftRadius: { sm: 0, xs: 4 },
            borderBottomLeftRadius: { sm: 0, xs: 4 },
            borderTopRightRadius: { lg: 4, sm: 4, xs: 4 },
            borderBottomRightRadius: { lg: 4, sm: 4, xs: 4 },
            flexGrow: { xs: 1, sm: 0, lg: 0 },
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
            Travellers Selection
          </Typography>
          <CardActionArea sx={{ px: 2 }} onClick={openPopover}>
            <Typography sx={{ fontSize: 17, fontFamily: nunito.style }}>
              {totalAdults + totalChildren} Person, {totalRooms} Rooms
            </Typography>
            <Typography fontSize={13} fontFamily={nunito.style}>
              {totalAdults} Adult{totalAdults !== 1 ? "s" : ""},{" "}
              {totalChildren} Child{totalChildren !== 1 ? "ren" : ""}
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
             transformOrigin={{
               vertical: "top",
               horizontal: "center",
             }}
            onClose={() => setAnchorEl(null)}
            sx={{
              "& .MuiPopover-paper": {
                boxShadow:
                  " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
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
            {/* Traveller selection form end */}
          </Popover>
          {/* popover end */}
        </Grid2>
        <Grid2 size={{ lg: 12, xs: 12, sm: 12 }} sx={{ textAlign: "center" }}>
          <Button
            disabled={buttonLoading}
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              width: { lg: 150, md: 150, sm: 120, xs: 120 },
              mt: { lg: 2, sm: 1, xs: 2 },
              cursor: buttonLoading ? "not-allowed" : "pointer",
              fontSize: { lg: 16, md: 16, sm: 16, xs: 10 },
              py: { lg: 1.5, md: 1.5, sm: 1, xs: 1 },
               opacity: buttonLoading ? 0.7 : 1, // Add visual disabled state
            }}
            onClick={handleSearch}
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
    </Box>
  );
};

export default HotelForm;