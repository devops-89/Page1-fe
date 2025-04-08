import {
  Box,
  Container,
  Divider,
  Grid2,
  Tab,
  Tabs,
  Typography,
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

  // return (
  //   <Box sx={{ position: "relative" }}>
  //     <Swiper
  //       modules={[EffectFade, Autoplay]}
  //       effect="fade"
  //       loop
  //       autoplay={{
  //         delay: 4000,
  //       }}
  //     >
  //       {data.heroSectionData.map((val, i) => (
  //         <SwiperSlide>
  //           <Box
  //             sx={{
  //               backgroundImage: `url(${val.img})`,
               
  //               height: {xs:'1300vh', sm:"140vh",md:'140vh', lg:'140vh'},
  //               backgroundRepeat: "no-repeat",
  //               backgroundPosition: "center",
  //               backgroundSize: "cover",
  //               "@media (max-width: 414px)": {
  //                 height: "125vh", // Specific fix for 414px width
  //               },

  //               "@media (min-width: 415px) and (max-width: 768px)": {
  //                  height: "100vh", // Adjustment for screens between 415px and 768px
  //                   },

  //                   "@media (min-width: 769px)": {
  //                     height: "140vh", // Adjustment for 769px and above
  //                   },
  //                   "@media (min-width: 769px) and (max-width: 1024px)": {
  //                     height: "100vh", // Small desktops
  //                   },

  //             }}
  //           >
  //             <Box
  //               sx={{
  //                 backgroundColor: "#00000030",
  //                 height: "100%",
  //                 display: "flex",
  //                 alignItems: "start",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               <Grid2 container sx={{ mt: 15}}>
  //                 <Grid2
  //                   size={10}
  //                   margin="auto"
  //                   className="animate__animated animate__bounceInLeft"
  //                 >
  //                   <Typography
  //                     sx={{
  //                       fontSize: 18,
  //                       color: COLORS.WHITE,
  //                       fontWeight: 600,
  //                       fontFamily: raleway.style,
  //                       letterSpacing: 1.2,
  //                       textAlign: "center",
  //                     }}
  //                   >
  //                     TOUR & TRAVEL
  //                   </Typography>
  //                   <Typography
  //                     sx={{
  //                       fontSize: {xs:20, sm:30, md:40, lg:50},
  //                       color: COLORS.WHITE,
  //                       textAlign: "center",
  //                       fontFamily: raleway.style,
  //                       fontWeight: 700,
  //                     }}
  //                   >
  //                     {val.title}
  //                   </Typography>
  //                 </Grid2>
  //               </Grid2>
  //             </Box>
  //           </Box>
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>



  //     {/* Search  */}
  //     <Box sx={{ position: "absolute", width: "100%", 
  //     top: {xs:'30%', sm:"34%", md:'37%', lg:"40%"}, 

  //     "@media (max-width: 414px)": {
  //       top: "25%", 
  //     },

  //     "@media (min-width: 415px) and (max-width: 768px)": {
  //     top: "26%", 
  //   },
  //   "@media (min-width: 769px)": {
  //     top: "40%", 
  //   },
  //   "@media (min-width: 769px) and (max-width: 1024px)": {
  //     top: "38%", 
  //   },
  //   "@media (min-width: 1025px)": {
  //     top: "35%", 
  //   },
      
    

  //     zIndex: 99 }}
  //     >
  //       <Container>
  //       <Grid2 container>
  //         <Grid2
  //           size={12}
  //           margin={"auto"}
  //           sx={{
  //             boxShadow: "0px 0px 1px 1px #d7d7d7",
  //             bgcolor: COLORS.WHITE,
  //             borderRadius: 4,
  //             pb: 2,
  //             mt: 3,
  //           }}
  //         >
  //           <Box>
  //             <Tabs
  //               value={value}
  //               onChange={tabChangeHandler}
  //               sx={{
  //                 "& .Mui-selected": {
  //                   color: `${COLORS.WHITE} !important`,
  //                   backgroundColor: COLORS.SECONDARY,
  //                 },
  //                 "& .MuiTabs-indicator": {
  //                   display: "none !important",
  //                   // backgroundColor: COLORS.PRIMARY,
  //                 },
  //                 "& .MuiTab-root": {
  //                   width: 120,
  //                   minHeight: {lg:40 , md:40 ,sm:35 , xs:35},
  //                   top: 5,
  //                   borderRadius: 8,
  //                   padding: 0,
  //                   transition: "0.5s ease all",
  //                 },

  //                 "& .MuiTab-root:hover": {
  //                   color: `${COLORS.WHITE} !important`,
  //                   backgroundColor: COLORS.SECONDARY,
  //                 },
  //               }}
  //             >
  //               {tabs.map((val, i) => (
  //                 <Tab
  //                   label={
  //                     <Typography
  //                       fontSize={12}
  //                       fontWeight={800}
  //                       fontFamily={nunito.style}
  //                     >
  //                       {val.label}
  //                     </Typography>
  //                   }
  //                   icon={val.icon}
  //                   iconPosition="start"
  //                   sx={{
  //                     mx: 1,
  //                   }}
  //                   key={i}
  //                 />
  //               ))}
  //             </Tabs>
  //             <Divider />
  //             <Box>
  //               <TabPanel value={value} index={0}>
  //                 <FlightForm />
  //               </TabPanel>
  //               <TabPanel value={value} index={1}>
  //                 <HotelForm />
  //               </TabPanel>
  //             </Box>
  //           </Box>
  //         </Grid2>
  //       </Grid2>
  //       </Container>
  //     </Box>
  //   </Box>
  // );






  return (
    <Box sx={{position:"relative" }}>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{
          delay: 4000,
        }}
        style={{ width: "100%" }}
      >
        {data.heroSectionData.map((val, i) => (
          <SwiperSlide>
            <Box
              sx={{
                backgroundImage: `url(${val.img})`,    
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight:'750px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#00000030",
                  height: "100%",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  minHeight:'750px',
                }}
              >
                <Grid2 container sx={{ mt: 15 }}>
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
                {/* form */}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        sx={{
          width: "100%",
        transform:"translateY(-300px)",
          position:"relative",
       
          zIndex: 99,
        }}
      >
        <Grid2 container>
          <Grid2
            size={11}
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
                    // backgroundColor: COLORS.PRIMARY,
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
      </Box>

      {/* Search  */}
      <Container sx={{position:'absolute', zIndex:99, bottom:'0',left:0,right:0,transform:'translateX(-50%, 50%)' , pb:"40px"}}>
        <Grid2 container>
          <Grid2
            size={12}
            margin={"auto"}
            sx={{
              boxShadow: "0px 0px 1px 1px #d7d7d7",
              bgcolor: COLORS.WHITE,
              borderRadius: 4,
              pb: 2,
              mt: 3,
            }}
          >
            <Box sx={{maxHeight:'380px', overflowY:'scroll', position:"relative"}}>
              <Tabs
                value={value}
                onChange={tabChangeHandler}
                sx={{
                  position:'sticky',
                  zIndex:9,
                  backgroundColor: COLORS.WHITE,
                  borderBottom:`1px solid ${COLORS.GREY}`,
                  borderTopLeftRadius:'16px',
                  borderTopRightRadius:'16px',
                  top:0,
                  "& .Mui-selected": {
                    color: `${COLORS.WHITE} !important`,
                    backgroundColor: COLORS.SECONDARY,
                  },
                  "& .MuiTabs-indicator": {
                    display: "none !important",
                  },
                  "& .MuiTab-root": {
                    width: 120,
                    minHeight: {lg:40 , md:40 ,sm:35 , xs:35},
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