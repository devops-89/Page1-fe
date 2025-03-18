import React from "react";
import { Field, ErrorMessage } from "formik";
import { Grid2, TextField, Typography, MenuItem } from "@mui/material";
import { nunito } from "@/utils/fonts";
import {Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MealSelection from "./ssr/oneway/MealSelection";
import BaggageSelection from "./ssr/oneway/BaggageSelection";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const PassengerFields = ({data, passenger, index, handleChange, handleBlur, errors, handleMealValue, selectMeal, selectBaggage, handleBaggageValue }) => {
    console.log("data", data)
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
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            label="Title"
            size="small"
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
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            label="First Name"
            size="small"
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
        <Grid2  size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            label="Middle Name"
            size="small"
            name={`${passenger.formType}[${index}].middle_name`}
            fullWidth
            value={passenger.middleName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid2>

        {/* Last Name */}
        <Grid2  size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            label="Last Name"
            size="small"
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
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
        
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Birth"
        disableFuture
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={passenger?.date_of_birth ? dayjs(passenger.date_of_birth) : null}
        onChange={(newValue) => {
          if (newValue) {
            handleChange({
              target: {
                name: `${passenger.formType}[${index}].date_of_birth`,
                value: newValue.format("YYYY-MM-DD"),
              },
            });
          }
        }}
        onBlur={handleBlur}
        renderInput={(params) => <TextField {...params} size="small" />}
        sx={{
          "& .MuiInputBase-input": { padding: "8.5px 14px" },
          "& .MuiFormLabel-root": { top: "-7px" },
        }}
        error={Boolean(errors?.passengers?.[index]?.date_of_birth)}
        helperText={<ErrorMessage name={`${passenger.formType}[${index}].date_of_birth`} />}
      />
    </LocalizationProvider>
        </Grid2>

        {/* Gender */}
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            size="small"
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
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            size="small"
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
        <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12 }}>
          <Field
            as={TextField}
            label="Phone Number"
            name={`${passenger.formType}[${index}].contact_no`}
            size="small"
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

      <Grid2 size={12}>
       {
        (data)?(<MealSelection mealData={data?.MealDynamic}  handleMealValue={handleMealValue} selectMeal={selectMeal}/>):(null)
       } 

       {
        (data)?( <BaggageSelection baggageData={data?.Baggage} handleBaggageValue={handleBaggageValue} selectBaggage={selectBaggage}/>):(null)
       }
       </Grid2>
       
      </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default PassengerFields;