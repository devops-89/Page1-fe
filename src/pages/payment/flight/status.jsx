"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Grid2, // Unstable_Grid2 from MUI v5
  Alert,
  AlertTitle,
  Chip,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import {
  CheckCircle,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useSelector } from "react-redux";
import axios from "axios";

import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { baseUrl } from "@/api/serverConstant";
import Loader from "@/utils/Loader";
import { flightController } from "@/api/flightController";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

// Helpers
const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

// Section wrapper
const SectionCard = ({ title, children, sx }) => (
  <Card elevation={1} sx={{ borderRadius: 2, animation: `${scaleIn} .25s`, ...sx }}>
    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
      {title ? (
        <>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontFamily: nunito.style, mb: 1.5 }}
          >
            {title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </>
      ) : null}
      {children}
    </CardContent>
  </Card>
);

// -------- Booking Details (grid style) --------
function BookingDetailCard({ result }) {
  if (!result) return null;

  const lead =
    result?.Rooms?.[0]?.HotelPassenger?.find((p) => p?.LeadPassenger) ||
    result?.Rooms?.[0]?.HotelPassenger?.[0];

  return (
    <Stack spacing={2}>
      {/* Header row */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        gap={1.25}
        sx={{ mb: 0.5 }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontFamily: nunito.style }}
        >
          {result?.HotelName || "-"}
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {!!result?.HotelBookingStatus && (
            <Chip
              label={`Hotel: ${result.HotelBookingStatus}`}
              color="success"
              variant="outlined"
              size="small"
            />
          )}
          {!!result?.StarRating && (
            <Chip
              label={`${result.StarRating}-Star`}
              variant="outlined"
              size="small"
            />
          )}
        </Stack>
      </Stack>

      {/* Address */}
      <Typography
        variant="body2"
        sx={{
          fontFamily: nunito.style,
          color: "text.secondary",
          lineHeight: 1.6,
        }}
      >
        {[
          result?.AddressLine1,
          result?.AddressLine2,
          result?.City,
          result?.CountryCode,
        ]
          .filter(Boolean)
          .join(", ") || "-"}
      </Typography>

      {/* Grid details */}
      <Grid2
        container
        columnSpacing={{ xs: 2, sm: 4, md: 8, lg: 10 }}
        rowSpacing={{ xs: 1.75, sm: 2.5 }}
        sx={{
          mt: 0.75,
          fontFamily: nunito.style,
          "--labelColor": "rgba(0,0,0,0.54)",
        }}
      >
        {[
          ["Confirmation No.", result?.ConfirmationNo],
          ["Booking Ref No.", result?.BookingRefNo],
          ["Check-in", formatDate(result?.CheckInDate)],
          ["Check-out", formatDate(result?.CheckOutDate)],
          [
            "Guest",
            lead
              ? `${(lead?.Title || "").toString().toUpperCase()} ${
                  lead?.FirstName || ""
                } ${lead?.LastName || ""}`.trim()
              : "-",
          ],
          ["Invoice", result?.InvoiceNo],
        ].map(([label, value], i) => (
          <Grid2 key={i} xs={12} md={6}>
            <Box sx={{ pr: { md: 2 } }}>
              <Typography
                variant="caption"
                sx={{ color: "var(--labelColor)", display: "block", mb: 0.5 }}
              >
                {label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {value || "-"}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>

      {!!result?.Inclusion && (
        <Stack direction="row" gap={1} flexWrap="wrap" sx={{ pt: 0.5 }}>
          {result?.Inclusion?.split(",").map((s, i) => (
            <Chip key={i} label={s.trim()} size="small" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

// -------- Payment Details (same grid style) --------
const PaymentDetailsCard = ({ payment, payStatus }) => {
  if (!payment) return null;

  const notes = payment?.notes || {};
  const method =
    payment?.method || payment?.card?.type || payment?.upi?.vpa || "-";
  const paymentId = payment?.id || payment?.paymentId || "-";
  const orderId = notes?.order_id || payment?.order_id || "-";
  const email = payment?.email || payment?.contactEmail || notes?.email || "-";
  const phone = payment?.contact || payment?.phone || notes?.phone || "-";
  const amount =
    typeof payment?.amount === "number"
      ? (payment.amount / 100).toFixed(2)
      : payment?.amount || notes?.amount || "-";
  const currency =
    payment?.currency?.toUpperCase?.() || notes?.currency || "INR";
  const createdAt =
    payment?.created_at || payment?.createdAt || payment?.createdOn;

  return (
    <SectionCard title="Payment Details">
      {/* Payment response chip lives in Payment section */}
      <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Chip
          label={`Payment: ${(payStatus || "-").toString().toUpperCase()}`}
          variant={
            payStatus?.toString().toUpperCase() === "SUCCESS"
              ? "filled"
              : "outlined"
          }
          color={
            payStatus?.toString().toUpperCase() === "SUCCESS"
              ? "success"
              : "info"
          }
          size="small"
        />
      </Stack>

      <Grid2
        container
        columnSpacing={{ xs: 2, sm: 4, md: 8, lg: 10 }}
        rowSpacing={{ xs: 1.75, sm: 2.5 }}
        sx={{
          mt: 0.5,
          fontFamily: nunito.style,
          "--labelColor": "rgba(0,0,0,0.54)",
        }}
      >
        {[
          ["Payment ID", paymentId],
          ["Order ID", orderId],
          ["Amount", amount !== "-" ? `${currency} ${amount}` : "-"],
          ["Method", method?.toString().toUpperCase?.() || method || "-"],
          ["Payer Email", email],
          ["Payer Phone", phone],
          [
            "Paid At",
            createdAt ? formatDate(createdAt * 1000 || createdAt) : "-",
          ],
        ].map(([label, value], i) => (
          <Grid2 key={i} xs={12} md={6}>
            <Box sx={{ pr: { md: 2 } }}>
              <Typography
                variant="caption"
                sx={{ color: "var(--labelColor)", display: "block", mb: 0.5 }}
              >
                {label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {value || "-"}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </SectionCard>
  );
};

export default function PaymentStatus() {
  const router = useRouter();
  const params = useSearchParams();

  // Redux
  // const hotelSearchData = useSelector((state) => state?.HOTEL?.HotelSearchData);
  // const reduxIp = hotelSearchData?.userIp || "";
  const reduxIp=localStorage.getItem("ip");

  // State
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false); // kept for logic, no spinner usage
  const [bookingError, setBookingError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Cached payment first
  useEffect(() => {
    let mounted = true;
    const cached = sessionStorage.getItem("payment_info");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (mounted) {
          setPaymentData(parsed);
          setLoading(false);
        }
      } catch {}
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch webhook payment details
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

  // Fetch booking status using order_id + ip
  useEffect(() => {
    if (!paymentData?.notes) return;
    const orderId = paymentData?.notes?.order_id;
    const ip = reduxIp;
    if (!orderId) return;

    let mounted = true;
    (async () => {
      if (mounted) {
        setBookingLoading(true);
        setBookingError(null);
      }
      try {
        const res = await flightController.getBookingStatus({
          ip,
          order_id: orderId,
        });
        if (mounted) setBookingDetails(res?.data?.data || null);
      } catch (err) {
        console.error("Booking details fetch failed:", err);
        if (mounted)
          setBookingError(
            "Unable to fetch booking status. Please try again later."
          );
      } finally {
        if (mounted) setBookingLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [paymentData, reduxIp]);

  const handleContinue = () => router.replace("/dashboard");

  // Derived
  const bookingStatus = useMemo(
    () => (bookingDetails?.bookingStatus || "").toString().toUpperCase(),
    [bookingDetails]
  );
  const payStatus = (bookingDetails?.paymentStatus || "")
    .toString()
    .toUpperCase();
  const tboResult =
    bookingDetails?.bookingDetails?.GetBookingDetailResult || null;

  // Dynamic header content based on booking status
  const statusMeta = useMemo(() => {
    if (bookingStatus === "COMPLETED" && payStatus === "SUCCESS") {
      return {
        title: "Booking Successful!",
        subtitle:
          "Thank you for booking with Page1Travels. We’ve received your payment and your booking summary is below.",
        iconColor: COLORS.SUCCESS || "success.main",
      };
    }

    if (bookingStatus === "FAILED" && payStatus === "SUCCESS") {
      return {
        title: "Booking Failed",
        subtitle:
          "Your payment was successful, but the booking could not be confirmed. A refund will be processed within 3–4 working days.",
        iconColor: COLORS.ERROR || "error.main",
      };
    }

    if (bookingStatus === "FAILED" && payStatus !== "SUCCESS") {
      return {
        title: "Payment Failed",
        subtitle:
          "We couldn’t process your payment and the booking was not completed. Please retry after some time or use a different payment method.",
        iconColor: COLORS.ERROR || "error.main",
      };
    }
    return {
      title: "Booking Status",
      subtitle: "We’ll show booking details here when available.",
      iconColor: "text.secondary",
    };
  }, [bookingStatus, payStatus]);

  return (
    <Box>
      {/* Top banner */}
      <Grid2
        size={{ xs: "12" }}
        sx={{
          height: { xs: 200, sm: 220 },
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
            letterSpacing: 0.2,
          }}
        >
          Booking & Payment Summary
        </Typography>
      </Grid2>

      {loading ? (
        // -------- ONLY THIS LOADER REMAINS --------
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
          <Loader open variant="flight" />
        </Grid2>
      ) : (
        <Container
          maxWidth={false}
          sx={{
            width: { lg: "78%", md: "86%", sm: "94%", xs: "95%" },
            position: "relative",
            zIndex: 100,
            mt: 2,
            mb: 6,
          }}
        >
          {/* Dynamic header */}
          <Stack
            alignItems="center"
            spacing={1}
            sx={{ mb: 2, animation: `${fadeInUp} 0.35s ease` }}
          >
            {bookingStatus === "COMPLETED" && (
              <CheckCircle sx={{ fontSize: 44, color: statusMeta.iconColor }} />
            )}
            {bookingStatus === "FAILED" && (
              <ErrorIcon sx={{ fontSize: 44, color: statusMeta.iconColor }} />
            )}

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: nunito.style,
                textAlign: "center",
              }}
            >
              {statusMeta.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: nunito.style, opacity: 0.9 }}
            >
              {statusMeta.subtitle}
            </Typography>
          </Stack>

          <Stack spacing={3.5}>
            {/* -------- Booking Section (no separate loader here) -------- */}
            <SectionCard title="Booking Details">
              {bookingError ? (
                <Alert severity="warning" variant="outlined">
                  <AlertTitle>We couldn’t fetch booking details</AlertTitle>
                  {bookingError}
                </Alert>
              ) : bookingDetails ? (
                <Stack spacing={2}>
                  {/* Booking response chip */}
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    <Chip
                      label={`Booking: ${bookingStatus || "-"}`}
                      color={
                        bookingStatus === "COMPLETED"
                          ? "success"
                          : bookingStatus === "FAILED"
                          ? "error"
                          : "info"
                      }
                      size="small"
                      variant="filled"
                    />
                  </Stack>

                  {bookingStatus === "COMPLETED" && tboResult ? (
                    <BookingDetailCard result={tboResult} />
                  ) : bookingStatus === "FAILED" ? (
                    // --- NO SPINNER, JUST MESSAGES ---
                    payStatus !== "SUCCESS" ? (
                      <Alert
                        severity="error"
                        variant="filled"
                        sx={{ alignItems: "flex-start" }}
                      >
                        <AlertTitle>Payment Failed</AlertTitle>
                        We couldn’t process your payment and the booking was not
                        completed. Please retry after some time or use a
                        different payment method.
                        <Box sx={{ mt: 2 }}>
                          <Button
                            onClick={handleContinue}
                            variant="contained"
                            sx={{
                              borderRadius: 1.5,
                              px: 2.5,
                              py: 1.25,
                              color: COLORS.WHITE,
                              backgroundColor: COLORS.PRIMARY,
                              textTransform: "none",
                              fontWeight: 700,
                              "&:hover": {
                                backgroundColor:
                                  COLORS.SECONDARY || "#0056b3",
                              },
                            }}
                          >
                            Go to Homepage
                          </Button>
                        </Box>
                      </Alert>
                    ) : (
                      <Alert severity="error" variant="filled">
                        <AlertTitle>Booking Failed</AlertTitle>
                        Your payment was received but the booking could not be
                        confirmed. If an amount was debited, it will be refunded
                        as per payment gateway timelines. You can try booking
                        again or contact support with your order/payment ID.
                      </Alert>
                    )
                  ) : (
                    <Alert severity="info">
                      <AlertTitle>
                        {bookingLoading ? "Fetching booking status..." : "Status"}
                      </AlertTitle>
                      {bookingLoading
                        ? "We’re checking the latest booking details. This may take a moment."
                        : `Status: ${bookingStatus || "Unknown"}`}
                    </Alert>
                  )}
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                  Booking details not available.
                </Typography>
              )}
            </SectionCard>

            {/* -------- Payment Section (only payment response here) -------- */}
            <PaymentDetailsCard payment={paymentData} payStatus={payStatus} />
          </Stack>

          {/* CTA */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 1.5,
                px: 2.5,
                py: 1.25,
                color: COLORS.WHITE,
                backgroundColor: COLORS.PRIMARY,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { backgroundColor: COLORS.SECONDARY || "#0056b3" },
              }}
              onClick={handleContinue}
            >
              Continue to Dashboard For Checking All Bookings.
            </Button>
          </Box>
        </Container>
      )}
    </Box>
  );
}
