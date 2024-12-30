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
import { useState } from "react";
import TravellerSelector from "./travellerSelector";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const Multiway = () => {
  const [forms, setForms] = useState([1, 2]);
  const maxForms = 4;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const addForm = () => {
    if (forms.length < maxForms) {
      setForms([...forms, forms.length + 1]);
    }
  };

  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

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
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 15,
                fontFamily: nunito.style,
                color: COLORS.DARKGREY,
                pb: 1,
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
              options={data.airportData}
              getOptionLabel={(option) => option.primary}
            />
          </Grid2>

          {/* To Field */}
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 15,
                fontFamily: nunito.style,
                color: COLORS.DARKGREY,
                pb: 1,
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
              options={data.airportData}
              getOptionLabel={(option) => option.primary}
            />
          </Grid2>

          {/* Departure Field */}
          <Grid2 size={3}>
            <Typography
              sx={{
                fontSize: 15,
                fontFamily: nunito.style,
                color: COLORS.DARKGREY,
                pb: 1,
              }}
            >
              Departure
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                disablePast
                sx={{
                  fieldset: { border: "none" },
                }}
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
                  <Typography sx={{ fontSize: 17, fontFamily: nunito.style }}>
                    4 Persons
                  </Typography>
                  <Typography fontSize={13} fontFamily={nunito.style}>
                    1 Adult, Economy
                  </Typography>
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
            color: COLORS.WHITE,
            backgroundColor: COLORS.SECONDARY,
            width: 150,
            p: 2,
          }}
        >
          Search
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
        <TravellerSelector anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Popover>
      {/* popover end */}
    </Box>
  );
};

export default Multiway;
