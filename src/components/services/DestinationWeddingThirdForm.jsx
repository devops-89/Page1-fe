import { userSendEnquiry } from "@/assests/apicalling/enquiry";
import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { BOOKING_ENQUIRY } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { additionalInformationValidationSchema } from "@/utils/validationSchema";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

const DestinationWeddingThirdForm = ({ active, setActive }) => {
  const selector = useSelector((state) => state.destinationWedding);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      weddingTheme: "",
      propertyType: "",
      foodType: [],
      entryVehicle: "",
      musicTheme: "",
      eventType: [],
      clothing: [],
      additionalServices: [],
    },
    validationSchema: additionalInformationValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const body = {
        enquiry_type: BOOKING_ENQUIRY.DESTINATION_WEDDING,
        enquiry_description: { ...values, ...selector },
      };

      userSendEnquiry({
        data: body,
        setLoading: setLoading,
        dispatch: dispatch,
      });
    },
  });
  const [weddingTheme, setWeddingTheme] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [entryVehicle, setEntryVehicle] = useState(null);
  const [musicTheme, setMusicTheme] = useState(null);
  const [foodType, setFoodType] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const singleChangeHandler = (e, newValue, id) => {
    if (id === "weddingTheme") {
      setWeddingTheme(newValue);
    }
    if (id === "propertyType") {
      setPropertyType(newValue);
    }
    if (id === "entryVehicle") {
      setEntryVehicle(newValue);
    }
    if (id === "musicTheme") {
      setMusicTheme(newValue);
    }
    formik.setFieldValue(id, newValue?.label);
  };

  const multipleChangeHandler = (e, newValue, id) => {
    if (id === "foodType") {
      setFoodType(newValue);
    }
    if (id === "eventType") {
      setEventType(newValue);
    }
    if (id === "clothing") {
      setClothing(newValue);
    }
    if (id === "additionalServices") {
      setAdditionalServices(newValue);
    }

    formik.setFieldValue(
      id,
      newValue.map((val) => val.label)
    );
  };

  // console.log("serere", selector);
  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontFamily: roboto.style,
            textAlign: "center",
            mb: 2,
          }}
        >
          Additional Information
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Wedding Theme"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.weddingTheme &&
                      Boolean(formik.errors.weddingTheme)
                    }
                    helperText={
                      formik.touched.weddingTheme && formik.errors.weddingTheme
                    }
                  />
                )}
                options={data.weddingTheme}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  singleChangeHandler(e, newValue, "weddingTheme")
                }
                value={weddingTheme}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Property Type"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.propertyType &&
                      Boolean(formik.errors.propertyType)
                    }
                    helperText={
                      formik.touched.propertyType && formik.errors.propertyType
                    }
                  />
                )}
                options={data.propertyType}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  singleChangeHandler(e, newValue, "propertyType")
                }
                value={propertyType}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Food Type"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.foodType && Boolean(formik.errors.foodType)
                    }
                    helperText={
                      formik.touched.foodType && formik.errors.foodType
                    }
                  />
                )}
                options={data.foodType}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  multipleChangeHandler(e, newValue, "foodType")
                }
                value={foodType}
                multiple
                filterSelectedOptions
                limitTags={1}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Entry Vehicle"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.entryVehicle &&
                      Boolean(formik.errors.entryVehicle)
                    }
                    helperText={
                      formik.touched.entryVehicle && formik.errors.entryVehicle
                    }
                  />
                )}
                options={data.entryVehicle}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  singleChangeHandler(e, newValue, "entryVehicle")
                }
                value={entryVehicle}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Music Theme"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.musicTheme &&
                      Boolean(formik.errors.musicTheme)
                    }
                    helperText={
                      formik.touched.musicTheme && formik.errors.musicTheme
                    }
                  />
                )}
                options={data.musicTheme}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  singleChangeHandler(e, newValue, "musicTheme")
                }
                value={musicTheme}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Event Type"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.eventType &&
                      Boolean(formik.errors.eventType)
                    }
                    helperText={
                      formik.touched.eventType && formik.errors.eventType
                    }
                  />
                )}
                options={data.eventType}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  multipleChangeHandler(e, newValue, "eventType")
                }
                value={eventType}
                multiple
                filterSelectedOptions
                limitTags={1}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:12, md:6}}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Clothing & Jewellery"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.clothing && Boolean(formik.errors.clothing)
                    }
                    helperText={
                      formik.touched.clothing && formik.errors.clothing
                    }
                  />
                )}
                options={data.clothing}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  multipleChangeHandler(e, newValue, "clothing")
                }
                value={clothing}
                multiple
                filterSelectedOptions
                limitTags={1}
              />
            </Grid2>
            <Grid2 size={12}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Additional Services"
                    sx={{ ...loginTextField }}
                    error={
                      formik.touched.additionalServices &&
                      Boolean(formik.errors.additionalServices)
                    }
                    helperText={
                      formik.touched.additionalServices &&
                      formik.errors.additionalServices
                    }
                  />
                )}
                options={data.additionalServices}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) =>
                  multipleChangeHandler(e, newValue, "additionalServices")
                }
                value={additionalServices}
                multiple
                filterSelectedOptions
                limitTags={1}
              />
            </Grid2>
          </Grid2>
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{
                fontSize: 14,
                fontWeight: 550,
                fontFamily: roboto.style,
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                width: 150,
              }}
              type="submit"
            >
              {loading ? (
                <Loading
                  width={20}
                  height={20}
                  color={COLORS.BLACK}
                  type="bars"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default DestinationWeddingThirdForm;
