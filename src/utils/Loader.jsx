import * as React from "react";
import dynamic from "next/dynamic";
import Backdrop from "@mui/material/Backdrop";
import flightLottie from "@/assests/flight_image/flight.json";
import flightanimation from "@/assests/flight_image/flight-animation.json";
import { Box, Typography } from "@mui/material";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loader({ open }) {
  return (
    <Backdrop
      sx={{
        background: "linear-gradient(135deg, #f0f4ff, #e0eaff)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"start",
        
      }}
      open={open}
    >
      {/* Top Section Box */}
      <Box
  sx={{
    backgroundImage: "linear-gradient(to bottom,rgb(2, 49, 87),rgb(7, 41, 190))", // Blue gradient
    color: "white",
    width: "100%",
    height: "340px",
   
    padding: 2,
    borderRadius: 2,
    marginBottom: 2,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  }}
>
  <Box sx={{ textAlign: "center",width:"100%",my:2}}>
      <Typography variant="h6">Loading Information</Typography>
        <Typography variant="body2">Please wait while we fetch your flight details...</Typography>

  </Box>
      
         {/* Lottie Animation */}
      <Lottie
        animationData={flightanimation}
        loop
        style={{ width: 300, height: 300 }}
      />
      </Box>

      {/* Lottie Animation */}
      <Lottie
        animationData={flightLottie}
        loop
        style={{ width: 300, height: 300 }}
      />
    </Backdrop>
  );
}
