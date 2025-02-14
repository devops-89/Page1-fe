"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  Divider,
  DialogTitle,
  Dialog,
  IconButton,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { flightController } from "@/api/flightController";
import TravellerForm from "@/components/flight/TravellerForm";
import { data } from "../../../assests/data";
import { useRouter } from "next/router";
import FareSummary from "@/components/flight/FareSummary";
import moment from "moment";
import { nunito } from "@/utils/fonts";
import pointerImage from "@/../public/images/pointer.png";
import { COLORS } from "@/utils/colors";
import Loading from "react-loading";
import { useFormik } from "formik";
import { gstForm, pancard, passport } from "@/utils/validationSchema";
import { JOURNEY, JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import ToastBar from "@/components/toastBar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FlightDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [forms, setForms] = useState(data.flightDetails.travelerData || []);
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState();
  const [open, setOpen] = useState(false);
  const [isGSTMandatory, setIsGSTMandatory] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formikPancard = useFormik({
    initialValues: {
      fullName: "",
      panNumber: "",
      dob: "",
    },
    validationSchema: pancard,
  });

  const formikPassPort = useFormik({
    initialValues: {
      passportNo: "",
      passportExpiry: "",
      passportIssueDate: "",
      passportIssueCountryCode: "",
    },
    validationSchema: passport,
  });

  const formikGST = useFormik({
    initialValues: {
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    },
    validationSchema: gstForm(isGSTMandatory),
  });

  useEffect(() => {
    if (localStorage.getItem("state")) {
      setFormState(JSON.parse(localStorage.getItem("state")));
    }
  }, []);

  useEffect(() => {
    if (router.query.ResultIndex && router.query.traceId) {
      flightController
        .flightDetails({
          result_index: router.query.ResultIndex,
          trace_id: router.query.traceId,
          ip_address: JSON.parse(localStorage.getItem("state")).ip_address,
          journey_type: JOURNEY_TYPE.ONEWAY,
          journey: JOURNEY.DOMESTIC,
        })
        .then((response) => {
          console.log(
            "oneWayflightDetails",
            response.data.data[0].Response.Error
          );
          console.log("oneWayflightDetails", response.data.data);
          setFlightDetails(response.data.data[0].Response);
          setIsGSTMandatory(
            response.data.data.Response?.ResultIndex?.IsGSTMandatory
          );

          localStorage.setItem(
            "oneWayflightDetails",
            JSON.stringify(response.data.data[0].Response)
          );
        })
        .catch((error) => {
          setError(error);
          dispatch(
            setToast({
              open: true,
              message: error,
              severity: TOAST_STATUS.ERROR,
            })
          );
        });
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("oneWayflightDetails"))
    ) {
      setTimeout(() => {
        setFlightDetails(
          JSON.parse(localStorage.getItem("oneWayflightDetails"))
        );
      }, 3000);
    }
  }, []);

  const handleChange = (type, id, field) => (event) => {
    setForms((prevForms) => ({
      ...prevForms,
      [type]: prevForms[type].map((form) =>
        form.id === id
          ? {
              ...form,
              [field]: event.target.value,
            }
          : form
      ),
    }));
  };

  const addNewForm = (type) => {
    if (forms[type].length != formState[type.toLowerCase()]) {
      const newForm = {
        id: forms[type]?.length + 1 || 1,
        firstMiddleName: "",
        lastName: "",
        gender: "",
        countryCode: "",
        mobileNumber: "",
        email: "",
        requiresWheelchair: false,
      };
      setForms((prevForms) => ({
        ...prevForms,
        [type]: [...(prevForms[type] || []), newForm],
      }));
    }
  };

  return (
    <>
      <Grid2 container>
        <Grid2
          size={{ xs: "12" }}
          sx={{
            height: "230px",
            background: "rgba(8,8,79,1)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: COLORS.WHITE,
              fontFamily: nunito.style,
              fontWeight: 700,
            }}
          >
            Complete Your Booking
          </Typography>
        </Grid2>


        
        {error ? (
          <Grid2
            size={{ xs: "12" }}
            sx={{
              textAlign: "center",
              width: "100%",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontFamily: nunito.style,
                fontSize: "24px",
              }}
            >
              {error?.message ||
                "An unexpected error occurred. Please try again later."}
            </Typography>
          </Grid2>     
        ) : flightDetails ? (
          <Grid2 size={{ xs: "12" }} sx={{ width: "100%", py: 4 }}>
            <Container sx={{ mt: "-70px" }}>
              <Grid2 container spacing={2}>
                {/* Flight Details */}
                <Grid2 size={8}>
                  <Paper
                    sx={{
                      padding: 2,
                      backgroundColor: "#F4F4F4",
                      marginBottom: 2,
                    }}
                  >
                    {/* Card Section start */}
                    <Card sx={{ padding: "20px", marginBottom: "20px" }}>
                      <Grid2 container>
                        <Grid2 size={{ xs: 8 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontFamily: nunito.style,
                              fontSize: "20px",
                              fontWeight: 700,
                            }}
                          >
                            {`${flightDetails?.Results?.Segments[0][0]?.Origin?.Airport?.CityName}`}{" "}
                            →{" "}
                            {`${
                              flightDetails?.Results?.Segments[0][
                                flightDetails?.Results?.Segments[0].length - 1
                              ]?.Destination?.Airport?.CityName
                            }`}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            gutterBottomx
                            sx={{ marginBottom: "10px" }}
                          >
                            <span
                              style={{
                                backgroundColor: "#FFEDD1",
                                padding: "5px",
                                borderRadius: "4px",
                                fontFamily: nunito.style,
                              }}
                            >
                              {moment(
                                `${flightDetails?.Results?.Segments[0][0].Origin.DepTime}`
                              ).format("ddd, MMM D")}
                            </span>{" "}
                            {`${
                              flightDetails?.Results?.Segments[0].length - 1
                            } Stop.`}{" "}
                            {`${Math.floor(
                              moment
                                .duration(
                                  flightDetails?.Results?.Segments[0][
                                    flightDetails?.Results?.Segments[0].length -
                                      1
                                  ].AccumulatedDuration,
                                  "minutes"
                                )
                                .asHours()
                            )} hrs ${moment
                              .duration(
                                flightDetails?.Results?.Segments[0][
                                  flightDetails?.Results?.Segments[0].length - 1
                                ].AccumulatedDuration,
                                "minutes"
                              )
                              .minutes()} min`}
                          </Typography>
                        </Grid2>
                        <Grid2
                          size={{ xs: 4 }}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            size="small"
                            sx={{ fontFamily: nunito.style, fontWeight: 800 }}
                            onClick={handleClickOpen}
                          >
                            View Fares Rules
                          </Button>
                        </Grid2>
                      </Grid2>
                      <Divider />

                      {/* Intermediate flights start */}
                      <Box>
                        {flightDetails?.Results?.Segments[0]?.map(
                          (segment, index) => {
                            // console.log("segment:", segment);
                            return (
                              <>
                                <Grid2
                                  container
                                  spacing={1}
                                  sx={{ marginTop: "10px" }}
                                >
                                  {/* Flight Segment 1 */}
                                  <Grid2
                                    size={{ xs: 12 }}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <Image
                                      src={segment?.Airline?.AirlineLogo}
                                      alt="Image"
                                      width={30}
                                      height={30}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                      sx={{
                                        fontFamily: nunito.style,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {segment?.Airline?.AirlineName}{" "}
                                      {segment?.Airline?.AirlineCode}{" "}
                                      {segment?.Airline?.FlightNumber}
                                    </Typography>
                                  </Grid2>
                                  <Grid2
                                    size={{ xs: 12 }}
                                    sx={{
                                      backgroundColor: "#F4F4F4",
                                      padding: "15px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: 700,
                                        fontFamily: nunito.style,
                                      }}
                                    >
                                      {moment(segment?.Origin?.DepTime).format(
                                        "HH:mm"
                                      )}{" "}
                                      - {segment?.Origin?.Airport?.CityName} (
                                      {segment?.Origin?.Airport?.AirportCode})
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginLeft: "65px",
                                      }}
                                    >
                                      <img
                                        src={pointerImage.src}
                                        style={{ width: "16px" }}
                                      />{" "}
                                      {`${Math.floor(
                                        moment
                                          .duration(segment.Duration, "minutes")
                                          .asHours()
                                      )} hrs : ${moment
                                        .duration(segment.Duration, "minutes")
                                        .minutes()} min`}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: 700,
                                        fontFamily: nunito.style,
                                      }}
                                    >
                                      {moment(
                                        segment.Destination.ArrTime
                                      ).format("HH:mm")}{" "}
                                      - {segment.Destination.Airport.CityName} (
                                      {segment.Destination.Airport.AirportCode})
                                    </Typography>
                                  </Grid2>

                                  <Grid2
                                    size={{ xs: 12 }}
                                    sx={{
                                      display: "flex",
                                      gap: "20px",
                                      flexWrap: "wrap",
                                      backgroundColor: "#FFEDD1",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontFamily: nunito.style,
                                        fontWeight: 500,
                                      }}
                                    >
                                      <strong>Baggage :</strong>{" "}
                                      {segment.Baggage}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontFamily: nunito.style,
                                        fontWeight: 500,
                                      }}
                                    >
                                      <strong>Cabin Baggage :</strong>{" "}
                                      {segment.CabinBaggage}
                                    </Typography>
                                  </Grid2>
                                </Grid2>
                                <Divider />

                                {flightDetails?.Results?.Segments[0].length !=
                                segment.SegmentIndicator ? (
                                  <>
                                    <Box
                                      sx={{
                                        marginBottom: "10px",
                                        borderLeft: "2px dashed",
                                        paddingLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          marginTop: "10px",
                                          color: "orange",
                                          fontWeight: 600,
                                          fontFamily: nunito.style,
                                        }}
                                      >
                                        Change of Planes
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          marginTop: "10px",
                                          fontWeight: 700,
                                          fontFamily: nunito.style,
                                        }}
                                      >
                                        {`${moment
                                          .utc(
                                            moment(
                                              flightDetails?.Results
                                                ?.Segments[0][index + 1]?.Origin
                                                .DepTime,
                                              "YYYY-MM-DD HH:mm"
                                            ).diff(
                                              moment(
                                                flightDetails?.Results
                                                  ?.Segments[0][index]
                                                  ?.Destination.ArrTime,
                                                "YYYY-MM-DD HH:mm"
                                              )
                                            )
                                          )
                                          .format("H[h] : m[m]")}`}{" "}
                                        Layover in{" "}
                                        {`${segment?.Destination?.Airport?.AirportName}`}
                                      </Typography>
                                    </Box>
                                    <Divider />
                                  </>
                                ) : null}
                              </>
                            );
                          }
                        )}
                      </Box>
                      {/* Intermediate flights end */}
                    </Card>
                    {/* Card Section end */}

                    {/* Traveler Details */}
                    {["Adult", "Child", "Infant"].map((type) => (
                      <Card key={type} sx={{ padding: 2, marginBottom: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: nunito.style, fontWeight: 800 }}
                        >
                          {type} Details
                        </Typography>
                        <Box sx={{ marginTop: 3 }}>
                          {forms[type]?.map((form) => (
                            <TravellerForm
                              key={form.id}
                              form={form}
                              handleChange={(id, field) =>
                                handleChange(type, id, field)
                              }
                              formType={type}
                              showWheelchairOption={type === "Adult"}
                            />
                          ))}
                          <Button
                            variant="text"
                            onClick={() => addNewForm(type)}
                          >
                            + Add New {type}
                          </Button>
                        </Box>
                      </Card>
                    ))}

                    <Grid2
                      size={12}
                      sx={{ padding: 2, backgroundColor: COLORS.WHITE }}
                      component={Paper}
                    >
                      <Box sx={{ mb: "15px" }}>
                        {/* Refundable  */}
                        {FlightDetails?.Results?.IsRefundable ? (
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              fontFamily: nunito.style,
                              color: "green",
                            }}
                          >
                            * The fare is refundable.
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              fontFamily: nunito.style,
                              color: "red",
                            }}
                          >
                            * Sorry, the fare is not refundable.
                          </Typography>
                        )}
                      </Box>

                      {/* PanCard */}
                      {flightDetails?.Results?.IsPanRequiredAtBook ||
                      flightDetails?.Results?.IsPanRequiredAtTicket ? (
                        <Box sx={{ mb: "10px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                          >
                            Enter Pan Card Details
                          </Typography>
                          <form>
                            <TextField
                              fullWidth
                              label="Full Name"
                              name="fullName"
                              value={formikPancard.values.fullName}
                              onChange={formikPancard.handleChange}
                              onBlur={formikPancard.handleBlur}
                              error={
                                formikPancard.touched.fullName &&
                                Boolean(formikPancard.errors.fullName)
                              }
                              helperText={
                                formikPancard.touched.fullName &&
                                formikPancard.errors.fullName
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="PAN Number"
                              name="panNumber"
                              value={formikPancard.values.panNumber}
                              onChange={formikPancard.handleChange}
                              onBlur={formikPancard.handleBlur}
                              error={
                                formikPancard.touched.panNumber &&
                                Boolean(formikPancard.errors.panNumber)
                              }
                              helperText={
                                formikPancard.touched.panNumber &&
                                formikPancard.errors.panNumber
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Date of Birth"
                              name="dob"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={formikPancard.values.dob}
                              onChange={formikPancard.handleChange}
                              onBlur={formikPancard.handleBlur}
                              error={
                                formikPancard.touched.dob &&
                                Boolean(formikPancard.errors.dob)
                              }
                              helperText={
                                formikPancard.touched.dob &&
                                formikPancard.errors.dob
                              }
                              margin="normal"
                            />
                          </form>
                        </Box>
                      ) : null}

                      {/* Passport  */}
                      {flightDetails?.Results?.IsPassportRequiredAtBook ||
                      flightDetails?.Results
                        ?.IsPassportRequiredAtBookIsPassportRequiredAtTicket ? (
                        <Box sx={{ mb: "10px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                          >
                            Enter PassPort Details
                          </Typography>
                          <form>
                            <TextField
                              fullWidth
                              label="Passport Number"
                              name="passportNo"
                              value={formikPassPort.values.passportNo}
                              onChange={formikPassPort.handleChange}
                              onBlur={formikPassPort.handleBlur}
                              error={
                                formikPassPort.touched.passportNo &&
                                Boolean(formikPassPort.errors.passportNo)
                              }
                              helperText={
                                formikPassPort.touched.passportNo &&
                                formikPassPort.errors.passportNo
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Passport Expiry Date"
                              name="passportExpiry"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={formikPassPort.values.passportExpiry}
                              onChange={formikPassPort.handleChange}
                              onBlur={formikPassPort.handleBlur}
                              error={
                                formikPassPort.touched.passportExpiry &&
                                Boolean(formikPassPort.errors.passportExpiry)
                              }
                              helperText={
                                formikPassPort.touched.passportExpiry &&
                                formikPassPort.errors.passportExpiry
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Passport Issue Date"
                              name="passportIssueDate"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={formikPassPort.values.passportIssueDate}
                              onChange={formikPassPort.handleChange}
                              onBlur={formikPassPort.handleBlur}
                              error={
                                formikPassPort.touched.passportIssueDate &&
                                Boolean(formikPassPort.errors.passportIssueDate)
                              }
                              helperText={
                                formikPassPort.touched.passportIssueDate &&
                                formikPassPort.errors.passportIssueDate
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Passport Issue Country Code"
                              name="passportIssueCountryCode"
                              value={
                                formikPassPort.values.passportIssueCountryCode
                              }
                              onChange={formikPassPort.handleChange}
                              onBlur={formikPassPort.handleBlur}
                              error={
                                formikPassPort.touched
                                  .passportIssueCountryCode &&
                                Boolean(
                                  formikPassPort.errors.passportIssueCountryCode
                                )
                              }
                              helperText={
                                formikPassPort.touched
                                  .passportIssueCountryCode &&
                                formikPassPort.errors.passportIssueCountryCode
                              }
                              margin="normal"
                            />
                          </form>
                        </Box>
                      ) : null}

                      {/* GST  */}

                      {flightDetails?.Results?.GSTAllowed ? (
                        <Box sx={{ mb: "10px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                          >
                            Enter GST Details
                          </Typography>
                          <form>
                            <TextField
                              fullWidth
                              label="Company Address"
                              name="GSTCompanyAddress"
                              value={formikGST.values.GSTCompanyAddress}
                              onChange={formikGST.handleChange}
                              onBlur={formikGST.handleBlur}
                              error={
                                formikGST.touched.GSTCompanyAddress &&
                                Boolean(formikGST.errors.GSTCompanyAddress)
                              }
                              helperText={
                                formikGST.touched.GSTCompanyAddress &&
                                formikGST.errors.GSTCompanyAddress
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Company Contact Number"
                              name="GSTCompanyContactNumber"
                              value={formikGST.values.GSTCompanyContactNumber}
                              onChange={formikGST.handleChange}
                              onBlur={formikGST.handleBlur}
                              error={
                                formikGST.touched.GSTCompanyContactNumber &&
                                Boolean(
                                  formikGST.errors.GSTCompanyContactNumber
                                )
                              }
                              helperText={
                                formikGST.touched.GSTCompanyContactNumber &&
                                formikGST.errors.GSTCompanyContactNumber
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Company Name"
                              name="GSTCompanyName"
                              value={formikGST.values.GSTCompanyName}
                              onChange={formikGST.handleChange}
                              onBlur={formikGST.handleBlur}
                              error={
                                formikGST.touched.GSTCompanyName &&
                                Boolean(formikGST.errors.GSTCompanyName)
                              }
                              helperText={
                                formikGST.touched.GSTCompanyName &&
                                formikGST.errors.GSTCompanyName
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="GST Number"
                              name="GSTNumber"
                              value={formikGST.values.GSTNumber}
                              onChange={formikGST.handleChange}
                              onBlur={formikGST.handleBlur}
                              error={
                                formikGST.touched.GSTNumber &&
                                Boolean(formikGST.errors.GSTNumber)
                              }
                              helperText={
                                formikGST.touched.GSTNumber &&
                                formikGST.errors.GSTNumber
                              }
                              margin="normal"
                            />
                            <TextField
                              fullWidth
                              label="Company Email"
                              name="GSTCompanyEmail"
                              value={formikGST.values.GSTCompanyEmail}
                              onChange={formikGST.handleChange}
                              onBlur={formikGST.handleBlur}
                              error={
                                formikGST.touched.GSTCompanyEmail &&
                                Boolean(formikGST.errors.GSTCompanyEmail)
                              }
                              helperText={
                                formikGST.touched.GSTCompanyEmail &&
                                formikGST.errors.GSTCompanyEmail
                              }
                              margin="normal"
                            />
                          </form>
                        </Box>
                      ) : null}
                    </Grid2>
                  </Paper>
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log("myForms", forms);
                    }}
                    size="large"
                    sx={{ backgroundColor: COLORS.PRIMARY }}
                  >
                    Continue
                  </Button>
                </Grid2>

                {/* Fare Summary */}
                <Grid2 size={4}>
                  <FareSummary fareData={flightDetails?.Results} />
                </Grid2>
              </Grid2>
            </Container>
          </Grid2>
        ) : (
          <Grid2
            size={{ xs: "12" }}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Loading
              type="bars"
              width={60}
              height={60}
              color={COLORS.PRIMARY}
            />
          </Grid2>
        )}
      </Grid2>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontFamily: nunito.style, fontWeight: 700 }}
          id="customized-dialog-title"
        >
          Fare Rules
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ minWidth: "500px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: nunito.style,
                    }}
                  >
                    Origin
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: nunito.style,
                    }}
                  >
                    Destination
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: nunito.style,
                    }}
                  >
                    Airline
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flightDetails?.Results?.FareRules?.map((fareRule, index) => {
                  return (
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: nunito.style,
                        }}
                      >
                        {fareRule.Origin}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: nunito.style,
                        }}
                      >
                        {fareRule.Destination}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: nunito.style,
                        }}
                      >
                        {fareRule.Airline}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
      <ToastBar/>
    </>
  );
};

export default FlightDetails;
