import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Lottie from "lottie-react";
import flightLottie from '@/assests/flight_image/flight.json'

export default function Loader({ open }) {


  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <Lottie animationData={flightLottie} loop={true} style={{ width: 300, height: 300 }}/>
    </Backdrop>
  );
}
