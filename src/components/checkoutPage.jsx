import {
  Container,
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
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import visa from "@/checkout/visa.png";
import test from "@/checkout/test.png";
import phonepay from "@/checkout/phonepay.png";

import Image from "next/image";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { nunito } from "@/utils/fonts";

export default function CheckoutPage() {
  return (
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
      <Grid2 size={{ xs: 12 }} sx={{ border: "2px solid red", py:5 }}>
        <Container>
            <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: nunito.style,
                  mb:4
                }}
              >
                Payment Now
              </Typography>
          <Grid2 size={{ xs: 12 }} container spacing={3}>

            <Grid2 size={{ xs: 12, sm: 12, md: 8 }} sx={{ backgroundColor: COLORS.SEMIGREY, p:2, borderRadius: 2}}>
            
              <Box
                sx={{
                  backgroundColor: COLORS.WHITE,
                  p:2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: COLORS.DARKGREY,
                    fontFamily:nunito.style,
                    mb:2
                  }}
                >
                  Choose Payment Method
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 4 }}>
                  <Image src={visa} width="50" objectFit="contain" />
                  <Image src={test} width="50" objectFit="contain" />
                </Stack>
                {/* form for payment option */}
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    border: 0.2,
                    borderColor: COLORS.LIGHTGREY,
                    borderRadius: 1,
                    px:2, py:1,
                    mb:1
                  }}
                >
                  <FormControl>
                    <RadioGroup>
                      <Stack>
                        <FormControlLabel
                          value="creditCardNoFee"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography
                                sx={{ fontWeight: "bold", fontFamily:nunito.style }}

                              >
                                {" "}
                                Credit Card
                              </Typography>
                              <Typography fontSize={12} sx={{fontFamily:nunito.style}}>
                                No Fee
                              </Typography>
                            </Box>
                          }
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
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
                    px:2, py:1,
                    mb:1
                  }}
                >
                  <FormControl>
                    <RadioGroup>
                      <Stack>
                        <FormControlLabel
                          value="creditCardNoFee"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography
                                sx={{ fontWeight: "bold",  fontFamily:nunito.style }}
                                color={COLORS.BLACK}
                              >
                                {" "}
                                UPI
                              </Typography>
                              <Typography fontSize={12} sx={{ fontFamily:nunito.style}}>
                                No Fee
                              </Typography>
                            </Box>
                          }
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Image src={phonepay} width="40" objectFit="contain" />
                  </Stack>
                </Stack>

                {/* form for payment option */}

                <Box sx={{ border: 1, mt: 2, p: 2 }} borderRadius={1}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontFamily:nunito.style
                    }}
                  >
                    Discount Voucher
                  </Typography>
                  <Typography sx={{ fontFamily:nunito.style }}>
                    want to add a discount Voucher ?
                  </Typography>
                  <Typography sx={{ fontFamily:nunito.style, mb:1 }}>
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
                </Box>

                <Box sx={{ border: 1, mt: 2, p: 2, borderRadius:1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontFamily:nunito.style
                    }}
                  >
                    Total amount
                  </Typography>

                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography sx={{ fontFamily:nunito.style }}>Subtotal</Typography>
                    <Typography sx={{ fontFamily:nunito.style }}>$13,370</Typography>
                  </Stack>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: COLORS.PRIMARY,
                      mt: 1,
                      fontFamily:nunito.style
                    }}
                  >
                    Total amount
                  </Typography>

                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography sx={{  fontFamily:nunito.style, fontWeight: "bold" }}>
                      {" "}
                      Amount to pay
                    </Typography>
                    <Typography sx={{  fontFamily:nunito.style }}>$13,370</Typography>
                  </Stack>

                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography sx={{  fontFamily:nunito.style, textAlign: "left" }}>
                        I have read and accept flight networks travel condition
                        Fare Lorem ipsum dolor Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Cum ea sunt, totam porro
                        voluptatum ducimus ipsa itaque dignissimos, accusamus
                        earum placeat nulla sapiente animi eius vitae amet
                        beatae illo explicabo!
                      </Typography>
                    }
                    sx={{ mt: 4, display: "flex", alignItems: "flex-start" }}
                  />
                  <Grid2 container mt={2} spacing={2}>
                    <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                      <Stack direction="row" alignItems={"center"}>
                        <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                        <Typography sx={{  fontFamily:nunito.style}}>
                          100% secure booking
                        </Typography>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                      <Stack direction="row" alignItems={"center"}>
                        <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                        <Typography sx={{  fontFamily:nunito.style }}>
                          100% secure booking
                        </Typography>
                      </Stack>
                    </Grid2>

                    <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                      <Stack direction="row" alignItems={"center"}>
                        <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                        <Typography sx={{  fontFamily:nunito.style }}>
                          100% secure booking
                        </Typography>
                      </Stack>
                    </Grid2>
                  </Grid2>
                  <Stack alignItems={"flex-end"} mt={3}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: COLORS.PRIMARY,
                        color: COLORS.WHITE,
                        minWidth: 8,
                      }}
                    >
                      Pay
                    </Button>
                  </Stack>
                </Box>
              </Box>
              <Typography sx={{  fontFamily:nunito.style, mt: 1, mb: 2, ml: 1 }}>
                I have read and accept Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatum velit nulla doloremque incidunt est
                soluta modi nostrum, assumenda beatae, rem, eum exercitationem
                cum minus eligendi veniam consequuntur ab explicabo eaque!
              </Typography>
            </Grid2>
            {/* order-box */}

            <Grid2
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{ backgroundColor: COLORS.SEMIGREY, p:2, borderRadius: 2}}
            >
              <Box sx={{borderBottom: 1, backgroundColor:COLORS.WHITE,  p:2}}>
              <Box sx={{ borderBottom: 1 }}>
                <Typography variant="h6"
                  sx={{
                    fontFamily:nunito.style,
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
                sx={{ borderBottom: 1, borderColor: COLORS.GREY, p: 1, pb: 2 }}
              >
                <Typography variant="body1"
                  sx={{  fontFamily:nunito.style, fontWeight: "bold", mb:1 }}
                >
                  Departure
                </Typography>
                <Typography variant="body2" sx={{  fontFamily:nunito.style, color: COLORS.DARKGREY, mb:2 }}>
                  Mon 2 jun 2025
                </Typography>
                <Stack sx={{mb:2}} direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography
                    sx={{
                      fontFamily:nunito.style,
                      fontWeight: "bold",
                      color: COLORS.BLACK,
                    }}
                  >
                    Discount Voucher
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily:nunito.style, color: COLORS.DARKGREY }}>
                    WELCOME50
                  </Typography>
                </Stack>
                <Typography sx={{ fontFamily:nunito.style, color: COLORS.DARKGREY }}>
                  DEL New Delhi -BOM Mumbai
                </Typography>
              </Box>
              <Box
                sx={{ borderBottom: 1, borderColor: COLORS.GREY, p: 1, pb: 4 }}
              >
                <Typography variant="h6"
                  sx={{ fontFamily:nunito.style, fontWeight: "bold", color: COLORS.BLACK }}
                >
                  Bags
                </Typography>
                <Grid2 container mt={2}>
                  <Grid2 size={12}>
                    <Stack direction="row" alignItems={"center"} spacing={1}>
                      <CategoryRoundedIcon />
                      <Typography
                        sx={{
                          fontFamily:nunito.style,
                          fontWeight: "bold",
                        }}
                      >
                        Personal item
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontFamily:nunito.style, color: COLORS.DARKGREY }}>
                      Personal item included for all passengers
                    </Typography>
                  </Grid2>
                </Grid2>
                <Grid2 container mt={2}>
                  <Grid2 size={12}>
                    <Stack direction="row" alignItems={"center"}>
                      <CategoryRoundedIcon />
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: COLORS.BLACK,
                        }}
                      >
                        Hand baggage
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                      1 x 7kg included for all passengers
                    </Typography>
                  </Grid2>
                </Grid2>
              </Box>
              {/* contact information */}
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
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Contact information
                </Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                  bharti@gmail.com
                </Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                  +91 9876443210
                </Typography>
              </Box>
              {/* contact information */}
              {/* bill box */}
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
                      fontSize: 14,
                      fontWeight: "bold",
                      color: COLORS.BLACK,
                    }}
                  >
                    Dheeraj Chanuhan ,adult
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: COLORS.BLACK,
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
                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    price per unit
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    5,320
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    price per unit
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    5,320
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    price per unit
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                    5,320
                  </Typography>
                </Stack>
              </Box>
              {/* bill box */}
              {/* total amount */}
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
                  sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
                >
                  Total amount
                </Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                  subtotal
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: COLORS.PRIMARY,
                    textDecoration: "underline",
                  }}
                >
                  payment options
                </Typography>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: COLORS.BLACK,
                    }}
                  >
                    Amount to pay
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: COLORS.BLACK,
                    }}
                  >
                    19,188
                  </Typography>
                </Stack>
              </Box>
              {/* total amount */}

              </Box>
            </Grid2>

          </Grid2>
        </Container>
      </Grid2>
    </Grid2>
  );
}
