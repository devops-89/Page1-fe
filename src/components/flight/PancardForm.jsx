import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";

const PanCardForm = ({ values, handleChange, handleBlur, errors }) => {
  return (
    <>
      <Typography variant="h6" sx={{fontWeight:600, fontFamily:nunito.style, mb:'20px'}}>
        PAN Card Details
      </Typography>
    
        <Grid2 container spacing={1}>
        <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Full Name"
        name="panCard.fullName"
        value={values.panCard.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.panCard?.fullName)}
        helperText={<ErrorMessage name="panCard.fullName" />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="PAN Card Number"
        name="panCard.panNumber"
        value={values.panCard.panNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.panCard?.panNumber)}
        helperText={<ErrorMessage name="panCard.panNumber" />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Date of Birth"
        name="panCard.dob"
        type="date"
        value={values.panCard.dob}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        InputLabelProps={{ shrink: true }}
        error={Boolean(errors.panCard?.dob)}
        helperText={<ErrorMessage name="panCard.dob" />}
      />
      </Grid2>
      </Grid2>
    </>
  );
};

export default PanCardForm;
