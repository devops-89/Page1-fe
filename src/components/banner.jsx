import {
  Box,
  Card,
  Divider,
  Grid2,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "@/banner/banner6.jpg";
import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { data } from "@/assests/data";
import { Flight, Hotel } from "@mui/icons-material";
import TabPanel from "./tabPanel";
import FlightForm from "./flight/flightForm";
import HotelForm from "./hotelForm";
const Banner = () => {
  const tabs = [
    {
      icon: <Flight sx={{ fontSize: 14 }} />,
      label: "Flights",
    },
    {
      icon: <Hotel sx={{ fontSize: 14 }} />,
      label: "Hotels",
    },
  ];

  const [value, setValue] = useState(0);

  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{
          delay: 4000,
        }}
      >
        {data.heroSectionData.map((val, i) => (
          <SwiperSlide>
            <Box
              sx={{
                backgroundImage: `url(${val.img})`,
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#00000030",
                  height: "100%",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <Grid2 container sx={{ mt: 15}}>
                  <Grid2
                    size={10}
                    margin="auto"
                    className="animate__animated animate__bounceInLeft"
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: COLORS.WHITE,
                        fontWeight: 600,
                        fontFamily: raleway.style,
                        letterSpacing: 1.2,
                        textAlign: "center",
                      }}
                    >
                      TOUR & TRAVEL
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 50,
                        color: COLORS.WHITE,
                        textAlign: "center",
                        fontFamily: raleway.style,
                        fontWeight: 700,
                      }}
                    >
                      {val.title}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{ position: "absolute", width: "100%", top: "50%", zIndex: 999 }}
      >
        <Grid2 container>
          <Grid2
            size={10}
            margin={"auto"}
            sx={{
              boxShadow: "0px 0px 1px 1px #d7d7d7",
              bgcolor: COLORS.WHITE,
              borderRadius: 4,
              pb: 2,
              mt: 3,
            }}
          >
            <Box>
              <Tabs
                value={value}
                onChange={tabChangeHandler}
                sx={{
                  "& .Mui-selected": {
                    color: `${COLORS.PRIMARY} !important`,
                    backgroundColor: COLORS.SECONDARY,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none !important",
                    // backgroundColor: COLORS.PRIMARY,
                  },
                  "& .MuiTab-root": {
                    width: 120,
                    minHeight: 40,
                    top: 5,
                    borderRadius: 8,
                    padding: 0,
                    transition: "0.5s ease all",
                  },

                  "& .MuiTab-root:hover": {
                    color: `${COLORS.PRIMARY} !important`,
                    backgroundColor: COLORS.SECONDARY,
                  },
                }}
              >
                {tabs.map((val, i) => (
                  <Tab
                    label={
                      <Typography
                        fontSize={12}
                        fontWeight={800}
                        fontFamily={nunito.style}
                      >
                        {val.label}
                      </Typography>
                    }
                    icon={val.icon}
                    iconPosition="start"
                    sx={{
                      mx: 1,
                    }}
                    key={i}
                  />
                ))}
              </Tabs>
              <Divider />
              <Box>
                <TabPanel value={value} index={0}>
                  <FlightForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <HotelForm />
                </TabPanel>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Banner;
