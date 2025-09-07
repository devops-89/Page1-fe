import { COLORS } from "@/utils/colors";
import { nunito, raleway } from "@/utils/fonts";
import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HotelCard from "./hotelCard";
import { data } from "@/assests/data";

const Hotel = () => {
  const router = useRouter();
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const SMALL_LIMIT = 3;

  const hotelsToShow = isSmall
    ? data.hotelName.slice(0, SMALL_LIMIT)
    : data.hotelName;

  const handleViewAll = () => {
    router.push("/our-hotels");
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography
              sx={{
                color: COLORS.SECONDARY,
                textTransform: "uppercase",
                fontFamily: raleway.style,
                fontWeight: 600,
                letterSpacing: 1.2,
              }}
            >
              Hotels
            </Typography>
            <Typography
              sx={{
                fontFamily: nunito.style,
                fontSize: { lg: 40, md: 16 },
                fontWeight: 700,
              }}
            >
              Our Exquisite Hotels
            </Typography>
          </Box>
          <Button
            onClick={handleViewAll}
            sx={{
              fontSize: { lg: 14, md: 13 },
              fontFamily: raleway.style,
              fontWeight: 500,
              color: COLORS.BLACK,
            }}
            endIcon={<ArrowForwardIos sx={{ fontSize: { lg: 14, md: 13 } }} />}
          >
            View All
          </Button>
        </Stack>

        <Grid2 container spacing={4} mt={3}>
          {hotelsToShow.map((val, i) => (
            <Grid2 size={{ lg: 3, md: 6, sm: 6, xs: 12 }} key={i}>
              <HotelCard
                img={val.img}
                hotelName={val.hotelName}
                rooms={val.rooms}
                rating={val.rating}
                bathroom={val.bathroom}
                location={val.location}
                price={val.price}
                follower={val.follower}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
};

export default Hotel;
