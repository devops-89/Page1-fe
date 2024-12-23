import { COLORS } from "@/utils/colors";
import {
  Box,
  Button,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import about from "@/banner/about.png";
import Image from "next/image";
import { nunito } from "@/utils/fonts";
import {
  ArrowForward,
  ArrowForwardIos,
  LocationOn,
  ManageAccounts,
  Public,
} from "@mui/icons-material";
const About = () => {
  const listAbout = [
    {
      label: "Tailored travel and study-abroad solutions for your journey.",
      icon: <Public />,
    },
    {
      label:
        "Comprehensive services, including immigration advice, study-abroad support, and vacation planning.",
      icon: <ManageAccounts />,
    },
  ];
  return (
    <div>
      <Box sx={{ backgroundColor: COLORS.LIGHTBLUE, pt: 8, pb: 8 }}>
        <Container>
          <Grid2 container>
            <Grid2 size={6}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  width: 500,
                  height: 500,
                  borderRadius: 5,
                }}
              >
                <Image src={about} width={499} />
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 550,
                  color: COLORS.PRIMARY,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                  mb: 1,
                  fontFamily: nunito.style,
                }}
              >
                About Page1Travels
              </Typography>
              <Typography
                sx={{
                  fontSize: 40,
                  fontWeight: 700,
                  fontFamily: nunito.style,
                  textTransform: "capitalize",
                }}
              >
                Look for new horizons in your travels
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: nunito.style,
                  // textTransform: "capitalize",
                  mb: 1,
                  mt: 1,
                }}
              >
                At Page1 Travels, you can find the best deals to visit your
                dream destinations that fit just right in your budget. Nowadays
                going on a trip is much more than just visiting a new
                destination. So here we are to enhance your traveling experience
                with our exquisite tour and travel packages. Explore Page1
                Travels and go visit your dream destination today.
              </Typography>
              <List>
                {listAbout.map((val, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                    <ListItemAvatar
                      sx={{
                        border: `1px solid ${COLORS.PRIMARY}`,
                        textAlign: "center",
                        color: COLORS.WHITE,
                        borderRadius: "50%",
                        height: 50,
                        backgroundColor: COLORS.PRIMARY,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        minWidth: 50,
                      }}
                    >
                      {val.icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontFamily: nunito.style,
                            fontWeight: 500,
                          }}
                        >
                          {val.label}
                        </Typography>
                      }
                      sx={{ ml: 3 }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                endIcon={
                  <Box
                    sx={{
                      border: `1px solid ${COLORS.BLACK}`,
                      fontSize: 10,
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: COLORS.BLACK,
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 10 }} />
                  </Box>
                }
                sx={{
                  fontSize: 12,
                  p: 1.4,
                  backgroundColor: "lightGrey",
                  color: COLORS.BLACK,
                  borderRadius: 4,
                  width: 130,
                  mt: 2,
                  ":hover": {
                    backgroundColor: COLORS.PRIMARY,
                  },
                  fontFamily: nunito.style,
                  fontWeight: 600,
                  textTransform:"capitalize"
                }}
              >
                Learn More
              </Button>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default About;
