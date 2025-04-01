import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, Tabs, Tab } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SeatDetail from "./SeatDetail";
import Seat from "./Seat";
import flightFront from "@/assests/flight_image/flight_front.png";
import flightBack from "@/assests/flight_image/flight_back.png";
import { COLORS } from "@/utils/colors.js";
import { nunito } from "@/utils/fonts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import useRoundDomesticSSRMerge from "@/custom-hook/useRoundDomesticSSRMerge";



const SeatMap = ({ flightDetailType }) => {
  const [extraDetails, setExtraDetails] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

 

  useEffect(() => {
  
    let flightDetails;
     if(localStorage.getItem(flightDetailType)){
       flightDetails=localStorage.getItem(flightDetailType);
     
     }

    if (flightDetails) {
      let flightParsedData =  JSON.parse(flightDetails);
      let ssrData=useRoundDomesticSSRMerge(flightParsedData);
        if(ssrData)
        {
          console.log("ssrData:", ssrData);
        }
       setExtraDetails(flightDetails); 
     
      flightDetails = JSON.parse(flightDetails);
      flightDetails[1] = flightDetails[1].Response;

      console.log("Going Flight Seats:", flightDetails?.[1]?.SeatDynamic?.[0]);
      console.log("Coming Flight Seats:", flightDetails?.[1]?.SeatDynamic?.[1]);

      setExtraDetails(ssrData);
    }
  }, [flightDetailType]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  
  return (
    <Box sx={{ backgroundColor: COLORS.BLUEOVERLAY, py: 2 }}>
    
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          color:COLORS.PRIMARY, 
          '& .MuiTabs-indicator': {
            backgroundColor:COLORS.PRIMARY,
          },
          '& .MuiTab-root': {
            color:COLORS.BLACK, 
          },
          '& .Mui-selected': {
            color: COLORS.PRIMARY, 
          },
        }}
      >
      
        <Tab label="Outbound Flight" icon={<FlightTakeoffIcon/>} iconPosition="start" />
        <Tab label="Return Flight" icon={<FlightLandIcon/>} iconPosition="start" />
      </Tabs>

      {/* Tab Content */}
      {tabIndex === 0 && (
        <FlightSeatSection seatData={extraDetails?.[0]?.SeatDynamic?.[0]?.SegmentSeat} extraDetails={extraDetails} tabIndex={tabIndex} />
      )}
      {tabIndex === 1 && (
        <FlightSeatSection seatData={extraDetails?.[1]?.SeatDynamic?.[0]?.SegmentSeat} extraDetails={extraDetails} tabIndex={tabIndex} />
      )}
    </Box>
  );
};


const FlightSeatSection = ({ seatData, extraDetails,tabIndex }) => {
  console.log(`Flight section ${tabIndex} data:`,seatData);
  return (
    <Swiper spaceBetween={20} slidesPerView={1} navigation={{ clickable: true }} modules={[Navigation]}>
      {seatData?.map((aeroplane, index) => (
        <SwiperSlide key={index} style={{ height: "100vh", overflow: "auto" }}>
          <Stack
            direction={{ lg: "row", xs: "column" }} 
            px={{ lg: 10, xs: 2 }}
            sx={{
              alignItems: { lg: "start", xs: "center" },
              justifyContent: { lg: "space-between", xs: "center" },
              position: "relative",
              flexWrap: "wrap",
            }}
          >
            {/* Seat Details */}
            <Box
              sx={{
                flexShrink: 0,
                position: { lg: "sticky", xs: "relative" },
                top: "25px",
                width: { lg: "450px", xs: "100%" },
                maxWidth: "100%",
              }}
            >
              <Box sx={{ p: 2, mx: "auto" }}>
                <SeatDetail extraDetails={extraDetails?.[0]} planeIndex={index} tabIndex={tabIndex} />
                <Typography variant="body1" sx={{ p: 1, fontFamily: nunito.style }}>
                  Conveniently select your seats now for Free.
                </Typography>
              </Box>
            </Box>

            {/* Flight Seat Map */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: "50px" }}>
              {/* Airplane Front Image */}
              <Box component="img" src={flightFront.src} alt="Airplane Front" sx={{ maxWidth: "300px", mb: -2 }} />
              {/* Seats Layout */}
              <Seat extraDetails={aeroplane} planeIndex={index} tabIndex={tabIndex} />
              {/* Airplane Back Image */}
              <Box component="img" src={flightBack.src} alt="Airplane Back" sx={{ maxWidth: "300px" }} />
            </Box>
          </Stack>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SeatMap;
