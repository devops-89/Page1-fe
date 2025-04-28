import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Container,
  Paper,
  Grid2,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { data } from "@/assests/data";
import UserVerifyForm from "@/components/hotels/UserVerifyForm";
import GuestForm from "@/components/hotels/GuestForm";
import moment from "moment";

const HotelPreBookPage = () => {
  // extracting the logic status to login and giving access
  const isAuthenticated = useSelector(
    (state) => state.USER.UserData.isAuthenticated
  );

  // extractimg the hotel data to render
  const hotel = data?.hotelPreBook?.HotelResult?.[0];
  const room = hotel?.Rooms?.[0];

  return (
    <Grid2 container>
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
          Complete Your Booking
        </Typography>
      </Grid2>
      <Container>
        <Grid2 container sx={{ my: 4 }} spacing={2}>
          {/* Left container */}
          <Grid2
            size={{ xs: 12, md: 12, lg: 8 }}
            sx={{ bgcolor: COLORS.WHITE }}
          >
            <Box>
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{ xs: 12, md: 12, lg: 9 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", fontFamily:nunito.style }}
                        gutterBottom
                      >
                        Radisson Blu Hotel New Delhi Dwarka
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        {Array.from([0, 1, 2, 3, 4]).map((_, index) => (
                          <StarIcon
                            key={index}
                            sx={{ color: COLORS.PRIMARY }}
                          />
                        ))}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom sx={{fontFamily:nunito.style}}>
                        Plot No 4, Sector 13, Next To Metro Station, Dwarka City
                        Centre, Near Airport, Delhi, India
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 12, lg: 3 }}>
                      <img
                        src="https://r1imghtlak.mmtcdn.com/de2824ba6a0211e8ab4a022fd3fb960a.jpg"
                        alt="hotel_image"
                        width={150}
                        height={130}
                        style={{borderRadius:"8px"}}
                      />
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>

              {/* this section is used to show the check in and checkout information */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Grid2 container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 3 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography sx={{fontWeight:800, fontFamily:nunito.style}}>CHECK IN</Typography>
                      <Typography sx={{fontWeight:600, fontFamily:nunito.style}}>23 Apr 2025</Typography>
                      <Typography sx={{fontWeight:600, fontFamily:nunito.style}}>11 AM</Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 2 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        sx={{
                          border: `2px solid ${COLORS.PRIMARY}`,
                          textAlign: "center",
                          borderRadius: 5,
                          backgroundColor:COLORS.PRIMARY,
                          fontWeight:600,
                          fontFamily:nunito.style
                        }}
                      >
                        DAY USE
                      </Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 3 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography sx={{fontWeight:800, fontFamily:nunito.style}}>CHECK OUT</Typography>
                      <Typography sx={{fontWeight:600, fontFamily:nunito.style}}>23 Apr 2025</Typography>
                      <Typography sx={{fontWeight:600, fontFamily:nunito.style}}>5 PM</Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 4 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography sx={{fontWeight:700, fontFamily:nunito.style}}>1 Night | 2 Adults | 1 Room</Typography>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>

              {/* this section is for adding guest information to proceed for booking */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                {!isAuthenticated ? (
                  <Card sx={{ mb: "20px", p: "20px", mx: "auto" }}>
                    <UserVerifyForm />
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      <GuestForm />
                    </CardContent>
                  </Card>
                )}
              </Card>

              {/* this section is used to show the additional information to be shown for the hotels */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "700", fontFamily:nunito.style }}>
                    Cancellation Policy
                  </Typography>
                  {room?.CancelPolicies.map((policy, idx) => (
                    <Box key={idx} mt={1}>
                      <Typography sx={{fontFamily:nunito.style, fontWeight:500}}>
                        From: <strong>{moment(policy.FromDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MMM-YYYY')}</strong> -{" "}
                        <strong>{policy.CancellationCharge}%</strong> charge (
                        {policy.ChargeType})
                      </Typography>
                    </Box>
                  ))}
                  <Typography mt={2} sx={{fontFamily:nunito.style, fontWeight:500}}>
                    Last Cancellation Deadline:{" "}
                    <strong>{moment(room?.LastCancellationDeadline, 'DD-MM-YYYY HH:mm:ss').format('DD-MMM-YYYY')}</strong>
                  </Typography>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily:nunito.style }}>
                    Rate Conditions
                  </Typography>
                  <List>
                    {hotel?.RateConditions.map((cond, idx) => (
                      <ListItem key={idx}>
                        <Typography sx={{fontFamily:nunito.style, fontWeight:600}}
                          dangerouslySetInnerHTML={{ __html: cond }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid2>

          {/* Right container (updated) */}
          <Grid2 size={{ xs: 12, md: 12, lg: 4 }}>
            <Card
              variant="outlined"
              sx={{ boxShadow: 1, p: 1, borderRadius: 0 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{fontFamily:nunito.style, fontWeight:800}}>
                  Price Breakup
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Typography sx={{fontFamily:nunito.style, fontWeight:700}}>
                        <span>1 Room</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{fontFamily:nunito.style, fontWeight:700}}>
                        Base Price
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Typography sx={{fontFamily:nunito.style, fontWeight:700}}>₹ 5,644</Typography>
                    </Grid2>
                  </Grid2>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Box display="flex" alignItems="center">
                        <Typography sx={{fontFamily:nunito.style, fontWeight:700}}  mr={1}>
                          Hotel Taxes
                        </Typography>
                      </Box>
                    </Grid2>
                    <Grid2 item>
                      <Typography sx={{fontFamily:nunito.style, fontWeight:700}}>₹ 677</Typography>
                    </Grid2>
                  </Grid2>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ pt: 1 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Typography variant="subtitle1" sx={{fontFamily:nunito.style, fontWeight:800}}>
                        Total Amount to be paid
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Typography variant="h6" sx={{fontFamily:nunito.style, fontWeight:800}}>
                        ₹ 6,321
                      </Typography>
                    </Grid2>
                  </Grid2>

                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      width: "100%",
                      height: "30px",
                      my: 2,
                      py: 2,
                      bgcolor: COLORS.PRIMARY,
                      fontFamily:nunito.style,
                      fontWeight:800
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Grid2>
  );
};

export default HotelPreBookPage;
