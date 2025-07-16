import React from 'react';
import {
  Box, Typography, Grid, Paper, Card, CardContent, CardMedia,
  TextField, Button, Select, MenuItem, InputLabel, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel,
  Container
} from '@mui/material';
import InnerBanner from '@/components/innerBanner';
import packageBanner from '@/tours/banner-tour.png';
import { roboto } from '@/utils/fonts';
import { COLORS } from '@/utils/colors';

export default function PackagePrebook() {
  return (
    <Box>
      <InnerBanner img={packageBanner.src} heading="Package Prebook" />

      <Container>
        <Box py={4}>
          <Typography variant="h5" gutterBottom sx={{fontFamily:roboto.style}}>
            1. Review and Travellers
          </Typography>

          <Grid container spacing={3}>
            {/* Left Section */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://media.easemytrip.com/media/Deal/DL638872345516425709/SightSeeing/SightSeeingB7jjkH.png"
                  alt="Bali Family Fiesta"
                />
                <CardContent>
                  <Typography variant="h6">Bali Family Fiesta</Typography>
                  <Typography color="text.secondary">7 Nights/8 Days</Typography>
                  <Typography>No. of Persons: 3</Typography>
                  <Typography>Start Date: 14 Jul 2025</Typography>
                  <Typography>End Date: 21 Jul 2025</Typography>

                  <Typography variant="subtitle1" mt={2}>Inclusions:</Typography>
                  <ul>
                    <li>4 Nights at Anvaya Beach Resort</li>
                    <li>3 Nights at La Mira Villa</li>
                    <li>Daily Breakfast</li>
                    <li>Full Day Safari & ATV</li>
                    <li>Half Day Waterbom Park</li>
                    <li>Private Transfers</li>
                  </ul>

                  <Typography variant="subtitle1">Exclusions:</Typography>
                  <ul>
                    <li>International Airfare</li>
                    <li>Visa charges</li>
                    <li>Insurance</li>
                    <li>GST & TCS</li>
                  </ul>
                </CardContent>
              </Card>

              <Box mt={3}>
                <Typography variant="h6">Travellers Details</Typography>
                {[1, 2, 3].map((id) => (
                  <Box key={id} mb={2} component={Paper} p={2}>
                    <Typography variant="subtitle1">
                      Traveller {id} {id < 3 ? '(Adult)' : '(Child)'}
                    </Typography>
                    <FormControl component="fieldset" margin="normal">
                      <FormLabel component="legend">Title</FormLabel>
                      <RadioGroup row name={`title${id}`}>
                        {['Mr', 'Mrs', 'Miss', 'Master'].map((title) => (
                          <FormControlLabel value={title} control={<Radio />} label={title} key={title} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="First Name" /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name" /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="DOB" InputLabelProps={{ shrink: true }} /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Passport Number" /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Passport Expiry" InputLabelProps={{ shrink: true }} /></Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Meal</InputLabel>
                          <Select defaultValue="">
                            <MenuItem value="jain">Jain</MenuItem>
                            <MenuItem value="veg">Veg</MenuItem>
                            <MenuItem value="nonveg">Non-Veg</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>

              <Box mt={3}>
                <Typography variant="h6">Special Request</Typography>
                <TextField fullWidth placeholder="Enter your special request here" />
              </Box>

              <Box mt={3}>
                <Typography variant="h6">Contact Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Email Address" /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Phone Number" InputProps={{ startAdornment: '+91 ' }} /></Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Right Sticky Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6">Price Details</Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Adult x 2, Child x 1</Typography>
                    <Typography>₹1,87,476</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Tax</Typography>
                    <Typography>₹9,374</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>TCS</Typography>
                    <Typography>₹9,843</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="subtitle1">Grand Total</Typography>
                    <Typography variant="subtitle1">₹2,06,693</Typography>
                  </Box>
                </Paper>

               <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
  <Typography variant="h6" sx={{ color: COLORS.PRIMARY, fontWeight: 600, mb: 1 }}>
    Pay Now
  </Typography>

  <FormControlLabel
    control={<Radio defaultChecked sx={{ color: COLORS.PRIMARY }} />}
    label={
      <Box display="flex" alignItems="center">
        <Typography fontWeight={600}>₹2,06,693</Typography>
      </Box>
    }
  />

  <Button
    variant="contained"
    fullWidth
    sx={{
      mt: 2,
      backgroundColor: COLORS.PRIMARY,
      color: '#fff',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: COLORS.PRIMARY,
        opacity: 0.9,
      },
    }}
  >
    Continue Booking
  </Button>
</Paper>

              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
