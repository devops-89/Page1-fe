import React from "react";
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Grid, Typography, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nunito } from "@/utils/fonts";

const TravellerForm = ({ form, handleChange, formType = "Adult" }) => {
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

  // Define validation schema
  const validationSchema = Yup.object({
    firstMiddleName: Yup.string().required("First & Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    countryCode: Yup.string().matches(/^\+\d{1,3}$/, "Invalid country code").nullable(),
    mobileNumber: Yup.string().matches(/^\d{10}$/, "Invalid mobile number").nullable(),
    email: Yup.string().email("Invalid email").nullable(),
  });

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: 2, fontFamily: nunito.style }}>
        {formType} ({ageHint})
      </Typography>

      <Formik
        initialValues={{
          firstMiddleName: form.firstMiddleName || "",
          lastName: form.lastName || "",
          gender: form.gender || "male",
          countryCode: form.countryCode || "",
          mobileNumber: form.mobileNumber || "",
          email: form.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleChange(form.id, values);
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="firstMiddleName"
                  label={nameLabel}
                  placeholder={namePlaceholder}
                  value={values.firstMiddleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="firstMiddleName" component="div" style={{ color: "red" }} />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="lastName" component="div" style={{ color: "red" }} />
              </Grid>
              <Grid item xs={4}>
                <RadioGroup row name="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="countryCode"
                  label="Country Code (Optional)"
                  placeholder="Country Code"
                  value={values.countryCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="countryCode" component="div" style={{ color: "red" }} />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="mobileNumber"
                  label="Mobile No (Optional)"
                  placeholder="Mobile No"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="mobileNumber" component="div" style={{ color: "red" }} />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email (Optional)"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="email" component="div" style={{ color: "red" }} />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TravellerForm;
