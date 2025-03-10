"use client";
import React, { useState } from "react";
import Grid2 from '@mui/material/Grid2';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Card,
} from "@mui/material";

import {data} from "../assests/data";

const FlightDetails = ({ flightData, travelerData, fareSummary }) => {
  const [forms, setForms] = useState(data.flightDetails.travelerData);

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
      id: forms[type].length + 1,
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
      [type]: [...prevForms[type], newForm],
    }));
  };

  return (
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
          <Paper sx={{ padding: 2, backgroundColor: "#F4F4F4", marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#000" }}
                >
                  {data.flightDetails.flightData.origin} → {data.flightDetails.flightData.destination}
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
                    {data.flightDetails.flightData.date}
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    {data.flightDetails.flightData.stops} · {data.flightDetails.flightData.duration}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Box
                  sx={{
                    padding: "4px 12px",
                    background:
                      "linear-gradient(to right, rgb(45, 193, 140), rgb(33, 147, 147))",
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontSize: 12 }}
                  >
                    {data.flightDetails.flightData.cancellationPolicy}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 14,
                    color: "primary.main",
                    marginTop: 1,
                    cursor: "pointer",
                  }}
                >
                  {data.flightDetails.flightData.fareRulesLabel}
                </Typography>
              </Box>
            </Box>
         

          {/* Traveler Details */}
          {["Adult", "Child", "Infant"].map((type) => (
            <Card key={type} sx={{ padding: 2, marginBottom: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                {type} Details
              </Typography>
              <Box sx={{ marginTop: 3 }}>
                {forms[type].map((form) => (
                  <TravellerForm
                    key={form.id}
                    form={form}
                    handleChange={(id, field) => handleChange(type, id, field)}
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
          <Paper sx={{ padding: 2, backgroundColor: "#F4F4F4",height:"300px"}}>
            <Typography
              variant="h6"
              sx={{ fontSize: 18, fontWeight: 600, color: "#000" }}
            >
              Fare Summary
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {data.flightDetails.fareSummary.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body1">{item.label}</Typography>
                <Typography variant="body2">₹ {item.amount}</Typography>
              </Box>
            ))}
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">
                ₹ {data.flightDetails.fareSummary.reduce((acc, cur) => acc + cur.amount, 0)}
              </Typography>
            </Box>
          </Paper>
         </Grid2>
          </Grid2>
      </Container>
      
    </Box>
  );
};

export default FlightDetails;
