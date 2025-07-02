import { paymentController } from "@/api/paymentController";
import SwipeableEdgeDrawer from "@/components/flight/SwipeableEdgeDrawer";
import { COLORS } from "@/utils/colors";
import { JOURNEY } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import Loader from "@/utils/Loader";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid2,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useSelector } from "react-redux";
import DomesticDetail from "../domesticDetail";
import InternationalDetail from "../internationalDetail";
import InternationalFareSummary from "../InternationalFareSummary";
import RoundFareSummary from "../RoundFareSummary";

export default function RoundTripCheckout() {
  const [paymentPayload, setPaymentPayload] = useState(null);
  const router = useRouter();


    useEffect(() => {
      if (sessionStorage.getItem("payment_info")) {
        let payment_credentials = JSON.parse(
          sessionStorage.getItem("payment_info")
        );
        console.log("payment_credentials on payment page:", payment_credentials);
        setPaymentPayload({ ...payment_credentials, currency: "INR" });
      } else {
        router.back();
      }
    }, []);
  
  const selector = useSelector((state) => state.USER.UserData);
  const { isAuthenticated } = selector;
  const [roundTrip, setRoundTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passengerCount, setPassengerCount] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
   const smallScreen = useMediaQuery("(max-width:1199px)");
  const toggleDrawer = {
    open: drawerOpen, 
    toggle: () => setDrawerOpen((prev) => !prev), 
  };

  useEffect(() => {
    const storedFlightDetails = localStorage.getItem("roundTripflightDetails");
    const storedPassengerCount = localStorage.getItem("roundState");
    if (storedFlightDetails) {
      setRoundTrip(JSON.parse(storedFlightDetails));
    }
    if (storedPassengerCount) {
      setPassengerCount(JSON.parse(storedPassengerCount));
    }
    if (!isAuthenticated || !storedFlightDetails) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  // handling function to initiate the payment process
  function handlePay() {
    setLoading(true);
    paymentController
      .paymentInit(paymentPayload)
      .then((response) => {
        setLoading(false);
        console.log("payment response: ", response);
        if (response?.data?.data?.short_url) {
          router.replace(response?.data?.data?.short_url)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Payment Response Error:", error.message);
      });
  }

  // console.log("checkout details:", roundTrip);

  return (
    <>
      {isAuthenticated && roundTrip ? (
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
                fontFamily: roboto.style,
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
                  fontFamily: roboto.style,
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
                  size={{ xs: 12, sm: 12, md: 12 ,lg:8 }}
              
                  sx={{
                    backgroundColor: COLORS.SEMIGREY,
                    p: 2,
                    borderRadius: 2,
                 
                    
                    
                    
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: COLORS.WHITE,
                      p: 2,
                      
                    }}
                  >
                    {/* form for payment option */}

                    {/* fare details */}

                    {roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                      <InternationalDetail flightDetails={roundTrip} />
                    ) : (
                      <DomesticDetail flightDetails={roundTrip} />
                    )}

                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: COLORS.GREY,
                        p: 1,
                        pb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: roboto.style,
                          fontWeight: 600,
                          mb: 1,
                          color: COLORS.PRIMARY,
                        }}
                      >
                        Passenger Info
                      </Typography>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ mb: "5px" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          Adult
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          {passengerCount?.adult}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ mb: "5px" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          Child
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          {passengerCount?.child}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ mb: "5px" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          Infant
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: roboto.style,
                          }}
                        >
                          {passengerCount?.infant}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Journey Detail  */}

                    {roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                      <>
                        {roundTrip[0]?.Results?.Segments.map(
                          (segment, index) => (
                            <Box
                              key={index}
                              sx={{
                                borderBottom: 1,
                                borderColor: COLORS.GREY,
                                p: 1,
                                pb: 2,
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontFamily: roboto.style,
                                  fontWeight: 600,
                                  mb: 1,
                                  color: COLORS.PRIMARY,
                                }}
                              >
                                Journey Detail (
                                {segment[0]?.Origin?.Airport?.CityCode} -{" "}
                                {
                                  segment[segment.length - 1]?.Destination
                                    ?.Airport?.CityCode
                                }
                                )
                              </Typography>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                sx={{ mb: "5px" }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    fontFamily: roboto.style,
                                  }}
                                >
                                  Departure Date
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    fontFamily: roboto.style,
                                  }}
                                >
                                  {moment(segment[0]?.Origin?.DepTime).format(
                                    "D MMM, ddd"
                                  )}
                                </Typography>
                              </Stack>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                sx={{ mb: "5px" }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    fontFamily: roboto.style,
                                  }}
                                >
                                  Departure Time
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: 500,
                                    fontFamily: roboto.style,
                                  }}
                                >
                                  {moment(segment[0]?.Origin?.DepTime).format(
                                    "HH:mm"
                                  )}
                                </Typography>
                              </Stack>
                            </Box>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {roundTrip[0][0]?.Results?.Segments[0].map(
                          (segment, index) => {
                            return (
                              <Box
                                key={index}
                                sx={{
                                  borderBottom: 1,
                                  borderColor: COLORS.GREY,
                                  p: 1,
                                  pb: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontFamily: roboto.style,
                                    fontWeight: 600,
                                    mb: 1,
                                    color: COLORS.PRIMARY,
                                  }}
                                >
                                  Journey Detail (
                                  {segment?.Origin?.Airport?.CityCode} -{" "}
                                  {segment?.Destination?.Airport?.CityCode})
                                </Typography>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  sx={{ mb: "5px" }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    Departure Date
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    {moment(segment?.Origin?.DepTime).format(
                                      "D MMM, ddd"
                                    )}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  sx={{ mb: "5px" }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    Departure Time
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    {moment(segment?.Origin?.DepTime).format(
                                      "HH:mm"
                                    )}
                                  </Typography>
                                </Stack>
                              </Box>
                            );
                          }
                        )}

                        {roundTrip[1][0]?.Results?.Segments[0].map(
                          (segment, index) => {
                            return (
                              <Box
                                key={index}
                                sx={{
                                  borderBottom: 1,
                                  borderColor: COLORS.GREY,
                                  p: 1,
                                  pb: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontFamily: roboto.style,
                                    fontWeight: 600,
                                    mb: 1,
                                    color: COLORS.PRIMARY,
                                  }}
                                >
                                  Journey Detail (
                                  {segment?.Origin?.Airport?.CityCode} -{" "}
                                  {segment?.Destination?.Airport?.CityCode})
                                </Typography>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  sx={{ mb: "5px" }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    Departure Date
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    {moment(segment?.Origin?.DepTime).format(
                                      "D MMM, ddd"
                                    )}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  sx={{ mb: "5px" }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    Departure Time
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      fontFamily: roboto.style,
                                    }}
                                  >
                                    {moment(segment?.Origin?.DepTime).format(
                                      "HH:mm"
                                    )}
                                  </Typography>
                                </Stack>
                              </Box>
                            );
                          }
                        )}
                      </>
                    )}

                    {/* Form Detail  */}
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontFamily: roboto.style,
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
                      sx={{
                        mt: 4,
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    />
                    <Grid2 container mt={2} spacing={2}>
                      <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Stack direction="row" alignItems={"center"}>
                          <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                          <Typography sx={{ fontFamily: roboto.style }}>
                            100% secure booking
                          </Typography>
                        </Stack>
                      </Grid2>

                      <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Stack direction="row" alignItems={"center"}>
                          <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                          <Typography sx={{ fontFamily: roboto.style }}>
                            100% secure booking
                          </Typography>
                        </Stack>
                      </Grid2>

                      <Grid2 size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Stack direction="row" alignItems={"center"}>
                          <ShieldRoundedIcon sx={{ color: COLORS.GREEN }} />
                          <Typography sx={{ fontFamily: roboto.style }}>
                            100% secure booking
                          </Typography>
                        </Stack>
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
                {/* order-box */}

                <Grid2
                  size={{ xs: 12, sm: 12, md: 12 ,lg:4 }}
                
                  
                  sx={{
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 2,
                    position: "sticky",
                    top: "75px",
                    
                  }}
                >
                  {/* --------------fare Summary Start-----------------  */}
                {
                  smallScreen ?(
                    <SwipeableEdgeDrawer
                    toggleDrawer={toggleDrawer}
                    fairSummary ={
                      roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                        <InternationalFareSummary
                          fareData={roundTrip[0]?.Results}
                          commission={roundTrip[2]}
                          toggleDrawer={toggleDrawer}
                        />
                      ) : (
                        <RoundFareSummary
                          fareData={roundTrip}
                          commission={roundTrip[2]}
                          toggleDrawer={toggleDrawer}
                        />
                      )

                    }

                    />
                      
                  

                  ):(
                      roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                    <InternationalFareSummary
                      fareData={roundTrip[0]?.Results}
                      commission={roundTrip[2]}
                    />
                  ) : (
                    <RoundFareSummary
                      fareData={roundTrip}
                      commission={roundTrip[2]}
                    />
                  )

                  )
                }

                  {/* {roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                    <FareSummary
                      fareData={roundTrip[0]?.Results}
                      commission={roundTrip[2]}
                    />
                  ) : (
                    <RoundFareSummary
                      fareData={roundTrip}
                      commission={roundTrip[2]}
                    />
                  )} */}
                  {/* --------------fare Summary End-----------------  */}

                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      mt: "20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: COLORS.PRIMARY,
                        color: COLORS.WHITE,
                        minWidth: "120px",
                        
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      disabled={!paymentPayload}
                      onClick={handlePay}
                    >
                      {loading ? (
                        <Loading
                          type="spin"
                          width={25}
                          height={25}
                          color={COLORS.WHITE}
                        />
                      ) : (
                        "Pay Now"
                      )}
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </Container>
          </Grid2>
        </Grid2>
      ) : <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
              >
                <Loader open={true} />
              </Box>}
    </>
  );
}
