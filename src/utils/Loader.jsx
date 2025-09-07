import * as React from "react";
import dynamic from "next/dynamic";
import Backdrop from "@mui/material/Backdrop";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import flightLottie from "@/assests/flight_image/flight.json";
import flightAnimation from "@/assests/flight_image/flight-animation.json";
import hotelLottie from "@/assests/hotel-image/Hotel_animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loader({ open = false, variant = "flight" }) {
  const pickAnimation = () => {
    switch (variant) {
      case "hotel":
        return hotelLottie;
      case "flight":
        return flightAnimation || flightLottie;
      default:
        return flightLottie;
    }
  };

  const animationData = pickAnimation();

  return (
    <Backdrop
      sx={{
        background: "linear-gradient(135deg, #f0f4ff, #e0eaff)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 2,
      }}
      open={open}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: 520 },
          background:
            variant === "hotel"
              ? "linear-gradient(135deg, #1E3A8A, #0EA5E9)"
              : "linear-gradient(135deg, #022F57, #0730BF)",
          color: "white",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          p: 2,
          mb: 2,
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography variant="h6">Loading Information</Typography>
          <Typography variant="body2">
            Please wait while we fetch your{" "}
            {variant === "hotel" ? "hotel" : "flight"} details...
          </Typography>
        </Box>

        {/* top/main lottie */}
        {Lottie ? (
          <Lottie
            animationData={animationData}
            loop
            style={{ width: 300, height: 300 }}
          />
        ) : null}
      </Box>

      {Lottie ? (
        <Lottie
          animationData={variant === "hotel" ? hotelLottie : flightLottie}
          loop
          style={{ width: 220, height: 220 }}
        />
      ) : null}
    </Backdrop>
  );
}

Loader.propTypes = {
  open: PropTypes.bool,
  variant: PropTypes.oneOf(["flight", "hotel", "generic"]),
};
