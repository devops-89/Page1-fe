import { COLORS } from "@/utils/colors";
import { Box, Container, Grid2 } from "@mui/material";
import React from "react";
import ServicesCard from "./servicesCard";
import { data } from "@/assests/data";

const Services = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ backgroundColor: COLORS.BLACK }}>
        <Container maxWidth="xl">
          <Grid2 container>
            {data.servicesData.map((val, i) => (
              <Grid2 size={1} pt={2} pb={2} key={i}>
                <ServicesCard img={val.img} title={val.title} />
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
