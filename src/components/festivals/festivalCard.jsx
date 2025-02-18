import { Box, CardActionArea, Typography } from "@mui/material";
import React from "react";
import diwali from "@/offer/diwali.jpg";
import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
const FestivalCard = ({ img, height, title, promo, top }) => {
  return (
    <CardActionArea>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          ":hover": {
            ".image": {
              transform: "scale(1.1)",
            },
          },
          ".image": {
            transition: "0.5s ease all",
          },
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${img})`,
            height: { height },
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: 2,
          }}
          className="image"
        >
          <Box sx={{ backgroundColor: "#00000060", height: "100%" }}></Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: top,
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: {lg:55 ,sm:40} ,
              fontWeight: 600,
              fontFamily: raleway.style,
              textAlign: "center",
              letterSpacing: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: raleway.style,
              textAlign: "center",
            }}
          >
            {promo}
          </Typography>
        </Box>
      </Box>
    </CardActionArea>
  );
};

export default FestivalCard;
