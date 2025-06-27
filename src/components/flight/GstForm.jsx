import React from "react";
import { TextField, Typography, Box, Grid2 } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { Field } from "formik";

const GstForm = ({ errors, touched, isGSTMandatory, values, handleChange, handleBlur }) => {
  // console.log("gst errors", errors);
  // console.log("gst values", values);
  if (!isGSTMandatory) {
    return null;
  }

  return (
    <>
      <Box sx={{ boxShadow: "0px 2px 6px rgba(128, 128, 128, 0.2)", borderRadius: "4px", padding: "20px", mb: '20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily:roboto.style, mb: '20px', color: COLORS.PRIMARY }}>
          GST Details
        </Typography>
        <Grid2 container spacing={1}>
          {/* GST Company Name */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily:roboto.style, mb: '5px' }}>Company Name</Typography>
            <Field
              as={TextField}
              fullWidth
              name="gstForm.gst_company_name"
              placeholder="Company Name"
              variant="outlined"
              size="small"
              value={values?.gst_company_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.gst_company_name && !!errors?.gst_company_name}
              helperText={touched?.gst_company_name && errors?.gst_company_name}
            />
          </Grid2>

          {/* GST Number */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily:roboto.style, mb: '5px' }}>GST Number</Typography>
            <Field
              as={TextField}
              fullWidth
              name="gstForm.gst_number"
              placeholder="GST Number"
              variant="outlined"
              size="small"
              value={values?.gst_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.gst_number && !!errors?.gst_number}
              helperText={touched?.gst_number && errors?.gst_number}
            />
          </Grid2>

          {/* GST Company Address */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily:roboto.style, mb: '5px' }}>Company Address</Typography>
            <Field
              as={TextField}
              fullWidth
              name="gstForm.gst_company_address"
              placeholder="Company Address"
              variant="outlined"
              size="small"
              value={values?.gst_company_address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.gst_company_address && !!errors?.gst_company_address}
              helperText={touched?.gst_company_address && errors?.gst_company_address}
            />
          </Grid2>

          {/* GST Company Contact Number */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily:roboto.style, mb: '5px' }}>Contact Number</Typography>
            <Field
              as={TextField}
              fullWidth
              name="gstForm.gst_company_contact_number"
              placeholder="Contact Number"
              variant="outlined"
              size="small"
              value={values?.gst_company_contact_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.gst_company_contact_number && !!errors?.gst_company_contact_number}
              helperText={touched?.gst_company_contact_number && errors?.gst_company_contact_number}
            />
          </Grid2>

          {/* GST Company Email */}
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily:roboto.style, mb: '5px' }}>Company Email</Typography>
            <Field
              as={TextField}
              fullWidth
              name="gstForm.gst_company_email"
              placeholder="Company Email"
              variant="outlined"
              size="small"
              value={values?.gst_company_email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.gst_company_email && !!errors?.gst_company_email}
              helperText={touched?.gst_company_email && errors?.gst_company_email}
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default GstForm;