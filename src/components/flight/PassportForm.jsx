import React from "react";
import { Field } from "formik";
import { Grid2, TextField, Typography, Box, Autocomplete } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { data } from "@/assests/data";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PassportForm = ({ values, handleChange, handleBlur, errors, touched, isPassportRequired }) => {

  console.log("values", values)
  if (!isPassportRequired) {
    return null;
  }

  return (
    <>
      <Box sx={{ boxShadow: "0px 2px 6px rgba(128, 128, 128, 0.2)", borderRadius: "4px", padding: "20px", mb: '20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: nunito.style, mb: '20px', color: COLORS.PRIMARY }}>
          Passport Details
        </Typography>
        <Grid2 container spacing={2}>
          {/* Full Name (As per Passport) */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style, mb: '5px' }}>Full Name (As per Passport)</Typography>
            <Field
              as={TextField}
              placeholder="Full Name"
              name="passport.fullName"
              fullWidth
              size="small"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.fullName}
              error={touched?.fullName && !!errors?.fullName}
              helperText={touched?.fullName && errors?.fullName}
            />
          </Grid2>

          {/* Passport Number */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style, mb: '5px' }}>Passport Number</Typography>
            <Field
              as={TextField}
              placeholder="Passport Number"
              name="passport.passport_no"
              fullWidth
              size="small"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.passport_no}
              error={touched?.passport_no && !!errors?.passport_no}
              helperText={touched?.passport_no && errors?.passport_no}
            />
          </Grid2>

          {/* Passport Expiry Date */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style, mb: '5px' }}>Passport Expiry Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field name="passport.passport_expiry">
                {({ field, form }) => (
                  <DatePicker
                    disablePast
                    id="passport.passport_expiry"
                    placeholder="Passport Expiry Date"
                    inputFormat="dd/MM/yyyy"
                    value={values?.passport_expiry ? dayjs(values.passport_expiry) : null}
                    slotProps={{
                      popper: {
                        sx: {
                          zIndex: 100
                        }
                      }
                    }}
                    onChange={(date) => form.setFieldValue(field.name, date ? date.format('YYYY-MM-DD') : null)}
                    sx={{
                      "& .MuiInputBase-input": { padding: "8.5px 14px" },
                      "& .MuiFormLabel-root": { top: "-7px" },
                    }}
                    onBlur={field.onBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={touched?.passport?.passport_expiry && !!errors?.passport?.passport_expiry}
                        helperText={touched?.passport?.passport_expiry && errors?.passport?.passport_expiry}
                      />
                    )}
                  />
                )}
              </Field>
            </LocalizationProvider>
          </Grid2>

          {/* Passport Issue Date */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style, mb: '5px' }}>Passport Issue Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field name="passport.passportIssueDate">
                {({ field, form }) => (
                  <DatePicker
                    disableFuture
                    id="passport.passportIssueDate"
                    placeholder="Passport Issue Date"
                    inputFormat="dd/MM/yyyy"
                    value={values?.passportIssueDate ? dayjs(values.passportIssueDate) : null}
                    onChange={(date) => form.setFieldValue(field.name, date ? date.format('YYYY-MM-DD') : null)}
                    slotProps={{
                      popper: {
                        sx: {
                          zIndex: 100
                        }
                      }
                    }}
                    onBlur={field.onBlur}
                    sx={{
                      "& .MuiInputBase-input": { padding: "8.5px 14px" },
                      "& .MuiFormLabel-root": { top: "-7px" },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={touched?.passport?.passportIssueDate && !!errors?.passport?.passportIssueDate}
                        helperText={touched?.passport?.passportIssueDate && errors?.passport?.passportIssueDate}
                      />
                    )}
                  />
                )}
              </Field>
            </LocalizationProvider>
          </Grid2>

          {/* Passport Issue Country */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style, mb: '5px' }}>Passport Issue Country</Typography>
            <Field name="passport.passportIssueCountry">
              {({ field, form }) => (
                <Autocomplete
                  id="passport.passportIssueCountry"
                  options={data.countries || []}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={
                    data.countries.find(
                      (country) => country.code === values?.passportIssueCountry
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    form.setFieldValue(field.name, newValue?.code || "");
                  }}
                  onBlur={field.onBlur}
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
                      placeholder="Passport Issue Country"
                      error={touched?.passport?.passportIssueCountry && !!errors?.passport?.passportIssueCountry}
                      helperText={touched?.passport?.passportIssueCountry && errors?.passport?.passportIssueCountry}
                    />
                  )}
                />
              )}
            </Field>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default PassportForm;