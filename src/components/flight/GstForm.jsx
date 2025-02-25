import React from "react";
import { Grid2, TextField, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";

const GstForm = ({ values, handleChange, handleBlur, errors }) => {
  const gstValues = values || {}; 
  const gstErrors = errors || {};

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: nunito.style, mb: "10px" }}>
        GST Details
      </Typography>
      <Grid2 container spacing={2} sx={{ mb: "20px" }}>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyAddress"
            label="Company Address"
            value={gstValues.GSTCompanyAddress || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.GSTCompanyAddress)}
            helperText={gstErrors.GSTCompanyAddress}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyContactNumber"
            label="Company Contact Number"
            value={gstValues.GSTCompanyContactNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.GSTCompanyContactNumber)}
            helperText={gstErrors.GSTCompanyContactNumber}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTCompanyName"
            label="Company Name"
            value={gstValues.GSTCompanyName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.GSTCompanyName)}
            helperText={gstErrors.GSTCompanyName}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="GSTNumber"
            label="GST Number"
            value={gstValues.GSTNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.GSTNumber)}
            helperText={gstErrors.GSTNumber}
          />
        </Grid2>
        <Grid2 size={{xs:12}}>
          <TextField
            fullWidth
            name="GSTCompanyEmail"
            label="Company Email"
            value={gstValues.GSTCompanyEmail || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.GSTCompanyEmail)}
            helperText={gstErrors.GSTCompanyEmail}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default GstForm;
