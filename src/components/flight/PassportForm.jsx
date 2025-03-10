import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";

const PassportForm = ({ values, handleChange, handleBlur, errors }) => {
  return (
    <>
      <Typography variant="h6" sx={{fontWeight:700, fontFamily:nunito.style, mb:'10px'}}>
        Passport Details
      </Typography>
      <Grid2 container spacing={1} sx={{mb:'20px'}}>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Full Name"
        name="passport.fullName"
        value={values?.passport?.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors?.passport?.fullName)}
        helperText={<ErrorMessage name="passport.fullName" />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Passport Number"
        name="passport.passport_no"
        value={values?.passport?.passport_no}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors?.passport?.passport_no)}
        helperText={<ErrorMessage name="passport.passport_no" />}
      />
       </Grid2>
       <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Passport Expiry Date"
        name="passport.passport_expiry"
        type="date"
        value={values?.passport?.passport_expiry}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        InputLabelProps={{ shrink: true }}
        error={Boolean(errors?.passport?.passport_expiry)}
        helperText={<ErrorMessage name="passport.passport_expiry" />}
      />
       </Grid2>
       <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Passport Issue Date"
        name="passport.passportIssueDate"
        type="date"
        value={values?.passport?.passportIssueDate}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        InputLabelProps={{ shrink: true }}
        error={Boolean(errors?.passport?.passportIssueDate)}
        helperText={<ErrorMessage name="passport.passportIssueDate" />}
      />
       </Grid2>
       <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Passport Issue Country Code"
        name="passport.passportIssueCountryCode"
        value={values?.passport?.passportIssueCountryCode}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors?.passport?.passportIssueCountryCode)}
        helperText={<ErrorMessage name="passport.passportIssueCountryCode" />}
      />
       </Grid2>
       <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Passport Issue Country"
        name="passport.passportIssueCountry"
        value={values?.passport?.passportIssueCountry}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors?.passport?.passportIssueCountry)}
        helperText={<ErrorMessage name="passport.passportIssueCountry" />}
      />
      </Grid2>
      </Grid2>
    </>
  );
};

export default PassportForm;
