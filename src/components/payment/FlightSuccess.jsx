import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { nunito } from "@/utils/fonts";

const keyToShow = [
  "email",
  "contact",
  "method",
  "bank",
  "fee",
  "tax",
  "refund_status",
  "amount",
  "currency",
  "amount_refunded",
];

const keyMapping = {
  email: "Email",
  contact: "Phone No",
  method: "Payment Method",
  bank: "Bank Name",
  fee: "Transaction Fee",
  tax: "Tax Amount",
  refund_status: "Refund Status",
  amount: "Total Amount",
  currency: "Currency",
  amount_refunded: "Refunded Amount",
};

const fmt = (key, val) => {
  if (val == null) return "NA";
  if (["amount", "tax", "fee", "amount_refunded"].includes(key)) {
    const rupees = Number(val) / 100;
    return rupees.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }
  if (key === "bank") return val ? `${val} Bank` : "NA";
  return String(val);
};

export default function FlightSuccess({ data }) {
  console.log("Flight Page it issss");
  const entries = keyToShow.map((k) => [k, data?.[k]]);

  return (
    <Box
      sx={{
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {entries.map(([key, value]) => (
        <Grid2
          key={key}
          container
          sx={{ width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" } }}
          spacing={2}
        >
          <Grid2 xs={6} sx={{ px: "5px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                textTransform: "capitalize",
                fontFamily: nunito.style,
                textAlign: "start",
                mb: 0.8,
              }}
            >
              {keyMapping[key] || key}
            </Typography>
          </Grid2>
          <Grid2 xs={6} sx={{ px: "5px" }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: nunito.style,
                textAlign: "start",
                wordBreak: "break-word",
              }}
            >
              {fmt(key, value)}
            </Typography>
          </Grid2>
        </Grid2>
      ))}

      {/* Flight-specific extra info (example) */}
      {/* <Typography sx={{ mt: 2 }}>PNR: {data?.description}</Typography> */}
    </Box>
  );
}
