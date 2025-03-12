import aboutBg from "@/about-bg.svg";
import { data } from "@/assests/data";
import backgroundImage from "@/banner/about.jpg";
import AboutUs from "@/components/aboutus";
import ChooseCard from "@/components/chooseCard";
import CounterCard from "@/components/counterCard";
import InnerBanner from "@/components/innerBanner";
import Testimonials from "@/components/testimonial/testimonials";
import bottomStars from "@/stars-bottom.png";
import topStars from "@/stars-top.png";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Box, Container, Grid2, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
const About = () => {
  return (
    <Box>
      <Head>
        <title>About Us</title>
      </Head>
      {/* <Box
        sx={{
          backgroundImage: `url(${backgroundImage.src})`,
          height: 200,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            backgroundColor: COLORS.BLACKDARKOVERLAY,
            height: "100%",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: 30,
                fontFamily: nunito.style,
                color: COLORS.WHITE,
                fontWeight: 700,
              }}
            >
              About us{" "}
            </Typography>
            <Breadcrumbs
              separator=">"
              sx={{
                ".MuiBreadcrumbs-separator": {
                  color: COLORS.WHITE,
                  fontWeight: 600,
                },
              }}
            >
              <Link href={"/"}>
                <Home htmlColor={COLORS.WHITE} sx={{ fontSize: 25 }} />
              </Link>
              <Link href={"/about"} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: COLORS.WHITE,
                    textDecoration: "none !important",
                    fontFamily: nunito.style,
                    fontWeight: 550,
                  }}
                >
                  About
                </Typography>
              </Link>
            </Breadcrumbs>
          </Box>
        </Box>
      </Box> */}
      <InnerBanner img={backgroundImage.src} heading={"About Us"} />
      <Box>
        <AboutUs />
      </Box>
      <Box
        sx={{
          pt: {lg:10 ,xs:5},
          pb: 10,
          position: "relative",
          backgroundColor: COLORS.LIGHTBLUE,
        }}
      >
        <Container>
          <Box sx={{ position: "absolute", right: 0 }}>
            <Image src={topStars} />
          </Box>
          <Typography
            sx={{ fontSize: 30, fontWeight: 700, fontFamily: nunito.style }}
          >
            Why Choose{" "}
            <Typography
              sx={{
                color: COLORS.SECONDARY,
                fontSize: 30,
                fontWeight: 700,
                fontFamily: nunito.style,
              }}
              component={"span"}
            >
              Us ?
            </Typography>
          </Typography>

          <Grid2 container spacing={3} sx={{ mt: 3 }}>
            {data.choose.map((val, i) => (
              <Grid2 size={{lg:3 ,md:6 , sm:6,xs:12}}>
                <ChooseCard
                  icon={val.icon}
                  heading={val.heading}
                  description={val.description}
                />
              </Grid2>
            ))}
          </Grid2>
          <Box sx={{ position: "absolute", left: 0 }}>
            <Image src={bottomStars} />
          </Box>
        </Container>
      </Box>
      <Box sx={{ mt: 10, mb: 10, position: "relative" }}>
        <Box>
          <Image src={aboutBg} style={{ width: "100%" }} />
        </Box>
        <Grid2 container sx={{ position: "absolute", width: "100%", top: {lg:-10 , md:-60,sm:-60, xs:-80} }}>
          <Grid2
            size={{lg:10 ,xs:12}}
            margin={"auto"}
            sx={{
              backgroundColor: COLORS.WHITE,
              backdropFilter: "blur(5px)",
              borderRadius: 4,
              p: 2,
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
              opacity: 0.9,
              height: 130,
            
            }}
          >
            <Grid2 container spacing={{lg:8 ,xs:8}}>
              {data.counterData.map((val, i) => (
                <Grid2 size={{lg:3 ,md:6 , sm:6 ,xs:6}} key={i} boxShadow={1} >
                  <CounterCard
                    count={val.count}
                    heading={val.heading}
                    icon={val.icon}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{}}>
        <Testimonials />
      </Box>
    </Box>
  );
};

export default About;
