import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {data} from "@/assests/data";
import { activityFormSchema } from "@/utils/validationSchema";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { COLORS } from "@/utils/colors";





const ActivityForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      activity: "",
      message: "",
    },
    validationSchema: activityFormSchema,
    onSubmit: (values,{resetForm}) => {
      console.log("Form data", values);
      resetForm();
    
    },
  });

  return (
    <div style={{width:"300px"}}>
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Enquire Now
      </Typography>

      <TextField
      size="small"
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      sx={{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLORS.PRIMARY, 
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.PRIMARY,
    },
  }}
      />

      <TextField
      size="small"
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
          sx={{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLORS.PRIMARY, 
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.PRIMARY,
    },
  }}
      />

      <TextField
      size="small"
        fullWidth
        id="mobile"
        name="mobile"
        label="Mobile Number"
        type="tel"
        value={formik.values.mobile}
        onChange={formik.handleChange}
        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
        helperText={formik.touched.mobile && formik.errors.mobile}
          sx={{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLORS.PRIMARY, 
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.PRIMARY,
    },
  }}
      />

      <TextField
        fullWidth
        size="small"
        id="activity"
        name="activity"
        label="Select Activity"
        select
        value={formik.values.activity}
        onChange={formik.handleChange}
        error={formik.touched.activity && Boolean(formik.errors.activity)}
        helperText={formik.touched.activity && formik.errors.activity}
          sx={{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLORS.PRIMARY, 
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.PRIMARY,
    },
  }}
      >
        {data.activitiesPage.activityCategories.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
      size="small"
        fullWidth
        id="message"
        name="message"
        label="Message"
        multiline
        rows={4}
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
          sx={{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLORS.PRIMARY, 
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', 
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.PRIMARY,
    },
  }}
      />

      <Button 
      size="small"
       
        variant="contained" 
        type="submit"
        sx={{ mt: 2,bgcolor:COLORS.PRIMARY,color:COLORS.WHITE }}
      >
        Submit
      </Button>
    </Box>
    </div>
  );
};

export default ActivityForm;
