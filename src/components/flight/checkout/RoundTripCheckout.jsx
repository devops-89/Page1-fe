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
} from "@mui/material";
import { COLORS } from "@/utils/colors";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FareSummary from "../FareSummary";
import InternationalDetail from "../internationalDetail";
import DomesticDetail from "../domesticDetail";
import { JOURNEY } from "@/utils/enum";
import RoundFareSummary from "../RoundFareSummary";
import moment from "moment";

export default function RoundTripCheckout() {
  const router = useRouter();
  const selector = useSelector((state) => state.USER);
  const { isAuthenticated } = selector;
  const [roundTrip, setRoundTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passengerCount, setPassengerCount] = useState(null);

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
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

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
                                  fontFamily: nunito.style,
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
                            fontFamily: nunito.style,
                            fontWeight: 600,
                            mb: 1,
                            color: COLORS.PRIMARY,
                          }}
                        >
                          Journey Detail (
                          {roundTrip[0]?.Results?.Segments[0][0]?.Origin?.Airport?.CityCode} -{" "}
                          {
                            roundTrip[0]?.Results?.Segments[0][roundTrip[0]?.Results?.Segments[0].length - 1]?.Destination?.Airport
                              ?.CityCode
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
                            sx={{ fontWeight: 500, fontFamily: nunito.style }}
                          >
                            Departure Date
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 500, fontFamily: nunito.style }}
                          >
                            {moment(roundTrip[0]?.Results?.Segments[0][0]?.Origin?.DepTime).format(
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
                            sx={{ fontWeight: 500, fontFamily: nunito.style }}
                          >
                            Departure Time
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 500, fontFamily: nunito.style }}
                          >
                            {moment(roundTrip[0]?.Results?.Segments[0][0]?.Origin?.DepTime).format(
                              "HH:mm"
                            )}
                          </Typography>
                        </Stack>
                      </Box>
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
                           fontFamily: nunito.style,
                           fontWeight: 600,
                           mb: 1,
                           color: COLORS.PRIMARY,
                         }}
                       >
                         Journey Detail (
                         {roundTrip[1]?.Results?.Segments[0][0]?.Origin?.Airport?.CityCode} -{" "}
                         {
                           roundTrip[1]?.Results?.Segments[0][roundTrip[0]?.Results?.Segments[0].length - 1]?.Destination?.Airport
                             ?.CityCode
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
                           sx={{ fontWeight: 500, fontFamily: nunito.style }}
                         >
                           Departure Date
                         </Typography>
                         <Typography
                           sx={{ fontWeight: 500, fontFamily: nunito.style }}
                         >
                           {moment(roundTrip[1]?.Results?.Segments[0][0]?.Origin?.DepTime).format(
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
                           sx={{ fontWeight: 500, fontFamily: nunito.style }}
                         >
                           Departure Time
                         </Typography>
                         <Typography
                           sx={{ fontWeight: 500, fontFamily: nunito.style }}
                         >
                           {moment(roundTrip[1]?.Results?.Segments[0][0]?.Origin?.DepTime).format(
                             "HH:mm"
                           )}
                         </Typography>
                       </Stack>
                     </Box>
                     </>
                    )}

                    {/* Form Detail  */}
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

                <Grid2
                  size={{ xs: 12, sm: 12, md: 4 }}
                  sx={{
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 2,
                    position: "sticky",
                    top: "75px",
                  }}
                >
                  {/* --------------fare Summary Start-----------------  */}
                  {roundTrip[3]?.journey === JOURNEY.INTERNATIONAL ? (
                    <FareSummary
                      fareData={roundTrip[0]?.Results}
                      commission={roundTrip[2]}
                    />
                  ) : (
                    <RoundFareSummary
                      fareData={roundTrip}
                      commission={roundTrip[2]}
                    />
                  )}
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
