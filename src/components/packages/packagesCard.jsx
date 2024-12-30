import { Box, Card, IconButton } from "@mui/material";
import React from "react";
import jersey from "@/tours/jersey.jpg";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/colors";
const Packagescard = () => {
  return (
    <div>
      <Card sx={{ position: "relative" }}>
        <Box
          sx={{
            backgroundImage: `url(${jersey.src})`,
            height: 200,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
            <Box sx={{}}></Box>
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: 2,
            right: 5,
          }}
        >
          <FavoriteBorderOutlined htmlColor={COLORS.WHITE} />
        </IconButton>
      </Card>
    </div>
  );
};

export default Packagescard;
