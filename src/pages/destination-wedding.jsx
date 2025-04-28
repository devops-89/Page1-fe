import InnerBanner from "@/components/innerBanner";
import React from "react";
import backgroundImage from "@/banner/wedding-bg.jpg";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { nunito, roboto } from "@/utils/fonts";
import Image from "next/image";
import wedding from "@/banner/hero-wedding.jpg";
import DestinationweddingForm from "@/components/services/DestinationweddingForm";
const DestinationWedding = () => {
  return (
    <div>
      <InnerBanner img={backgroundImage.src} heading={"Destination Wedding"} />
      <Box sx={{ mt: 3 }}>
        <Container>
          <Grid2 container spacing={5} alignItems={"center"}>
            <Grid2 size={{xs:12, sm:6}} sx={{textAlign:{xs:'center', sm:'start'}}}>
              <Typography
                sx={{ fontSize: 30, fontWeight: 550, fontFamily: roboto.style }}
              >
                Best Wedding For Events Planner
              </Typography>
              <Typography
                sx={{ fontSize: 16, fontFamily: nunito.style, mt: 1 }}
              >
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet consectetur.
              </Typography>
              <Typography
                sx={{ fontSize: 16, fontFamily: nunito.style, mt: 1 }}
              >
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet consectetur.
              </Typography>
            </Grid2>
            <Grid2 size={{xs:12, sm:6}} textAlign={"center"}>
              <Image src={wedding} style={{ borderRadius: 4, maxWidth:'450px', height:'100%', width:"100%" }}/>
            </Grid2>
          </Grid2>
        </Container>
        <Container sx={{ mt: 4 }}>
          <DestinationweddingForm />
        </Container>
      </Box>
    </div>
  );
};

export default DestinationWedding;
