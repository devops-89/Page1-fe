import {
  Container,
  Divider,
  Stack,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Checkbox,
  Grid2,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import pointerImage from "@/../public/images/pointer.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { COLORS } from "@/utils/colors";
import visa from "@/checkout/visa.png";
import test from "@/checkout/test.png";
import phonepay from "@/checkout/phonepay.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Image from "next/image";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OneWayCheckout(){
  const router = useRouter();
  const selector = useSelector((state) => state.USER);
  const { isAuthenticated } = selector;
  const [oneWay, setOneWay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFlightDetails = localStorage.getItem('oneWayflightDetails');
    if (storedFlightDetails) {
      setOneWay(JSON.parse(storedFlightDetails));
    }
    if (!isAuthenticated || !storedFlightDetails) {
      router.back(); 
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

return (
  isAuthenticated && oneWay ? (
  <Grid2 container>
  {/* top bar  */}
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
      Checkout
    </Typography>
  </Grid2>

  {/* Section 2  */}
  <Grid2 size={{ xs: 12 }} sx={{ py: 5 }}>

    <Container>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontFamily: nunito.style,
          mb: 4,
        }}
      >
        Payment Now
      </Typography>

      <Grid2
        size={{ xs: 12 }}
        container
        spacing={3}
        alignItems={"flex-start"}
      >
        <Grid2
          size={{ xs: 12, sm: 12, md: 8 }}
          sx={{ backgroundColor: COLORS.SEMIGREY, p: 2, borderRadius: 2 }}
        >
          <Box
            sx={{
              backgroundColor: COLORS.WHITE,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: COLORS.DARKGREY,
                fontFamily: nunito.style,
                mb: 2,
              }}
            >
              Choose Payment Method
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 4 }}>
              <Image src={visa} width="50" objectFit="contain" />
              <Image src={test} width="50" objectFit="contain" />
            </Stack>
            
            {/* form for payment option */}
            <FormControl sx={{ width: "100%" }}>
              <RadioGroup name="paymentMethod">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    border: 0.2,
                    borderColor: COLORS.LIGHTGREY,
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    mb: 1,
                  }}
                >
                  {/* <FormControl>
                <RadioGroup> */}
                  <Stack>
                    <FormControlLabel
                      value="creditCardNoFee"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontFamily: nunito.style,
                            }}
                          >
                            {" "}
                            Credit Card
                          </Typography>
                          <Typography
                            fontSize={12}
                            sx={{ fontFamily: nunito.style }}
                          >
                            No Fee
                          </Typography>
                        </Box>
                      }
                    />
                  </Stack>
                  {/* </RadioGroup>
              </FormControl> */}
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Image src={visa} width="40" objectFit="contain" />
                    <Image src={test} width="40" objectFit="contain" />
                  </Stack>
                </Stack>
                {/* second payment form */}

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    border: 0.2,
                    borderColor: COLORS.LIGHTGREY,
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    mb: 1,
                  }}
                >
                  {/* <FormControl>
                <RadioGroup> */}
                  <Stack>
                    <FormControlLabel
                      value="upi"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontFamily: nunito.style,
                            }}
                            color={COLORS.BLACK}
                          >
                            {" "}
                            UPI
                          </Typography>
                          <Typography
                            fontSize={12}
                            sx={{ fontFamily: nunito.style }}
                          >
                            No Fee
                          </Typography>
                        </Box>
                      }
                    />
                  </Stack>
                  {/* </RadioGroup>
              </FormControl> */}
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Image src={phonepay} width="40" objectFit="contain" />
                  </Stack>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* form for payment option */}

            {/* fare details */}


                <Accordion
                  sx={{
                    border: 0.1,
                    borderColor: COLORS.LIGHTGREY,
                    mt: 2,
                    borderRadius: 1,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    {/* <Box sx={{ border: 1, mt: 2, p: 2 }} borderRadius={1}> */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: nunito.style,
                      }}
                    >
                     {`${oneWay?.Results?.Segments[0][0]?.Origin?.Airport?.CityName}`}{" "}
                            →{" "}
                            {`${
                              oneWay?.Results?.Segments[0][
                                oneWay?.Results?.Segments[0].length -
                                  1
                              ]?.Destination?.Airport?.CityName
                            }`}
                    </Typography>
                  </AccordionSummary>
    
                  <AccordionDetails>
                    <Card sx={{ padding: "20px", marginBottom: "20px" }}>
                      <Grid2 container>
                        <Grid2 size={{ xs: 8 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontFamily: nunito.style,
                              fontSize: "20px",
                              fontWeight: 700,
                            }}
                          >
                            Delhi → Mumbai
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            gutterBottomx
                            sx={{ marginBottom: "10px" }}
                          >
                            <span
                              style={{
                                backgroundColor: "#FFEDD1",
                                padding: "5px",
                                borderRadius: "4px",
                                fontFamily: nunito.style,
                              }}
                            >
                              Mon, Mar 24
                            </span>{" "}
                            0 stop .2 hrs 20 min
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Divider />
    
                      <Grid2 container spacing={1} sx={{ marginTop: "10px" }}>
                        {/* Flight Segment 1 */}
                        <Grid2
                          size={{ xs: 12 }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {/* <Image
                                      src={?.AirlineLogo}
                                      alt="Image"
                                      width={30}
                                      height={30}
                                    /> */}
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                              fontFamily: nunito.style,
                              fontWeight: 600,
                            }}
                          >
                            IndiGo 6E 6051
                          </Typography>
                        </Grid2>
                        <Grid2
                          size={{ xs: 12 }}
                          sx={{
                            backgroundColor: "#F4F4F4",
                            padding: "15px",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              fontFamily: nunito.style,
                            }}
                          >
                            13:00 - Delhi (DEL)
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginLeft: "65px",
                            }}
                          >
                            <img
                              src={pointerImage.src}
                              style={{ width: "16px" }}
                            />{" "}
                            2 hrs :20 min
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              fontFamily: nunito.style,
                            }}
                          >
                            15:20 - Mumbai {"(BOM)"}
                          </Typography>
                        </Grid2>
    
                        <Grid2
                          size={{ xs: 12 }}
                          sx={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",
                            backgroundColor: "#FFEDD1",
                            padding: "5px",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: nunito.style,
                              fontWeight: 500,
                            }}
                          >
                            <strong>Baggage :</strong> 15 kilograms
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: nunito.style,
                              fontWeight: 500,
                            }}
                          >
                            <strong>Cabin Baggage :</strong> 7kg
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Divider />
                    </Card>
                  </AccordionDetails>
    
                </Accordion>
           

          






            <Accordion
              sx={{
                border: 0.2,
                borderColor: COLORS.LIGHTGREY,
                mt: 2,
                borderRadius: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                {/* <Box sx={{ border: 1, mt: 2, p: 2 }} borderRadius={1}> */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: nunito.style,
                  }}
                >
                  Discount Voucher
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontFamily: nunito.style }}>
                  want to add a discount Voucher ?
                </Typography>
                <Typography sx={{ fontFamily: nunito.style, mb: 1 }}>
                  Discount Voucher
                </Typography>
                <Stack
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column",
                  }}
                  spacing={1}
                >
                  <TextField
                    type="text"
                    placeholder="Discount Voucher"
                    style={{ p: 2, borderRadius: 0.5 }}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: COLORS.PRIMARY,
                      color: COLORS.PRIMARY,
                    }}
                  >
                    Apply
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
            {/* </Box> */}

            <Box
              sx={{
                border: 0.2,
                borderColor: COLORS.LIGHTGREY,
                mt: 2,
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontFamily: nunito.style,
                }}
              >
                Fare Summary
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
              >
                <Typography sx={{ fontFamily: nunito.style }}>
                  Base Amount
                </Typography>
                <Typography
                  sx={{ fontFamily: nunito.style, textAlign: "center" }}
                >
                  4483 <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
              >
                <Typography sx={{ fontFamily: nunito.style }}>
                  taxes and subCharges
                </Typography>
                <Typography
                  sx={{ fontFamily: nunito.style, textAlign: "center" }}
                >
                  4483 <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
              >
                <Typography sx={{ fontFamily: nunito.style }}>
                  Discount
                </Typography>
                <Typography
                  sx={{ fontFamily: nunito.style, textAlign: "center" }}
                >
                  0 <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
                borderTop={1}
                p={1}
              >
                <Typography
                  sx={{ fontFamily: nunito.style, fontWeight: "bold" }}
                >
                  Total Amount
                </Typography>
                <Typography
                  sx={{ fontFamily: nunito.style, textAlign: "center" }}
                >
                  5200 <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
                </Typography>
              </Stack>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: nunito.style,
                      textAlign: "left",
                    }}
                  >
                    I have read and accept Flight networks travel
                    condition,Fare Rules ,the airlines general terms and
                    condition and I have verified that i have entered my
                    booking information correctly .<br /> you can read our
                    Privacy here.
                  </Typography>
                }
                sx={{ mt: 4, display: "flex", alignItems: "flex-start" }}
              />
              <Grid2 container mt={2} spacing={2}>
                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontFamily: nunito.style }}>
                      100% secure booking
                    </Typography>
                  </Stack>
                </Grid2>

                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontFamily: nunito.style }}>
                      100% secure booking
                    </Typography>
                  </Stack>
                </Grid2>

                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontFamily: nunito.style }}>
                      100% secure booking
                    </Typography>
                  </Stack>
                </Grid2>
              </Grid2>
              <Stack alignItems={"flex-end"} mt={3}>
               
              </Stack>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: nunito.style,
              mt: 1,
              mb: 2,
              ml: 1,
            }}
          >
            I have read and accept Flight networks travel condition,Fare
            Rules ,the airlines general terms and condition and I have
            verified that i have entered my booking information correctly .
            <br /> you can read our Privacy here.
          </Typography>
        </Grid2>
        {/* order-box */}

        <Grid2
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ backgroundColor: COLORS.SEMIGREY, p: 2, borderRadius: 2 }}
        >
          <Box
            sx={{ borderBottom: 1, backgroundColor: COLORS.WHITE, p: 2 }}
          >
            <Box sx={{ borderBottom: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: nunito.style,
                  fontWeight: "bold",
                  color: COLORS.PRIMARY,
                  p: 1,
                }}
              >
                Your Order
              </Typography>
            </Box>
            {/* GIVE BOX TO GET BORDER BOTTOM */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: COLORS.GREY,
                p: 1,
                pb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontFamily: nunito.style, fontWeight: "bold", mb: 1 }}
              >
                Departure
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: nunito.style,
                  color: COLORS.DARKGREY,
                  mb: 2,
                }}
              >
                Mon 2 jun 2025
              </Typography>
              <Stack
                sx={{ mb: 2 }}
                direction={"row"}
                alignItems={"center"}
                spacing={1}
              >
                <Typography
                  sx={{
                    fontFamily: nunito.style,
                    fontWeight: "bold",
                    color: COLORS.BLACK,
                  }}
                >
                  Discount Voucher
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: nunito.style, color: COLORS.DARKGREY }}
                >
                  WELCOME50
                </Typography>
              </Stack>
              <Typography
                sx={{ fontFamily: nunito.style, color: COLORS.DARKGREY }}
              >
                DEL New Delhi -BOM Mumbai
              </Typography>
            </Box>

         
            {/* <Box
              sx={{
                borderBottom: 1,
                borderColor: COLORS.GREY,
                p: 1,
                pt: 2,
                pb: 2,
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontFamily: nunito.style }}
              >
                Contact information
              </Typography>
              <Typography
                sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
              >
                bharti@gmail.com
              </Typography>
              <Typography
                sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
              >
                +91 9876443210
              </Typography>
            </Box> 
           
            <Box
              sx={{
                borderBottom: 1,
                borderColor: COLORS.GREY,
                p: 1,
                pt: 2,
                pb: 2,
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: COLORS.BLACK,
                    fontFamily: nunito.style,
                  }}
                >
                  Dheeraj Chanuhan ,adult
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: COLORS.BLACK,
                    fontFamily: nunito.style,
                  }}
                >
                  9,188
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  price per unit
                </Typography>

                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  5,320
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  price per unit
                </Typography>

                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  5,320
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  price per unit
                </Typography>

                <Typography
                  sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
                >
                  5,320
                </Typography>
              </Stack>
            </Box> */}
          
            <Box
              sx={{
                borderBottom: 1,
                borderColor: COLORS.GREY,
                p: 1,
                pt: 2,
                pb: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: COLORS.BLACK,
                  fontFamily: nunito.style,
                }}
              >
                Total amount
              </Typography>
              <Typography
                sx={{ color: COLORS.DARKGREY, fontFamily: nunito.style }}
              >
                subtotal
              </Typography>
              <Typography
                sx={{
                  color: COLORS.PRIMARY,
                  textDecoration: "underline",
                  fontFamily: nunito.style,
                }}
              >
                payment options
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{mb:"20px"}}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: COLORS.BLACK,
                    fontFamily: nunito.style,
                  }}
                >
                  Amount to pay
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: COLORS.BLACK,
                    fontFamily: nunito.style,
                  }}
                >
                  19,188
                </Typography>
              </Stack>
              <Button
                  variant="contained"
                  sx={{
                    backgroundColor: COLORS.PRIMARY,
                    color: COLORS.WHITE,
                    minWidth: 8,
                  }}
                >
                  Pay Now
                </Button>
            </Box>
            {/* total amount */}
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  </Grid2>
</Grid2>) : null)
  }
