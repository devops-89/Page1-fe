import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { LocationOn } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";

const PackageForm = () => {
  return (
    <Box>
      <Grid2 container alignItems={"center"}>
        <Grid2
          size={3.5}
          sx={{ borderRadius: 0, p: 1.4, borderRight: "1px solid #d7d7d7" }}
        >
          <Autocomplete
            renderInput={(params) => (
              <TextField
                label="Location"
                sx={{
                  "& fieldset": {
                    border: "none",
                    outline: "none",
                  },
                  input: {
                    fontSize: 15,
                    fontFamily: nunito.style,
                  },
                  "& label": {
                    fontSize: 15,
                  },
                }}
                {...params}
                fullWidth
              />
            )}
            options={data.tourDestination}
            renderOption={(props, option) => (
              <Box {...props} component={"li"}>
                <Typography sx={{ fontSize: 15, fontFamily: nunito.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
          />
        </Grid2>
        <Grid2
          size={3}
          sx={{ borderRadius: 0, p: 1.4, borderRight: "1px solid #d7d7d7" }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                "& fieldset": {
                  outline: "none",
                  border: "none",
                },
                "& label": {
                  fontSize: 15,
                },
                "& input": {
                  fontSize: 15,
                },
                width: "100%",
              }}
              label="Arrival"
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2
          size={3}
          sx={{ borderRadius: 0, p: 1.4, borderRight: "1px solid #d7d7d7" }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              sx={{
                "& fieldset": {
                  outline: "none",
                  border: "none",
                },
                "& label": {
                  fontSize: 15,
                },
                "& input": {
                  fontSize: 15,
                },
                width: "100%",
              }}
              label="Departure"
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={2.5} sx={{ borderRadius: 0, p: 1.4, textAlign: "center" }}>
          <Button
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              borderRadius: 4,
              width: 140,
              textAlign: "center",
              fontFamily: nunito.style,
              fontSize: 14,
              p: 1,
            }}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PackageForm;
