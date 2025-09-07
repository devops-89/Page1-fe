import React from "react";
import { Grid2, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CountUp from "react-countup";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HotelIcon from "@mui/icons-material/Hotel";
import HelicopterIcon from "@mui/icons-material/Air";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WeddingVenueIcon from "@mui/icons-material/Favorite";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";

const items = [
  {
    label: "Package Order",
    quantity: 2500,
    icon: <EventIcon fontSize="large" />,
    bgColor: "#FF7043",
  },
  {
    label: "Flight Booking",
    quantity: 1800,
    icon: <FlightTakeoffIcon fontSize="large" />,
    bgColor: "#42A5F5",
  },
  {
    label: "Hotel Booking",
    quantity: 3200,
    icon: <HotelIcon fontSize="large" />,
    bgColor: "#7E57C2",
  },
  {
    label: "Helicopter Booking",
    quantity: 600,
    icon: <HelicopterIcon fontSize="large" />,
    bgColor: "#26A69A",
  },
  {
    label: "Cabs",
    quantity: 2800,
    icon: <DirectionsCarIcon fontSize="large" />,
    bgColor: "#FFCA28",
  },
  {
    label: "Destination Wedding",
    quantity: 150,
    icon: <WeddingVenueIcon fontSize="large" />,
    bgColor: "#EC407A",
  },
  {
    label: "Self Drive",
    quantity: 950,
    icon: <DirectionsCarIcon fontSize="large" />,
    bgColor: "#8D6E63",
  },
  {
    label: "Outstation Cab",
    quantity: 1400,
    icon: <LocationCityIcon fontSize="large" />,
    bgColor: "#90A4AE", // fallback color added
  },
  {
    label: "Activities",
    quantity: 1200,
    icon: <EventIcon fontSize="large" />,
    bgColor: "#66BB6A",
  },
];

export default function BookingGrid({setValue}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid2 container spacing={2} padding={isXs ? 1 : 2}>
      {items.map((item, index) => (
        <Grid2
          size={{xs:12, sm:6, md:4, lg:3}}
          onClick={()=>{
            if(item.label=="Package Order") setValue(0);
            if(item.label=="Flight Booking") setValue(2);
            if(item.label=="Hotel Booking") setValue(3);
          }}
          key={index}
          sx={{
            borderRadius: "4px",
            backgroundColor: "var(--white-color, #fff)",
            boxShadow: "0px 0px 8px #cac9c9",
            cursor: "pointer",
            "&:hover": {
              boxShadow: `0 0 12px 3px ${item.bgColor}`,
              transform: "translateY(-4px)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: isXs ? 70 : 90,
              p: 1,
            }}
          >
            <Box
              sx={{
                width: isXs ? "35%" : "40%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.bgColor,
                color: "white",
                borderRadius: "4px",
                m: 0,
                mr: isXs ? 1 : 2,
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                fontSize: isXs ? "1.5rem" : "2rem",
              }}
            >
              {item.icon}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Typography
                variant={isXs ? "subtitle1" : "h6"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: isXs ? "16px" : "19px",
                  userSelect: "none",
                  fontFamily:nunito.style,
                  fontWeight:600
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: item.bgColor, fontFamily:nunito.style, fontWeight: 600, fontSize: isXs ? "14px" : "18px" }}
              >
                <CountUp
                  start={0}
                  end={item.quantity}
                  duration={2}
                  separator=","
                  formattingFn={(num) =>
                    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num
                  }
                />
              </Typography>
            </Box>
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}
