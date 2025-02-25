import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
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
import { useState } from "react";

const HotelForm = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 16, fontFamily: raleway.style, mb: 2 }}>
        Book Hotel - Villas, Apartments & more.
      </Typography>
      <Grid2 container alignItems={"center"}> 
        <Grid2
            size={{ lg: 2.4, xs: 12,sm:6 }}
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
          Property name or Location
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
             size={{ lg: 2.4, xs: 12,sm:6 }}
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
             size={{ lg: 2.4, xs: 12,sm:6 }}
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
            size={{ lg: 2.4, xs: 12,sm:6 }}
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
            <Box>Kunal</Box>
          </Popover>
          {/* popover end */}
        </Grid2>
        <Grid2    size={{ lg: 2.4, xs: 12,sm:12 }} sx={{ textAlign: "center" }}>
          <Button
            sx={{
              color: COLORS.WHITE,
              backgroundColor: COLORS.SECONDARY,
              width: 150,
              p: 2,
              mt: { lg: 0, sm: 1 ,xs:2 },
            }}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HotelForm;
