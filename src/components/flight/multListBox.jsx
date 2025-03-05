import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import moment from "moment";
import {
  FlightTakeoff,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";

const MultiListBox = ({ details, traceId, journey }) => {
  const [cabin, setCabin] = useState(null);
    const router = useRouter();

  const [flightDetails, setFlightDetails] = useState(details);

  useEffect(() => {
    let cabinData = data.FLIGHT_CLASS_DATA.find((fligtClass) => {
      return fligtClass.value == flightDetails?.departure[0][0]?.CabinClass;
    });
    setCabin(cabinData.label);
  }, [flightDetails, data.FLIGHT_CLASS_DATA]);

  const routetoAnotherPage = () => {
    router.push({
      pathname: `/multi-list/${flightDetails?.AirlineCode}/view-details`,
      query: {
        ResultIndex: flightDetails?.ResultIndex,
        traceId: traceId,
        journey:journey
      },
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
          p: 2,
          cursor: "pointer",
          mb: "30px",
        }}
      >
        <Grid2
          container
          sx={{ mb: "15px" }}
          spacing={2}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Grid2 size={12}>
            {flightDetails?.departure?.map((flight, index) => {
              return (
                <Accordion defaultExpanded={index == 0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${1}-header`}
                    sx={{ backgroundColor: COLORS.SEMIGREY }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: nunito.style,
                      }}
                    >
                      {flight[0]?.Origin?.Airport?.CityName} -{" "}
                      {
                        flight[flight?.length - 1]?.Destination?.Airport
                          ?.CityName
                      }
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid2 container spacing={2}>
                      <Grid2 size={12}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            <Image
                              src={flight[0]?.AirlineLogo}
                              alt="Image"
                              width={30}
                              height={30}
                            />
                            <Typography
                              sx={{
                                fontSize: 15,
                                fontFamily: nunito.style,
                                fontWeight: 550,
                              }}
                            >
                              {`${flight[0]?.Airline?.AirlineName} Airline`}{" "}
                              {`(${flight[0]?.Airline?.AirlineCode} ${flight[0]?.Airline?.FlightNumber})`}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid2>

                      <Grid2 size={4}>
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: nunito.style,
                          }}
                        >
                          {moment(flight[0]?.Origin?.DepTime).format("HH:mm")}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: nunito.style,
                          }}
                        >
                          {flight[0]?.Origin?.Airport?.AirportCode} -{" "}
                          {flight[0]?.Origin?.Airport?.Terminal} Terminal
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: nunito.style,
                          }}
                        >
                          {flight[0]?.Origin?.Airport?.CityName}
                        </Typography>
                      </Grid2>

                      <Grid2 size={4}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 700,
                            fontFamily: nunito.style,
                            textAlign: "center",
                          }}
                        >
                          {`${Math.floor(
                            moment
                              .duration(
                                flight[flight.length - 1].AccumulatedDuration,
                                "minutes"
                              )
                              .asHours()
                          )} hrs ${moment
                            .duration(
                              flight[flight.length - 1].AccumulatedDuration,
                              "minutes"
                            )
                            .minutes()} min`}
                        </Typography>

                        <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
                          <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
                            <FlightTakeoff sx={{ fontSize: 17 }} />
                          </Avatar>
                        </Divider>
                      </Grid2>

                      <Grid2 size={4}>
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: nunito.style,
                            textAlign: "end",
                          }}
                        >
                          {moment(
                            flight[flight?.length - 1]?.Destination?.ArrTime
                          ).format("HH:mm")}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: nunito.style,
                            textAlign: "end",
                          }}
                        >
                          {
                            flight[flight?.length - 1]?.Destination?.Airport
                              ?.AirportCode
                          }
                          -{" "}
                          {
                            flight[flight?.length - 1]?.Destination?.Airport
                              ?.Terminal
                          }{" "}
                          Terminal
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: nunito.style,
                            textAlign: "end",
                          }}
                        >
                          {
                            flight[flight?.length - 1]?.Destination?.Airport
                              ?.CityName
                          }
                        </Typography>
                      </Grid2>

                      <Grid2
                        size={12}
                        container
                        sx={{
                          borderTop: `1px solid ${COLORS.GREY}`,
                          paddingTop: "10px",
                        }}
                      >
                        <Grid2 size={6}>
                          <Typography
                            sx={{
                              fontSize: 15,
                              color: COLORS.DANGER,
                              fontFamiy: nunito.style,
                              fontWeight: 500,
                            }}
                          >
                            Only {flight[0]?.NoOfSeatAvailable} seats left
                          </Typography>
                        </Grid2>
                        <Grid2 size={6} sx={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              fontSize: 15,
                              fontFamiy: nunito.style,
                              fontWeight: 500,
                            }}
                          >
                            Baggage : {flight[0]?.Baggage} &nbsp; Cabin Baggage
                            : {flight[0]?.CabinBaggage}
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </Grid2>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Grid2>

          {/* second  */}
          <Grid2 size={12} container>
            <Grid2 size={6} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: nunito.style,
                  fontWeight: 550,
                }}
              >
                Travel Class : {cabin ? cabin : undefined}
              </Typography>
            </Grid2>
            <Grid2
              size={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 900,
                  fontFamily: nunito.style,
                  marginRight: "10px",
                }}
              >
                ₹ {flightDetails?.TotalFare}
              </Typography>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.BLACK,
                  fontWeight: 550,
                  fontSize: 16,
                  fontFamily: nunito.style,
                }}
                onClick={routetoAnotherPage}
              >
                Book Now
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Card>
    </>
  );
};

export default MultiListBox;
