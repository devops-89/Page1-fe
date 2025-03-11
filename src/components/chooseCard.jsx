import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { BeenhereOutlined } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ChooseCard = ({ icon, heading, description }) => {
  return (
    <Box
      sx={{
        ":hover": {
          backgroundColor: COLORS.WHITE,
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        },
        p: 2,
        borderRadius: 2,
        transition: "0.5s ease all",
      }}
    >
      <Avatar sx={{ bgcolor: COLORS.SECONDARY, width: {lg:60 , md:50 ,sm:50 ,xs:50}, height: {lg:60 , md:50 ,sm:50 ,xs:50} }}>
        {icon}
      </Avatar>
      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          fontFamily: nunito.style,
          mb: 1,
          mt: 1,
        }}
      >
        {heading}
      </Typography>
      <Typography
        sx={{
          fontSize: 15,
          fontFamily: nunito.style,
          fontWeight: 550,
          color: COLORS.LIGHTGREY,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ChooseCard;
