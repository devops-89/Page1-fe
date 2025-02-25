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
            name="gst_company_address"
            label="Company Address"
            value={gstValues.gst_company_address || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.gst_company_address)}
            helperText={gstErrors.gst_company_address}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="gst_company_contact_number"
            label="Company Contact Number"
            value={gstValues.gst_company_contact_number || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.gst_company_contact_number)}
            helperText={gstErrors.gst_company_contact_number}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="gst_company_name"
            label="Company Name"
            value={gstValues.gst_company_name || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.gst_company_name)}
            helperText={gstErrors.gst_company_name}
          />
        </Grid2>
        <Grid2 size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            name="gst_number"
            label="GST Number"
            value={gstValues.gst_number || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.gst_number)}
            helperText={gstErrors.gst_number}
          />
        </Grid2>
        <Grid2 size={{xs:12}}>
          <TextField
            fullWidth
            name="gst_company_email"
            label="Company Email"
            value={gstValues.gst_company_email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(gstErrors.gst_company_email)}
            helperText={gstErrors.gst_company_email}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default GstForm;
