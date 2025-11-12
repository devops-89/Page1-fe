import React from "react";
import { TextField, Typography, Grid2, Box, Autocomplete } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { data } from "@/assests/data";
import { useSelector } from "react-redux";
const AddForm = ({
  isLCC,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  submitCount,
}) => {
  const newFlightValidations = useSelector(
    (state) => state.Flight.FlightValidation
  );
  console.log("new Flight Validations: ", newFlightValidations);

  const isAirAsia =
    newFlightValidations.rules.LCC.airlineSpecific.AirAsia.isAirAsia;
  console.log("mkkk", isAirAsia);
  const selectedCountryByCode =
    data.countries.find((c) => c.code === values?.country_code) || null;

  const selectedCountryByLabel =
    data.countries.find((c) => c.label === values?.country) || null;
  console.log("this is llc", isLCC);
  return (
    <>
      <Box sx={{ paddingBlock: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: roboto.style,
            fontWeight: 700,
            mb: "5px",
            color: COLORS.PRIMARY,
          }}
        >
          Booking Detail will be sent on:
        </Typography>

        <Grid2 container spacing={1}>
          {/* Phone code + number */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              Phone No (*)
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
              <Autocomplete
                disablePortal
                options={data.countries || []}
                getOptionLabel={(option) => `+${option.phone}`}
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontFamily: roboto.style,
                }}
                value={
                  data.countries.find(
                    (country) => country.phone === values?.cell_country_code
                  ) || null
                }
                onChange={(event, newValue) => {
                  setFieldValue("cell_country_code", newValue?.phone || "");
                  setFieldValue("country_code", newValue?.code || "");
                  setFieldValue("country", newValue?.label || "");
                  setFieldValue("nationality", newValue?.nationality || "");
                }}
                onBlur={handleBlur}
                renderOption={(props, option) => (
                  <li {...props} key={option.code}>
                    <img
                      loading="lazy"
                      width="18"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt={option.label}
                      style={{ marginRight: 10 }}
                    />
                    <span style={{ fontSize: "13px" }}>{option.phone}</span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Cell Code"
                    size="small"
                    error={
                      touched?.cell_country_code && !!errors?.cell_country_code
                    }
                    helperText={
                      touched?.cell_country_code && errors?.cell_country_code
                    }
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      },
                    }}
                  />
                )}
                slotProps={{ popper: { sx: { zIndex: 100 } } }}
              />

              <TextField
                fullWidth
                size="small"
                id="contact_no"
                name="contact_no"
                placeholder="Enter Phone No"
                value={values?.contact_no}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.contact_no && !!errors?.contact_no}
                helperText={touched?.contact_no && errors?.contact_no}
                inputProps={{ maxLength: 10 }}
                variant="outlined"
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                    fontFamily: roboto.style,
                  },
                }}
              />
            </Box>
          </Grid2>
          {/* City */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              City (*)
            </Typography>
            <TextField
              size="small"
              fullWidth
              id="city"
              name="city"
              placeholder="Enter City"
              value={values?.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.city && !!errors?.city}
              helperText={touched?.city && errors?.city}
              variant="outlined"
              sx={{ fontFamily: roboto.style }}
            />
          </Grid2>
          {/* Country + Country Code (ONLY when isAirAsia && isLCC) */}
          {/* {isAirAsia && isLCC && ( */}
          <>
            {/* Country (required via schema) */}
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
              >
                Country (*)
              </Typography>
              <Autocomplete
                disablePortal
                options={data.countries || []}
                getOptionLabel={(option) => option.label}
                value={selectedCountryByLabel}
                onChange={(e, newValue) => {
                  setFieldValue("country", newValue?.label || "");
                  setFieldValue("country_code", newValue?.code || "");
                  // optionally sync dial code too:
                  // setFieldValue("cell_country_code", newValue?.phone || "");
                }}
                // onBlur={handleBlur}

                renderOption={(props, option) => (
                  <li {...props} key={option.code}>
                    <img
                      loading="lazy"
                      width="18"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt={option.label}
                      style={{ marginRight: 10 }}
                    />
                    <span style={{ fontSize: "13px" }}>{option.label}</span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="country"
                    onBlur={handleBlur}
                    placeholder="Select Country"
                    size="small"
                    error={
                      (touched?.country || submitCount > 0) && !!errors?.country
                    }
                    helperText={
                      (touched?.country || submitCount > 0) && errors?.country
                    }
                  />
                )}
                slotProps={{ popper: { sx: { zIndex: 100 } } }}
              />
            </Grid2>

            {/* Country Code (ISO) (required via schema) */}
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
              >
                Country Code (*)
              </Typography>
              <Autocomplete
                disablePortal
                options={data.countries || []}
                getOptionLabel={(option) => option.code}
                value={selectedCountryByCode}
                onChange={(e, newValue) => {
                  setFieldValue("country_code", newValue?.code || "");
                  setFieldValue("country", newValue?.label || "");
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.code}>
                    <span style={{ fontSize: "13px", marginRight: 8 }}>
                      {option.code}
                    </span>
                    <span style={{ fontSize: "12px", opacity: 0.8 }}>
                      {option.label}
                    </span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="country_code"
                    onBlur={handleBlur}
                    placeholder="Select Country Code"
                    size="small"
                    error={
                      (touched?.country_code || submitCount > 0) &&
                      !!errors?.country_code
                    }
                    helperText={
                      (touched?.country_code || submitCount > 0) &&
                      errors?.country_code
                    }
                  />
                )}
                slotProps={{ popper: { sx: { zIndex: 100 } } }}
              />
            </Grid2>
          </>
          {/* )} */}
          {/* Address */}
          {/* {isLCC && ( */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              Address (*)
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={values?.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.address && !!errors?.address}
              helperText={touched?.address && errors?.address}
              variant="outlined"
              sx={{ fontFamily: roboto.style }}
            />
          </Grid2>
          {/* )} */}
          {/* Email */}
          {/* {isLCC && ( */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              Email (*)
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.email && !!errors?.email}
              helperText={touched?.email && errors?.email}
              variant="outlined"
              sx={{ fontFamily: roboto.style }}
            />
          </Grid2>
          {/* )} */}
        </Grid2>
      </Box>
    </>
  );
};

export default AddForm;
