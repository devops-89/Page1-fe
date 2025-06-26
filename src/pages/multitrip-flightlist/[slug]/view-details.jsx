"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import UserVerifyForm from "@/components/flight/UserVerifyForm";
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
  useMediaQuery,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { flightController } from "@/api/flightController";
import { useRouter } from "next/router";
import FareSummary from "@/components/flight/FareSummary";
import moment from "moment";
import { nunito } from "@/utils/fonts";
import pointerImage from "@/../public/images/pointer.png";
import { COLORS } from "@/utils/colors";
import { JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import ToastBar from "@/components/toastBar";
import Link from "next/link";
import Loader from "@/utils/Loader";
import MultiCityPassengerForm from "@/components/flight/multicity/MultiCityPassengerForm";
import SwipeableEdgeDrawer from "@/components/flight/SwipeableEdgeDrawer";
import errorImage from "@/assests/flight_image/filter.svg";

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
  const [flightDetails, setFlightDetails] = useState(null);
  const isAuthenticated = useSelector(
    (state) => state.USER.UserData.isAuthenticated
  );
  // console.log('isAuthenticated',isAuthenticated)
  const [commission, setCommission] = useState(null);
  const [isLCC, setIsLCC] = useState(null);
  const [journey, setJourney] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectMeal, setSelectMeal] = useState({});
  const [selectBaggage, setSelectBaggage] = useState({});
  const smallScreen = useMediaQuery("(max-width:1199px)");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("router journey:", router.query.journey);

  useEffect(() => {
    if (
      router.query.ResultIndex &&
      router.query.traceId &&
      router.query.journey
    ) {
      flightController
        .multiflightDetails({
          result_index: router.query.ResultIndex,
          trace_id: router.query.traceId,
          ip_address: JSON.parse(localStorage.getItem("multistate"))
            ?.ip_address,
          journey: router.query.journey,
          journey_type: JOURNEY_TYPE.MULTIWAY,
        })
        .then((response) => {
          if (response?.data?.data) {
            setFlightDetails(response?.data?.data);
            setIsLCC(response?.data?.data[0]?.Results?.IsLCC);
            // setOtherDetails(response?.data?.data[1]);
            setCommission(response?.data?.data[2]);
            setJourney(response?.data?.data[3]);
            // console.log("multidetail", response?.data?.data);

            localStorage.setItem(
              "multitripflightDetails",
              JSON.stringify(response?.data?.data)
            );
          }
        })
        .catch((error) => {
          setError(error);
          dispatch(
            setToast({
              open: true,
              message:
                error.message ||
                "An error occurred while fetching flight details.",
              severity: TOAST_STATUS.ERROR,
            })
          );
        });
    }
  }, [router.query.ResultIndex, router.query.traceId, router.query.journey]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("multitripflightDetails")
    ) {
      setTimeout(() => {
        setFlightDetails(
          JSON.parse(localStorage.getItem("multitripflightDetails"))
        );
      }, 3000);
    }
  }, []);

  const toggleDrawer = {
    open: drawerOpen, // Current state of the drawer
    toggle: () => setDrawerOpen((prev) => !prev), // Function to toggle the state
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
            <Image src={errorImage.src} alt="Image" width={200} height={200} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontFamily: nunito.style,
                fontSize: "24px",
                mb: "10px",
              }}
            >
              {error?.message == null && error?.message == undefined
                ? "An unexpected error occurred. Please try again later."
                : "The Session is expired"}
            </Typography>
            <Link href="/">
              <Button
                variant="contained"
                sx={{ backgroundColor: COLORS.PRIMARY }}
              >
                Back to Homepage
              </Button>
            </Link>
          </Grid2>
        ) : flightDetails?.[0]?.Results ? (
          <Grid2 size={{ xs: "12" }} sx={{ width: "100%", py: 4 }}>
            <Container sx={{ mt: "-70px", overflow: "visible" }}>
              <Grid2 container spacing={2} sx={{ position: "relative" }}>
                <Grid2 size={{ lg: 8, xs: 12 }} order={{ lg: 1, xs: 2 }}>
                  <Paper
                    sx={{
                      padding: 2,
                      backgroundColor: "#F4F4F4",
                      marginBottom: 2,
                    }}
                  >
                    {flightDetails[0]?.Results?.Segments?.map(
                      (flight, index) => {
                        return (
                          <Card
                            sx={{ padding: "20px", marginBottom: "20px" }}
                            key={index}
                          >
                            <Grid2 container>
                              <Grid2 size={{ lg: 8, md: 8, sm: 8, xs: 12 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  sx={{
                                    fontFamily: nunito.style,
                                    fontSize: "20px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {`${flight[0]?.Origin?.Airport?.CityName}`} →{" "}
                                  {`${
                                    flight[flight.length - 1]?.Destination
                                      ?.Airport?.CityName
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
                                      `${flight[0].Origin.DepTime}`
                                    ).format("ddd, MMM D")}
                                  </span>{" "}
                                  {`${flight.length - 1} Stop.`}{" "}
                                  {flight[flight.length - 1]
                                    .AccumulatedDuration != undefined &&
                                    `${Math.floor(
                                      moment
                                        .duration(
                                          flight[flight.length - 1]
                                            .AccumulatedDuration,
                                          "minutes"
                                        )
                                        .asHours()
                                    )} hrs ${moment
                                      .duration(
                                        flight[flight.length - 1]
                                          .AccumulatedDuration,
                                        "minutes"
                                      )
                                      .minutes()} min`}
                                </Typography>
                              </Grid2>
                              <Grid2
                                size={{ lg: 4, md: 4, sm: 4, xs: 12 }}
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: {
                                    lg: "flex-end",
                                    md: "flex-end",
                                    sm: "flex-end",
                                    xs: "flex-start",
                                  },
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{
                                    fontFamily: nunito.style,
                                    fontWeight: 800,
                                  }}
                                  onClick={handleClickOpen}
                                >
                                  View Fares Rules
                                </Button>
                              </Grid2>
                            </Grid2>
                            <Divider />

                            {flight?.map((singleFlight, index) => {
                              return (
                                <>
                                  <Box key={index}>
                                    <Grid2
                                      container
                                      spacing={1}
                                      sx={{ marginTop: "10px" }}
                                    >
                                      <Grid2
                                        size={{ xs: 12 }}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "5px",
                                        }}
                                      >
                                        <Image
                                          src={singleFlight?.AirlineLogo}
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
                                          {singleFlight?.Airline?.AirlineName}{" "}
                                          {singleFlight?.Airline?.AirlineCode}{" "}
                                          {singleFlight?.Airline?.FlightNumber}
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
                                          {moment(
                                            singleFlight?.Origin?.DepTime
                                          ).format("HH:mm")}{" "}
                                          -{" "}
                                          {
                                            singleFlight?.Origin?.Airport
                                              ?.CityName
                                          }{" "}
                                          (
                                          {
                                            singleFlight?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          )
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
                                              .duration(
                                                singleFlight?.Duration,
                                                "minutes"
                                              )
                                              .asHours()
                                          )} hrs : ${moment
                                            .duration(
                                              singleFlight?.Duration,
                                              "minutes"
                                            )
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
                                            singleFlight?.Destination?.ArrTime
                                          ).format("HH:mm")}{" "}
                                          -{" "}
                                          {
                                            singleFlight?.Destination?.Airport
                                              ?.CityName
                                          }{" "}
                                          (
                                          {
                                            singleFlight?.Destination?.Airport
                                              ?.AirportCode
                                          }
                                          )
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
                                          {singleFlight?.Baggage}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 500,
                                          }}
                                        >
                                          <strong>Cabin Baggage :</strong>{" "}
                                          {singleFlight?.CabinBaggage}
                                        </Typography>
                                      </Grid2>
                                    </Grid2>
                                    <Divider />
                                  </Box>

                                  {index == flight.length - 2 ? (
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
                                                flight[index + 1]?.Origin
                                                  .DepTime,
                                                "YYYY-MM-DD HH:mm"
                                              ).diff(
                                                moment(
                                                  flight[index]?.Destination
                                                    .ArrTime,
                                                  "YYYY-MM-DD HH:mm"
                                                )
                                              )
                                            )
                                            .format("H[h] : m[m]")}`}{" "}
                                          Layover in{" "}
                                          {`${flight[index]?.Destination?.Airport?.AirportName}`}
                                        </Typography>
                                      </Box>
                                      <Divider />
                                    </>
                                  ) : null}
                                </>
                              );
                            })}
                          </Card>
                        );
                      }
                    )}

                    {/* OTP Verification Start */}

                    {!isAuthenticated ? (
                      <Card sx={{ mb: "20px", p: "20px", mx: "auto" }}>
                        <UserVerifyForm />
                      </Card>
                    ) : (
                      <Card sx={{ mb: "20px" }}>
                        <MultiCityPassengerForm
                          sx={{
                            backgroundColor: COLORS.PRIMARY,
                            color: COLORS.WHITE,
                          }}
                          flightDetails={flightDetails}
                          myState="multistate"
                          journey={journey}
                          isLCC={isLCC}
                          selectMeal={selectMeal}
                          selectBaggage={selectBaggage}
                          setSelectBaggage={setSelectBaggage}
                          setSelectMeal={setSelectMeal}
                        />
                      </Card>
                    )}
                  </Paper>
                </Grid2>
                {/* Fare summary */}

                <Grid2
                  size={{ lg: 4, xs: 12 }}
                  order={{ lg: 2, xs: 1 }}
                  sx={{
                    position: "sticky",
                    top: "75px",
                    alignSelf: "start",
                    overflow: "visible",
                  }}
                >
                  {smallScreen ? (
                    <SwipeableEdgeDrawer
                      toggleDrawer={toggleDrawer}
                      fairSummary={
                        <FareSummary
                          toggleDrawer={toggleDrawer}
                          commission={commission}
                          fareData={flightDetails[0]?.Results}
                        />
                      }
                    />
                  ) : (
                    <FareSummary
                      fareData={flightDetails[0]?.Results}
                      commission={commission}
                    />
                  )}
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
            <Loader open={true} />
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
                {flightDetails &&
                  flightDetails[0]?.Results?.FareRules?.map(
                    (fareRule, index) => {
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
                    }
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
      <ToastBar />
    </>
  );
};

export default FlightDetails;
