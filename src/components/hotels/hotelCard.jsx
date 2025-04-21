import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack,
  Grid
} from '@mui/material';
import { COLORS } from "@/utils/colors";
import { Wifi, Pool, Restaurant, LocalParking } from '@mui/icons-material';
import { nunito } from '@/utils/fonts';
import Link from 'next/link';

const HotelCard = ({ hotel }) => {


  return (
    <Card
      sx={{
        mb: 3,
        border: "1px solid white",
        "&:hover": { borderColor: COLORS.PRIMARY },
        fontFamily: nunito.style
      }}
    >
      <Grid container>
        {/* Image Section */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: { xs: 250, md: '100%' },
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image="https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg"
              alt={hotel?.HotelName}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={6} sx={{ borderRight: { md: "1px solid gray" } }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography component="h2" sx={{ fontWeight: "bold" }} variant="h6">
                {hotel?.HotelName}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {hotel?.CityName}, {hotel?.PinCode}, {hotel?.CountryCode}
            </Typography>

            {/* Facility Icons */}
            <Stack direction="row" spacing={2} mt={2}>
              {hotel?.HotelFacilities?.includes('Free WiFi') && <Wifi fontSize="small" />}
              {hotel?.HotelFacilities?.includes('Laundry facilities') && <Pool fontSize="small" />}
              {hotel?.HotelFacilities?.includes('Terrace') && <Restaurant fontSize="small" />}
              {hotel?.HotelFacilities?.includes('Free continental breakfast') && <LocalParking fontSize="small" />}
            </Stack>

            {/* Attractions with clipping */}
            {hotel?.Attractions && hotel.Attractions.length > 0 && (
              <Box mt={2}>
               
                <Box
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              gap: 1,
              height: '100%'
            }}
          >
            <Box mt={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" sx={{ color: '#1a237e', fontSize: "20px", fontWeight: 'bold' }}>
                  Very Good
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    px: 1,
                    py: 0.3,
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  4.2
                </Box>
              </Stack>
              <Typography variant="caption" color="text.secondary" mt={1}>
                Based on <strong>1241</strong> Ratings and <strong>788</strong> Reviews
              </Typography>
            </Box>

            <Typography variant="h6" mt={2}>
              ₹{hotel?.Rooms[0]?.TotalFare} {hotel?.Currency}
            </Typography>
            <Link href={`/hotel-list/${hotel?.HotelCode}/hotel-details`} style={{ textDecoration: "none" }}><Button variant="contained" size="small" sx={{ bgcolor: COLORS.PRIMARY }}>
              Book Now
            </Button></Link>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelCard;
