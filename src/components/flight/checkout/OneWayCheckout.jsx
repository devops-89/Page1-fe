import {
  Container,
  Divider,
  Stack,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Checkbox,
  Grid2,
  useMediaQuery,
  Card,
} from "@mui/material";
import moment from "moment";
import pointerImage from "@/../public/images/pointer.png";
import { COLORS } from "@/utils/colors";
import Image from "next/image";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FareSummary from "../FareSummary";
import SwipeableEdgeDrawer from "@/components/flight/SwipeableEdgeDrawer";
import { paymentController } from "@/api/paymentController";


export default function OneWayCheckout() {

  const [paymentPayload,setPaymentPayload]=useState(null);
  

  const router = useRouter();

  // checking the session storage payment credentials to continue
  useEffect(()=>{
      if(sessionStorage.getItem("payment_info")){
        let payment_credentials=JSON.parse(sessionStorage.getItem("payment_info"));
        console.log("payment_credentials on payment page:",payment_credentials);
        setPaymentPayload({...payment_credentials, currency: "INR"});
      }
      else{
          router.back();
      }
  },[]);

  
  const selector = useSelector((state) => state.USER);
  const { isAuthenticated } = selector;
  const [oneWay, setOneWay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passengerCount, setPassengerCount] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = {
    open: drawerOpen, // Current state of the drawer
    toggle: () => setDrawerOpen((prev) => !prev), // Function to toggle the state
  };

  // console.log("selector", selector)

  useEffect(() => {
    const storedFlightDetails = localStorage.getItem("oneWayflightDetails");
    const storedPassengerCount = localStorage.getItem("state");
    if (storedFlightDetails) {
      setOneWay(JSON.parse(storedFlightDetails));
    }
    if (storedPassengerCount) {
      setPassengerCount(JSON.parse(storedPassengerCount));
    }
    if (!isAuthenticated || !storedFlightDetails) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  // handling function to initiate the payment process
  function handlePay(){
      paymentController.paymentInit(paymentPayload).then((response)=>{
              console.log("response: ",response);
      }).catch((error)=>{
        console.log("Payment Response Error:",error.message)
      })
  }

  // console.log("checkout details:", oneWay);
   const smallScreen = useMediaQuery("(max-width:1199px)");
  return (
    <>
      {isAuthenticated && oneWay ? (
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

                    <Card sx={{ padding: "20px", marginBottom: "20px" }}>
                      <Grid2 container>
                        <Grid2 size={{ xs: 8 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontFamily: nunito.style,
                              fontSize: {lg:"20px" ,md:"20px" ,sm:"20px",xs:"15px"  },
                              fontWeight: 700,
                            }}
                          >
                            {`${oneWay[0]?.Results?.Segments[0][0]?.Origin?.Airport?.CityName}`}{" "}
                            →{" "}
                            {`${
                              oneWay[0]?.Results?.Segments[0][
                                oneWay[0]?.Results?.Segments[0].length - 1
                              ]?.Destination?.Airport?.CityName
                            }`}
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
                              {moment(
                                `${oneWay[0]?.Results?.Segments[0][0].Origin.DepTime}`
                              ).format("ddd, MMM D")}
                            </span>{" "}
                            {`${
                              oneWay[0]?.Results?.Segments[0].length - 1
                            } Stop.`}{" "}
                            {`${Math.floor(
                              moment
                                .duration(
                                  oneWay[0]?.Results?.Segments[0][
                                    oneWay[0]?.Results?.Segments[0].length - 1
                                  ].AccumulatedDuration,
                                  "minutes"
                                )
                                .asHours()
                            )} hrs ${moment
                              .duration(
                                oneWay[0]?.Results?.Segments[0][
                                  oneWay[0]?.Results?.Segments[0].length - 1
                                ].AccumulatedDuration,
                                "minutes"
                              )
                              .minutes()} min`}
                          </Typography>
                        </Grid2>
                        <Grid2
                          size={{ xs: 4 }}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                          }}
                        ></Grid2>
                      </Grid2>
                      <Divider />

                      {/* Intermediate flights start */}
                      <Box>
                        {oneWay[0]?.Results?.Segments[0]?.map(
                          (segment, index) => {
                            // console.log("segment:", segment);
                            return (
                              <>
                                <Grid2
                                  container
                                  spacing={1}
                                  sx={{ marginTop: "10px" }}
                                >
                                  {/* Flight Segment 1 */}
                                  <Grid2
                                    size={{ xs: 12 }}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <Image
                                      src={segment?.AirlineLogo}
                                      alt="Image"
                                      width={30}
                                      height={30}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                      sx={{
                                        fontFamily: nunito.style,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {segment?.Airline?.AirlineName}{" "}
                                      {segment?.Airline?.AirlineCode}{" "}
                                      {segment?.Airline?.FlightNumber}
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
                                      {moment(segment?.Origin?.DepTime).format(
                                        "HH:mm"
                                      )}{" "}
                                      - {segment?.Origin?.Airport?.CityName} (
                                      {segment?.Origin?.Airport?.AirportCode})
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
                                      {`${Math.floor(
                                        moment
                                          .duration(segment.Duration, "minutes")
                                          .asHours()
                                      )} hrs : ${moment
                                        .duration(segment.Duration, "minutes")
                                        .minutes()} min`}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: 700,
                                        fontFamily: nunito.style,
                                      }}
                                    >
                                      {moment(
                                        segment.Destination.ArrTime
                                      ).format("HH:mm")}{" "}
                                      - {segment.Destination.Airport.CityName} (
                                      {segment.Destination.Airport.AirportCode})
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
                                      <strong>Baggage :</strong>{" "}
                                      {segment.Baggage}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontFamily: nunito.style,
                                        fontWeight: 500,
                                      }}
                                    >
                                      <strong>Cabin Baggage :</strong>{" "}
                                      {segment.CabinBaggage}
                                    </Typography>
                                  </Grid2>
                                </Grid2>
                                <Divider />

                                {oneWay[0]?.Results?.Segments[0].length !=
                                segment.SegmentIndicator ? (
                                  <>
                                    <Box
                                      sx={{
                                        marginBottom: "10px",
                                        borderLeft: "2px dashed",
                                        paddingLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          marginTop: "10px",
                                          color: "orange",
                                          fontWeight: 600,
                                          fontFamily: nunito.style,
                                        }}
                                      >
                                        Change of Planes
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          marginTop: "10px",
                                          fontWeight: 700,
                                          fontFamily: nunito.style,
                                        }}
                                      >
                                        {`${moment
                                          .utc(
                                            moment(
                                              oneWay[0]?.Results?.Segments[0][
                                                index + 1
                                              ]?.Origin.DepTime,
                                              "YYYY-MM-DD HH:mm"
                                            ).diff(
                                              moment(
                                                oneWay[0]?.Results?.Segments[0][
                                                  index
                                                ]?.Destination.ArrTime,
                                                "YYYY-MM-DD HH:mm"
                                              )
                                            )
                                          )
                                          .format("H[h] : m[m]")}`}{" "}
                                        Layover in{" "}
                                        {`${segment?.Destination?.Airport?.AirportName}`}
                                      </Typography>
                                    </Box>
                                    <Divider />
                                  </>
                                ) : null}
                              </>
                            );
                          }
                        )}
                      </Box>
                      {/* Intermediate flights end */}
                    </Card>

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
                          fontFamily: nunito.style,
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
                            fontFamily: nunito.style,
                          }}
                        >
                          Adult
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: nunito.style,
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
                            fontFamily: nunito.style,
                          }}
                        >
                          Child
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: nunito.style,
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
                            fontFamily: nunito.style,
                          }}
                        >
                          Infant
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: nunito.style,
                          }}
                        >
                          {passengerCount?.infant}
                        </Typography>
                      </Stack>
                    </Box>

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
                          fontFamily: nunito.style,
                          fontWeight: 600,
                          mb: 1,
                          color: COLORS.PRIMARY,
                        }}
                      >
                        Journey Detail
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
                            fontFamily: nunito.style,
                          }}
                        >
                          Departure Date 
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: nunito.style,
                          }}
                        >
                          {moment((oneWay[0]?.Results?.Segments[0][0]?.Origin?.DepTime)).format( "D MMM, ddd")}
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
                            fontFamily: nunito.style,
                          }}
                        >
                          Departure Time 
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontFamily: nunito.style,
                          }}
                        >
                          {moment((oneWay[0]?.Results?.Segments[0][0]?.Origin?.DepTime)).format("HH:mm")}
                        </Typography>
                      </Stack>
                    </Box>

                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontFamily: nunito.style,
                            textAlign: "left",
                            mb:1
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
                    <Grid2 container mt={2} spacing={{lg:2 , xs:3}}>
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
                  </Box>
                </Grid2>
                {/* order-box */}

                {/* 


               <Grid2 size={{lg:4 ,xs:12}} order={{lg:2 ,xs:1}} > 
                  {smallScreen ?   <SwipeableEdgeDrawer   toggleDrawer={toggleDrawer} fairSummary ={<FareSummary toggleDrawer={toggleDrawer} commission={commission} fareData={flightDetails[0]?.Results}     /> }/> :
                 <FareSummary fareData={flightDetails[0]?.Results}   toggleDrawer={toggleDrawer} commission={commission} /> }

                 size={{ xs: 12, sm: 12, md: 4 }}
             
                </Grid2>
                
                */}
                


                <Grid2
                  size={{lg:4 ,xs:12}}
                  sx={{
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 2,
                    position: "sticky",
                    top: "75px",
                  }}
                >
                  {/* --------------fare Summary Start-----------------  */}

                  {smallScreen ?   <SwipeableEdgeDrawer   toggleDrawer={toggleDrawer} fairSummary ={<FareSummary toggleDrawer={toggleDrawer} commission={oneWay[2]}  fareData={oneWay[0]?.Results}      /> }/> :

                 <FareSummary  fareData={oneWay[0]?.Results}  commission={oneWay[2]}  toggleDrawer={toggleDrawer}  /> }



                  {/* <FareSummary
                    fareData={oneWay[0]?.Results}
                    commission={oneWay[2]}
                    toggleDrawer={toggleDrawer}
                  /> */}
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
                        minWidth: 10,
                      }}
                      disabled={!paymentPayload}
                      onClick={handlePay}
                    >
                      Pay Now
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </Container>
          </Grid2>
        </Grid2>
      ) : null}
    </>
  );
}
