import React, { useEffect, useState,useRef } from "react";
import { Typography, Box, Stack } from "@mui/material";
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

const SeatMap = ({ initialFlightDetail }) => {
 
  const [extraDetails, setExtraDetails] = useState(null);

 useEffect(() => {
    const flightDetails = localStorage.getItem(initialFlightDetail);
    if (flightDetails) {
      setExtraDetails(JSON.parse(flightDetails));
    }
  }, [initialFlightDetail]);

  return (
    <Box sx={{ backgroundColor: COLORS.BLUEOVERLAY, py: 2 }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={{ clickable: true }} 
        modules={[Navigation]} 
      
      >
        {extraDetails?.[1]?.SeatDynamic?.[0]?.SegmentSeat.map(
          (aeroplane, index) => (
            <SwiperSlide key={index} style={{ height: '100vh', overflow:'auto'}}>
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
                    <SeatDetail
                      extraDetails={extraDetails?.[0]}
                      planeIndex={index}
                    />
                    <Typography
                      variant="body1"
                      sx={{ p: 1, fontFamily: nunito.style }}
                    >
                      Conveniently select your seats now for Free.
                    </Typography>
                  </Box>
                </Box>

                {/* Flight Map */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingRight:'50px'
                  }}
                >
                  {/* Airplane Front Image */}
                  <Box
                    component="img"
                    src={flightFront.src}
                    alt="Airplane Front"
                    sx={{ maxWidth: "300px", mb: -2 }}
                  />

                  {/* Printing Seats */}
                  <Seat extraDetails={aeroplane} planeIndex={index} />

                  {/* Airplane Back Image */}
                  <Box
                    component="img"
                    src={flightBack.src}
                    alt="Airplane Back"
                    sx={{ maxWidth: "300px" }}
                  />
                </Box>
              </Stack>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </Box>
  );
};

export default SeatMap;
