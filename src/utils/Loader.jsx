import * as React from "react";
import dynamic from "next/dynamic";
import Backdrop from "@mui/material/Backdrop";
import flightLottie from "@/assests/flight_image/flight.json";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loader({ open }) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <Lottie animationData={flightLottie} loop={true} style={{ width: 300, height: 300 }} />
    </Backdrop>
  );
}
