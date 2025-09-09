"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid2,
  Divider,
} from "@mui/material";

import { CheckCircle } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { COLORS } from "@/utils/colors";
import background from "@/assests/payment_image/paymentBackground.png";
// import airplan from "@/assests/payment_image/airPlan.png";
import hotelImg from "@/assests/payment_image/Hotel.jpg";
import { nunito } from "@/utils/fonts";
import axios from "axios";
import { baseUrl } from "@/api/serverConstant";
import Loader from "@/utils/Loader";

// children
import FlightSuccess from "@/components/payment/FlightSuccess";
import HotelSuccess from "@/components/payment/HotelSuccess";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
`;

export default function PaymentSuccess() {
  const router = useRouter();
  const params = useSearchParams();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // read cached data if present (optional)
  useEffect(() => {
    const cached = sessionStorage.getItem("payment_info");
    if (cached) {
      try {
        setPaymentData(JSON.parse(cached));
        setLoading(false);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // fetch by ?razorpay_payment_id=
  useEffect(() => {
    const paymentID = params?.get("razorpay_payment_id");
    if (!paymentID) return;

    setLoading(true);
    axios
      .post(
        `${baseUrl}/webhook/api/webhook/paymentDetails?paymentId=${paymentID}`
      )
      .then((res) => {
        setPaymentData(res.data);
        sessionStorage.setItem("payment_info", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("Payment verification failed:", err);
      })
      .finally(() => setLoading(false));
  }, [params]);

  // const isHotel = useMemo(
  //   () => paymentData?.notes?.module === "hotel",
  //   [paymentData]
  // );
  const isHotel = paymentData?.notes?.module === "hotel";

  const handleContinue = () => router.replace("/");

  const headerImage = isHotel ? hotelImg : background;

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
        src={headerImage.src}
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
          <Loader open variant={isHotel ? "hotel" : "flight"} />
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
              {/* <Grid2
                xs={6}
                sx={{
                  visibility: {
                    lg: "visible",
                    md: "visible",
                    sm: "visible",
                    xs: "hidden",
                  },
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 2,
                }}
              >
                <Box
                  component="img"
                  // src={headerImage.src}
                  alt="Type"
                  sx={{ width: "35%" }}
                />
              </Grid2> */}
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

            {/* CONDITIONAL RENDER WITH DATA PROP */}
            {isHotel ? (
              <HotelSuccess data={paymentData} />
            ) : (
              <FlightSuccess data={paymentData} />
            )}

            {/* Continue */}
            <Box sx={{ mt: 2, animation: `${fadeInUp} 0.6s ease-in-out` }}>
              <Button
                variant="subtitle2"
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
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
