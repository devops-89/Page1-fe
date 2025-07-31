import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid2,
  Divider,
  FormHelperText,
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

const GuestForm = forwardRef(({ roomIndex, validationInfo }, ref) => {
  const { paxRoom, checkIn, checkOut } = useSelector(
    (state) => state?.HOTEL?.HotelSearchData
  );

  console.log("validationInfo: ",validationInfo);

  const formikRef = useRef(null);
  const { Adults, ChildrenAges } = paxRoom[roomIndex];

  const touchAllFields = (setTouched, values) => {
  const recursiveTouch = (obj) => {
    if (typeof obj !== 'object' || obj === null) return true;

    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = recursiveTouch(obj[key]);
      return acc;
    }, {});
  };

  setTouched(recursiveTouch(values), true);
};


  useImperativeHandle(ref, () => ({
 async submit() {
  if (!formikRef.current) return null;

  const { setTouched, values, validateForm, submitForm, isValid } = formikRef.current;

  touchAllFields(setTouched, values);
  await validateForm();

  const formValid = await formikRef.current.isValid;
  if (!formValid) {
    console.log("Form invalid");
    return null;
  }

  await submitForm();
  console.log("Form submitted:", formikRef.current.values);
  return formikRef.current.values;
}

  }));

  const dispatch = useDispatch();
  const tomorrow = dayjs().add(1, "day");

  const persistedGuests = useSelector(
    (state) => state.HOTEL.GuestList.selectedGuests
  );

  

  useEffect(() => {
    dispatch(clearPersistGuests());
  }, [dispatch]);

  const initialValues = {
    guests: [
      // Adults
      ...Array.from({ length: Adults }, () => ({
        type: "adult",
        Title: "mr",
        firstName: "",
        lastName: "",
        isBelow12: false,
        guardianPan: "",
        Age: 30, 
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
      })),

      // Children
      ...ChildrenAges.map((age) => ({
        type: "child",
        Title: "mr",
        firstName: "",
        lastName: "",
        isBelow12: age < 12,
        guardianPan: "",
        Age: age,
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
      })),
    ],
  };

  // const handleSubmit = (values) => {
  // if (!firstName || !lastName) {
  //   alert("Please Fill This Form");
  //   return;
  // }

  // if (persistedGuests.length === 0) {
  //   dispatch(addPersistGuest(values));
  // }

  // dispatch(showModal(<GuestAdditionDialog />));

  //   console.log("Room: ",roomIndex,"submitted: ",values);
  // };

  return (
    <Box>
    

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={LeadPassengerValidation(validationInfo)}
         onSubmit={(values) => {
    console.log("Submitted values:", values);
   
  }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form>
            {values.guests.map((guest, index) => (
              <>
                <Grid2 container spacing={2} sx={{ mb: 1 }}>
                  <Grid2 size={{ xs: 12, md: 12 }}>
                    <Typography fontWeight={600} sx={{ color: COLORS.PRIMARY }}>
                      Guest {index + 1}
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 2 }}>
                    <Typography sx={{ mb: 1 }}>Title</Typography>
                    <FormControl fullWidth size="small" error={Boolean(errors?.guests?.[index]?.Title && touched?.guests?.[index]?.Title)}>
                      <Select
                        name={`guests[${index}].Title`}
                        value={guest.Title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="mr">Mr</MenuItem>
                        <MenuItem value="mrs">Mrs</MenuItem>
                        <MenuItem value="ms">Ms</MenuItem>
                      </Select>
                      {errors?.guests?.[index]?.Title &&
                        touched?.guests?.[index]?.Title && (
                          <FormHelperText>
                            {errors?.guests?.[index]?.Title}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Typography sx={{ mb: 1 }}>FIRST NAME</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name={`guests[${index}].firstName`}
                      placeholder="First Name"
                      value={guest.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors?.guests?.[index]?.firstName &&
                          touched?.guests?.[index]?.firstName
                      )}
                      helperText={
                        errors?.guests?.[index]?.firstName &&
                        touched?.guests?.[index]?.firstName
                          ? errors?.guests?.[index]?.firstName
                          : ""
                      }
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Typography sx={{ mb: 1 }}>LAST NAME</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name={`guests[${index}].lastName`}
                      placeholder="Last Name"
                      value={guest.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors?.guests?.[index]?.lastName &&
                          touched?.guests?.[index]?.lastName
                      )}
                      helperText={
                        errors?.guests?.[index]?.lastName &&
                        touched?.guests?.[index]?.lastName
                          ? errors.guests[index].lastName
                          : ""
                      }
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 2 }}>
                    <Typography sx={{ mb: 1 }}>AGE</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name={`guests[${index}].Age`}
                      type="number"
                      placeholder="Age"
                      value={guest.Age}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      
                      error={Boolean(
                        errors?.guests?.[index]?.Age &&
                          touched?.guests?.[index]?.Age
                      )}
                      helperText={
                        errors?.guests?.[index]?.Age &&
                        touched?.guests?.[index]?.Age
                          ? errors.guests[index].Age
                          : ""
                      }
                    />
                  </Grid2>
                </Grid2>

                {/* Pan fields */}
                {true && (
                  <Box sx={{ mt: 2 }}>
                    {guest.Age >= 12 ? (
                      <Grid2 container spacing={2}>
                        <Grid2 xs={12} md={4}>
                          <Typography sx={{ mb: 1 }}>PAN</Typography>
                          <TextField
                            fullWidth
                            size="small"
                            name={`guests[${index}].PAN`}
                            placeholder="PAN Number"
                            value={guest.PAN}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors?.guests?.[index]?.PAN &&
                              touched?.guests?.[index]?.PAN
                            }
                            helperText={
                              errors?.guests?.[index]?.PAN &&
                              touched?.guests?.[index]?.PAN
                                ? errors?.guests?.[index]?.PAN
                                : ""
                            }
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
                            <FormControl
                              fullWidth
                              size="small"
                              
                              error={Boolean(
                                errors?.guests?.[index]?.GuardianDetail
                                  ?.Title &&
                                  touched?.guests?.[index]?.GuardianDetail
                                    ?.Title
                              )}
                            >
                              <Select
                                name={`guests[${index}].GuardianDetail.Title`}
                                value={guest.GuardianDetail.Title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <MenuItem value="mr">Mr</MenuItem>
                                <MenuItem value="mrs">Mrs</MenuItem>
                                <MenuItem value="ms">Ms</MenuItem>
                              </Select>
                              {errors?.guests?.[index]?.GuardianDetail?.Title &&
                              touched?.guests?.[index]?.GuardianDetail
                                ?.Title ? (
                                <FormHelperText>
                                  {
                                    errors?.guests?.[index]?.GuardianDetail
                                      ?.Title
                                  }
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </Grid2>

                          <Grid2 size={{ xs: 12, md: 5 }}>
                            <Typography sx={{ mb: 1 }}>First Name</Typography>
                            <TextField
                              fullWidth
                              size="small"
                              name={`guests[${index}].GuardianDetail.FirstName`}
                              placeholder="Guardian First Name"
                              value={guest.GuardianDetail.FirstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors?.guests?.[index]?.GuardianDetail
                                  ?.FirstName &&
                                  touched?.guests?.[index]?.GuardianDetail
                                    ?.FirstName
                              )}
                              helperText={
                                errors?.guests?.[index]?.GuardianDetail
                                  ?.FirstName &&
                                touched?.guests?.[index]?.GuardianDetail
                                  ?.FirstName
                                  ? errors?.guests?.[index]?.GuardianDetail
                                      ?.FirstName
                                  : ""
                              }
                            />
                          </Grid2>

                          <Grid2 size={{ xs: 12, md: 5 }}>
                            <Typography sx={{ mb: 1 }}>Last Name</Typography>
                            <TextField
                              fullWidth
                              size="small"
                              name={`guests[${index}].GuardianDetail.LastName`}
                              placeholder="Guardian Last Name"
                              value={guest.GuardianDetail.LastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                Boolean(
                                  errors?.guests?.[index]?.GuardianDetail
                                    ?.LastName &&
                                    touched?.guests?.[index]?.GuardianDetail
                                      ?.LastName
                                )}
                                helperText={(errors?.guests?.[index]?.GuardianDetail
                                    ?.LastName && touched?.guests?.[index]?.GuardianDetail
                                    ?.LastName) ?(
                                      errors?.guests?.[index]?.GuardianDetail
                                    ?.LastName
                                    ):""}
                            />
                          </Grid2>

                          <Grid2 xs={12} md={4}>
                            <Typography sx={{ mb: 1 }}>Guardian PAN</Typography>
                            <TextField
                              fullWidth
                              size="small"
                              name={`guests[${index}].GuardianDetail.PAN`}
                              placeholder="Guardian PAN"
                              value={guest.GuardianDetail.PAN}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                errors?.guests?.[index]?.GuardianDetail?.PAN &&
                                  touched?.guests?.[index]?.GuardianDetail?.PAN
                              )}
                              helperText={
                                errors?.guests?.[index]?.GuardianDetail?.PAN &&
                                touched?.guests?.[index]?.GuardianDetail?.PAN
                                  ? errors?.guests?.[index]?.GuardianDetail?.PAN
                                  : ""
                              }
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
                          name={`guests[${index}].PassportNo`}
                          placeholder="Passport Number"
                          value={guest.PassportNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            Boolean(
                              errors?.guests?.[index]?.PassportNo &&
                                touched?.guests?.[index]?.PassportNo
                            )
                              ? errors?.guests?.[index]?.PassportNo
                              : ""
                          }
                        />
                      </Grid2>

                      <Grid2 size={{ xs: 12, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Passport Issue Date"
                            disableFuture
                            value={
                              guest.PassportIssueDate
                                ? dayjs(guest.PassportIssueDate)
                                : null
                            }
                            onChange={(val) => {
                              setFieldValue(
                                `guests[${index}].PassportIssueDate`,
                                val ? val.toISOString().split("T")[0] : ""
                              );
                            }}
                            
                            slotProps={{
                              textField: {
                                size: "small",
                                fullWidth: true,
                                onBlur:()=>setFieldTouched(`guests[${index}].PassportIssueDate`,true),
                                error: Boolean(
                                  errors?.guests?.[index]?.PassportIssueDate &&
                                    touched?.guests?.[index]?.PassportIssueDate
                                ),
                                helperText:
                                  errors?.guests?.[index]?.PassportIssueDate &&
                                  touched?.guests?.[index]?.PassportIssueDate
                                    ? errors.guests[index].PassportIssueDate
                                    : "",
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
                              guest.PassportExpDate
                                ? dayjs(guest.PassportExpDate)
                                : null
                            }
                            onChange={(val) => {
                              setFieldValue(
                                `guests[${index}].PassportExpDate`,
                                val ? val.toISOString().split("T")[0] : ""
                              );
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                                onBlur:()=> setFieldTouched(`guests[${index}].PassportExpDate`,true),
                                error: Boolean(
                                  errors?.guests?.[index]?.PassportExpDate &&
                                    touched?.guests?.[index]?.PassportExpDate
                                ),
                                helperText:
                                  errors?.guests?.[index]?.PassportExpDate &&
                                  touched?.guests?.[index]?.PassportExpDate
                                    ? errors.guests[index].PassportExpDate
                                    : "",
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

                {/* <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ my: 2, bgcolor: COLORS.PRIMARY, fontWeight: "bold" }}
            >
              ADD GUEST
            </Button> */}
                <Divider sx={{ my: 2 }} />
              </>
            ))}
          </Form>
        )}
      </Formik>
    </Box>
  );
});

export default GuestForm;
