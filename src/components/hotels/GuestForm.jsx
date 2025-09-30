import React, { useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Grid,
  Divider,
  FormHelperText,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { clearPersistGuests } from "@/redux/reducers/hotel-reducers/GuestSlice";
import { COLORS } from "@/utils/colors";

const GuestForm = ({
  roomIndex,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  validationInfo,
}) => {
  const dispatch = useDispatch();
  const tomorrow = dayjs().add(1, "day");

  useEffect(() => {
    dispatch(clearPersistGuests());
  }, [dispatch]);

  return (
    <Box>
      {values.guests.map((guest, index) => (
        <React.Fragment key={index}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12}>
              <Typography fontWeight={600} sx={{ color: COLORS.PRIMARY }}>
                Guest {index + 1}
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography sx={{ mb: 1 }}>Title</Typography>
              <FormControl
                fullWidth
                size="small"
                error={Boolean(
                  errors?.guests?.[index]?.Title &&
                    touched?.guests?.[index]?.Title
                )}
              >
                <Select
                  name={`guestForms[${roomIndex}].guests[${index}].Title`}
                  value={guest.Title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="mr">Mr</MenuItem>
                  <MenuItem value="mrs">Mrs</MenuItem>
                  <MenuItem value="ms">Ms</MenuItem>
                </Select>
                <FormHelperText>
                  {touched?.guests?.[index]?.Title &&
                    errors?.guests?.[index]?.Title}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 1 }}>FIRST NAME</Typography>
              <TextField
                fullWidth
                size="small"
                name={`guestForms[${roomIndex}].guests[${index}].firstName`}
                value={guest.firstName}
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  touched?.guests?.[index]?.firstName &&
                    errors?.guests?.[index]?.firstName
                )}
                helperText={
                  touched?.guests?.[index]?.firstName &&
                  errors?.guests?.[index]?.firstName
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 1 }}>LAST NAME</Typography>
              <TextField
                fullWidth
                size="small"
                name={`guestForms[${roomIndex}].guests[${index}].lastName`}
                value={guest.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  touched?.guests?.[index]?.lastName &&
                    errors?.guests?.[index]?.lastName
                )}
                helperText={
                  touched?.guests?.[index]?.lastName &&
                  errors?.guests?.[index]?.lastName
                }
              />
            </Grid>
            {/* handle Age Form Field for Disabled field for Age start */}
            {guest.Age > 12 ? (
              <Grid item xs={12} md={2}>
                <Typography sx={{ mb: 1 }}>AGE</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name={`guestForms[${roomIndex}].guests[${index}].Age`}
                    value={guest.Age || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                    error={Boolean(
                      touched?.guests?.[index]?.Age &&
                        errors?.guests?.[index]?.Age
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 40 * 6, // 6 items * item height (default ~40px)
                        },
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select Age
                    </MenuItem>
                    {Array.from({ length: 89 }, (_, i) => i + 12).map((age) => (
                      <MenuItem key={age} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched?.guests?.[index]?.Age &&
                    errors?.guests?.[index]?.Age && (
                      <Typography variant="caption" color="error">
                        {errors?.guests?.[index]?.Age}
                      </Typography>
                    )}
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={12} md={2}>
                <Typography sx={{ mb: 1 }}>AGE</Typography>
                <TextField
                  fullWidth
                  disabled
                  size="small"
                  type="number"
                  name={`guestForms[${roomIndex}].guests[${index}].Age`}
                  value={guest.Age}
                  placeholder="Age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    touched?.guests?.[index]?.Age &&
                      errors?.guests?.[index]?.Age
                  )}
                  helperText={
                    touched?.guests?.[index]?.Age &&
                    errors?.guests?.[index]?.Age
                  }
                />
              </Grid>
            )}
            {/* handle Age Form Field for Disabled field for Age end */}
          </Grid>

          {/* PAN or Guardian fields */}
          {guest.Age > 12 ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ mb: 1 }}>PAN</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name={`guestForms[${roomIndex}].guests[${index}].PAN`}
                  value={guest.PAN}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="PAN Number"
                  error={Boolean(
                    touched?.guests?.[index]?.PAN &&
                      errors?.guests?.[index]?.PAN
                  )}
                  helperText={
                    touched?.guests?.[index]?.PAN &&
                    errors?.guests?.[index]?.PAN
                  }
                />
              </Grid>
            </Grid>
          ) : (
            <Box mt={2}>
              <Typography fontWeight={600} mb={1}>
                Guardian Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <Typography sx={{ mb: 1 }}>Title</Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    error={Boolean(
                      errors?.guests?.[index]?.GuardianDetail?.Title &&
                        touched?.guests?.[index]?.GuardianDetail?.Title
                    )}
                  >
                    <Select
                      name={`guestForms[${roomIndex}].guests[${index}].GuardianDetail.Title`}
                      value={guest.GuardianDetail.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="mr">Mr</MenuItem>
                      <MenuItem value="mrs">Mrs</MenuItem>
                      <MenuItem value="ms">Ms</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched?.guests?.[index]?.GuardianDetail?.Title &&
                        errors?.guests?.[index]?.GuardianDetail?.Title}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography sx={{ mb: 1 }}>First Name</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name={`guestForms[${roomIndex}].guests[${index}].GuardianDetail.FirstName`}
                    value={guest.GuardianDetail.FirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Guardian First Name"
                    error={Boolean(
                      touched?.guests?.[index]?.GuardianDetail?.FirstName &&
                        errors?.guests?.[index]?.GuardianDetail?.FirstName
                    )}
                    helperText={
                      touched?.guests?.[index]?.GuardianDetail?.FirstName &&
                      errors?.guests?.[index]?.GuardianDetail?.FirstName
                    }
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography sx={{ mb: 1 }}>Last Name</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name={`guestForms[${roomIndex}].guests[${index}].GuardianDetail.LastName`}
                    value={guest.GuardianDetail.LastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Guardian Last Name"
                    error={Boolean(
                      touched?.guests?.[index]?.GuardianDetail?.LastName &&
                        errors?.guests?.[index]?.GuardianDetail?.LastName
                    )}
                    helperText={
                      touched?.guests?.[index]?.GuardianDetail?.LastName &&
                      errors?.guests?.[index]?.GuardianDetail?.LastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography sx={{ mb: 1 }}>Pan</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name={`guestForms[${roomIndex}].guests[${index}].GuardianDetail.PAN`}
                    value={guest.GuardianDetail.PAN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Guardian PAN"
                    error={Boolean(
                      touched?.guests?.[index]?.GuardianDetail?.PAN &&
                        errors?.guests?.[index]?.GuardianDetail?.PAN
                    )}
                    helperText={
                      touched?.guests?.[index]?.GuardianDetail?.PAN &&
                      errors?.guests?.[index]?.GuardianDetail?.PAN
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Passport fields */}
          {validationInfo?.PassportMandatory && (
            <Box mt={2}>
              <Typography fontWeight="bold" mb={1}>
                Passport Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name={`guestForms[${roomIndex}].guests[${index}].PassportNo`}
                    placeholder="Passport Number"
                    value={guest.PassportNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched?.guests?.[index]?.PassportNo &&
                        errors?.guests?.[index]?.PassportNo
                    )}
                    helperText={
                      touched?.guests?.[index]?.PassportNo &&
                      errors?.guests?.[index]?.PassportNo
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Issue Date"
                      disableFuture
                      value={
                        guest.PassportIssueDate
                          ? dayjs(guest.PassportIssueDate)
                          : null
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `guestForms[${roomIndex}].guests[${index}].PassportIssueDate`,
                          val ? val.toISOString().split("T")[0] : ""
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          onBlur: () =>
                            setFieldTouched(
                              `guestForms[${roomIndex}].guests[${index}].PassportIssueDate`,
                              true
                            ),
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
                        popper: { sx: { zIndex: 100 } },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Expiry Date"
                      disablePast
                      minDate={tomorrow}
                      value={
                        guest.PassportExpDate
                          ? dayjs(guest.PassportExpDate)
                          : null
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `guestForms[${roomIndex}].guests[${index}].PassportExpDate`,
                          val ? val.toISOString().split("T")[0] : ""
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          onBlur: () =>
                            setFieldTouched(
                              `guestForms[${roomIndex}].guests[${index}].PassportExpDate`,
                              true
                            ),
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
                        popper: { sx: { zIndex: 100 } },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default GuestForm;
