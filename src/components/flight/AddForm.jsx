import React from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Typography, Grid2 } from "@mui/material";
import { nunito } from "@/utils/fonts";


const AddForm = ({ values, handleChange, handleBlur, touched, errors }) => {
    return (
        <Grid2 container spacing={2} sx={{ mb: "20px", borderRadius: '5px' }}>
            <Grid2 size={{xs:12}}>
            <Typography variant="h6" sx={{ fontFamily: nunito.style, fontWeight: 700 }}>
                Additional Information
            </Typography>
            </Grid2>
            <Grid2  size={{xs:12, sm:6, md:4}}>
                <FormControl fullWidth>
                    <InputLabel id="cell-country-code-label">Cell Country Code</InputLabel>
                    <Select
                        labelId="cell-country-code-label"
                        id="cell_country_code"
                        name="cell_country_code"
                        value={values.cell_country_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.cell_country_code && Boolean(errors.cell_country_code)}
                        label="Cell Country Code"
                        defaultValue=""
                    >
                        <MenuItem value="+91">+91</MenuItem>
                    </Select>
                    {touched.cell_country_code && errors.cell_country_code && (
                        <Typography color="error" variant="caption">{errors.cell_country_code}</Typography>
                    )}
                </FormControl>
            </Grid2>

            <Grid2  size={{xs:12, sm:6, md:4}}>
                <FormControl fullWidth>
                    <InputLabel id="country-code-label">Country Code</InputLabel>
                    <Select
                        labelId="country-code-label"
                        id="country_code"
                        name="country_code"
                        value={values.country_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.country_code && Boolean(errors.country_code)}
                        label="Country Code"
                        defaultValue=""
                    >
                        <MenuItem value="IN">IN</MenuItem>
                    </Select>
                    {touched.country_code && errors.country_code && (
                        <Typography color="error" variant="caption">{errors.country_code}</Typography>
                    )}
                </FormControl>
            </Grid2>

            <Grid2  size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="contact_no"
                    name="contact_no"
                    label="Contact No"
                    value={values.contact_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contact_no && Boolean(errors.contact_no)}
                    helperText={touched.contact_no && errors.contact_no}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="country"
                    name="country"
                    label="Country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="house_number"
                    name="house_number"
                    label="House Number"
                    value={values.house_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.house_number && Boolean(errors.house_number)}
                    helperText={touched.house_number && errors.house_number}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="postal_code"
                    name="postal_code"
                    label="Postal Code"
                    value={values.postal_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postal_code && Boolean(errors.postal_code)}
                    helperText={touched.postal_code && errors.postal_code}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="street"
                    name="street"
                    label="Street"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.street && Boolean(errors.street)}
                    helperText={touched.street && errors.street}
                />
            </Grid2>

            <Grid2  size={{xs:12, sm:6, md:4}}>
                <TextField
                    fullWidth
                    id="state"
                    name="state"
                    label="State"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                />
            </Grid2>

            <Grid2  size={{xs:12, sm:6, md:6}}>
                <TextField
                    fullWidth
                    id="nationality"
                    name="nationality"
                    label="Nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nationality && Boolean(errors.nationality)}
                    helperText={touched.nationality && errors.nationality}
                />
            </Grid2>

            <Grid2 size={{xs:12, sm:6, md:6}}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
            </Grid2>
        </Grid2>
    );
};

export default AddForm;