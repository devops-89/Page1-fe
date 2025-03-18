import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Container, Grid2, Typography } from "@mui/material";
import React from "react";
import ServicesCard from "./servicesCard";
import { data } from "@/assests/data";

const Services = () => {
  return (
    <div>
      <Container>
        <Typography
          sx={{
            fontSize: 16,
            color: COLORS.PRIMARY,
            textAlign: "center",
            fontFamily: nunito.style,
            fontWeight: 600,
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{
            fontSize: 40,
            color: COLORS.BLACK,
            textAlign: "center",
            fontFamily: nunito.style,
            fontWeight: 800,
          }}
        >
          Our Services
        </Typography>

        <Grid2 container mt={3}>
          {data.cabServices.map((val, i) => (
            <Grid2
              size={{lg:3 , sm:6 , xs:12}}
              textAlign={"center"}
              sx={{
                borderRight:
                  data.cabServices.length - 1 !== i && "1px dashed #d7d7d7",
              }}
              key={i}
            >
              <ServicesCard
                img={val.img}
                heading={val.heading}
                description={val.description}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
};

export default Services;
