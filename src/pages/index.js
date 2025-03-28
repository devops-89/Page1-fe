import AboutUs from "@/components/aboutus";
import Banner from "@/components/banner";
import Faq from "@/components/faq";
import Festivals from "@/components/festivals";
import Hotel from "@/components/hotels";
import Services from "@/components/services";
import SubscribeBanner from "@/components/subscribeBanner";
import Testimonials from "@/components/testimonial/testimonials";
import { COLORS } from "@/utils/colors";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Page1Travels</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
       <Box>
        
        <Banner />
        <Box >
          <Services />
        </Box>
        <Box sx={{ backgroundColor: COLORS.LIGHTBLUE }}>
          
         <AboutUs/>
        </Box>
        <Box sx={{ pt:10}}>
           <Festivals /> 
        </Box>
        <Box sx={{ pt: 10 }}>
           <SubscribeBanner /> 
        </Box>
        <Box  sx={{ pt:10 }}>
          <Hotel /> 
        </Box>
        <Box sx={{ pt: 10 }}>
          <Testimonials />
        </Box>
        <Box sx={{ pt:10 }}>
          <Faq />
        </Box>
      </Box> 
    </>
  );
}
