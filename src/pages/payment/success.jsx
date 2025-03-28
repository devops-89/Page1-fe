import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid2,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import { COLORS } from "@/utils/colors";
import { data } from "@/assests/data";
import { object } from "yup";
import background from "@/assests/payment_image/paymentBackground.png";
import airplan from "@/assests/payment_image/airPlan.png";
import { nunito } from "@/utils/fonts";


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
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("payment_info")) {
      setPaymentInfo(JSON.parse(paymentInfo));
    }
  });

  const handleContinue = () => {
    router.replace("/");
  };
  const keyTOShow = [
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
    email: "Email ",
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

  const orderedEntries = keyTOShow.map((key) => [key, data.payment[key]]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <Box
        borderColor={"red"}
        component="img"
        src={background.src}
        alt="Airplane Front"
        sx={{ width: "100%", height: { lg: "15vw", xs: "40vw" } }}
      />
      <Container
        sx={{
          width:{lg:"50%" ,md:"50%" ,sm:"100%" ,xs:"100%"},
          textAlign: "center",
          position: "relative",
          zIndex: 100,
          top: { lg: -50, xs: -20 },
        }}
      >
        {/* Payment Message */}
        <Paper
          elevation={3}
          sx={{
            pt: 0,
            pb: 4,
            borderRadius: '10px',
            animation: `${fadeInUp} 0.5s ease-in-out`,
          }}
        >
          <Grid2
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              backgroundColor: COLORS.PRIMARY,
              pl: 2,
              pt: 1,
              pb: 1,
              borderTopLeftRadius: '10px',    
              borderTopRightRadius: '10px'   
            }}
          >
            <Grid2 sx={6}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: COLORS.WHITE, fontFamily:nunito.style ,textAlign:"center" ,border:1 }}
              >
                Payment Details
              </Typography>
            </Grid2>
            <Grid2 size={6}>
              <Box
                component="img"
                position={"relative"}
                left={{lg:30 , xs:190}}
                src={airplan.src}
                sx={{ width: {lg:"40%" ,md:"40%" ,sm:"60%" ,xs:"60%"} }}
              />
            </Grid2>
          </Grid2>

          {/* Success Icon Inside Paper */}
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
            sx={{fontWeight: 600, mb: 1 , fontFamily:nunito.style}}
          >
            Payment Successful!
          </Typography>

          <Typography
            variant="body2"
            sx={{mb: 1, fontFamily:nunito.style }}
          >
            Thank you for your payment. Your transaction has been processed
            successfully.
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Payment Details */}

<Box
  sx={{
    px: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  {orderedEntries.map(([key, value]) => {
     const displayKey = keyMapping[key] || key;

    return (
      <>
      <Grid2 container sx={{ width:{lg:"50%" ,md:"50%" ,sm:"100%" ,xs:"100%"}}} spacing={2}>
          <Grid2 size={{xs:6, sm:12, md:6}} sx={{paddingX:'5px'}}><Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            fontFamily:nunito.style,
            textAlign:'start',
            mb:0.8
          }}
        >
          { displayKey} 
        </Typography></Grid2>
          <Grid2 size={{xs:6, sm:12, md:6}} sx={{paddingX:'5px'}}> <Typography
           variant="body2"
          sx={{ fontFamily:nunito.style, textAlign:'start' }}
        >
          {value === null ? "NA" : value}
        </Typography></Grid2>
      </Grid2>



      {/* <Box
        key={key}
        sx={{
          padding: 1,
          boxSizing: "border-box",
          textAlign: "left",
        }}
      >

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            fontFamily:nunito.style
            
          }}
        >
          { displayKey} :
        </Typography>
        <Typography
          variant="body1"
          sx={{ minWidth: "120px", flex: 1,  fontFamily:nunito.style }}
        >
          {value === null ? "NA" : value}
        </Typography>
      </Box> */}
      </>
    );
  })}
</Box>


          {/* <Box p={1} border={2}>

             

              <Box sx={{backgroundColor:COLORS.PRIMARY ,p:1 ,borderRadius:1 ,mb:1 }}>
                <Typography sx={{}}>

                Payment Details
                </Typography>
                </Box>
                <ul style={{listStyleType :"none" }}>
             { orderedEntries.map(([key, value]) => (
               <li key={key}>
            
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box>{key}</Box>
                <Box>{value}</Box>
              </Stack>
          </li>
        ))}
      </ul>
               
             

            </Box> */}

          {/* Continue Button */}
          <Box sx={{ mt: 2, animation: `${fadeInUp} 0.6s ease-in-out` }}>
            <Button
              variant="subtitle2"
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1,
                color:COLORS.WHITE,

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
    </Box>
  );
}
