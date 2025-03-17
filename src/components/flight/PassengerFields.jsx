import React from "react";
import { Field } from "formik";
import { Grid2, TextField, Typography, MenuItem } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MealSelection from "./ssr/oneway/MealSelection";
import BaggageSelection from "./ssr/oneway/BaggageSelection";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PassengerFields = ({
  data,
  index,
  handleChange,
  handleBlur,
  errors,
  formType,
  handleMealValue,
  selectMeal,
  selectBaggage,
  handleBaggageValue,
  isPassportRequired,
  values, // Added the missing values prop
}) => {
  const passengerKey = `${formType}-${index}`;

  return (
    <Accordion defaultExpanded={index === 0}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: nunito.style,
            textTransform: "capitalize",
          }}
        >
          {formType} {index + 1}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid2 container spacing={1} sx={{ mb: "20px" }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Title
            </Typography>

            <Field
              as={TextField}
              size="small"
              select
              fullWidth
              name={`${formType}[${index}].title`}
              placeholder="Enter title"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].title
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].title
              }
            >
              <MenuItem value="Mr">Mr.</MenuItem>
              <MenuItem value="Ms">Ms.</MenuItem>
              <MenuItem value="Mrs">Mrs.</MenuItem>
            </Field>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Gender
            </Typography>

            <Field
              as={TextField}
              size="small"
              select
              fullWidth
              name={`${formType}[${index}].gender`}
              variant="outlined"
              placeholder="Enter Gender"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].gender
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].gender
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Field>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              First Name
            </Typography>

            <Field
              as={TextField}
              size="small"
              fullWidth
              name={`${formType}[${index}].first_name`}
              variant="outlined"
              placeholder="Enter First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].first_name
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].first_name
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Middle Name
            </Typography>

            <Field
              as={TextField}
              size="small"
              fullWidth
              name={`${formType}[${index}].middle_name`}
              variant="outlined"
              placeholder="Enter Middle Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].middle_name
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].middle_name
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Last Name
            </Typography>

            <Field
              as={TextField}
              size="small"
              fullWidth
              name={`${formType}[${index}].last_name`}
              variant="outlined"
              placeholder="Enter Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].last_name
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].last_name
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, mb: "5px", fontFamily: nunito.style }}
            >
              Date of Birth
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field name={`${formType}[${index}].date_of_birth`}>
                {({ field, form }) => (
                  <DatePicker
                    disableFuture
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      form.setFieldValue(
                        `${formType}[${index}].date_of_birth`,
                        date ? date.toISOString() : ""
                      )
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: !!errors?.[formType]?.[index]?.date_of_birth,
                        helperText: errors?.[formType]?.[index]?.date_of_birth,
                      },
                      popper: {
                        sx: {
                          zIndex: 100,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-input": { padding: "8.5px 14px" },
                      "& .MuiFormLabel-root": { top: "-7px" },
                    }}
                  />
                )}
              </Field>
            </LocalizationProvider>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Email
            </Typography>

            <Field
              as={TextField}
              size="small"
              fullWidth
              name={`${formType}[${index}].email`}
              variant="outlined"
              placeholder="Enter Email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].email
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].email
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Phone Number
            </Typography>

            <Field
              as={TextField}
              fullWidth
              name={`${formType}[${index}].contact_no`}
              size="small"
              variant="outlined"
              placeholder="Enter Phone No"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].contact_no
              }
              helperText={
                errors &&
                errors[formType] &&
                errors[formType][index] &&
                errors[formType][index].contact_no
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            {data?.MealDynamic && (
              <MealSelection
                mealData={data?.MealDynamic}
                handleMealValue={(meal) =>
                  handleMealValue(formType, index, meal)
                }
                selectMeal={selectMeal[passengerKey]}
              />
            )}

            {data?.Baggage && (
              <BaggageSelection
                baggageData={data?.Baggage}
                handleBaggageValue={(baggage) =>
                  handleBaggageValue(formType, index, baggage)
                }
                selectBaggage={selectBaggage[passengerKey]}
              />
            )}
          </Grid2>

          {/* Passport Number */}
          {isPassportRequired && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
              >
                Passport Number
              </Typography>
              <Field
                as={TextField}
                placeholder="Passport Number"
                name={`${formType}[${index}].passport_no`}
                fullWidth
                size="small"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors &&
                  errors[formType] &&
                  errors[formType][index] &&
                  errors[formType][index].passport_no
                }
                helperText={
                  errors &&
                  errors[formType] &&
                  errors[formType][index] &&
                  errors[formType][index].passport_no
                }
              />
            </Grid2>
          )}

          {/* Passport Expiry Date */}
          {isPassportRequired && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
              >
                Passport Expiry Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Field name={`${formType}[${index}].passport_expiry`}>
                  {({ field, form }) => (
                    <DatePicker
                      disablePast
                      id="passport.passport_expiry"
                      placeholder="Passport Expiry Date"
                      inputFormat="DD/MM/YYYY"
                      fullWidth
                      value={
                        values?.[formType]?.[index]?.passport_expiry
                          ? dayjs(values[formType][index].passport_expiry)
                          : null
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error:
                            errors &&
                            errors[formType] &&
                            errors[formType][index] &&
                            errors[formType][index].passport_expiry,
                          helperText:
                            errors &&
                            errors[formType] &&
                            errors[formType][index] &&
                            errors[formType][index].passport_expiry,
                        },
                        popper: {
                          sx: {
                            zIndex: 100,
                          },
                        },
                      }}
                      onChange={(date) =>
                        form.setFieldValue(
                          field.name,
                          date ? date.format("YYYY-MM-DD") : null
                        )
                      }
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
                        />
                      )}
                    />
                  )}
                </Field>
              </LocalizationProvider>
            </Grid2>
          )}
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default PassengerFields;