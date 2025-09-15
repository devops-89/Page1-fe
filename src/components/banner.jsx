import {
  Box,
  Container,
  Divider,
  Grid2,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const theme = useTheme();
  const showHeroText = useMediaQuery(theme.breakpoints.up("sm"));
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
                  minHeight: "650px",
                }}
              >
<<<<<<< HEAD
                <Grid2
                  container
                  sx={{
                    mt: { xs: 10, sm: 12, md: 12, lg: 15 },
                  }}
                >
=======
                {showHeroText && (
>>>>>>> 5fec59774fc83ce6d3636101a2987d486c32efaa
                  <Grid2
                    container
                    sx={{
                      mt: { xs: 10, sm: 12, md: 12, lg: 15 },
                    }}
                  >
                    <Grid2
                      size={10}
                      margin="auto"
                      className="animate__animated animate__bounceInLeft"
                    >
<<<<<<< HEAD
                      TOUR & TRAVEL
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 20, sm: 30, md: 40, lg: 50 },
                        color: COLORS.WHITE,
                        textAlign: "center",
                        fontFamily: raleway.style,
                        fontWeight: 700,
                      }}
                    >
                      {val.title}
                    </Typography>
=======
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
                          fontSize: { xs: 20, sm: 30, md: 40, lg: 50 },
                          color: COLORS.WHITE,
                          textAlign: "center",
                          fontFamily: raleway.style,
                          fontWeight: 700,
                        }}
                      >
                        {val.title}
                      </Typography>
                    </Grid2>
>>>>>>> 5fec59774fc83ce6d3636101a2987d486c32efaa
                  </Grid2>
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search  */}
      <Container
        sx={{
          position: "absolute",
          zIndex: 99,
<<<<<<< HEAD
          bottom: "0",
          left: 0,
          right: 0,
          transform: "translateX(-50%, 50%)",
          pb: "40px",
=======
          bottom: 0,
          left: "50%",
          transform: {
            xs: "translate(-50%, -3%)",
          },
          width: "100%",
          maxWidth: "1200px",
          px: 2,
>>>>>>> 5fec59774fc83ce6d3636101a2987d486c32efaa
        }}
      >
        <Grid2 container>
          <Grid2
            size={12}
            margin={"auto"}
            sx={{
              boxShadow: "0px 0px 1px 1px #d7d7d7",
              bgcolor: COLORS.WHITE,
              borderRadius: 4,
              pb: 1,
            }}
          >
            <Box
<<<<<<< HEAD
              sx={{
                maxHeight: "380px",
                overflowY: "scroll",
                position: "relative",
              }}
=======
            // sx={{
            //   maxHeight: "380px",
            //   overflowY: "scroll",
            //   position: "relative",
            // }}
>>>>>>> 5fec59774fc83ce6d3636101a2987d486c32efaa
            >
              <Tabs
                value={value}
                onChange={tabChangeHandler}
                sx={{
                  position: "sticky",
                  zIndex: 9,
                  backgroundColor: COLORS.WHITE,
                  borderBottom: `1px solid ${COLORS.GREY}`,
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  top: 0,
                  "& .Mui-selected": {
                    color: `${COLORS.WHITE} !important`,
                    backgroundColor: COLORS.SECONDARY,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none !important",
                  },
                  "& .MuiTab-root": {
                    width: 120,
                    minHeight: { lg: 40, md: 40, sm: 35, xs: 35 },
                    top: 5,
                    borderRadius: 8,
                    padding: 0,
                    transition: "0.5s ease all",
                  },

                  "& .MuiTab-root:hover": {
                    color: `${COLORS.WHITE} !important`,
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
      </Container>
    </Box>
  );
};

export default Banner;
