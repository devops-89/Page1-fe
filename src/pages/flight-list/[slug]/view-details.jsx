"use client";
import React, { useState, useEffect } from "react";
import Grid2 from "@mui/material/Grid2";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  Divider,
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


const FlightDetails = () => {
  const [forms, setForms] = useState(data.flightDetails.travelerData || []);
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState();

  useEffect(() => {
    if (localStorage.getItem("state")) {
      setFormState(JSON.parse(localStorage.getItem("state")));
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (router.query.ResultIndex && router.query.traceId) {
      flightController
        .flightDetails({
          result_index: router.query.ResultIndex,
          trace_id: router.query.traceId,
          ip_address: "122.160.31.42",
          journey_type: "ONEWAY",
          journey: "DOMESTIC",
        })
        .then((response) => {
          console.log("Flight Details:", response.data.data.Response);
          localStorage.setItem(
            "oneWayflightDetails",
            JSON.stringify(response.data.data.Response)
          );
        })
        .catch((error) => {
          console.error("Error fetching flight details:", error);
          setError(error);
        });
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("oneWayflightDetails"))
    ) {
      setTimeout(() => {
        setFlightDetails(JSON.parse(localStorage.getItem("oneWayflightDetails")));
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


  // console.log("router", flightDetails?.Results?.Segments);

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
          <Grid2 size={{ xs: "12" }}
            sx={{
              textAlign: "center",
              width:'100%',
              padding:'50px',
              textAlign:'center',
            }}
          >
            <Typography variant="h6" sx={{fontWeight:600, fontFamily:nunito.style, fontSize:'24px'}}>
              {error?.message ||
                "An unexpected error occurred. Please try again later."}
            </Typography>
          </Grid2>
        ) : flightDetails ? (
          <Grid2 size={{ xs: "12" }} sx={{ width: "100%", py:4}}>
            <Container sx={{mt:'-70px'}}>
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
                            {`${flightDetails?.Results?.Segments[0][0]?.Origin?.Airport?.CityName}`} → {`${flightDetails?.Results?.Segments[0][flightDetails?.Results?.Segments[0].length-1]?.Destination?.Airport?.CityName}`}
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
                              {moment(`${flightDetails?.Results?.Segments[0][0].Origin.DepTime}`).format("ddd, MMM D")}
                              
                            </span>{" "}
                            {`${(flightDetails?.Results?.Segments[0].length-1)} Stop.`} {`${Math.floor(
                                            moment
                                              .duration(flightDetails?.Results?.Segments[0][flightDetails?.Results?.Segments[0].length-1].AccumulatedDuration, "minutes")
                                              .asHours()
                                          )} hrs ${moment
                                            .duration(flightDetails?.Results?.Segments[0][flightDetails?.Results?.Segments[0].length-1].AccumulatedDuration, "minutes")
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
                                    <img
                                      src="air-india-logo.png"
                                      alt="Air India"
                                    />
                                    {/* <Image
                                      src={segment?.Airline?.AirlineLogo}
                                      alt="Image"
                                      width={30}
                                      height={30}
                                    /> */}
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
                                        13h:10m Layover in Delhi - Indira Gandhi
                                        Airport
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
                          variant="h5"
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
                  </Paper>
                </Grid2>

                {/* Fare Summary */}
                <Grid2 size={4}>
                  <FareSummary fareData={flightDetails?.Results} />
                </Grid2>
              </Grid2>
            </Container>
          </Grid2>
        ) : (
          <Grid2 size={{ xs: "12" }}
            sx={{
              width:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:"center",
              padding:'50px'
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
    </>
  );
};

export default FlightDetails;
