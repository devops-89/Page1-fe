"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  Grid2,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useSelector } from "react-redux";
import axios from "axios";

import { hotelController } from "@/api/hotelController";
import { COLORS } from "@/utils/colors";
import hotelImg from "@/assests/payment_image/Hotel.jpg";
import { nunito } from "@/utils/fonts";
import { baseUrl } from "@/api/serverConstant";
import Loader from "@/utils/Loader";
import HotelSuccess from "@/components/payment/HotelSuccess";

// Animations (define once)
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
`;

export default function PaymentStatus() {
  const router = useRouter();
  const params = useSearchParams();

  // Redux: get IP saved during hotel search
  const hotelSearchData = useSelector((state) => state?.HOTEL?.HotelSearchData);
  const reduxIp = hotelSearchData?.userIp || "";

  // Payment info (from webhook paymentDetails)
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking details API state
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Try cached payment_info first (with mounted guard)
  useEffect(() => {
    let mounted = true;
    (async () => {
      const cached = sessionStorage.getItem("payment_info");
      if (!cached) return;
      try {
        const parsed = JSON.parse(cached);
        if (mounted) {
          setPaymentData(parsed);
          setLoading(false);
        }
      } catch {
        // ignore bad cache
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch payment details by ?razorpay_payment_id= (with mounted guard)
  useEffect(() => {
    const paymentID = params?.get("razorpay_payment_id");
    if (!paymentID) return;

    let mounted = true;
    (async () => {
      if (mounted) setLoading(true);
      try {
        const res = await axios.post(
          `${baseUrl}/webhook/api/webhook/paymentDetails?paymentId=${paymentID}`
        );
        if (mounted) {
          setPaymentData(res.data);
          sessionStorage.setItem("payment_info", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params]);

  // After paymentData is available, call booking details API using orderId + ip (with mounted guard)
  useEffect(() => {
    if (!paymentData?.notes) return;

    const orderId = paymentData?.notes?.order_id; // strictly order_id
    const ip = reduxIp; // Redux IP only

    if (!orderId) return; // cannot fetch without order id

    let mounted = true;
    (async () => {
      if (mounted) {
        setBookingLoading(true);
        setBookingError(null);
      }
      try {
        const res = await hotelController.getBookingStatus({
          ip,
          order_id: orderId,
        });
        console.log("mwmdkm", res.data.data);
        if (mounted) setBookingDetails(res?.data?.data || null);
      } catch (err) {
        console.error("Booking details fetch failed:", err);
        if (mounted) {
          setBookingError(
            "Unable to fetch booking status. Please try again later."
          );
        }
      } finally {
        if (mounted) setBookingLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [paymentData, reduxIp]);

  const handleContinue = () => router.replace("/");

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        component="img"
        src={hotelImg.src}
        alt="Background"
        sx={{
          width: "100vw",
          height: {
            lg: "35vh",
            md: "35%",
            xs: "56%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
        }}
      />

      {loading ? (
        <Grid2
          xs={12}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
          }}
        >
          <Loader open variant="hotel" />
        </Grid2>
      ) : (
        <Container
          sx={{
            width: { lg: "60%", md: "50%", sm: "100%", xs: "100%" },
            textAlign: "center",
            position: "relative",
            zIndex: 100,
            top: { lg: -56, xs: -20 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              pt: 0,
              pb: 4,
              borderRadius: "10px",
              animation: `${fadeInUp} 0.5s ease-in-out`,
            }}
          >
            {/* Header */}
            <Grid2
              container
              sx={{
                backgroundColor: COLORS.PRIMARY,
                pl: 2,
                pt: 1,
                pb: 1,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid2 xs={6}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: COLORS.WHITE,
                    fontFamily: nunito.style,
                    textAlign: "center",
                  }}
                >
                  Payment Details
                </Typography>
              </Grid2>
            </Grid2>

            {/* success icon + title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                mt: 2,
                animation: `${scaleIn} 0.5s ease-in-out`,
              }}
            >
              <CheckCircle
                sx={{ fontSize: 45, color: COLORS.SUCCESS || "green" }}
              />
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, mb: 1, fontFamily: nunito.style }}
            >
              Payment Successful!
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontFamily: nunito.style }}
            >
              Thank you for your payment. Your transaction has been processed
              successfully.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* HOTEL DETAILS */}
            <HotelSuccess data={paymentData} />

            {/* Booking status */}
            <Box sx={{ mt: 3, textAlign: "left", px: { xs: 2, sm: 4 } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontFamily: nunito.style, mb: 1 }}
              >
                Booking Status
              </Typography>

              {bookingLoading ? (
                <Loader open variant="hotel" />
              ) : bookingError ? (
                <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                  {bookingError}
                </Typography>
              ) : bookingDetails ? (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "200px 1fr" },
                    rowGap: 1,
                    columnGap: 2,
                    alignItems: "center",
                    fontFamily: nunito.style,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Booking Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {bookingDetails.bookingStatus || "-"}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Payment Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {bookingDetails.paymentStatus || "-"}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                  Booking details not available.
                </Typography>
              )}
            </Box>

            {/* Continue */}
            <Box sx={{ mt: 3, animation: `${fadeInUp} 0.6s ease-in-out` }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 1,
                  px: 1.5,
                  py: 1,
                  color: COLORS.WHITE,
                  backgroundColor: COLORS.PRIMARY,
                  "&:hover": { backgroundColor: COLORS.SECONDARY || "#0056b3" },
                }}
                onClick={handleContinue}
              >
                Continue to Homepage
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </Box>
  );
}
