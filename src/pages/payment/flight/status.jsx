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
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { COLORS } from "@/utils/colors";
import background from "@/assests/payment_image/paymentBackground.png";
import { nunito } from "@/utils/fonts";
import axios from "axios";
import { baseUrl } from "@/api/serverConstant";
import Loader from "@/utils/Loader";
import FlightSuccess from "@/components/payment/FlightSuccess";

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

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Step 1: fetch payment details first
  useEffect(() => {
    const paymentID = params?.get("razorpay_payment_id");
    if (!paymentID) return;

    setLoading(true);
    axios
      .post(`${baseUrl}/webhook/api/webhook/paymentDetails?paymentId=${paymentID}`)
      .then(async (res) => {
        const payData = res.data;
        setPaymentData(payData);

        // Step 2: call booking details API if payment is SUCCESS
        if (payData?.paymentStatus === "SUCCESS") {
          try {
            const bookingRes = await axios.post(
              `${baseUrl}/flight/api/flight/getBookingDetails`,
              {
                ip: payData.ip, // depends on what you store
                order_id: payData.order_id,
              }
            );
            setPaymentData({
              ...payData,
              ...bookingRes.data.data, // merge booking details
            });
          } catch (err) {
            console.error("Booking details fetch failed:", err);
          }
        }
      })
      .catch((err) => {
        console.error("Payment verification failed:", err);
      })
      .finally(() => setLoading(false));
  }, [params]);

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
        src={background.src}
        alt="Background"
        sx={{
          width: "100vw",
          height: { lg: "35vh", xs: "56%" },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
          }}
        >
          <Loader open variant="flight" />
        </Box>
      ) : (
        <Container
          sx={{
            width: { lg: "60%", md: "50%", xs: "100%" },
            textAlign: "center",
            position: "relative",
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
            <Box
              sx={{
                backgroundColor: COLORS.PRIMARY,
                p: 2,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: COLORS.WHITE,
                  fontFamily: nunito.style,
                }}
              >
                Flight Payment Status
              </Typography>
            </Box>

            {/* success/fail icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                mb: 1,
                animation: `${scaleIn} 0.5s ease-in-out`,
              }}
            >
              {paymentData?.paymentStatus === "SUCCESS" ? (
                <CheckCircle sx={{ fontSize: 50, color: "green" }} />
              ) : (
                <Cancel sx={{ fontSize: 50, color: "red" }} />
              )}
            </Box>

            {/* status text */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, fontFamily: nunito.style }}
            >
              {paymentData?.paymentStatus === "SUCCESS"
                ? "Payment Successful!"
                : "Payment Failed"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* booking + refund conditions */}
            {paymentData?.paymentStatus === "SUCCESS" &&
            paymentData?.bookingStatus === "COMPLETED" ? (
              <FlightSuccess data={paymentData} />
            ) : paymentData?.paymentStatus === "SUCCESS" &&
              paymentData?.bookingStatus !== "COMPLETED" ? (
              <Typography variant="body1" sx={{ fontFamily: nunito.style }}>
                Your payment was successful, but the booking failed.
                <br />
                Refund has been initiated. It will be reflected in your account
                within 2–3 working days.
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ fontFamily: nunito.style }}>
                Unfortunately, your payment could not be processed. Please try
                again.
              </Typography>
            )}

            {/* Continue button */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 1,
                  px: 3,
                  py: 1,
                  color: COLORS.WHITE,
                  backgroundColor: COLORS.PRIMARY,
                  "&:hover": { backgroundColor: COLORS.SECONDARY },
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
