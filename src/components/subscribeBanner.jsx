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
import subscribeBanner from "@/banner/subscribe-banner.jpg";
import { nunito, raleway } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { Done } from "@mui/icons-material";
const SubscribeBanner = () => {
  const list = [
    {
      label: "Enjoy romantic destinations.",
    },
    {
      label: "Have a safe and peaceful stay.",
    },
    {
      label: "Dreamy experience with your other half.",
    },
  ];
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${subscribeBanner.src})`,
          height: "90vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000070",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Container maxWidth="lg">
            <Grid2 container>
              <Grid2 size={{lg:6, md:12 ,sm:12, xs:12}}>
                <Typography
                  sx={{
                    fontSize: 17,
                    fontFamily: nunito.style,
                    color: COLORS.PRIMARY,
                    letterSpacing: 2,
                    mb: {lg:3 ,sm:2},
                  }}
                >
                  MEGA OFFER
                </Typography>
                <Typography>
                  <Typography
                    sx={{
                      fontSize: 40,
                      fontFamily: nunito.style,
                      color: COLORS.PRIMARY,
                      fontWeight: 800,
                    }}
                    component={"span"}
                  >
                    10% OFF
                  </Typography>{" "}
                  <Typography
                    sx={{
                      fontSize: {lg: 40 ,md: 30},
                      fontFamily: nunito.style,
                      color: COLORS.WHITE,
                      fontWeight: 800,
                      ml: 2,
                    }}
                    component={"span"}
                  >
                    For Newlyweds
                  </Typography>
                </Typography>
                <Typography
                  sx={{ mt: {lg:3 ,sm:2}, color: COLORS.WHITE, fontFamily: raleway.style }}
                >
                  Love is in the air! Fall in love with a romantic getaway with
                  Page1 Travels special offer for newlywed couples. We include
                  the most romantic destinations in our honeymoon package to
                  ensure you a once-in-a-lifetime experience.
                </Typography>
                <List sx={{mt:2}}>
                  {list.map((val, i) => (
                    <ListItem key={i} disablePadding sx={{mb:1}}>
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Done sx={{ color: COLORS.PRIMARY }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: {lg:16,sm:15},
                              color: COLORS.WHITE,
                              fontFamily: raleway.style,
                            }}
                          >
                            {val.label}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  sx={{
                    mt: {lg:4 ,sm:2},
                    fontSize: 14,
                    border: `1px solid ${COLORS.PRIMARY}`,
                    width: 150,
                    color: COLORS.SECONDARY,
                    backgroundColor: COLORS.PRIMARY,
                    fontWeight: 600,
                    fontFamily: raleway.style,
                    ":hover": {
                      color: COLORS.PRIMARY,
                      border: `1px solid ${COLORS.SECONDARY}`,
                      backgroundColor: COLORS.SECONDARY,
                    },
                  }}
                >
                  View More
                </Button>
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default SubscribeBanner;
