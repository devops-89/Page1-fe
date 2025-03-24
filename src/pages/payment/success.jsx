import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import { COLORS } from "@/utils/colors";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export default function PaymentSuccess() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/");
  };

  return (
    <Container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        
        {/* Payment Message */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            animation: `${fadeInUp} 0.5s ease-in-out`,
          }}
        >
          {/* Success Icon Inside Paper */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              animation: `${scaleIn} 0.5s ease-in-out`,
            }}
          >
            <CheckCircle sx={{ fontSize: 80, color: COLORS.SUCCESS || "green" }} />
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Payment Successful! 🎉
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for your payment. Your transaction has been processed successfully.
          </Typography>

          {/* Payment Details */}
          <Paper sx={{ p: 2, mt: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="body2"><strong>Transaction ID:</strong> #123456789</Typography>
            <Typography variant="body2"><strong>Amount Paid:</strong> $399.99</Typography>
            <Typography variant="body2"><strong>Payment Method:</strong> Visa Card</Typography>
          </Paper>

          {/* Continue Button */}
          <Box sx={{ mt: 4, animation: `${fadeInUp} 0.6s ease-in-out` }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
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
    </Container>
  );
}
