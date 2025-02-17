import React from "react";
import { Grid2, TextField } from "@mui/material";

const GstForm = ({ values, handleChange, handleBlur, errors }) => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyAddress"
            label="Company Address"
            value={values.GSTCompanyAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.GSTCompanyAddress)}
            helperText={errors.GSTCompanyAddress}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyContactNumber"
            label="Company Contact Number"
            value={values.GSTCompanyContactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.GSTCompanyContactNumber)}
            helperText={errors.GSTCompanyContactNumber}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyName"
            label="Company Name"
            value={values.GSTCompanyName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.GSTCompanyName)}
            helperText={errors.GSTCompanyName}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTNumber"
            label="GST Number"
            value={values.GSTNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.GSTNumber)}
            helperText={errors.GSTNumber}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyEmail"
            label="Company Email"
            value={values.GSTCompanyEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.GSTCompanyEmail)}
            helperText={errors.GSTCompanyEmail}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default GstForm;
