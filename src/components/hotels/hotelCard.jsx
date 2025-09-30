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
  const hotelImage = useRandomHotel();

  const attractionsHTML = hotel?.Attractions?.[0] || "";

  // Extract first two attractions safely
  const getFirstTwoAttractions = (html) => {
    const splitByPTag = html.split("<p>")[1] || "";
    const listItems = splitByPTag.split("<br />").filter((item) => item.trim() !== "");
    return listItems.slice(0, 2).join("<br />");
  };

  const twoAttractionsHTML = getFirstTwoAttractions(attractionsHTML);

  // Safely get room info
  const firstRoom = hotel?.Rooms?.[0] || {};
  const totalFare = firstRoom?.TotalFare ?? 0;
  const totalFareDisplay = totalFare.toFixed ? totalFare.toFixed(2) : totalFare;

  return (
    <Card sx={{ mb: 3, border: "2px solid white", fontFamily: nunito.style }}>
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
              image={hotelImage}
              alt={hotel?.HotelName ?? "Hotel"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={6} sx={{ borderRight: { md: "1px solid gray" } }}>
          <CardContent sx={{ pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography component="h2" sx={{ fontWeight: "bold", mb: "5px" }} variant="h6">
                {hotel?.HotelName ?? "Hotel Name"}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {hotel?.Address ?? ""}, {hotel?.CityName ?? ""}, {hotel?.PinCode ?? ""}{" "}
              {hotel?.CountryCode ?? ""}
            </Typography>

            {/* Facility Icons */}
            <Stack direction="row" spacing={2} mt={2}>
              {hotel?.HotelFacilities?.includes("Free WiFi") && <Wifi fontSize="medium" sx={{ color: COLORS.PRIMARY }} />}
              {hotel?.HotelFacilities?.includes("Laundry facilities") && <Pool fontSize="medium" sx={{ color: COLORS.PRIMARY }} />}
              {hotel?.HotelFacilities?.includes("Terrace") && <Restaurant fontSize="medium" sx={{ color: COLORS.PRIMARY }} />}
              {hotel?.HotelFacilities?.includes("Free continental breakfast") && <LocalParking fontSize="medium" sx={{ color: COLORS.PRIMARY }} />}
            </Stack>

            {/* Attractions */}
            {hotel?.Attractions?.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: twoAttractionsHTML }} />
              </Box>
            )}
          </CardContent>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", justifyContent: "start", gap: 1 }}>
            <Stack direction="column" alignItems="flex-end" spacing={1}>
              <Typography component="subtitle2" variant="h5" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                {HOTEL_RATING_IN_WORDS[hotel?.HotelRating] ?? "N/A"}
              </Typography>

              <Rating name="read-only" value={HOTEL_RATING[hotel?.HotelRating] ?? 5} readOnly />

              <Typography variant="body1" sx={{ pt: 3 }}>
                Starting From
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "right" }}>
                ₹ {totalFareDisplay}
              </Typography>

              <Link href={`/hotel-list/${hotel?.HotelCode}/hotel-details`} style={{ textDecoration: "none" }}>
                <Button variant="contained" size="medium" sx={{ bgcolor: COLORS.PRIMARY }}>
                  Book Now
                </Button>
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelCard;
