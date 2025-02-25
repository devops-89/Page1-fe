import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography, MenuItem } from "@mui/material";
import { nunito } from "@/utils/fonts";

const PassengerFields = ({ passenger, index, handleChange, handleBlur, errors }) => {
  console.log("passenger:",passenger);
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: nunito.style, mb: "10px" }}>
       {passenger.formType}
      </Typography>
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
            name={`${passenger.formType}[${index}].firstName`}
            fullWidth
            required
            value={passenger.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.firstName)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].firstName`} />}
          />
        </Grid2>

        {/* Middle Name */}
        <Grid2 size={3}>
          <Field
            as={TextField}
            label="Middle Name"
           
            name={`${passenger.formType}[${index}].middlename`}
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
            
            name={`${passenger.formType}[${index}].lastName`}
            fullWidth
            required
            value={passenger.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.lastName)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].lastName`} />}
          />
        </Grid2>

        {/* Date of Birth */}
        <Grid2 size={6}>
          <Field
            as={TextField}
            label="Date of Birth"
            name={`${passenger.formType}[${index}].dob`}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={passenger.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.dob)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].dob`} />}
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
            name={`${passenger.formType}[${index}].phone`}
            type="tel"
            fullWidth
            required
            value={passenger.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.passengers?.[index]?.phone)}
            helperText={<ErrorMessage name={`${passenger.formType}[${index}].phone`} />}
          />
        </Grid2> 
      </Grid2>
    </>
  );
};

export default PassengerFields;