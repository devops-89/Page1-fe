import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { Box, Container, Divider, Grid2, Typography } from "@mui/material";
import React from "react";

const Benefits = () => {
  return (
    <Box sx={{ backgroundColor: COLORS.PRIMARY, p: 4 }}>
      <Container>
        <Grid2 container>
          {data?.heliBenefits.map((val, i) => (
            <Grid2
              size={4}
              sx={{
                borderRight:
                  i !== data.heliBenefits.length - 1 && "1px solid #00000040",
                px: 2,
              }}
            >
              <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
                {val.heading}
              </Typography>
              <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                {val.description}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Benefits;
