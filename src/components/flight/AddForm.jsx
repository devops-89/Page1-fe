import React from "react";
import {
  TextField,
  Typography,
  Grid2,
  Box,
  Autocomplete,
} from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { data } from "@/assests/data";

const AddForm = ({ values, handleChange, handleBlur, touched, errors }) => {
  // console.log("value", values);

  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 2px 6px rgba(128, 128, 128, 0.2)",
          borderRadius: "4px",
          padding: "20px",
          mb: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: nunito.style,
            fontWeight: 700,
            mb: "20px",
            color: COLORS.PRIMARY,
          }}
        >
          Booking Detail will be sent on
        </Typography>
        <Grid2 container spacing={1}>
          {/* Cell Country Code */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Cell Code
            </Typography>
            <Autocomplete
              disablePortal
              options={data.countries || []}
              getOptionLabel={(option) => `${option.phone}`}
              sx={{ width: "100%" }}
              value={
                data.countries.find(
                  (country) => country.code === values?.cell_country_code
                ) || null
              }
              onChange={(event, newValue) =>
                handleChange({
                  target: {
                    name: "cell_country_code",
                    value: newValue?.code || "",
                  },
                })
              }
              onBlur={handleBlur}
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.label}
                    style={{ marginRight: 10 }}
                  />
                  {option.phone}
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
                />
              )}
            />
          </Grid2>

          {/* Country Code */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: "5px", fontFamily: nunito.style }}>
              Country Code
            </Typography>
            <Autocomplete
              options={data.countries || []}
              getOptionLabel={(option) => `${option.code}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  id="country_code"
                  name="country_code"
                  placeholder="Select Country Code"
                  value={values?.country_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.country_code && !!errors?.country_code}
                  helperText={touched?.country_code && errors?.country_code}
                  variant="outlined"
                />
              )}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "country_code",
                    value: newValue ? `+${newValue.phone}` : "",
                  },
                });
              }}
              onBlur={handleBlur}
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.label}
                    style={{ marginRight: 10 }}
                  />
                   {option.code}
                </li>
              )}
            />
          </Grid2>

          {/* City */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              City
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
            />
          </Grid2>

          {/* Contact No */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Phone No
            </Typography>
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
            />
          </Grid2>

          {/* Country */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Country
            </Typography>
            <Autocomplete
              disablePortal
              options={data.countries || []}
              getOptionLabel={(option) => option.label}
              sx={{ width: "100%" }}
              value={
                data.countries.find(
                  (country) => country.code === values?.country
                ) || null
              }
              onChange={(event, newValue) =>
                handleChange({
                  target: { name: "country", value: newValue?.code || "" },
                })
              }
              onBlur={handleBlur}
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.label}
                    style={{ marginRight: 10 }}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Select Country"
                  error={touched?.country && !!errors?.country}
                  helperText={touched?.country && errors?.country}
                />
              )}
            />
          </Grid2>

          {/* House Number */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              House Number
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="house_number"
              name="house_number"
              placeholder="Enter House No"
              value={values?.house_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.house_number && !!errors?.house_number}
              helperText={touched?.house_number && errors?.house_number}
              variant="outlined"
            />
          </Grid2>

          {/* Postal Code */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Postal Code
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="postal_code"
              name="postal_code"
              placeholder="Enter Postal Code"
              value={values?.postal_code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.postal_code && !!errors?.postal_code}
              helperText={touched?.postal_code && errors?.postal_code}
              variant="outlined"
            />
          </Grid2>

          {/* Street */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Street
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="street"
              placeholder="Enter Street"
              name="street"
              value={values?.street}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.street && !!errors?.street}
              helperText={touched?.street && errors?.street}
              variant="outlined"
            />
          </Grid2>

          {/* State */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              State
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="state"
              name="state"
              placeholder="Enter State"
              value={values?.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.state && !!errors?.state}
              helperText={touched?.state && errors?.state}
              variant="outlined"
            />
          </Grid2>

          {/* Nationality */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Nationality
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="nationality"
              name="nationality"
              placeholder="Enter Nationality"
              value={values?.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.nationality && !!errors?.nationality}
              helperText={touched?.nationality && errors?.nationality}
              variant="outlined"
            />
          </Grid2>

          {/* Email */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Email
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
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default AddForm;