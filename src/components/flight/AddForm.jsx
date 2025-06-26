import React from "react";
import { TextField, Typography, Grid2, Box, Autocomplete } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { data } from "@/assests/data";
import { MuiTelInput } from "mui-tel-input";

const AddForm = ({ values, handleChange, handleBlur, touched, errors,setFieldValue }) => {
  // console.log("value", values);

  return (
    <>
      <Box
        sx={{
          paddingBlock: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: nunito.style,
            fontWeight: 700,
            mb: "5px",
            color: COLORS.PRIMARY,
          }}
        >
          Booking Detail will be sent on:
        </Typography>
        <Grid2 container spacing={1}>
          {/* Cell Country Code */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Phone No
            </Typography>
            <Box sx={{display:'grid',gridTemplateColumns:'30% 70%' }} >

         
            <Autocomplete
              disablePortal
              options={data.countries || []}
              getOptionLabel={(option) => `${option.phone}`}
              sx={{ width: "100%" ,fontSize:"16px" }}
              value={
                data.countries.find(
                  (country) => country.phone === values?.cell_country_code
                ) || null
              }
              

              onChange={(event, newValue) => {
                setFieldValue("cell_country_code", newValue?.phone || ""); 
                setFieldValue("country_code", newValue?.code || "");      
                setFieldValue("country", newValue?.label || "");  
                setFieldValue("nationality", newValue?.nationality || "");        
              }}
              
              onBlur={handleBlur}
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  <img
                    loading="lazy"
                    width="18"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.label}
                    style={{ marginRight: 10  }}
                  />
                   <span style={{ fontSize: "13px" }}>{option.phone}</span>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Cell Code"
                  size="small"
                  error={
                    touched?.cell_country_code && !!errors?.cell_country_code
                  }
                  helperText={
                    touched?.cell_country_code && errors?.cell_country_code
                  }
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                       borderTopRightRadius:0,
                       borderBottomRightRadius:0           
                      },
                    },
                  }}

                />
              )}
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 100,
                  },
                },
              }}
            />
             <TextField
              fullWidth
              size="small"
              id="contact_no"
              name="contact_no"
              placeholder="Enter Phone No"
              value={values?.contact_no}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.contact_no && !!errors?.contact_no}
              helperText={touched?.contact_no && errors?.contact_no}
              inputProps={{ maxLength: 10 }}
              variant="outlined"
              InputProps={{
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    
                    borderTopLeftRadius:0,
                    borderBottomLeftRadius:0
                     // remove left border
                  },
                },
              }}
            />
               </Box>
          </Grid2>
      


          {/* City */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              City
            </Typography>
            <TextField
              size="small"
              fullWidth
              id="city"
              name="city"
              placeholder="Enter City"
              value={values?.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.city && !!errors?.city}
              helperText={touched?.city && errors?.city}
              variant="outlined"
            />
          </Grid2>

  

          {/* Address */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="address" 
              name="address"
              placeholder="Enter Address"
              value={values?.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.address && !!errors?.address}
              helperText={touched?.address && errors?.address}
              variant="outlined"
            />
          </Grid2>


          {/* Email */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: nunito.style, mb: "5px" }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.email && !!errors?.email}
              helperText={touched?.email && errors?.email}
              variant="outlined"
            />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default AddForm;
