import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import TravellerSelector from "./hotels/travellerSelector";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { createFilterOptions } from "@mui/material";
import { hotelslist } from "@/utils/hotelcitycodes";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState,useMemo } from "react";


const HotelForm = () => {
  const [selectedCity,setSelectedCity]=useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [adultValue, setAdultValue] = useState(1);
  const [childValue, setChildValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const initialState = {
    ip_address: "",
    preferred_time: "",
    origin: "",
    destination: "",
    departure_date: "",
    cabin_class: "1",
    adult: 1,
    child: 0,
    infant: 0,
  };

  const [state, setState] = useState(initialState);



  const [inputValue, setInputValue] = useState(null);

  // const [options, setOptions] = useState(hotelslist.slice(0, 20)); // Show top 20 initially

  // This memoized filter only runs when user types
  const filteredOptions = useMemo(() => {
    if (!inputValue) return hotelslist.slice(0, 20); // popular/trending

    const lower = inputValue.toLowerCase();
    return hotelslist.filter(
      (item) =>
        item.city_name?.toLowerCase().includes(lower) ||
        item.country_name?.toLowerCase().includes(lower) ||
        item.country_code?.toLowerCase().includes(lower)
    ).slice(0, 100); // limit results to avoid lag
  }, [inputValue]);

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
  onchan
  inputValue={inputValue}
  onChange={(event,value)=> setSelectedCity(value)}
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
        {/* Left: icon and city details */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <ApartmentIcon sx={{ color: COLORS.PRIMARY }} />
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {option.city_name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
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
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
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
            Check Out
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                fieldset: {
                  border: "none",
                },
              }}
              disablePast
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2
          size={{ lg: 3, xs: 12, sm: 6 }}
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
            <Typography sx={{ fontSize: 17, fontFamily: nunito.style }}>
              4 Persons
            </Typography>
            <Typography fontSize={13} fontFamily={nunito.style}>
              1 Adult, Economy
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
            {/* <TravellerSelector anchorEl={anchorEl} setAnchorEl={setAnchorEl} /> */}
            {/* Traveller selection form start */}
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
            {/* Traveller selection form end */}
          </Popover>
          {/* popover end */}
        </Grid2>
        <Grid2 size={{ lg: 12, xs: 12, sm: 12 }} sx={{ textAlign: "center" }}>
          <Button
            sx={{
              color: COLORS.WHITE,
              backgroundColor: COLORS.SECONDARY,
              width: { lg: 150, md: 150, sm: 120, xs: 120 },
              py: { lg: 1.5, md: 1.5, sm: 1, xs: 1 },
              mt: 2,
            }}

            onClick={()=>console.log(selectedCity)}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HotelForm;
