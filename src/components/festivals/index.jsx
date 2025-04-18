import { COLORS } from "@/utils/colors";
import { display, raleway } from "@/utils/fonts";
import { Container, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import FestivalCard from "./festivalCard";
import diwali from "@/offer/diwali.jpg";
import holi from "@/offer/holi.jpg";
import janmasthmi from "@/offer/janmashtmi.jpg";
const Festivals = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Typography
          sx={{
            textTransform: "uppercase",
            color: COLORS.SECONDARY,
            fontSize: 16,
            fontWeight: 550,
            fontFamily: raleway.style,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          Festivals
        </Typography>
        <Typography
          sx={{
            fontFamily: raleway.style,
            textAlign: "center",
            mt: 1,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: 2,
          }}
        >
          Events And Festivals
        </Typography>
        <Grid2 container spacing={2} mt={4}>
          <Grid2 size={{lg:6,xs:12}}>
            <FestivalCard
              img={diwali.src}
              height={"71vh"}
              title={"Diwali"}
              promo={"Get 20% off on Diwali"}
              top={"30%"}
            />
          </Grid2>
          <Grid2 size={{lg:6,xs:12}}>
            <Stack spacing={1}>
              <FestivalCard
                img={holi.src}
                height={"34.8vh"}
                title={"Holi"}
                promo={"Get 30% off on Holi"}
                top={"10%"}
              />
              <FestivalCard
                img={janmasthmi.src}
                height={"35vh"}
                title={"Janmashtami"}
                promo={"Get 40% off on Janmashtami"}
                top={"10%"}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default Festivals;
