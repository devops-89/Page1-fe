import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography, MenuItem } from "@mui/material";
import { nunito } from "@/utils/fonts";
import {Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PassengerFields = ({ passenger, index, handleChange, handleBlur, errors }) => {
  // console.log("passenger:",passenger);
  return (
    <Accordion defaultExpanded={index===0}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: nunito.style,textTransform:"capitalize" }}>
       {passenger.formType} {index+1}
      </Typography>
      </AccordionSummary>
     <AccordionDetails>

    
      <Grid2 container spacing={2} sx={{mb:'20px'}}>
        {/* Title */}
        <Grid2 size={3}>
          <Field
            as={TextField}
            label="Title"
            name={`${passenger.formType}[${index}].title`}
            select
            fullWidth
            required
            value={passenger.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.title)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].title`} />}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Dr">Dr</MenuItem>
          </Field>
        </Grid2>

        {/* First Name */}
        <Grid2 size={3}>
          <Field
            as={TextField}
            label="First Name"
            name={`${passenger.formType}[${index}].first_name`}
            fullWidth
            required
            value={passenger.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.first_name)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].first_name`} />}
          />
        </Grid2>

        {/* Middle Name */}
        <Grid2 size={3}>
          <Field
            as={TextField}
            label="Middle Name"
           
            name={`${passenger.formType}[${index}].middle_name`}
            fullWidth
            value={passenger.middleName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid2>

        {/* Last Name */}
        <Grid2 size={3}>
          <Field
            as={TextField}
            label="Last Name"
            
            name={`${passenger.formType}[${index}].last_name`}
            fullWidth
            required
            value={passenger.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.last_name)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].last_name`} />}
          />
        </Grid2>

        {/* Date of Birth */}
        <Grid2 size={6}>
          <Field
            as={TextField}
            label="Date of Birth"
            name={`${passenger.formType}[${index}].date_of_birth`}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={passenger.date_of_birth}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.date_of_birth)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].date_of_birth`} />}
          />
        </Grid2>

        {/* Gender */}
        <Grid2 size={6}>
          <Field
            as={TextField}
            label="Gender"
            name={`${passenger.formType}[${index}].gender`}
            select
            fullWidth
            required
            value={passenger.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.gender)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].gender`} />}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Field>
        </Grid2>

        {/* Email */}
        <Grid2 size={6}>
          <Field
            as={TextField}
            label="Email"
            name={`${passenger.formType}[${index}].email`}
            type="email"
            fullWidth
            required
            value={passenger.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.email)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].email`} />}
          />
        </Grid2>

        {/* Phone Number */}
        <Grid2 size={6}>
          <Field
            as={TextField}
            label="Phone Number"
            name={`${passenger.formType}[${index}].contact_no`}
            type="tel"
            fullWidth
            required
            value={passenger.contact_no}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.contact_no)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].contact_no`} />}
          />
        </Grid2> 
      </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default PassengerFields;