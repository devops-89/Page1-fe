import Banner from "@/components/banner";
import InnerBanner from "@/components/innerBanner";
import { Box, Typography } from "@mui/material";
import React from "react";

const OurHotels = () => {
  return (
    <div>
      <InnerBanner heading={"Our Hotels"} />
      <Box>
        <Typography sx={{ fontSize: { lg: 100, xs: 20 } }}>Hello</Typography>
      </Box>
    </div>
  );
};

export default OurHotels;
