import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCommonFields,
  clearCommonFields,
} from "@/redux/reducers/hotel-reducers/GuestSlice";
import { Formik, Form } from "formik";
import { Box,Grid2,Typography,TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { CommonFieldValidation } from "@/utils/validationSchema";

const CommonFieldsForm = ({formikRef}) => {
  const dispatch = useDispatch();



  // getting the common fields data from the redux
  const persistedCommonFields = useSelector(
    (state) => state.HOTEL.GuestList.commonFields
  );

  console.log("Persisted Common Fields: ",persistedCommonFields);

  //   clear out the previous common fields data first
  useEffect(() => {
    dispatch(clearCommonFields());
  }, [dispatch]);

  //   initial values for the formik
  const initialValue = {
    Email: null,
    Phoneno: null,
  };

//   handle Submit Function
 async function handleSubmit(values){
    await dispatch(addCommonFields(values));
     console.log("common fields: ",values);
  }



  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Contact Information
      </Typography>
      <Formik innerRef={formikRef} initialValues={initialValue} validationSchema={CommonFieldValidation} onSubmit={handleSubmit} >
        {
            ({values, handleChange, setFieldValue,errors, touched,handleBlur})=>(
               <Form>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1 }}>EMAIL</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched?.Email && errors?.Email)}
                  helperText={touched?.Email && errors?.Email}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1 }}>MOBILE</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="Phoneno"
                  placeholder="Mobile Number"
                  value={values.Phoneno}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched?.Phoneno && errors?.Phoneno)}
                  helperText={touched?.Phoneno && errors?.Phoneno}
                />
              </Grid2>
                </Grid2>

               </Form>
            )
        }
      </Formik>
    </Box>
  );
};

export default CommonFieldsForm;
