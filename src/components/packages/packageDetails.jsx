import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Grid,
  Card,
  CardMedia,
  Paper,
} from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaceIcon from "@mui/icons-material/Place";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DomainIcon from "@mui/icons-material/Domain";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import PackageDialog from "./packageDialog";

const PackageDetail = ({ data }) => {
  const formattedDate = data?.monthYear
    ? new Date(data?.monthYear).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    : "N/A";

    console.log("Package Details Data: ",data);

  return (
    <Grid container spacing={4} sx={{ padding: { xs: 2, md: 4 } }}>
      {/* Left Section */}
      <Grid item xs={12} lg={8}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 1 }}>
          {/* Breadcrumb */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ mb: 2, fontFamily: roboto.style }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/packages">
              Packages
            </Link>
            <Typography color="text.primary" sx={{ fontFamily: roboto.style }}>
              {data?.package_name}
            </Typography>
          </Breadcrumbs>

          {/* Heading */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ fontFamily: roboto.style }}
            >
              {data?.package_name}
            </Typography>
            <Box textAlign="right">
              <Typography variant="subtitle1" sx={{ fontFamily: roboto.style }}>
                {data?.package_day}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontFamily: roboto.style }}
              >
                {data?.package_no_of_person} person
              </Typography>
            </Box>
          </Box>

 {/* image="https://media.easemytrip.com/media/Deal/DL638572420063544393/SightSeeing/SightSeeing49Q4Do.jpg" */}
          {/* Main Image */}
          <Card sx={{ mt: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image="https://media.easemytrip.com/media/Deal/DL638572420063544393/SightSeeing/SightSeeing49Q4Do.jpg"
              alt="Main Package"
              sx={{ objectFit: "cover" }}
            />
          </Card>

          {/* ⬅️ Location Info Box MOVED HERE */}
          <Paper
            elevation={1}
            sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}
          >
            <Box sx={{ fontFamily: roboto.style }}>
              <Typography variant="h6" gutterBottom>
                Location Details
              </Typography>

              {/* Destination */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  <strong>Destination:</strong>{" "}
                  {data?.package_destination || "N/A"}
                </Typography>
              </Box>

              {/* Nearby */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationCityIcon fontSize="small" />
                <Typography variant="body2">
                  <strong>Nearby:</strong> {data?.near_by_location || "N/A"}
                </Typography>
              </Box>

              {/* Address with Zip, City, Country inline */}
              <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
                <HomeIcon fontSize="small" />
                <Typography variant="body2">
                  <strong>Address:</strong> {data?.address1 || "N/A"},
                  {data?.state && ` ${data.state},`}
                  {data?.zip && ` ${data.zip},`}
                  {data?.city && ` ${data.city},`}
                  {data?.country || ""}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Overview */}
          <Typography
            variant="h6"
            sx={{ mt: 4, mb: 1, fontFamily: roboto.style }}
          >
            {data?.short_description}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: roboto.style }}>
            {data?.description}
          </Typography>

          {/* Gallery */}
          <Typography
            variant="h6"
            sx={{ mt: 5, mb: 2, fontFamily: roboto.style }}
          >
            Gallery
          </Typography>
          <Grid container spacing={2}>
            {[
              "/images/package/package-detail-1.jpg",
              "/images/package/package-detail-2.jpg",
              "/images/package/package-detail-3.jpg",
            ].map((img, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={`Gallery image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      {/* Right Section */}
      <Grid item xs={12} lg={4} display="flex" flexDirection="column" gap={3}>
        {/* Price Info */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 1 }}>
            {/* ⭐ Star Icons */}
              <Box display="flex" alignItems="center" sx={{my:2}}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    fontSize="small"
                  
                    sx={{
                      color: data?.rating >= star ? "#f4c430" : "#ccc",
                      fontSize:"28px"
                    }}
                  />
                ))}
              </Box>
          <Box sx={{ fontFamily: roboto.style }}>
            <Typography variant="h6">Price Info</Typography>
            <Typography sx={{ mt: 1 }}>
              <s style={{ color: "#999" }}>₹{data?.package_price}</s>{" "}
              <strong>₹{data?.selling_price}</strong> Per Person
            </Typography>
            {/* <Button variant="contained" fullWidth sx={{ mt: 2,bgcolor:COLORS.PRIMARY }}>
              Book Now
            </Button> */}
            <PackageDialog data={data} />
          </Box>
        </Paper>

        {/* Additional Info */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 1 }}>
          <Box sx={{ fontFamily: roboto.style }}>
            <Typography variant="h6" gutterBottom>
              Additional Info
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CategoryIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Package Type:</strong> {data?.package_type || "N/A"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <StarIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Highlight:</strong> {data?.highlight || "N/A"}
              </Typography>
            </Box>
           
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PackageDetail;
