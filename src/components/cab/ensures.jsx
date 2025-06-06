import { nunito } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import taxiBig from "@/cabs/car-big-side.png";
import Image from "next/image";
import { Done } from "@mui/icons-material";
import { COLORS } from "@/utils/colors";
const Ensures = () => {
  const features = [
    {
      label: "Safety",
    },
    {
      label: "Affordable Prices",
    },
    {
      label: "Luggage Security",
    },
    {
      label: "Proper Hygiene",
    },
    {
      label: "Professionalism",
    },
    {
      label: "Punctuality",
    },
    {
      label: "Convenience",
    },
    {
      label: "Comfort",
    },
    {
      label: "Enjoyment",
    },
  ];
  return (
    <Box sx={{ position: "relative" }}>

          <Grid2 container alignItems={"center"} spacing={5} >
          <Grid2 size={{lg:6 , xs:12}} sx={{pl:{lg:20 }}}  >

            <Container>
            <Typography
              sx={{ fontSize: 35, fontFamily: nunito.style, fontWeight: 800 , textAlign:{ lg:"left",xs:"center"} }}
            >
              We Ensure
            </Typography>
            <Typography sx={{ fontSize: 15, fontFamily: nunito.style, mt: 1 , textAlign: { lg:"left",xs:"center"} }}>
              At the heart of everything we do, "We Ensure" represents our
              unwavering commitment to quality, reliability, and trust. Our
              focus is on delivering excellence across every aspect of our
              services, ensuring that your experience is seamless, secure, and
              tailored to your unique needs.
            </Typography>
            </Container>

            <Grid2 container mt={2}>
              {features.map((val, i) => (
                <Grid2 size={4} key={i} >
                  <List>
                    <ListItem>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Done sx={{ color: COLORS.PRIMARY, fontSize: 15 }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ fontSize: 12, fontFamily: nunito.style }}
                          >
                            {val.label}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
          <Grid2 size={{lg:6 ,xs:12}}  sx={{ position: {lg:"absolute" ,xs:"relative"}, right: 0  , pl:{lg:0 , xs:2}}}>

            <Image src={taxiBig} className="img-fluid"    />
          </Grid2>
        </Grid2>
      
    </Box>
  );
};

export default Ensures;
