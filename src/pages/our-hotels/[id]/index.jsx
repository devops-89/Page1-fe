import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

export default function OurHotelDetails() {
  const router = useRouter();
  const { id } = router.query;

  const hotels = useSelector(
    (state) => state.Hoteler.HotelerHotelList.hotelList
  );

  // redirect if no hotels in Redux
  useEffect(() => {
    if (!hotels?.length && id) {
      router.push("/our-hotels");
    }
  }, [hotels, id, router]);

  if (!id) return null;

  const hotel = hotels?.find((h) => String(h.id) === String(id));

  if (!hotel) {
    return <Typography>No hotel found</Typography>;
  }

  return (
    <Box sx={{ p: 4, bgcolor: "#f7f7f7", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Hotel Booking Details
      </Typography>

      <Grid container spacing={3}>
        {/* LEFT SIDE - HOTEL INFO */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {hotel.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <StarIcon sx={{ color: "#f5c518" }} />
                  <StarIcon sx={{ color: "#f5c518" }} />
                  <StarIcon sx={{ color: "#f5c518" }} />
                  <StarIcon sx={{ color: "#f5c518" }} />
                  <StarIcon sx={{ color: "#ccc" }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "gray" }}
                  >
                    {hotel.rating.label}
                  </Typography>
                </Stack>
              </Stack>

              {/* Hotel Image */}
              <Box
                component="img"
                src={hotel.images.main}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  mt: 2,
                  height: 280,
                  objectFit: "cover",
                }}
              />

              {/* Address */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <LocationOnIcon sx={{ color: "red" }} />
                <Typography variant="body2" color="text.secondary">
                  {hotel.location.city}, {hotel.location.distanceInfo}
                </Typography>
              </Stack>

              {/* Description */}
              <Typography variant="body1" sx={{ mt: 2 }}>
                {hotel.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT SIDE - ROOM INFO */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              p: 2,
              boxShadow: 3,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Premium Suite Sea View with Terrace - King Bed
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Fits 2 Adults
            </Typography>

            {/* Benefits */}
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                <Typography variant="body2">
                  20% off on session of Spa
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                <Typography variant="body2">
                  20% off on food & beverages at F&B outlets
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                <Typography variant="body2">
                  20% off on Salon services
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Conditions */}
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CloseIcon sx={{ color: "red", fontSize: 18 }} />
                <Typography variant="body2" color="red">
                  Non-Refundable
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                <Typography variant="body2">Breakfast included</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Price */}
            <Typography
              variant="body2"
              sx={{ color: "blue", fontWeight: "bold", mb: 1 }}
            >
              Special Offer: Daily Breakfast with Savings
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black", mb: 2 }}
            >
              ₹{hotel.price.discounted}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
