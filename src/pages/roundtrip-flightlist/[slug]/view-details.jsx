"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid2 from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  Typography,
  Paper,
  Card,
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
  Button,
  useMediaQuery
} from "@mui/material";

import { flightController } from "@/api/flightController";
import { useRouter } from "next/router";
import RoundFareSummary from "@/components/flight/RoundFareSummary";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { JOURNEY, JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import DomesticDetail from "@/components/flight/domesticDetail";
import InternationalDetail from "@/components/flight/internationalDetail";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import Link from "next/link";
import ToastBar from "@/components/toastBar";


import Loader from "@/utils/Loader";
import InternationalPassengerForm from "@/components/flight/roundtrip/InternationalPassengerForm";
import DomesticPassengerForm from "@/components/flight/roundtrip/DomesticPassengerForm";
import SwipeableEdgeDrawer from "@/components/flight/SwipeableEdgeDrawer";
import errorImage from "@/assests/flight_image/filter.svg";
import Image from "next/image";
import InternationalFareSummary from "@/components/flight/InternationalFareSummary";
import { setFareQuoteValidations } from "@/redux/reducers/flightValidations";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FlightDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.USER.UserData.isAuthenticated);
  const [flightDetails, setFlightDetails] = useState(null);
  const [isLCC, setIsLCC] = useState(null);
  const [commission, setCommission] = useState(null);
  const [journey, setJourney] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const smallScreen = useMediaQuery("(max-width:1199px)");



  

  // console.log("router", router)
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      router.query.ResultIndex &&
      router.query.traceId &&
      router.query.journey
    ) {
      const body = {
        ip_address: JSON.parse(localStorage.getItem("roundState")).ip_address,
        journey_type: JOURNEY_TYPE.ROUNDTRIP,
      };

      flightController
        .roundflightDetails(
          router.query.journey === JOURNEY.INTERNATIONAL
            ? {
                result_index: router.query.ResultIndex,
                trace_id: router.query.traceId,
                ip_address: body.ip_address,
                journey_type: body.journey_type,
                journey: router.query.journey,
              }
            : {
                result_index: JSON.parse(router.query.ResultIndex).departure,
                trace_id: router.query.traceId,
                ip_address: body.ip_address,
                journey_type: body.journey_type,
                journey: router.query.journey,
                result_index_ib: JSON.parse(router.query.ResultIndex).arrival,
              }
        )
        .then((response) => {
          if (response?.data?.data) {
              dispatch(setFareQuoteValidations(response?.data?.data[0]));
            setFlightDetails(response?.data?.data);
            setIsLCC(response?.data?.data[0]?.Results?.IsLCC);
            setCommission(response?.data?.data[2]);
            setJourney(response?.data?.data[3]);
            // console.log("roundtrip respone", response?.data?.data);
            localStorage.setItem(
              "roundTripflightDetails",
              JSON.stringify(response.data.data)
            );
          }
        })
        .catch((error) => {
          setError(error);
          console.log("myError",error)
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
      JSON.parse(localStorage.getItem("roundTripflightDetails"))
    ) {
      setTimeout(() => {
        setFlightDetails(
          JSON.parse(localStorage.getItem("roundTripflightDetails"))
        );
      }, 1000);
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
              fontFamily: roboto.style,
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
                fontFamily: roboto.style,
                fontSize: "24px",
                mb: "10px",
              }}
            >
              {error?.message == null && error?.message == undefined
                ? "An unexpected error occurred. Please try again later."
                : `The Session is expired ,${error?.message}`}
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
        ) : (router.query.journey === JOURNEY.INTERNATIONAL ? flightDetails?.[0]?.Results:flightDetails?.[0]?.[0]?.Results) ? (
          <Grid2 size={{ xs: "12" }} sx={{ width: "100%", py: 4 }}>
            <Container sx={{ mt: "-70px", overflow: "visible" }}>
              <Grid2 container spacing={2} sx={{ position: "relative" }}>
                <Grid2 size={{lg:8 ,xs:12}} order={{lg:1 , xs:2}}>
                  <Paper
                    sx={{
                      padding: 2,
                      backgroundColor: "#F4F4F4",
                      marginBottom: 2,
                      position: "relative",
                    }}
                  >
                    {router.query.journey === JOURNEY.INTERNATIONAL ? (
                      <InternationalDetail
                        flightDetails={flightDetails}
                        setOpen={setOpen}
                      />
                    ) : (
                      <DomesticDetail
                        flightDetails={flightDetails}
                        setOpen={setOpen}
                      />
                    )}

                    {/* International and Domestic Passenger Forms For Roundtrip */}
                      <Card sx={{ mb: "20px" }}>
                        {router.query.journey === JOURNEY.INTERNATIONAL ? (
                          <InternationalPassengerForm
                            sx={{
                              backgroundColor: COLORS.PRIMARY,
                              color: COLORS.WHITE,
                            }}
                            flightDetails={flightDetails}
                            myState="roundState"
                            journey={journey}
                            isLCC={isLCC}
                          />
                        ) : (
                          <DomesticPassengerForm
                            sx={{
                              backgroundColor: COLORS.PRIMARY,
                              color: COLORS.WHITE,
                            }}
                            flightDetails={flightDetails}
                            myState="roundState"
                            journey={journey}
                          />
                        )}
                      </Card>
                   
                    {/* Passenger form end */}
                  </Paper>
                </Grid2>

                {/* Fare Summary */}
                <Grid2 size={{lg:4 , xs:12}} sx={{
                    position: "sticky",
                    top: "75px",
                    alignSelf: "start",
                    overflow: "visible",
                  }}
                  order={{lg:2 ,xs:1}}
                  >

{smallScreen ? (
  <SwipeableEdgeDrawer
    toggleDrawer={toggleDrawer}
    fairSummary={
      router.query.journey === JOURNEY.INTERNATIONAL ? (
        <InternationalFareSummary
          toggleDrawer={toggleDrawer}
          commission={commission}
          fareData={flightDetails[0]?.Results}
        />
      ) : (
        <RoundFareSummary
          toggleDrawer={toggleDrawer}
          commission={commission}
          fareData={flightDetails}
        />
      )
    }
  />
) : (
  router.query.journey === JOURNEY.INTERNATIONAL ? (
    <InternationalFareSummary
      fareData={flightDetails[0]?.Results}
      toggleDrawer={toggleDrawer}
      commission={commission}
    />
  ) : (
    <RoundFareSummary
      fareData={flightDetails}
      toggleDrawer={toggleDrawer}
      commission={commission}
    />
  )
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
              padding: "50px",}}
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
          sx={{ m: 0, p: 2, fontFamily: roboto.style, fontWeight: 700 }}
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
                      fontFamily: roboto.style,
                    }}
                  >
                    Origin
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: roboto.style,
                    }}
                  >
                    Destination
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: roboto.style,
                    }}
                  >
                    Airline
                  </TableCell>
                </TableRow>
              </TableHead>

              {router.query.journey === JOURNEY.INTERNATIONAL ? (
                <TableBody>
                  {flightDetails?.length > 0 &&
                    flightDetails[0]?.Results?.FareRules?.map(
                      (fareRule, index) => {
                        return (
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Origin}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Destination}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Airline}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              ) : (
                <TableBody>
                  {flightDetails?.length > 0 &&
                    flightDetails[0][0]?.Results?.FareRules?.map(
                      (fareRule, index) => {
                        return (
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Origin}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Destination}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Airline}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}

                  {flightDetails?.length > 0 &&
                    flightDetails[1][0]?.Results?.FareRules?.map(
                      (fareRule, index) => {
                        return (
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Origin}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Destination}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: roboto.style,
                              }}
                            >
                              {fareRule.Airline}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
      <ToastBar />
    </>
  );
};

export default FlightDetails;
