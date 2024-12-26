import React from "react";
import banner from "@/banner/cabs-banner.jpg";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import Link from "next/link";
import { Done, Home } from "@mui/icons-material";
import Image from "next/image";
import cabs1 from "@/cabs/cabs1.jpg";
import cab2 from "@/cabs/cabs2.jpg";
import cab3 from "@/cabs/cabs3.jpg";
import Taxiform from "@/components/taxiform";
const Cabs = () => {
  const list = [
    {
      label: "Cab Booking for All Travel Needs",
    },
    {
      label: "Ensuring Safety and Comfort",
    },
    {
      label: "Flexible Trip Options",
    },
  ];
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${banner.src})`,
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
              <Link href={"/cabs"} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: COLORS.WHITE,
                    textDecoration: "none !important",
                    fontFamily: nunito.style,
                    fontWeight: 550,
                  }}
                >
                  Cabs
                </Typography>
              </Link>
            </Breadcrumbs>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pt: 10, pb: 10 }}>
        <Container>
          <Grid2 container spacing={5}>
            <Grid2 size={6}>
              <Grid2 container spacing={3}>
                <Grid2 size={6}>
                  <Image src={cabs1} className="img-fluid" />
                </Grid2>
                <Grid2 size={6}>
                  <Box sx={{ width: 260, height: 300, mb: 2 }}>
                    <Image src={cab2} className="img-fluid" />
                  </Box>
                  <Box sx={{ width: 260, height: 300 }}>
                    <Image src={cab3} className="img-fluid" />
                  </Box>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2 size={6}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: 14,
                  fontWeight: 550,
                  fontFamily: nunito.style,
                  mb: 1,
                  color: COLORS.PRIMARY,
                }}
              >
                Welcome to our company
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: 50,
                  fontWeight: 700,
                  fontFamily: nunito.style,
                  mb: 1,
                  color: COLORS.BLACK,
                }}
              >
                Online Cab Booking Made Easy
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: nunito.style,
                  mb: 1,
                  color: COLORS.LIGHTGREY,
                }}
              >
                When it comes to traveling, safety and comfort are the utmost
                priority for anyone. A comfortable and secure journey makes a
                trip memorable.Online cab booking can be a bit of a hassle at
                times. Choosing the right cab service makes all the difference.
                We want you to enjoy your trips without the stress of safety,
                and discomfort of driving long distances yourself. Whether you
                are planning a solo trip, a weekend retreat with friends, or a
                vacation with your family, Page1 Travels’s cab services can make
                your journey smooth. Whether you want to take a cab from the
                airport, railway station, bus station, or even for the whole
                trip, Page1 Travels offers you a seamless cab booking
                experience. We provide you with dedicated cabs based on the
                number of passengers traveling and the kind of ride you want.
                All you need to do is select your pick-up location, preferred
                destination, and the number of passengers. You must also select
                if you are booking the cab for a one-way trip or a round trip
                and voila your online cab booking is done.
              </Typography>
              <List>
                {list.map((val, i) => (
                  <ListItem disablePadding key={i} sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Done htmlColor={COLORS.PRIMARY} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ fontSize: 15, color: COLORS.LIGHTGREY }}
                        >
                          {val.label}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid2>
          </Grid2>
        </Container>
        <Box sx={{ pt: 10, pb: 10 }}>
          <Taxiform />
        </Box>
      </Box>
    </div>
  );
};

export default Cabs;
