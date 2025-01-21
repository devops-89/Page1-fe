"use client";
import React, { useState, useEffect } from "react";
import Grid2 from "@mui/material/Grid2";
import { Box, Container, Typography, Paper, Button, Card, Divider } from "@mui/material";

import { flightController } from "@/api/flightController";
import TravellerForm from "@/components/flight/TravellerForm";
import { data } from "../../../assests/data";
import { useRouter } from "next/router";
import FareSummary from "@/components/flight/FareSummary";
import moment from "moment";
import { display, nunito } from "@/utils/fonts";
import pointerImage from '@/../public/images/pointer.png'

const FlightDetails = () => {
  const [forms, setForms] = useState(data.flightDetails.travelerData || []);
  const [flightDetails, setFlightDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.ResultIndex && router.query.traceId) {
      flightController
        .flightDetails({
          result_index: router.query.ResultIndex,
          trace_id: router.query.traceId,
          ip_address: "122.160.31.42",
        })
        .then((response) => {
          console.log("Flight Details:", response.data.data.Response);
          setFlightDetails(response.data.data.Response);
        })
        .catch((error) => {
          console.error("Error fetching flight details:", error);
        });
    }
  }, [router.query.ResultIndex, router.query.traceId]);

  const handleChange = (type, id, field) => (event) => {
    setForms((prevForms) => ({
      ...prevForms,
      [type]: prevForms[type].map((form) =>
        form.id === id
          ? {
            ...form,
            [field]:
              event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value,
          }
          : form
      ),
    }));
  };

  const addNewForm = (type) => {
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
  };



  return (
    <div>
      {
        (flightDetails) ? (
          <Box
            sx={{
              backgroundColor: "#E5EEF4",
              p: 15,
              color: "white",
              background:
                "linear-gradient(0deg, rgba(255,255,255,1) 85%, rgba(18,18,217,1) 10%, rgba(8,8,79,1) 5%)",
            }}
          >
            <Container>
              <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Complete Your Booking
              </Typography>

              <Grid2 container spacing={2}>
                {/* Flight Details */}
                <Grid2 size={8}>
                  <Paper
                    sx={{ padding: 2, backgroundColor: "#F4F4F4", marginBottom: 2 }}
                  >
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        {flightDetails?.Results?.Segments?.map((segment, index) => {
                          console.log("segment:", segment[0]);
                          return (
                            <>
                              <Typography
                                key={index}
                                variant="h6"
                                className="Anshuman"
                                sx={{ fontWeight: "bold", color: "#000" }}
                              >
                                {segment[0].Origin.Airport.CityName || "Unknown"} →{" "}
                                {segment[0].Destination.Airport.CityName ||
                                  "Unknown"}
                              </Typography>

                              <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                                <Box
                                  sx={{
                                    backgroundColor: "rgb(255, 237, 209)",
                                    padding: "4px 8px",
                                    borderRadius: 1,
                                    fontSize: 14,
                                  }}
                                >
                                  <Typography
                                    key={index}
                                    variant="body1"
                                    sx={{ color: "#000" }}
                                  >
                                    {moment(segment[0].Origin?.DepTime).format(
                                      "Do MMM YYYY"
                                    ) || "N/A"}{" "}
                                    →{" "}
                                    {moment(segment[0].Destination?.ArrTime).format(
                                      "Do MMM YYYY"
                                    ) || "N/A"}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ fontSize: 14 }}>
                                  {flightDetails?.Results?.Segments?.[0]?.StopCount ||
                                    0}{" "}
                                  Stops ·{" "}
                                  {flightDetails?.Results?.Segments?.[0]?.Duration ||
                                    "N/A"}
                                </Typography>
                              </Box>
                            </>
                          );
                        })}
                      </Box>
                    </Box> */}

                    {/* Card Section start */}
                    <Card sx={{ padding: '20px', marginBottom: "20px" }}>
                      <Grid2 container>
                        <Grid2 size={{xs:8}}>
                      <Typography variant="h6" gutterBottom sx={{ fontFamily: nunito.style, fontSize: "20px", fontWeight: 700 }}>
                        Varanasi → Dubai
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: "10px" }}>
                        <span style={{ backgroundColor: "#FFEDD1", padding: '5px', borderRadius: '4px', fontFamily: nunito.style }}>Wednesday, Jan 22 1</span> Stop. 18h:45m
                      </Typography>
                      </Grid2>
                     <Grid2 size={{xs:4}} sx={{display:'flex', alignItems:'flex-start', justifyContent:'flex-end'}}>
                      <Button size="small" sx={{fontFamily: nunito.style, fontWeight:800}}>View Fares Rules</Button>
                      </Grid2>
                      </Grid2>
                      <Divider />

                      <Grid2 container spacing={1} sx={{ marginTop: '10px' }}>
                        {/* Flight Segment 1 */}
                        <Grid2 size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center", gap: '5px' }}>
                          <img src="air-india-logo.png" alt="Air India" />
                          <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: nunito.style, fontWeight: 600 }}>
                            Air India AI 880
                          </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }} sx={{ backgroundColor: "#F4F4F4", padding: "15px", borderRadius: '4px' }}>


                          <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: nunito.style }}>3:20 PM - Varanasi (Airport Name)</Typography>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '65px' }}><img src={pointerImage.src} style={{ width: '16px' }} /> (1h:35m)</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: nunito.style }}>4:55 PM - Delhi (Airport Name)</Typography>


                        </Grid2>


                        <Grid2 size={{ xs: 12 }} sx={{ display: "flex", gap: "20px", flexWrap: "wrap", backgroundColor: '#FFEDD1', padding: '5px', borderRadius: '4px' }}>
                          <Typography variant="body2" sx={{ fontFamily: nunito.style, fontWeight: 500 }}>
                            <strong>Baggage:</strong> ADULT 25KG, CHILD 25KG, INFANT 0KG
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: nunito.style, fontWeight: 500 }}>
                            <strong>Check-in:</strong> Included
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Divider />
                      <Box sx={{ marginBottom: '10px', borderLeft: '2px dashed', paddingLeft: '20px' }}>
                        <Typography variant="body2" sx={{ marginTop: '10px', color: 'orange', fontWeight: 600, fontFamily: nunito.style }}>
                          Change of Planes
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: '10px', fontWeight: 700, fontFamily: nunito.style }}>
                          13h:10m Layover in Delhi - Indira Gandhi Airport
                        </Typography>
                      </Box>
                      <Divider/>


                    </Card>
                    {/* Card Section end */}

                    {/* Traveler Details */}
                    {["Adult", "Child", "Infant"].map((type) => (
                      <Card key={type} sx={{ padding: 2, marginBottom: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
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
                          <Button variant="text" onClick={() => addNewForm(type)}>
                            + Add New {type}
                          </Button>
                        </Box>
                      </Card>
                    ))}
                  </Paper>
                </Grid2>

                {/* Fare Summary */}
                <Grid2 size={4}>
                  <FareSummary fareData={flightDetails.Results} />
                </Grid2>
              </Grid2>

            </Container>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", padding: 4 }}>
            <Typography variant="h6">Loading flight details...</Typography>
          </Box>
        )
      }
    </div>
  );
};

export default FlightDetails;
