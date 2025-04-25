import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack,
  Grid,
  Rating,
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import { Wifi, Pool, Restaurant, LocalParking } from "@mui/icons-material";
import { nunito } from "@/utils/fonts";
import Link from "next/link";
import useRandomHotel from "@/custom-hook/useRandomHotel";
import { HOTEL_RATING, HOTEL_RATING_IN_WORDS } from "@/utils/enum";

const HotelCard = ({ hotel }) => {
  return (
    <Card
      sx={{
        mb: 3,
        border: "2px solid white",
        // "&:hover": { borderColor: COLORS.PRIMARY },
        fontFamily: nunito.style,
      }}
    >
      <Grid container>
        {/* Image Section */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: { xs: 250, md: "100%" },
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={useRandomHotel()}
              alt={hotel?.HotelName}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ borderRight: { md: "1px solid gray" } }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="h2"
                sx={{ fontWeight: "bold", fontFamily: nunito.style, mb: "5px" }}
                variant="h6"
              >
                {hotel?.HotelName}
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ fontFamily: nunito.style, fontWeight: 500 }}
            >
              {hotel?.Address}, {hotel?.CityName}, {hotel?.PinCode},{" "}
              {hotel?.CountryCode}
            </Typography>

            {/* Facility Icons */}
            <Stack direction="row" spacing={2} mt={2}>
              {hotel?.HotelFacilities?.includes("Free WiFi") && (
                <Wifi fontSize="medium" sx={{ color: COLORS.PRIMARY }} />
              )}
              {hotel?.HotelFacilities?.includes("Laundry facilities") && (
                <Pool fontSize="medium" sx={{ color: COLORS.PRIMARY }} />
              )}
              {hotel?.HotelFacilities?.includes("Terrace") && (
                <Restaurant fontSize="medium" sx={{ color: COLORS.PRIMARY }} />
              )}
              {hotel?.HotelFacilities?.includes(
                "Free continental breakfast"
              ) && (
                <LocalParking
                  fontSize="medium"
                  sx={{ color: COLORS.PRIMARY }}
                />
              )}
            </Stack>

            {/* Attractions with clipping */}
            {hotel?.Attractions && hotel.Attractions.length > 0 && (
              <Box mt={2}>
                {/* <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    maxHeight: '60px',
                    overflow: 'hidden',
                    position: 'relative',
                    lineHeight: '1.4',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1.2em',
                      background: 'linear-gradient(to bottom, transparent, #fff)',
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: hotel?.Attractions[0] }}
                /> */}

                <Typography
                  variant="body2"
                  sx={{ fontFamily: nunito.style }}
                  dangerouslySetInnerHTML={{ __html: hotel?.Attractions[0] }}
                />
              </Box>
            )}
          </CardContent>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: 1,
            }}
          >
            <Box mt={1}>
              <Stack direction="column" alignItems="flex-end" spacing={1}>
                <Box>
                  <Typography
                    component="subtitle2"
                    variant="h5"
                    sx={{
                      color: "#1a237e",
                      fontWeight: "bold",
                      fontFamily: nunito.style,
                    }}
                  >
                    {HOTEL_RATING_IN_WORDS[hotel?.HotelRating]}{" "}
                  </Typography>
                </Box>
                <Rating
                  name="read-only"
                  value={HOTEL_RATING[hotel?.HotelRating] || 5}
                  readOnly
                  fontSize={{ lg: "30px", md: "24px", xs: "10px" }}
                />

                <Typography
                  variant="h5"
                  sx={{ fontFamily: nunito.style, fontWeight: 700, pt:3 }}
                >
                  ₹ {hotel?.Rooms[0]?.TotalFare}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: nunito.style, fontWeight: 500, color:COLORS.DARKGREY }}
                >
                 Tax - ₹ {hotel?.Rooms[0]?.TotalTax}
                </Typography>
                <Link
                  href={`/hotel-list/${hotel?.HotelCode}/hotel-details`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ bgcolor: COLORS.PRIMARY }}
                  >
                    Book Now
                  </Button>
                </Link>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelCard;
