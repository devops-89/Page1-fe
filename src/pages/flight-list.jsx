import Banner from "@/components/banner";
import InnerBanner from "@/components/innerBanner";
import React, { useEffect, useState } from "react";
import banner from "@/banner/flight.jpg";
import { Box, Card, Container, Grid2, Typography } from "@mui/material";
import FlightForm from "@/components/flight/flightForm";
import FlightListBox from "@/components/flight/flightListBox";
import { flightData } from "@/assests/flightData";
import { useSelector } from "react-redux";
const FlightList = () => {
  // const flightInfo = useSelector((state) => state.FlightInformation);
  // console.log("flightInfo", flightInfo);
  const [flightList, setFlightList] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("flightData")) {
      setFlightList(JSON.parse(localStorage.getItem("flightData")));
    }
  }, []);

  console.log("flightlost", flightList);

  return (
    <div>
      <InnerBanner img={banner.src} heading={"Flight"} />

      <Box sx={{ pt: 10 }}>
        <Container>
          <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
            <Typography sx={{ fontSize: 18 }}> Search Flight</Typography>
            <FlightForm />
          </Card>
        </Container>
      </Box>
      <Box sx={{ pt: 10, pb: 10 }}>
        <Container>
          <Grid2 container spacing={4}>
            <Grid2 size={4}>
              <Card>test</Card>
            </Grid2>
            <Grid2 size={8}>
              <Grid2 container spacing={4}>
                {flightData.map((val, i) => (
                  <Grid2 size={12} key={i}>
                    <FlightListBox details={val} />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default FlightList;
