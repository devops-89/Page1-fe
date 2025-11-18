import React, { useEffect } from "react";
import { Field } from "formik";
import { Grid2, TextField, Typography, MenuItem, Box } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import { JOURNEY, JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import InternationalMealSelection from "./ssr/roundtrip/international/InternationalMealSelection";
import InternationalBaggageSelection from "./ssr/roundtrip/international/InternationalBaggageSelection";
import MealSelection from "./ssr/oneway/MealSelection";
import BaggageSelection from "./ssr/oneway/BaggageSelection";
import DomesticMealSelection from "./ssr/roundtrip/domestic/DomesticMealSelection";
import DomesticBaggageSelection from "./ssr/roundtrip/domestic/DomesticBaggageSelection";
import AddForm from "./AddForm";
import PassengerPassport from "./PassengerPassport";

const TITLE_OPTIONS = {
  adult: ["Mr", "Ms", "Mrs"],
  child: ["Mr", "Ms"],
  infant: ["Mstr", "Mr", "Ms"],
};

const TITLE_LABEL = {
  Mr: "Mr.",
  Ms: "Ms.",
  Mrs: "Mrs.",
  Mstr: "Mstr",
};

const PassengerFields = ({
  touched,
  setFieldValue,
  data,
  index,
  handleChange,
  handleBlur,
  errors,
  submitCount,
  formType,
  // isPassportRequired,
  journey,
  values,
  isPassportFullDetailRequired,
  isNewPassportMandatory,
  isPassportShow,
  isPassportShowForAdultChild,
  specialFareForMeal,
}) => {
  const passengerKey = `${formType}-${index}`;
  // console.log("formType", formType, "index", index);
  console.log("abcdes", isNewPassportMandatory);
  console.log("jkwjdkjwdsk", isPassportShowForAdultChild);
  const dispatch = useDispatch();
  console.log("journey---------", journey);
  useEffect(() => {
    const allowedTitles = TITLE_OPTIONS[formType] || [];
    const currentTitle = values?.[formType]?.[index]?.title || "";
    if (currentTitle && !allowedTitles.includes(currentTitle)) {
      setFieldValue(`${formType}[${index}].title`, "");
    }
  }, [formType, index, setFieldValue, values]);

  // Helper function to calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null; // Handle missing date
    const birthDate = dayjs(dob);
    const today = dayjs();
    const age = today.diff(birthDate, "year");
    return age;
  };
  const age = calculateAge(values?.[formType]?.[index]?.date_of_birth);

  // const newFlightValidations = useSelector(
  //   (state) => state.Flight.FlightValidation
  // );
  // console.log("abcdefh", newFlightValidations.rules.LCC.destination.isPan);
  // const isPassportShow = newFlightValidations.rules.LCC.destination.isPan;
  // const isSpiceJet =
  //   newFlightValidations.rules.LCC.airlineSpecific.spiceJet.isSpiceJet;
  return (
    <Accordion defaultExpanded={index === 0} key={passengerKey}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: roboto.style,
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
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              First Name (*)
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "30% 70%",
                fontFamily: roboto.style,
              }}
            >
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
                {(TITLE_OPTIONS[formType] || []).map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {TITLE_LABEL[opt] || opt}
                  </MenuItem>
                ))}
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
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
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
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              Last Name (*)
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
              sx={{ fontWeight: 600, mb: "5px", fontFamily: roboto.style }}
            >
              Date of Birth {age !== null && `(Age: ${age} years)`}
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

                        form.setFieldValue(
                          `${formType}[${index}].date_of_birth`,
                          date ? date.startOf("day").format("YYYY-MM-DD") : ""
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
          {/* Gender */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, mb: "5px", fontFamily: roboto.style }}
            >
              Gender (*)
            </Typography>

            <Field
              as={TextField}
              select
              size="small"
              fullWidth
              name={`${formType}[${index}].gender`}
              variant="outlined"
              placeholder="Select Gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[formType][index]?.gender ?? ""}
              error={!!errors?.[formType]?.[index]?.gender}
              helperText={errors?.[formType]?.[index]?.gender}
              SelectProps={{
                displayEmpty: true,
                renderValue: (val) =>
                  val !== "" ? (
                    val
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>Select Gender</span>
                  ),
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Field>
          </Grid2>

          <Grid2 size={12}>
            {index == 0 && formType == "adult" ? (
              <AddForm
                isLCC={data?.isLCC}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                submitCount={submitCount}
              />
            ) : null}
          </Grid2>
          {journey?.journey_type === JOURNEY_TYPE.ROUNDTRIP &&
          journey?.journey === JOURNEY.DOMESTIC ? (
            <>
              <Grid2 size={12}>
                {data?.MealDynamic && (
                  <DomesticMealSelection
                    passengerId={index}
                    mealData={data?.MealDynamic}
                    isLCC={data?.isLCC}
                    passengerType={formType}
                    specialFareForMeal={specialFareForMeal}
                  />
                )}
              </Grid2>
              <Grid2 size={12}>
                {data?.Baggage && (
                  <DomesticBaggageSelection
                    passengerId={index}
                    passengerType={formType}
                    baggageData={data?.Baggage}
                  />
                )}
              </Grid2>
            </>
          ) : journey?.journey_type === JOURNEY_TYPE.ROUNDTRIP &&
            journey?.journey === JOURNEY.INTERNATIONAL ? (
            <>
              <Grid2 size={12}>
                {data?.MealDynamic && (
                  <InternationalMealSelection
                    passengerId={index}
                    mealData={data?.MealDynamic}
                    isLCC={data?.isLCC}
                    passengerType={formType}
                    specialFareForMeal={specialFareForMeal}
                  />
                )}
              </Grid2>
              <Grid2 size={12}>
                {data?.Baggage && (
                  <InternationalBaggageSelection
                    passengerId={index}
                    passengerType={formType}
                    baggageData={data?.Baggage}
                  />
                )}
              </Grid2>
            </>
          ) : (
            <>
              <Grid2 size={12}>
                {data?.MealDynamic && (
                  <MealSelection
                    passengerId={index}
                    mealData={data?.MealDynamic}
                    isLCC={data?.isLCC}
                    passengerType={formType}
                    specialFareForMeal={specialFareForMeal}
                  />
                )}
              </Grid2>
              <Grid2 size={12}>
                {data?.Baggage && (
                  <BaggageSelection
                    passengerId={index}
                    passengerType={formType}
                    baggageData={data?.Baggage}
                    isLCC={data?.isLCC}
                    isInternationalJourney={
                      journey?.journey === JOURNEY.INTERNATIONAL
                    }
                  />
                )}
              </Grid2>
            </>
          )}
          {journey?.journey === JOURNEY.INTERNATIONAL &&
            (isNewPassportMandatory ||
              isPassportShow ||
              isPassportShowForAdultChild) && (
              <PassengerPassport
                journey={journey}
                formType={formType}
                index={index}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                age={age}
                isPassportFullDetailRequired={isPassportFullDetailRequired}
              />
            )}
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default PassengerFields;
