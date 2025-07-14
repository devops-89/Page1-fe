import React from 'react';
import {
  Box, Typography, Breadcrumbs, Link, Button, Grid, Card, CardMedia, CardContent, Divider
} from '@mui/material';

const PackageDetail = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/packages">
          Packages
        </Link>
        <Typography color="text.primary">Bali Bliss</Typography>
      </Breadcrumbs>

      {/* Package Heading */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>Bali Bliss</Typography>
        <Box>
          <Typography variant="subtitle1">4 Nights / 5 Days</Typography>
          <Typography variant="caption" color="text.secondary">Land Only</Typography>
        </Box>
      </Box>

      {/* Image Slider (static for now) */}
      <Card sx={{ mt: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image="https://media.easemytrip.com/media/Deal/DL638572420063544393/SightSeeing/SightSeeing49Q4Do.jpg"
          alt="Bali Package"
        />
      </Card>

      {/* Navigation Buttons */}
      <Box display="flex" gap={2} sx={{ mt: 2 }}>
        {['Overview', 'Itinerary', 'Inclusions', 'Additional Info'].map((label) => (
          <Button key={label} variant="outlined" href={`#${label.toLowerCase().replace(/\s/g, '')}`}>
            {label}
          </Button>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Package Overview */}
      <Typography id="overview" variant="h6" gutterBottom>
        Package Overview
      </Typography>
      <Typography variant="body1">
        Discover the beauty and adventure of Bali with a scenic visit to Mount Batur and the cultural charm of Ubud on a full-day private tour...
      </Typography>

      {/* Hotel Info */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Hotel Details
      </Typography>
      <Card sx={{ display: 'flex', mt: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 160 }}
          image="https://img.easemytrip.com/EMTHOTEL-2767852/70/23/na/l/39740702_19.jpg"
          alt="Kutabex Hotel"
        />
        <CardContent>
          <Typography variant="subtitle1">KUTABEX BEACH FRONT HOTEL or similar</Typography>
          <Typography variant="body2">JALAN PANTAI KUTA</Typography>
        </CardContent>
      </Card>

      {/* Price Info */}
      <Box sx={{ mt: 4, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        <Typography variant="h6">Price Info</Typography>
        <Typography>
          <s style={{ color: '#999' }}>₹14,999</s> <strong>₹10,999</strong> Per Person
        </Typography>
        <Typography variant="body2">No Cost EMI Starts from ₹2,590</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default PackageDetail;
