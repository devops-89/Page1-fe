import React from "react";
import { Box, Typography, TextField,  Grid2 } from "@mui/material";


const CommonFieldsForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Contact Information
      </Typography>

      <Grid2 container spacing={2}>
        <Grid2 size={{xs:12, md:6}}>
          <Typography sx={{ mb: 1 }}>EMAIL</Typography>
          <TextField
            fullWidth
            size="small"
            type="email"
            name="commonFields.Email"
            placeholder="Email"
            value={values?.Email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.Email && errors?.Email)}
            helperText={touched?.Email && errors?.Email}
          />
        </Grid2>

        <Grid2 size={{xs:12,md:6}}>
          <Typography sx={{ mb: 1 }}>MOBILE</Typography>
          <TextField
            fullWidth
            size="small"
            name="commonFields.Phoneno"
            placeholder="Mobile Number"
            value={values?.Phoneno || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.Phoneno && errors?.Phoneno)}
            helperText={touched?.Phoneno && errors?.Phoneno}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CommonFieldsForm;
