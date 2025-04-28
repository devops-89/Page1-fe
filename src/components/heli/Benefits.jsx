import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";
import { Box, Container, Divider, Grid2, Typography } from "@mui/material";
import React from "react";

const Benefits = () => {
  return (
    <Box sx={{ backgroundColor: COLORS.PRIMARY, py:3 }}>
      <Container>
        <Grid2 container spacing={2}>
          {data?.heliBenefits.map((val, i) => (
            <Grid2
              size={{xs:12, sm:4}}
              sx={{
                borderRight: {
                  xs: 'none',
                  sm: i !== data.heliBenefits.length - 1 ? "1px solid #00000040" : "none",
                },
                px: 2,
                textAlign:{xs:'center', sm:'start'}
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
