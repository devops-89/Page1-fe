import React from "react";
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Grid,Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";

const TravellerForm = ({ 
  form, 
  handleChange, 
  formType = "Adult", // Default to "Adult"
  showWheelchairOption = true 
}) => {
  const typeSpecificInfo = {
    Adult: {
      nameLabel: "First & Middle Name",
      namePlaceholder: "First & Middle Name",
      ageHint: "12 yrs+",
    },
    Child: {
      nameLabel: "Child's First & Middle Name",
      namePlaceholder: "Child's Name",
      ageHint: "2-12 yrs",
    },
    Infant: {
      nameLabel: "Infant's First & Middle Name",
      namePlaceholder: "Infant's Name",
      ageHint: "15 days - 2 yrs",
    },
  };

  const { nameLabel, namePlaceholder, ageHint } = typeSpecificInfo[formType];

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: 2 ,fontFamily:nunito.style }}>
        {formType} ({ageHint})
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={nameLabel}
            placeholder={namePlaceholder}
            value={form.firstMiddleName}
            sx={{fontFamily:nunito.style}}
            onChange={handleChange(form.id, "firstMiddleName")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Last Name"
            value={form.lastName}
            sx={{fontFamily:nunito.style}}
            onChange={handleChange(form.id, "lastName")}
          />
        </Grid>
        <Grid item xs={4}>
          <RadioGroup
            row
            value={form.gender}
            onChange={handleChange(form.id, "gender")}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" sx={{fontFamily:nunito.style}}/>
            <FormControlLabel value="female" control={<Radio />} label="Female" sx={{fontFamily:nunito.style}}/>
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Country Code (Optional)"
            placeholder="Country Code"
            value={form.countryCode}
            sx={{fontFamily:nunito.style}}
            onChange={handleChange(form.id, "countryCode")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Mobile No (Optional)"
            placeholder="Mobile No"
            value={form.mobileNumber}
            sx={{fontFamily:nunito.style}}
            onChange={handleChange(form.id, "mobileNumber")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Email (Optional)"
            placeholder="Email"
            value={form.email}
            sx={{fontFamily:nunito.style}}
            onChange={handleChange(form.id, "email")}
          />
        </Grid>
      </Grid>
      {showWheelchairOption && (
        <Box sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.requiresWheelchair}
                onChange={handleChange(form.id, "requiresWheelchair")}
                sx={{fontFamily:nunito.style}}
              />
            }
            label="I require a wheelchair (Optional)"
          />
        </Box>
      )}
    </Box>
  );
};

export default TravellerForm;
