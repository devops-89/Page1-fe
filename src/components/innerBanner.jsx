import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";

const InnerBanner = ({ img, heading }) => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          height: 250,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            backgroundColor: COLORS.BLACKDARKOVERLAY,
            height: "100%",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: 30,
                fontFamily: nunito.style,
                color: COLORS.WHITE,
                fontWeight: 700,
              }}
            >
              {heading}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InnerBanner;
