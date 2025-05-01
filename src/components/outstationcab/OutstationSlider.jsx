import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y,Autoplay } from "swiper/modules";
import "swiper/css";

import { Typography, Box } from "@mui/material";
import { COLORS } from "@/utils/colors";
import { roboto } from "@/utils/fonts";

const OutstationSlider = () => {
  return (
    <Swiper
      modules={[A11y,Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween:10 
        },
        640: {
          slidesPerView: 2, 
          spaceBetween:10
        },
        768: {
          slidesPerView: 3, 
          spaceBetween:30
        },
      }}
      
      onSwiper={(swipe) => console.log(swipe)}
      onSlideChange={() => console.log("slide change")}
      style={{marginBlock:"30px"}}
    >
      <SwiperSlide>
        <Box sx={{ border: `1px solid ${COLORS.PRIMARY}`,p:2,height:"140px",borderRadius:2}}>
          <Typography variant="h5" sx={{textAlign:"center",fontWeight:"bold",color:COLORS.PRIMARY,fontFamily:roboto.style, fontSize:{xs:18, sm:20, md:22}}}>Booking Offer</Typography>
          <Typography variant="body1" sx={{fontFamily:roboto.style,textAlign:"center", fontSize:{xs:14, sm:14}}}>
            {" "}
            Be it a one-way ride or a complete round trip, Page1 Travels has got
            exclusive deals and discounts for everyone.
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{ border: `1px solid ${COLORS.PRIMARY}`,p:2,height:"140px",borderRadius:2 }}>
          <Typography variant="h5" sx={{textAlign:"center",fontWeight:"bold",color:COLORS.PRIMARY,fontFamily:roboto.style, fontSize:{xs:18, sm:20, md:22}}}>Baggage Transport</Typography>
          <Typography variant="body1"  sx={{fontFamily:roboto.style,textAlign:"center", fontSize:{xs:14, sm:14}}}>
            {" "}
            Safely transport your baggage on your trips with our affordable and
            reliable baggage transportation service.
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{ border: `1px solid ${COLORS.PRIMARY}`,p:2,height:"140px",borderRadius:2 }}>
          <Typography variant="h5" sx={{textAlign:"center",fontWeight:"bold",color:COLORS.PRIMARY,fontFamily:roboto.style, fontSize:{xs:18, sm:20, md:22}}}>Airport Transfer</Typography>
          <Typography variant="body1"  sx={{fontFamily:roboto.style,textAlign:"center", fontSize:{xs:14, sm:14}}}>
            Our airport transfer service ensures that you can conveniently
            travel from the airport to the city or the other way around.
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{ border: `1px solid ${COLORS.PRIMARY}`,p:2,height:"140px",borderRadius:2 }}>
          <Typography variant="h5" sx={{textAlign:"center",fontWeight:"bold",color:COLORS.PRIMARY,fontFamily:roboto.style, fontSize:{xs:18, sm:20, md:22}}}>City Transfer</Typography>
          <Typography variant="body1"  sx={{fontFamily:roboto.style,textAlign:"center", fontSize:{xs:14, sm:14}}}>
            If you want to travel to different cities during your trip then we
            have got you covered with our city transfer service.
          </Typography>
        </Box>
      </SwiperSlide>
    </Swiper>
  );
};

export default OutstationSlider;
