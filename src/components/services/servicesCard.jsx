import { Box, CardActionArea, Typography } from "@mui/material";
import React from "react";
import flight from "@/services/flight.png";
import Image from "next/image";
import { COLORS } from "@/utils/colors";
import { raleway } from "@/utils/fonts";
const ServicesCard = ({ img, title }) => {
  return (
    <div>
      <CardActionArea
        sx={{
          textAlign: "center",
          ":hover": {
            img: {
              transform: "translateY(-10px)",
            },
          },
          img: {
            transition: "0.5s ease all",
          },
        }}
      >
        <Image src={img} width={35} />
        <Typography
          sx={{
            color: COLORS.PRIMARY,
            fontFamily: raleway.style,
            fontWeight: 600,
            fontSize: 10,
            textTransform:"capitalize"
          }}
        >
          {title}
        </Typography>
      </CardActionArea>
    </div>
  );
};

export default ServicesCard;
