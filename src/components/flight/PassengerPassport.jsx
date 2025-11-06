import { Grid2, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field } from "formik";
import { roboto } from "@/utils/fonts";

const PassengerPassport = ({
  formType,
  index,
  handleChange,
  handleBlur,
  values,
  errors,
  setFieldValue,
  age, // <- we use this to switch labels
  isPassportFullDetailRequired,
}) => {
  // --- Determine label set from age ---
  // If age is not provided yet, default to "simple" labels.
  const group =
    typeof age !== "number"
      ? "simple"
      : age > 18
      ? "simple"
      : age >= 12 && age <= 18
      ? "teen"
      : age >= 0 && age < 12
      ? "child"
      : "simple";

  const labelsByGroup = {
    simple: {
      number: "Passport Number",
      expiry: "Passport Expiry Date",
      issueDate: "Passport Issue Date",
      issueCountry: "Passport Issue Country Code",
      caption: null,
    },
    teen: {
      number: "Passport Number",
      expiry: "Passport Expiry Date",
      issueDate: "Passport Issue Date",
      issueCountry: "Passport Issue Country Code",
      caption:
        "If you don’t have your own passport, you may use the guardian’s passport details. Ensure all details are accurate.",
    },
    child: {
      number: "Guardian’s Passport Number",
      expiry: "Guardian’s Passport Expiry Date",
      issueDate: "Guardian’s Passport Issue Date",
      issueCountry: "Guardian’s Passport Issue Country Code",
      caption:
        "For passengers under 12, use the guardian’s passport details exactly as on the document.",
    },
  };

  const L = labelsByGroup[group];

  return (
    <>
      {/* Optional small caption under the section */}
      {L.caption && (
        <Grid2 size={{ xs: 12 }}>
          <Typography
            variant="caption"
            sx={{ fontFamily: roboto.style, color: "text.secondary" }}
          >
            {L.caption}
          </Typography>
        </Grid2>
      )}

      {/* Passport Number */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
        >
          {L.number}
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
            !!(
              errors &&
              errors[formType] &&
              errors[formType][index] &&
              errors[formType][index].passport_no
            )
          }
          helperText={
            errors &&
            errors[formType] &&
            errors[formType][index] &&
            errors[formType][index].passport_no
          }
        />
      </Grid2>

      {/* Passport Expiry Date */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
        >
          {L.expiry}
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
                    error: !!(
                      errors &&
                      errors[formType] &&
                      errors[formType][index] &&
                      errors[formType][index].passport_expiry
                    ),
                    helperText:
                      errors &&
                      errors[formType] &&
                      errors[formType][index] &&
                      errors[formType][index].passport_expiry,
                  },
                  popper: { sx: { zIndex: 100 } },
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
              />
            )}
          </Field>
        </LocalizationProvider>
      </Grid2>

      {isPassportFullDetailRequired && (
        <>
          {/* Passport Issue Date */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              {L.issueDate} *
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Field name={`${formType}[${index}].passport_issue_date`}>
                {({ field, form }) => {
                  const expiryVal =
                    values?.[formType]?.[index]?.passport_expiry;
                  const maxDate = expiryVal ? dayjs(expiryVal) : dayjs(); // not after expiry; not in future
                  return (
                    <DatePicker
                      format="DD/MM/YYYY"
                      disableFuture
                      value={
                        values?.[formType]?.[index]?.passport_issue_date
                          ? dayjs(values[formType][index].passport_issue_date)
                          : null
                      }
                      onChange={(date) =>
                        form.setFieldValue(
                          field.name,
                          date ? date.startOf("day").format("YYYY-MM-DD") : null
                        )
                      }
                      maxDate={maxDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error:
                            !!errors?.[formType]?.[index]?.passport_issue_date,
                          helperText:
                            errors?.[formType]?.[index]?.passport_issue_date,
                        },
                        popper: { sx: { zIndex: 100 } },
                      }}
                      sx={{
                        "& .MuiInputBase-input": { padding: "8.5px 14px" },
                        "& .MuiFormLabel-root": { top: "-7px" },
                      }}
                      onBlur={field.onBlur}
                    />
                  );
                }}
              </Field>
            </LocalizationProvider>
          </Grid2>

          {/* Passport Issue Country Code */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: roboto.style, mb: "5px" }}
            >
              {L.issueCountry} *
            </Typography>
            <Field
              as={TextField}
              placeholder="e.g., IN"
              name={`${formType}[${index}].passport_issue_country_code`}
              fullWidth
              size="small"
              variant="outlined"
              inputProps={{ maxLength: 2 }}
              value={(
                values?.[formType]?.[index]?.passport_issue_country_code || ""
              ).toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
                setFieldValue(
                  `${formType}[${index}].passport_issue_country_code`,
                  val
                );
              }}
              onBlur={handleBlur}
              error={!!errors?.[formType]?.[index]?.passport_issue_country_code}
              helperText={
                errors?.[formType]?.[index]?.passport_issue_country_code
              }
            />
          </Grid2>
        </>
      )}
    </>
  );
};

export default PassengerPassport;
