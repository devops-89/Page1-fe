import Image from "next/image";
import React from "react";
import image from "@/cabs/services-1.png";
import { Box, Typography } from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
const ServicesCard = ({ img, heading, description }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Image src={img} width={70} />
      </Box>
      <Typography
        sx={{ fontSize: 18, mt: 2, fontWeight: 700, fontFamily: nunito.style }}
      >
        {heading}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          mt: 2,
          fontWeight: 700,
          fontFamily: nunito.style,
          color: COLORS.LIGHTGREY,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ServicesCard;
