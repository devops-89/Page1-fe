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
    { icon: <Flight sx={{ fontSize: 14 }} />, label: "Flights" },
    { icon: <Hotel sx={{ fontSize: 14 }} />, label: "Hotels" },
  ];

  const [value, setValue] = useState(0);
  const [uiLocked, setUiLocked] = useState(false);

  const tabChangeHandler = (_e, v) => setValue(v);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Fullscreen blur overlay BELOW the loader */}
      {uiLocked && (
        <Box
          aria-hidden
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (t) => t.zIndex.modal, // 1300 by default
            pointerEvents: "none",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />
      )}

      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{ delay: 4000 }}
      >
        {data.heroSectionData.map((val, i) => (
          <SwiperSlide key={i}>
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
                  minHeight: "650px",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                {showHeroText && (
                  <Grid2
                    container
                    sx={{ mt: { xs: 10, sm: 12, md: 12, lg: 15 } }}
                  >
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
          bottom: 0,
          left: "50%",
          transform: { xs: "translate(-50%, -3%)" },
          width: "100%",
          maxWidth: "1200px",
          px: 2,
        }}
      >
        <Grid2 container>
          <Grid2
            size={12}
            margin="auto"
            sx={{
              boxShadow: "0px 0px 1px 1px #d7d7d7",
              bgcolor: COLORS.WHITE,
              borderRadius: 4,
              pb: 1,
            }}
          >
            <Box>
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
                  "& .MuiTabs-indicator": { display: "none !important" },
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
                    key={i}
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
                    sx={{ mx: 1 }}
                  />
                ))}
              </Tabs>

              <Divider />
              <Box>
                <TabPanel value={value} index={0}>
                  <FlightForm setUiLocked={setUiLocked} uiLocked={uiLocked}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <HotelForm setUiLocked={setUiLocked} uiLocked={uiLocked} />
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
