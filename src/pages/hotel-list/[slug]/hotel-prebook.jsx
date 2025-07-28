import React, { useEffect, useState, useRef } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Container,
  Paper,
  Grid2,
  Button,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CommonFieldsForm from "@/components/hotels/CommonFieldsForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";
import { hotelController } from "@/api/hotelController";
import ReactLoading from "react-loading";
import { data } from "@/assests/data";
import UserVerifyForm from "@/components/hotels/UserVerifyForm";
import GuestForm from "@/components/hotels/GuestForm";
import moment from "moment";
import { useRouter } from "next/router";
import { useFormatCancellationPolicy } from "@/custom-hook/useFormatHotelCancellationPolicy";

const HotelPreBookPage = () => {
  // make router instance for extracting instance
  const router = useRouter();

    // extracting the search info from redux
  const hotelSearchData = useSelector((state) => state?.HOTEL?.HotelSearchData);

  // states for expanding the guest form
  const [expanded, setExpanded] = useState("room-0");

  //   refs for attaching to the child formik forms
     const commonFormRef=useRef();
     const passengerFormRef=useRef([]);


   useEffect(() => {
  if (
    hotelSearchData?.paxRoom?.length &&
    passengerFormRef.current.length !== hotelSearchData?.paxRoom?.length
  ) {
    passengerFormRef.current = Array(hotelSearchData.paxRoom.length)
      .fill()
      .map((_, i) => passengerFormRef.current[i] || React.createRef());
  }
}, [hotelSearchData?.paxRoom?.length]);

  // function for handling the form expansion change
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // parsing html from the api response
  function decodeHTMLEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }



  // passengers info
  const [passengers, setPassengers] = useState({ adult: 0, child: 0 });

  // making state variables for preBook Api Call
  const [preBookResponse, setPreBookResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // extracting the logic status to login and giving access
  const isAuthenticated = useSelector(
    (state) => state.USER.UserData.isAuthenticated
  );

  console.log("router Value:", router.query.slug);
  console.log("router is ready or not!:", router.isReady);

  // extractimg the hotel data to render
  const hotel = data?.hotelPreBook?.HotelResult?.[0];
  const room = hotel?.Rooms?.[0];

  // preBook API Calling Here
  useEffect(() => {
    if (!router.isReady) return;

    const fetchPreBook = async () => {
      const bookingCode = router?.query?.slug;

      try {
        const response = await hotelController.preBook({
          BookingCode: bookingCode,
          PaymentMode: "Limit",
        });
        setPreBookResponse(response?.data?.data);
        console.log("PreBook Response:", response?.data?.data);
      } catch (error) {
        console.error("PreBook Error:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreBook();
  }, [router.isReady, router.query.slug]);

  // extracting the cancellation policy for formating it
  const cancellationPolicies =
    preBookResponse?.HotelResult[0]?.Rooms[0]?.CancelPolicies;
  const cancellationMessages =
    useFormatCancellationPolicy(cancellationPolicies);

  // calculating the number of adults and child
  useEffect(() => {
    let adult = 0;
    let child = 0;

    hotelSearchData?.paxRoom?.map((room) => {
      adult = adult + room.Adults;
      child = child + room.Children;
    });

    setPassengers({ adult, child });
  }, [hotelSearchData]);

  if (loading) {
    return (
      <Grid2 container>
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
            Complete Your Booking
          </Typography>
        </Grid2>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <ReactLoading
              type={"bars"}
              color={COLORS.PRIMARY}
              height={60}
              width={60}
            />
          </Box>
        </Container>
      </Grid2>
    );
  }

  return (
    <Grid2 container>
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
          Complete Your Booking
        </Typography>
      </Grid2>
      <Container>
        <Grid2 container sx={{ my: 4 }} spacing={2}>
          {/* Left container */}
          <Grid2
            size={{ xs: 12, md: 12, lg: 8 }}
            sx={{ bgcolor: COLORS.WHITE }}
          >
            <Box>
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{ xs: 12, md: 12, lg: 9 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", fontFamily: roboto.style }}
                        gutterBottom
                      >
                        {preBookResponse.HotelResult[0].HotelName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            sx={{
                              color:
                                index <
                                preBookResponse.HotelResult[0].HotelHotelRating
                                  ? COLORS.PRIMARY
                                  : "#ccc",
                            }}
                          />
                        ))}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        gutterBottom
                        sx={{
                          fontFamily: roboto.style,
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        {preBookResponse.HotelResult[0].HotelAddress}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 12, lg: 3 }}>
                      <img
                        src="https://r1imghtlak.mmtcdn.com/de2824ba6a0211e8ab4a022fd3fb960a.jpg"
                        alt="hotel_image"
                        width={150}
                        height={130}
                        style={{ borderRadius: "8px" }}
                      />
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>

              {/* this section is used to show the check in and checkout information */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Grid2 container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 3 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        sx={{ fontWeight: 800, fontFamily: roboto.style }}
                      >
                        CHECK IN
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 600, fontFamily: roboto.style }}
                      >
                        {hotelSearchData?.checkIn}
                      </Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 2 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        sx={{
                          border: `2px solid ${COLORS.PRIMARY}`,
                          textAlign: "center",
                          borderRadius: 5,
                          backgroundColor: COLORS.PRIMARY,
                          fontWeight: 600,
                          fontFamily: roboto.style,
                        }}
                      >
                        DAY USE
                      </Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 3 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        sx={{ fontWeight: 800, fontFamily: roboto.style }}
                      >
                        CHECK OUT
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 600, fontFamily: roboto.style }}
                      >
                        {hotelSearchData?.checkOut}
                      </Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 12, md: 12, lg: 4 }}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        sx={{ fontWeight: 700, fontFamily: roboto.style }}
                      >
                        {passengers?.adult} Adults | {passengers?.child}{" "}
                        Children | {hotelSearchData?.paxRoom?.length} Room
                      </Typography>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>

              {/* this section is for adding guest information to proceed for booking */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                {!isAuthenticated ? (
                  <Card sx={{ mb: "20px", p: "20px", mx: "auto" }}>
                    <UserVerifyForm />
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      {hotelSearchData?.paxRoom?.map((room, index) => (
                        <Accordion
                          key={index}
                          expanded={expanded === `room-${index}`}
                          onChange={handleChange(`room-${index}`)}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                fontFamily: roboto.style,
                              }}
                            >
                              Guest Details for Room {index + 1}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box sx={{ mb: 2 }}>
                              <GuestForm
                                roomIndex={index}
                                validationInfo={preBookResponse?.ValidationInfo}
                              />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </CardContent>

                    {/* Common Fields Section  */}
                    <CardContent>
                      <CommonFieldsForm formikRef={commonFormRef} />
                    </CardContent>
                  </Card>
                )}
              </Card>

              {/* this section is used to show the additional information to be shown for the hotels */}
              <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "700", fontFamily: roboto.style }}
                  >
                    Cancellation Policy
                  </Typography>
                  {/* {room?.CancelPolicies.map((policy, idx) => (
                    <Box key={idx} mt={1}>
                      <Typography
                       color="text.primary"
                        sx={{ fontFamily: roboto.style, fontWeight: 600 }}
                      >
                        From:{" "}
                        <strong>
                          {moment(
                            policy.FromDate,
                            "DD-MM-YYYY HH:mm:ss"
                          ).format("DD-MMM-YYYY")}
                        </strong>{" "}
                        - <strong>{policy.CancellationCharge}%</strong> charge (
                        {policy.ChargeType})
                      </Typography>
                    </Box>
                  ))} */}

                  <List>
                    {cancellationMessages.map((msg, idx) => (
                      <ListItem
                        key={idx}
                        sx={{ alignItems: "flex-start", pl: 2 }}
                      >
                        <Typography
                          sx={{ fontFamily: roboto.style, fontWeight: 600 }}
                        >
                          {msg}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  {/* Last Cancellation Deadline */}
                  <Typography
                    mt={2}
                    color="text.primary"
                    sx={{ fontFamily: roboto.style, fontWeight: 600, pl: 2 }}
                  >
                    Last Cancellation Deadline:{" "}
                    <strong>
                      {moment(
                        room?.LastCancellationDeadline,
                        "DD-MM-YYYY HH:mm:ss"
                      ).format("DD-MMM-YYYY, HH:mm")}
                    </strong>
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontFamily: roboto.style }}
                  >
                    Rate Condition
                  </Typography>
                  <List>
                    {preBookResponse?.HotelResult?.[0]?.RateConditions.map(
                      (cond, idx) => (
                        <ListItem key={idx} alignItems="flex-start">
                          <Typography
                            color="text.primary"
                            sx={{ fontFamily: roboto.style, fontWeight: 600 }}
                            dangerouslySetInnerHTML={{
                              __html: decodeHTMLEntities(cond),
                            }}
                          />
                        </ListItem>
                      )
                    )}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid2>

          {/* Right container (updated) */}
          <Grid2 size={{ xs: 12, md: 12, lg: 4 }}>
            <Card
              variant="outlined"
              sx={{ boxShadow: 1, p: 1, borderRadius: 0 }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontFamily: roboto.style, fontWeight: 800 }}
                >
                  Price Breakup
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                      >
                        <span>1 Room</span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                      >
                        Base Price
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                      >
                        ₹ 5,644
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Box display="flex" alignItems="center">
                        <Typography
                          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                          mr={1}
                        >
                          Hotel Taxes
                        </Typography>
                      </Box>
                    </Grid2>
                    <Grid2 item>
                      <Typography
                        sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                      >
                        ₹ 677
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ pt: 1 }}>
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid2 item>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: roboto.style, fontWeight: 800 }}
                      >
                        Total Amount to be paid
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: roboto.style, fontWeight: 800 }}
                      >
                        ₹ 6,321
                      </Typography>
                    </Grid2>
                  </Grid2>

                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      width: "100%",
                      height: "30px",
                      my: 2,
                      py: 2,
                      bgcolor: COLORS.PRIMARY,
                      fontFamily: roboto.style,
                      fontWeight: 800,
                    }}

                    onClick={async()=>{
                     await commonFormRef.current.submitForm();

                    
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Grid2>
  );
};

export default HotelPreBookPage;
