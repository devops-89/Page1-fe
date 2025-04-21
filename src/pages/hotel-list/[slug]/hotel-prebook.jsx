import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Grid2,
  Chip,
  Stack
} from '@mui/material';
import {COLORS} from "@/utils/colors";
import { nunito } from '@/utils/fonts';

import {data} from "@/assests/data";

const HotelPreBookPage = () => {
  const hotel = data.hotelPreBook.HotelResult[0];
  const room = hotel?.Rooms[0];

  return (
    <Grid2 container sx={{mx:"auto"}} style={{border:"2px solid black"}}>
         <Grid2
                size={{ xs: "12" }}
                sx={{
                  height: "230px",
                  background: "rgba(8,8,79,1)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: "10px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: COLORS.WHITE,
                    fontFamily: nunito.style,
                    fontWeight: 700,
                  }}
                >
                  Hotel Booking Details
                </Typography>
              </Grid2>
   
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Hotel Pre-Booking Summary
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{room?.Name[0]}</Typography>
          <Typography color="text.secondary">{room?.Inclusion}</Typography>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {room?.Amenities?.slice(0, 10).map((amenity, idx) => (
              <Chip key={idx} label={amenity} size="small" />
            ))}
          </Stack>
          <Typography mt={2}>
            Meal Plan: <strong>{room?.MealType}</strong>
          </Typography>
          <Typography>
            Refundable: <strong>{room?.IsRefundable ? 'Yes' : 'No'}</strong>
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Fare Details</Typography>
          <List>
            <ListItem>Base Price: ₹{room?.DayRates[0][0].BasePrice.toFixed(2)}</ListItem>
            <ListItem>Total Fare: ₹{room?.TotalFare.toFixed(2)}</ListItem>
            <ListItem>Tax: ₹{room?.TotalTax.toFixed(2)}</ListItem>
            <ListItem>Net Amount: ₹{room?.NetAmount.toFixed(2)}</ListItem>
          </List>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Cancellation Policy</Typography>
          {room?.CancelPolicies.map((policy, idx) => (
            <Box key={idx} mt={1}>
              <Typography>
                From: <strong>{policy.FromDate}</strong> -{' '}
                <strong>{policy.CancellationCharge}%</strong> charge ({policy.ChargeType})
              </Typography>
            </Box>
          ))}
          <Typography mt={2}>
            Last Cancellation Deadline:{' '}
            <strong>{room?.LastCancellationDeadline}</strong>
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Rate Conditions</Typography>
          <List>
            {hotel?.RateConditions.map((cond, idx) => (
              <ListItem key={idx}>
                <div dangerouslySetInnerHTML={{ __html: cond }} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
    </Grid2>
  );
};

export default HotelPreBookPage;
