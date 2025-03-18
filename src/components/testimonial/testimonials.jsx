import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./testimonialCard";
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <div>
      <Box sx={{ pt:10 , pb: 10 }}>
        <Grid2 container>
          <Grid2 size={{lg:5 ,md:5,sm:12}} margin={"auto"}>
            <Typography
              sx={{
                fontSize: {lg:40,sm:35 ,xs:20},
                textAlign: "center",
                fontFamily: nunito.style,
                color: COLORS.BLACK,
                fontWeight: 700,
              }}
            >
              What’s Our{" "}
              <Typography
                sx={{
                  fontSize: {lg:40,sm:35 ,xs:20},
                  textAlign: "center",
                  fontFamily: nunito.style,
                  color: COLORS.PRIMARY,
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
                component={"span"}
              >
                User
              </Typography>{" "}
              Says
            </Typography>
            <Container>
            <Typography
              sx={{
                fontSize: {lg:15 ,sm:14 ,xs:12},
                textAlign: "center",
                fontFamily: nunito.style,
              }}
            >
              Page1Travels, a tour operator specializing in dream destinations,
              offers a variety of benefits for travelers.
            </Typography>

            </Container>
          </Grid2>
        </Grid2>
        <Container sx={{ mt: 5 }}>
          <Swiper
            // slidesPerView={3}
            // slidesPerView={3}
            // spaceBetween={40}
            modules={[Autoplay]}
            loop
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
           
            grabCursor
            centeredSlides={true}
          >
            {data.testimonialData.map((val, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <TestimonialCard data={val} active={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
    </div>
  );
};

export default Testimonials;
