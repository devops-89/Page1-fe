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
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import visa from "@/checkout/visa.png";
import test from "@/checkout/test.png";
import phonepay from "@/checkout/phonepay.png";

import Image from "next/image";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { nunito } from "@/utils/fonts";
import { Grid } from "swiper/modules";

export default function CheckoutPage() {
  return (
    <Grid2 container spacing={2}>
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
      <Grid2 size={{xs:12}}>
      <Container>
        <Grid2 size={{xs:12}} container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily:nunito.style
            }}
          >
            Payment
          </Typography>
          <Box
            sx={{
              mt: 2,
              backgroundColor: COLORS.WHITE,
              borderRadius: 1,
              p: 4,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", color: COLORS.DARKGREY }}
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
                mt: 1,
                borderRadius: 1,
                p: 0.8,
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
                            sx={{ fontWeight: "bold" }}
                            color={COLORS.BLACK}
                          >
                            {" "}
                            Credit Card
                          </Typography>
                          <Typography fontSize={12} color="textSecondary">
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
                mt: 1,
                borderRadius: 1,
                p: 0.8,
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
                            sx={{ fontWeight: "bold" }}
                            color={COLORS.BLACK}
                          >
                            {" "}
                            UPI
                          </Typography>
                          <Typography fontSize={12} color="textSecondary">
                            No Fee
                          </Typography>
                        </Box>
                      }
                    />
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Image src={phonepay} width="80" objectFit="contain" />
              </Stack>
            </Stack>

            {/* form for payment option */}

            <Box sx={{ border: 1, mt: 2, p: 2 }} borderRadius={0.5}>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold", color: COLORS.BLACK }}
              >
                Discount Voucher
              </Typography>
              <Typography sx={{ fontSize: 13 }}>
                want to add a discount Voucher ?
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 2 }}>
                Discount Voucher
              </Typography>
              <Stack
                direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
                spacing={1}
              >
                <input
                  type="text"
                  placeholder="Discount Voucher"
                  style={{ p: 2, borderRadius: 0.5 }}
                />
                <Button
                  variant="outlined"
                  sx={{ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }}
                >
                  Apply
                </Button>
              </Stack>
            </Box>

            <Box sx={{ border: 1, mt: 2, p: 2 }}>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold", color: COLORS.BLACK }}
              >
                Total amount
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography sx={{ fontSize: 12 }}>Subtotal</Typography>
                <Typography sx={{ fontSize: 12 }}>$13,370</Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: COLORS.PRIMARY,
                  textDecorationLine: "underline",
                  mt: 1,
                }}
              >
                Total amount
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  {" "}
                  Amount to pay
                </Typography>
                <Typography sx={{ fontSize: 14 }}>$13,370</Typography>
              </Stack>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography sx={{ fontSize: 11, textAlign: "left" }}>
                    I have read and accept flight networks travel condition Fare
                    Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Cum ea sunt, totam porro voluptatum
                    ducimus ipsa itaque dignissimos, accusamus earum placeat
                    nulla sapiente animi eius vitae amet beatae illo explicabo!
                  </Typography>
                }
                sx={{ mt: 4, display: "flex", alignItems: "flex-start" }}
              />
              <Grid2 container mt={2} spacing={2}>
                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontSize: 14 }}>
                      100% secure booking
                    </Typography>
                  </Stack>
                </Grid2>

                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontSize: 14 }}>
                      100% secure booking
                    </Typography>
                  </Stack>
                </Grid2>

                <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                  <Stack direction="row" alignItems={"center"}>
                    <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                    <Typography sx={{ fontSize: 14 }}>
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
          <Typography sx={{ fontSize: 12, mt: 1, mb: 2, ml: 1 }}>
            I have read and accept Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatum velit nulla doloremque incidunt est
            soluta modi nostrum, assumenda beatae, rem, eum exercitationem cum
            minus eligendi veniam consequuntur ab explicabo eaque!
          </Typography>
        </Grid2>
        {/* order-box */}
        <Grid2
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ border: 1, borderColor: COLORS.GREY, mt: 8 }}
        >
          <Box sx={{ borderBottom: 1, borderColor: COLORS.DARKGREY }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.PRIMARY,
                p: 1,
              }}
            >
              Your Order
            </Typography>
          </Box>
          {/* GIVE BOX TO GET BORDER BOTTOM */}
          <Box sx={{ borderBottom: 1, borderColor: COLORS.GREY, p: 1, pb: 4 }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", color: COLORS.BLACK }}
            >
              Departure
            </Typography>
            <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
              Mon 2 jun 2025
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
              >
                Discount Voucher
              </Typography>
              <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                Mon 2 jun 2025
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
              DEL New Delhi -BOM Mumbai
            </Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: COLORS.GREY, p: 1, pb: 4 }}>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", color: COLORS.BLACK }}
            >
              Bags
            </Typography>
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
                    personal item
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12, color: COLORS.DARKGREY }}>
                  personal item included for all passengers
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
              sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
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
                sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
              >
                Dheeraj Chanuhan ,adult
              </Typography>

              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
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
                sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
              >
                Amount to pay
              </Typography>

              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", color: COLORS.BLACK }}
              >
                19,188
              </Typography>
            </Stack>
          </Box>
          {/* total amount */}
        </Grid2>
        </Grid2>
      </Container>
      </Grid2>
    </Grid2>
  );
}
