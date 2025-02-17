import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";

const PassengerFields = ({ passenger, index, handleChange, handleBlur, errors }) => {
  return (
    <>
      <Typography variant="h6" sx={{fontWeight:600, fontFamily:nunito.style, mb:'20px'}}>
        {passenger.type} {index + 1}
      </Typography>
      <Grid2 container spacing={1}>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="First Name"
        name={`passengers[${index}].firstName`}
        value={passenger.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.passengers?.[index]?.firstName)}
        helperText={<ErrorMessage name={`passengers[${index}].firstName`} />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6 , md:4}}>
      <Field
        as={TextField}
        label="Middle Name"
        name={`passengers[${index}].middleName`}
        value={passenger.middleName}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6, md:4}}>
      <Field
        as={TextField}
        label="Last Name"
        name={`passengers[${index}].lastName`}
        value={passenger.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.passengers?.[index]?.lastName)}
        helperText={<ErrorMessage name={`passengers[${index}].lastName`} />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6}}>
      <Field
        as={TextField}
        label="Email"
        name={`passengers[${index}].email`}
        type="email"
        value={passenger.email}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.passengers?.[index]?.email)}
        helperText={<ErrorMessage name={`passengers[${index}].email`} />}
      />
      </Grid2>
      <Grid2 size={{xs:12, sm:6}}>
      <Field
        as={TextField}
        label="Mobile Number"
        name={`passengers[${index}].mobileNumber`}
        type="tel"
        value={passenger.mobileNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        size="normal"
        required
        error={Boolean(errors.passengers?.[index]?.mobileNumber)}
        helperText={<ErrorMessage name={`passengers[${index}].mobileNumber`} />}
      />
      </Grid2>
      </Grid2>
    </>
  );
};

export default PassengerFields;
