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
} from "@mui/material";

import { flightController } from "@/api/flightController";
import { useRouter } from "next/router";
import FareSummary from "@/components/flight/FareSummary";
import RoundFareSummary from "@/components/flight/RoundFareSummary";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import Loading from "react-loading";
import { JOURNEY, JOURNEY_TYPE, TOAST_STATUS } from "@/utils/enum";
import DomesticDetail from "@/components/flight/domesticDetail";
import InternationalDetail from "@/components/flight/internationalDetail";
import PassengerForm from "@/components/flight/PassengerForm";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import Link from "next/link";
import ToastBar from "@/components/toastBar";
import UserVerifyForm from "@/components/flight/UserVerifyForm";

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
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [verifiedData,setVerifiedData]=useState(null);


  useEffect(()=>{

  })

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
            setFlightDetails(response?.data?.data);
            console.log("roundtrip respone", response?.data?.data);
            localStorage.setItem(
              "roundTripflightDetails",
              JSON.stringify(response.data.data)
            );
          }
        })
        .catch((error) => {
          setError(error);
          // console.log("myError",error)
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
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("roundTripflightDetails"))
    ) {
      setTimeout(() => {
        setFlightDetails(
          JSON.parse(localStorage.getItem("roundTripflightDetails"))
        );
      }, 3000);
    }
  }, []);

 
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
        ) : flightDetails ? (
          <Grid2 size={{ xs: "12" }} sx={{ width: "100%", py: 4 }}>
            <Container sx={{ mt: "-70px" }}>
              <Grid2 container spacing={2}>
                <Grid2 size={8}>
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

                      {/* OTP Verification Start */}

                      {
                        (!verifiedData)?(
                          <Card sx={{ mb: "20px", p: "20px", mx: "auto" }}>
                             <UserVerifyForm setVerifiedData={setVerifiedData} />
                          </Card>
                        ):(null)
                      }

                    {/* OTP verification end */}

                   {/* Passenger form start */}
                   {
                    (verifiedData)?(
                      <Card>
                      <PassengerForm
                        flightDetails={flightDetails[0]}
                        myState="roundState"
                       
                      />

                    </Card>

                    ):(null)
                   }
                   {/* Passenger form end */}
                   
                  </Paper>
                </Grid2>


                {/* Fare Summary */}
                <Grid2 size={4}>
                  {router.query.journey === JOURNEY.INTERNATIONAL ? (
                    <FareSummary fareData={flightDetails[0]?.Results} />
                  ) : (
                    <RoundFareSummary fareData={flightDetails} />
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
