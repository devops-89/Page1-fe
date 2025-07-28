import React, { useEffect, forwardRef } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid2,
} from "@mui/material";

import { COLORS } from "@/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addPersistGuest,
  clearPersistGuests,
  addCommonFields,
  clearCommonFields,
} from "@/redux/reducers/hotel-reducers/GuestSlice";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LeadPassengerValidation } from "@/utils/validationSchema";

const GuestForm = forwardRef(({ roomIndex, validationInfo, formikRef }) => {
  const dispatch = useDispatch();
  const tomorrow = dayjs().add(1, "day");

  const persistedGuests = useSelector(
    (state) => state.HOTEL.GuestList.selectedGuests
  );

  useEffect(() => {
    dispatch(clearPersistGuests());
  }, [dispatch]);

  const initialValues = {
    Title: "mr",
    firstName: "",
    lastName: "",
    isBelow12: false,
    guardianPan: "",
    Age: 0,
    PAN: "",
    GuardianDetail: {
      Title: "mr",
      FirstName: "",
      LastName: "",
      PAN: "",
    },
    GSTCompanyAddress: "",
    GSTCompanyContactNumber: "",
    GSTCompanyName: "",
    GSTNumber: "",
    GSTCompanyEmail: "",
    PassportNo: validationInfo?.PassportMandatory ? "" : null,
    PassportIssueDate: validationInfo?.PassportMandatory ? "" : null,
    PassportExpDate: validationInfo?.PassportMandatory ? "" : null,
  };

  const handleSubmit = (values) => {
    if (!firstName || !lastName) {
      alert("Please Fill This Form");
      return;
    }

    if (persistedGuests.length === 0) {
      dispatch(addPersistGuest(values));
    }

    dispatch(showModal(<GuestAdditionDialog />));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Guest Details
      </Typography>

      <Formik
      innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={LeadPassengerValidation(validationInfo)}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Grid2 container spacing={2} sx={{ mb: 1 }}>
             <Grid2 size={{ xs: 12, md: 2 }}>
                        <Typography sx={{ mb: 1 }}>Title</Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            name="Title"
                            value={values.Title}
                            onChange={handleChange}
                          >
                            <MenuItem value="mr">Mr</MenuItem>
                            <MenuItem value="mrs">Mrs</MenuItem>
                            <MenuItem value="ms">Ms</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography sx={{ mb: 1 }}>FIRST NAME</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography sx={{ mb: 1 }}>LAST NAME</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 2 }}>
                <Typography sx={{ mb: 1 }}>AGE</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="Age"
                  type="number"
                  placeholder="Age"
                  value={values.Age}
                  onChange={handleChange}
                />
              </Grid2>
            </Grid2>

            {/* Pan fields */}
            {true && (
              <Box sx={{ mt: 2 }}>
                {values.Age >= 12 ? (
                  <Grid2 container spacing={2}>
                    <Grid2 xs={12} md={4}>
                      <Typography sx={{ mb: 1 }}>PAN</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="PAN"
                        placeholder="PAN Number"
                        value={values.PAN}
                        onChange={handleChange}
                      />
                    </Grid2>
                  </Grid2>
                ) : (
                  <Box>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                      Guardian Details
                    </Typography>
                    <Grid2 container spacing={2}>
                      <Grid2 size={{ xs: 12, md: 2 }}>
                        <Typography sx={{ mb: 1 }}>Title</Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            name="GuardianDetail.Title"
                            value={values.GuardianDetail.Title}
                            onChange={handleChange}
                          >
                            <MenuItem value="mr">Mr</MenuItem>
                            <MenuItem value="mrs">Mrs</MenuItem>
                            <MenuItem value="ms">Ms</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid2>

                      <Grid2 size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ mb: 1 }}>First Name</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="GuardianDetail.FirstName"
                          placeholder="Guardian First Name"
                          value={values.GuardianDetail.FirstName}
                          onChange={handleChange}
                        />
                      </Grid2>

                      <Grid2 size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ mb: 1 }}>Last Name</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="GuardianDetail.LastName"
                          placeholder="Guardian Last Name"
                          value={values.GuardianDetail.LastName}
                          onChange={handleChange}
                        />
                      </Grid2>

                      <Grid2 xs={12} md={4}>
                        <Typography sx={{ mb: 1 }}>Guardian PAN</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="GuardianDetail.PAN"
                          placeholder="Guardian PAN"
                          value={values.GuardianDetail.PAN}
                          onChange={handleChange}
                        />
                      </Grid2>
                    </Grid2>
                  </Box>
                )}
              </Box>
            )}

            {/* Passport fields */}
            {validationInfo?.PassportMandatory && (
              <Box sx={{ mt: 1 }}>
                <Typography fontWeight="bold" mb={1}>
                  Passport Details
                </Typography>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      size="small"
                      name="PassportNo"
                      placeholder="Passport Number"
                      value={values.PassportNo}
                      onChange={handleChange}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Passport Issue Date"
                        disableFuture
                        value={
                          values.PassportIssueDate
                            ? dayjs(values.PassportIssueDate)
                            : null
                        }
                        onChange={(val) => {
                          setFieldValue(
                            "PassportIssueDate",
                            val ? val.toISOString().split("T")[0] : ""
                          );
                        }}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                          },
                          popper: {
                            sx: { zIndex: 100 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Passport Expiry Date"
                        disablePast
                        minDate={tomorrow}
                        value={
                          values.PassportExpDate
                            ? dayjs(values.PassportExpDate)
                            : null
                        }
                        onChange={(val) => {
                          setFieldValue(
                            "PassportExpDate",
                            val ? val.toISOString().split("T")[0] : ""
                          );
                        }}
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                          popper: {
                            sx: {
                              zIndex: 100,
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid2>
                </Grid2>
              </Box>
            )}

            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ my: 2, bgcolor: COLORS.PRIMARY, fontWeight: "bold" }}
            >
              ADD GUEST
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
})

export default GuestForm;
