import React from "react";
import { Field } from "formik";
import { Grid2, TextField, Typography, MenuItem, Box } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MealSelection from "./ssr/oneway/MealSelection";
import BaggageSelection from "./ssr/oneway/BaggageSelection";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";

const PassengerFields = ({
  data,
  index,
  handleChange,
  handleBlur,
  errors,
  formType,
  isPassportRequired,
  values, // Added the missing values prop
}) => {
  const passengerKey = `${formType}-${index}`;
  // console.log("formType", formType, "index", index);

  const dispatch = useDispatch();
  return (
    <Accordion defaultExpanded={index === 0} key={passengerKey}>
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
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              First Name
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
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
                value={values[formType][index]?.title || ""}
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
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  },
                }}
               
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
              </Field>
              <Field
                as={TextField}
                size="small"
                fullWidth
                name={`${formType}[${index}].first_name`}
                variant="outlined"
                placeholder="Enter First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[formType][index]?.first_name || ""}
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
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  },
                }}
              />
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
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
              value={values[formType][index]?.middle_name || ""}
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

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
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
              value={values[formType][index]?.last_name || ""}
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

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, mb: "5px", fontFamily: nunito.style }}
            >
              Date of Birth
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field name={`${formType}[${index}].date_of_birth`}>
                {({ field, form }) => {
                  const today = dayjs();
                  let minDate, maxDate, errorMessage;

                  if (formType === "infant") {
                    minDate = today.subtract(2, "year");
                    maxDate = today;
                    errorMessage = "Infants must be between 0-2 years old.";
                  } else if (formType === "child") {
                    minDate = today.subtract(12, "year");
                    maxDate = today.subtract(2, "year");
                    errorMessage = "Children must be between 2-12 years old.";
                  } else if (formType === "adult") {
                    minDate = dayjs("1900-01-01");
                    maxDate = today.subtract(12, "year");
                    errorMessage = "Adults must be 12+ years old.";
                  }

                  return (
                    <DatePicker
                      format="DD/MM/YYYY"
                      disableFuture
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        const selectedDate = dayjs(date);
                        if (
                          selectedDate.isBefore(minDate) ||
                          selectedDate.isAfter(maxDate)
                        ) {
                          dispatch(
                            setToast({
                              open: true,
                              message: errorMessage,
                              severity: TOAST_STATUS.ERROR,
                            })
                          );

                          return;
                        }

                        // Set valid date value
                        form.setFieldValue(
                          `${formType}[${index}].date_of_birth`,
                          date ? date.toISOString() : ""
                        );
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!errors?.[formType]?.[index]?.date_of_birth,
                          helperText:
                            errors?.[formType]?.[index]?.date_of_birth,
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
                  );
                }}
              </Field>
            </LocalizationProvider>
          </Grid2>

          {/* Meal Selection */}
          <Grid2 size={12}>
            {data?.MealDynamic && (
              <MealSelection
                passengerId={index}
                mealData={data?.MealDynamic}
                isLCC={data?.isLCC}
                passengerType={formType}
              />
            )}
          </Grid2>

          {/* Baggage Selection */}
          <Grid2 size={12}>
            {data?.Baggage && (
              <BaggageSelection
                passengerId={index}
                passengerType={formType}
                baggageData={data?.Baggage}
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
                value={values[formType][index]?.passport_no || ""}
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
                      format="DD/MM/YYYY"
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
