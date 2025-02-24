
import {
    Box,
    Divider,
    Grid2,
    Tab,
    Tabs,
    Typography,
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


function FromTasting() {
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
    <Box
          sx={{ width: "100%",  zIndex: 998 }}
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
                      color: `${COLORS.WHITE} !important`,
                      backgroundColor: COLORS.SECONDARY,
                    },
                    "& .MuiTabs-indicator": {
                      display: "none !important",
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
        </Box>
  )
}

export default FromTasting