import { Box, Button, Card, Divider, Grid2, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";
import pointerImage from "@/../public/images/pointer.png";
import { roboto } from "@/utils/fonts";
import { useRouter } from "next/router";

const DomesticDetail = ({ flightDetails, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  // console.log("domestic",flightDetails)

  const router = useRouter();
  return (
    <>

      {flightDetails?.map((singleFlightDetail) => {
        return (
          <>
            {singleFlightDetail[0]?.Results &&  singleFlightDetail[0]?.Results?.Segments?.map(
              (segmentGroup, groupIndex) => (
                <Card
                  key={groupIndex}
                  sx={{ padding: "20px", marginBottom: "20px" }}
                >
                  <Grid2 container>
                    <Grid2 size={{ lg: 8, md: 8, sm: 8, xs: 12 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontFamily: roboto.style,
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        {`${segmentGroup[0]?.Origin?.Airport?.CityName}`} →{" "}
                        {`${
                          segmentGroup[segmentGroup.length - 1]?.Destination
                            ?.Airport?.CityName
                        }`}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ marginBottom: "10px" }}
                      >
                        <span
                          style={{
                            backgroundColor: "#FFEDD1",
                            padding: "5px",
                            borderRadius: "4px",
                            fontFamily: roboto.style,
                          }}
                        >
                          {moment(segmentGroup[0]?.Origin?.DepTime).format(
                            "ddd, MMM D"
                          )}
                        </span>{" "}
                        {`${segmentGroup.length - 1} Stop.`}{" "}


                        {segmentGroup[segmentGroup.length - 1]
                                ?.AccumulatedDuration!=undefined && `${Math.floor(
                          moment
                            .duration(
                              segmentGroup[segmentGroup.length - 1]
                                ?.AccumulatedDuration,
                              "minutes"
                            )
                            .asHours()
                        )} hrs ${moment
                          .duration(
                            segmentGroup[segmentGroup.length - 1]
                              ?.AccumulatedDuration,
                            "minutes"
                          )
                          .minutes()} min`}
                      </Typography>
                    </Grid2>

                    <Grid2
                      size={{ lg: 4, md: 4, sm: 4, xs: 12 }}
                      sx={{ display: "flex", justifyContent: {lg:"flex-end" ,md:"flex-end", sm:"flex-end" ,xs:"flex-start"} }}
                    >
                      <Button
                        size="small"
                        sx={{
                          fontFamily: roboto.style,
                          fontWeight: 800,
                          textAlign: "end",

                          display: {
                            xs:
                              router.query.slug ===
                              flightDetails?.[0][0]?.TraceId
                                ? "none"
                                : "block",
                          },
                        }}
                        onClick={handleClickOpen}
                      >
                        View Fare Rules
                      </Button>
                    </Grid2>
                  </Grid2>

                  <Divider />

                  {/* Domestic Flights */}
                  <Box>
                    {segmentGroup.map((segment, index) => (
                      <React.Fragment key={index}>
                        <Grid2 container spacing={1} sx={{ marginTop: "10px" }}>
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
                              alt="Airline Logo"
                              width={30}
                              height={30}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{ fontFamily: roboto.style, fontWeight: 600 }}
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
                              sx={{ fontWeight: 700, fontFamily: roboto.style }}
                            >
                              {moment(segment?.Origin?.DepTime).format("HH:mm")}{" "}
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
                                alt="Pointer"
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
                              sx={{ fontWeight: 700, fontFamily: roboto.style }}
                            >
                              {moment(segment?.Destination?.ArrTime).format(
                                "HH:mm"
                              )}{" "}
                              - {segment?.Destination?.Airport?.CityName} (
                              {segment?.Destination?.Airport?.AirportCode})
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
                              sx={{ fontFamily: roboto.style, fontWeight: 500 }}
                            >
                              <strong>Baggage:</strong> {segment?.Baggage}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: roboto.style, fontWeight: 500 }}
                            >
                              <strong>Cabin Baggage:</strong>{" "}
                              {segment?.CabinBaggage}
                            </Typography>
                          </Grid2>
                        </Grid2>

                        <Divider />

                        {index < segmentGroup.length - 1 && (
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
                                  fontFamily: roboto.style,
                                }}
                              >
                                Change of Planes
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  marginTop: "10px",
                                  fontWeight: 700,
                                  fontFamily: roboto.style,
                                }}
                              >
                                {`${moment
                                  .utc(
                                    moment(
                                      segmentGroup[index + 1]?.Origin?.DepTime,
                                      "YYYY-MM-DD HH:mm"
                                    ).diff(
                                      moment(
                                        segment?.Destination?.ArrTime,
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
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Card>
              )
            )}
          </>
        );
      })}
    </>
  );
};

export default DomesticDetail;
