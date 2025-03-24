import InnerBanner from "@/components/innerBanner";
import React from "react";
import banner from "@/banner/flight.jpg";
import FlightForm from "@/components/flight/flightForm";
import { Box, Card, Container, Grid2, Typography } from "@mui/material";
import Faq from "@/components/faq";
import Testimonials from "@/components/testimonial/testimonials";
import { nunito } from "@/utils/fonts";
import SecurityIcon from '@mui/icons-material/Security';
import { COLORS } from "@/utils/colors";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const FLight = () => {
  return (
    <>
      <InnerBanner img={banner.src} heading={"Search Flight"} />
      <Box sx={{ pt: { lg: 10, md: 5 } }}>
        <Container>
          <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
            <Typography sx={{ fontSize: 18 }}> Search Flight</Typography>
            <FlightForm />
          </Card>
        </Container>
        <Box sx={{ pt: { lg: 10, md: 5 } }}>
        <Container>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{textAlign:"center"}}>
                <SecurityIcon sx={{fontSize:'50px', mb:"10px", color:COLORS.PRIMARY}}/>
              <Typography variant="body1" sx={{fontFamily:nunito.style}}>
                Best Price Guarantee <br/> Book flight tickets at the best prices.
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{textAlign:"center"}}>
            <AirplaneTicketIcon sx={{fontSize:'50px', mb:"10px", color:COLORS.PRIMARY}}/>
            <Typography variant="body1" sx={{fontFamily:nunito.style}}>
                Easy & Quick Booking <br/>We offer a hassle-free booking process.
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{textAlign:"center"}}>
            <SupportAgentIcon sx={{fontSize:'50px', mb:"10px", color:COLORS.PRIMARY}}/>
            <Typography variant="body1" sx={{fontFamily:nunito.style}}>
            Customer Care 24/7 <br/> We are here for you round-the-clock.
              </Typography>
            </Grid2>
          </Grid2>
          </Container>
        </Box>
        <Box sx={{ pt: { lg: 10, md: 5 } }}>
          <Testimonials />
        </Box>
        <Box sx={{ pt: { lg: 10, md: 5 } }}>
          <Faq />
        </Box>
      </Box>
    </>
  );
};

export default FLight;
