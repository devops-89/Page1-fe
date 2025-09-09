import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

const Benefits = () => {
  return (
    <Box sx={{ backgroundColor: COLORS.PRIMARY, py: 3 }}>
      <Container>
        <Grid2 container spacing={0}>
          {data?.heliBenefits.map((val, i) => {
            const isLast = i === data.heliBenefits.length - 1;
            return (
              <Grid2
                key={val.heading + i}
                size={{ xs: 12, sm: 4 }}
                sx={{
                  // vertical divider on sm+, horizontal divider (bottom) on xs
                  borderRight: {
                    xs: "none",
                    sm: isLast ? "none" : "1px solid #00000040",
                  },
                  borderBottom: {
                    xs: isLast ? "none" : "1px solid #00000040",
                    sm: "none",
                  },
                  px: 2,
                  py: { xs: 2, sm: 0 },
                  textAlign: { xs: "center", sm: "start" },
                }}
              >
                <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
                  {val.heading}
                </Typography>
                <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                  {val.description}
                </Typography>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Benefits;
