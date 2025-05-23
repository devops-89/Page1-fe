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
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
const AboutUs = () => {
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

  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (router.pathname === "/about") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname]);

  return (
    <div>
      <Box sx={{ pt: 8, pb: 8 }}>
        <Container>
          <Grid2 container>
            <Grid2 size={{ lg: 6, md: 12, sm: 12 }}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  width: { lg: 500, sm: "100%" },

                  overflow: "hidden",

                  height: 500,
                  borderRadius: 5,
                }}
              >
                <Image
                  src={about}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit:"cover" 
                  }}
                />
              </Box>
            </Grid2>
             <Grid2 size={{lg:6,md:12}}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 550,
                  color: COLORS.PRIMARY,
                  letterSpacing: 1,
                  textTransform: "capitalize",
                  mb: 1,
                  mt:{lg:0,xs:2},
                  fontFamily: nunito.style,
                }}
              >
                About Page1Travels
              </Typography>
              <Typography
                sx={{
                  fontSize: {lg:40,sm:35,},
                  fontWeight: 700,
                  fontFamily: nunito.style,
                  textTransform: "capitalize",
                }}
              >
                Look for new horizons in your travels
              </Typography>
              <Typography
                sx={{
                  fontSize: {lg:15 , md:15,sm:13, xs:13},
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
                destination. So here we are to enhance your travelling experience
                with our exquisite tour and travel packages. Explore Page1
                Travels and visit your dream destination today.
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
                        height: {lg:50 , md:40 ,sm:40 , xs:40},
                        backgroundColor: COLORS.PRIMARY,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width:  {lg:40 , md:40 ,sm:40 , xs:30},
                        minWidth:  {lg:50 , md:40 ,sm:40 , xs:40},
                      }}
                    >
                      {val.icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: {lg:15 , md:15,sm:13, xs:12},
                            fontFamily: nunito.style,
                            fontWeight: 500,
                          }}
                        >
                          {val.label}
                        </Typography>
                      }
                      sx={{ ml: {lg:3 ,md:2 , sm:1 ,xs:1} }}
                    />
                  </ListItem>
                ))}
              </List>
              {show ? (
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: nunito.style,
                      fontWeight: 550,
                      color: COLORS.PRIMARY,
                      mb: 1,
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography
                    sx={{
                      fontSize:{lg:15 , md:15,sm:13, xs:13},
                      fontFamily: nunito.style,
                      fontWeight: 500,
                    }}
                  >
                    Our mission is to make travel more accessible, enjoyable,
                    and hassle-free for everyone. With our range of services
                  </Typography>
                </Box>
              ) : (
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
                    textTransform: "capitalize",
                  }}
                >
                  Learn More
                </Button>
              )}
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUs;
