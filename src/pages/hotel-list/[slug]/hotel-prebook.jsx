import React, { useEffect, useState, useRef } from "react";
import { COMMISSION_TYPE } from "@/utils/enum";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Container,
  Grid2,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import CommonFieldsForm from "@/components/hotels/CommonFieldsForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";
import { hotelController } from "@/api/hotelController";
import ReactLoading from "react-loading";
import { data } from "@/assests/data";
import UserVerifyForm from "@/components/hotels/UserVerifyForm";
import { getCombinedValidationSchema } from "@/utils/validationSchema";
import GuestForm from "@/components/hotels/GuestForm";
import moment from "moment";
import { useRouter } from "next/router";
import { useFormatCancellationPolicy } from "@/custom-hook/useFormatHotelCancellationPolicy";
import { paymentController } from "@/api/paymentController";
import { Formik, Form } from "formik";
import RateConditionCard from "@/components/hotels/HomepageHotels/RateConditionCard";
import { getRandomColor } from "@/custom-hook/getRandomColor";

const HotelPreBookPage = () => {
  const router = useRouter();

  const { paxRoom, checkIn, checkOut, userIp, nationality } = useSelector(
    (state) => state?.HOTEL?.HotelSearchData
  );

  const [preBookResponse, setPreBookResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  const [openFacilities, setOpenFacilities] = useState(false);
  const handleOpenFacilities = () => setOpenFacilities(true);
  const handleCloseFacilities = () => setOpenFacilities(false);

  // handling service fees calculation start using comission

const percentage = Number(preBookResponse?.COMMISSION?.percentage);
console.log("percentage:",percentage);
const isFixed=preBookResponse?.COMMISSION?.commission_type===COMMISSION_TYPE.FIXED;
let charge=0;
if(isFixed){
  charge=percentage;
}
else{
  charge=(preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.TotalFare*percentage)/100;
}

const serviceCharge=charge;


  // handling services fees calculcation end 

  // helper to read flags (supports multiple naming patterns)
  const getFlag = (flagName) => {
    if (!preBookResponse) return false;
    return (
      preBookResponse?.[flagName] ??
      preBookResponse?.[`Is${flagName}`] ??
      preBookResponse?.ValidationInfo?.[flagName] ??
      preBookResponse?.ValidationInfo?.[`Is${flagName}`] ??
      false
    );
  };

  // flags used for package/transport validation
  const hasPackageFare = getFlag("PackageFare");
  const packageDetailsMandatory = getFlag("PackageDetailsMandatory");
  const departureDetailsMandatory = getFlag("DepartureDetailsMandatory");

  const amenities = Array.isArray(
    preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.Amenities
  )
    ? preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.Amenities.filter(
        (x) => typeof x === "string" && x.trim()
      )
    : [];

  const MAX_VISIBLE_AMENITIES = 3;
  const visibleAmenities = amenities.slice(0, MAX_VISIBLE_AMENITIES);
  const remainingAmenities = Math.max(
    amenities.length - MAX_VISIBLE_AMENITIES,
    0
  );
  const shouldTruncateFacilities = remainingAmenities > 0;

  // centralized initial Values (transport objects included)
  const generateInitialValues = () => ({
    commonFields: {
      Email: "",
      Phoneno: "",
    },
    guestForms: paxRoom.map((room) => ({
      guests: [
        ...Array.from({ length: room.Adults }, () => ({
          type: "adult",
          Title: "mr",
          firstName: "",
          lastName: "",
          isBelow12: false,
          Age: 13,
          PAN: "",
          GuardianDetail: {
            Title: "mr",
            FirstName: "",
            LastName: "",
            PAN: "",
          },
          GSTCompanyAddress: "",
          GSTCompanyContactNumber: "",
          GSTCompanyName: "",
          GSTNumber: "",
          GSTCompanyEmail: "",
          PassportNo: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
          PassportIssueDate: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
          PassportExpDate: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
        })),
        ...room.ChildrenAges.map((age) => ({
          type: "child",
          Title: "mr",
          firstName: "",
          lastName: "",
          isBelow12: age < 12,
          Age: age,
          PAN: "",
          GuardianDetail: {
            Title: "mr",
            FirstName: "",
            LastName: "",
            PAN: "",
          },
          GSTCompanyAddress: "",
          GSTCompanyContactNumber: "",
          GSTCompanyName: "",
          GSTNumber: "",
          GSTCompanyEmail: "",
          PassportNo: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
          PassportIssueDate: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
          PassportExpDate: preBookResponse?.ValidationInfo?.PassportMandatory
            ? ""
            : null,
        })),
      ],
    })),
    arrivalTransport: {
      ArrivalTransportType: "",
      TransportInfoId: "",
      Time: "",
    },
    departureTransport: {
      DepartureTransportType: "",
      TransportInfoId: "",
      Time: "",
    },
  });

  function transformToBookingPayload(allValues, meta = {}) {
    return {
      BookingCode: meta.BookingCode,
      IsVoucherBooking: true,
      GuestNationality: meta.GuestNationality || "IN",
      EndUserIp: meta.EndUserIp || "192.168.1.1",
      RequestedBookingMode: 5,
      NetAmount: meta.NetAmount, // Must match PreBook response
      HotelRoomsDetails: allValues.map((room) => ({
        HotelPassenger: room.guests.map((pax, idx) => {
          const isAdult = pax.type === "adult";
          const isLead = idx === 0;

          const passenger = {
            Title: pax.Title || "",
            FirstName: pax.firstName || "",
            MiddleName: pax.middleName || "",
            LastName: pax.lastName || "",
            Email: pax.Email || null,
            Phoneno: pax.Phoneno || null,
            PaxType: isAdult ? 1 : 2,
            LeadPassenger: isLead,
            Age: pax.Age || null,
            PassportNo: pax.PassportNo || null,
            PassportIssueDate: pax.PassportIssueDate || null,
            PassportExpDate: pax.PassportExpDate || null,
            PaxId: 0,

            GSTCompanyAddress: pax.GSTCompanyAddress || null,
            GSTCompanyContactNumber: pax.GSTCompanyContactNumber || null,
            GSTCompanyName: pax.GSTCompanyName || null,
            GSTNumber: pax.GSTNumber || null,
            GSTCompanyEmail: pax.GSTCompanyEmail || null,
          };

          if (isAdult && pax.PAN) passenger.PAN = pax.PAN;

          if (!isAdult && pax.GuardianDetail) {
            passenger.GuardianDetail = {
              Title: pax.GuardianDetail.Title || null,
              FirstName: pax.GuardianDetail.FirstName || null,
              LastName: pax.GuardianDetail.LastName || null,
              PAN: pax.GuardianDetail.PAN || null,
            };
          }

          return passenger;
        }),
      })),
    };
  }

  const [expanded, setExpanded] = useState("room-0");
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const commonFormRef = useRef();
  const passengerFormRef = useRef([]);

  const validateAllPassengerForms = async () => {
    const errorsList = [];
    for (const ref of passengerFormRef.current) {
      if (ref?.validateForm) {
        const errors = await ref.validateForm();
        errorsList.push(errors || {});
      } else {
        errorsList.push({});
      }
    }
    return errorsList;
  };

  const [passengers, setPassengers] = useState({ adult: 0, child: 0 });

  const isAuthenticated = useSelector(
    (state) => state.USER.UserData.isAuthenticated
  );

  const hotel = data?.hotelPreBook?.HotelResult?.[0];
  const room = hotel?.Rooms?.[0];

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

  const cancellationPolicies =
    preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.CancelPolicies ?? [];
  const cancellationMessages =
    useFormatCancellationPolicy(cancellationPolicies);

  useEffect(() => {
    let adult = 0;
    let child = 0;

    paxRoom?.forEach((room) => {
      adult = adult + room.Adults;
      child = child + room.Children;
    });

    setPassengers({ adult, child });
  }, [paxRoom]);

  const calculateBaseFare = (dayRates = []) => {
    let total = 0;
    let roomCount = dayRates.length;
    let nightCount = 0;

    for (const room of dayRates) {
      if (Array.isArray(room)) {
        nightCount = Math.max(nightCount, room.length);
        for (const night of room) {
          total += night?.BasePrice || 0;
        }
      }
    }
    return { total, roomCount, nightCount };
  };
  const { total, roomCount, nightCount } = calculateBaseFare(
    preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.DayRates
  );
  // helper validators reused in onSubmit
  const isArrivalValid = (arrival) => {
    if (!arrival) return false;
    if (!arrival.TransportInfoId || !arrival.TransportInfoId.toString().trim())
      return false;
    if (![0, 1].includes(Number(arrival.ArrivalTransportType))) return false;
    if (!arrival.Time || isNaN(Date.parse(arrival.Time))) return false;
    return true;
  };

  const isDepartureValid = (departure) => {
    if (!departure) return false;
    if (
      !departure.TransportInfoId ||
      !departure.TransportInfoId.toString().trim()
    )
      return false;
    if (![0, 1].includes(Number(departure.DepartureTransportType)))
      return false;
    if (!departure.Time || isNaN(Date.parse(departure.Time))) return false;
    return true;
  };

  const submitBooking = async (finalPayload) => {
    try {
      setApiLoading(true);
      const res = await paymentController.hotelPaymentInit(finalPayload);
      setApiLoading(false);
      console.log("Booking response", res);
      if (res?.data?.data?.short_url) {
        window.location.href = res.data.data.short_url;
      } else {
        window.alert("Booking created but no redirect URL provided.");
      }
    } catch (err) {
      setApiLoading(false);
      console.error(err);
      window.alert(
        err?.response?.data?.message || err.message || "Booking failed"
      );
    }
  };

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
        <Formik
          enableReinitialize
          initialValues={generateInitialValues()}
          validationSchema={getCombinedValidationSchema(
            preBookResponse?.ValidationInfo
          )}
          // validate only when backend flags require it (true case)
          validate={(values) => {
            const errors = {};
            const arrival = values.arrivalTransport || {};
            const departure = values.departureTransport || {};

            if (packageDetailsMandatory) {
              if (
                !arrival.TransportInfoId ||
                !arrival.TransportInfoId.toString().trim()
              ) {
                errors.arrivalTransport = errors.arrivalTransport || {};
                errors.arrivalTransport.TransportInfoId =
                  "Arrival transport info id is required";
              }
              if (![0, 1].includes(Number(arrival.ArrivalTransportType))) {
                errors.arrivalTransport = errors.arrivalTransport || {};
                errors.arrivalTransport.ArrivalTransportType =
                  "Select arrival transport type";
              }
              if (!arrival.Time || isNaN(Date.parse(arrival.Time))) {
                errors.arrivalTransport = errors.arrivalTransport || {};
                errors.arrivalTransport.Time =
                  "Arrival time is required and must be valid";
              }
            }

            if (departureDetailsMandatory) {
              if (
                !departure.TransportInfoId ||
                !departure.TransportInfoId.toString().trim()
              ) {
                errors.departureTransport = errors.departureTransport || {};
                errors.departureTransport.TransportInfoId =
                  "Departure transport info id is required";
              }
              if (![0, 1].includes(Number(departure.DepartureTransportType))) {
                errors.departureTransport = errors.departureTransport || {};
                errors.departureTransport.DepartureTransportType =
                  "Select departure transport type";
              }
              if (!departure.Time || isNaN(Date.parse(departure.Time))) {
                errors.departureTransport = errors.departureTransport || {};
                errors.departureTransport.Time =
                  "Departure time is required and must be valid";
              }
            }

            return errors;
          }}
          onSubmit={async (values, formikHelpers) => {
            const needArrival = packageDetailsMandatory;
            const needDeparture = departureDetailsMandatory;

            if (needArrival && !isArrivalValid(values.arrivalTransport)) {
              formikHelpers.setFieldError(
                "arrivalTransport.TransportInfoId",
                "Arrival transport id is required"
              );
              formikHelpers.setFieldError(
                "arrivalTransport.ArrivalTransportType",
                "Select arrival transport type"
              );
              formikHelpers.setFieldError(
                "arrivalTransport.Time",
                "Provide a valid arrival time"
              );
              window.alert("Please provide valid Arrival transport details.");
              return;
            }

            if (needDeparture && !isDepartureValid(values.departureTransport)) {
              formikHelpers.setFieldError(
                "departureTransport.TransportInfoId",
                "Departure transport id is required"
              );
              formikHelpers.setFieldError(
                "departureTransport.DepartureTransportType",
                "Select departure transport type"
              );
              formikHelpers.setFieldError(
                "departureTransport.Time",
                "Provide a valid departure time"
              );
              window.alert("Please provide valid Departure transport details.");
              return;
            }

            // build payload core
            const cleanedGuestPayload = transformToBookingPayload(
              values.guestForms.map((room) => room),
              {
                BookingCode:
                  preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.BookingCode,
                GuestNationality: nationality?.country_code,
                EndUserIp: userIp,
                NetAmount:
                  preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.NetAmount,
              }
            );

            const duration =
              preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.DayRates?.[0]
                ?.length;
            const extraInformation = {
              hotelName: preBookResponse?.HotelResult?.[0]?.HotelName,
              hotelAddress: preBookResponse?.HotelResult?.[0]?.HotelAddress,
              roomType:
                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.Name?.[0],
              firstName: values.guestForms?.[0]?.guests?.[0]?.firstName,
              lastName: values.guestForms?.[0]?.guests?.[0]?.lastName,
              rooms: paxRoom?.length || 0,
              stayDuration: duration || 0,
              basePrice:
                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.PriceBreakUp?.[0]
                  ?.RoomRate || 0,
              tax: preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.TotalTax || 0,
              serviceFees:
                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.PriceBreakUp?.[0]
                  ?.AgentCommission || 0,
              checkIn: checkIn,
              checkOut: checkOut,
            };

            // NEW: PackageFare object (grouping all package fare validation data)
            const packageFare = {};
            if (hasPackageFare) {
              packageFare.IsPackageFare = true;

              if (needArrival || values.arrivalTransport?.TransportInfoId) {
                packageFare.ArrivalTransport = {
                  ArrivalTransportType: Number(
                    values.arrivalTransport?.ArrivalTransportType ?? 0
                  ),
                  TransportInfoId:
                    values.arrivalTransport?.TransportInfoId ?? "",
                  Time: values.arrivalTransport?.Time
                    ? new Date(values.arrivalTransport.Time).toISOString()
                    : undefined,
                };
              }

              if (needDeparture || values.departureTransport?.TransportInfoId) {
                packageFare.DepartureTransport = {
                  DepartureTransportType: Number(
                    values.departureTransport?.DepartureTransportType ?? 0
                  ),
                  TransportInfoId:
                    values.departureTransport?.TransportInfoId ?? "",
                  Time: values.departureTransport?.Time
                    ? new Date(values.departureTransport.Time).toISOString()
                    : undefined,
                };
              }

              // Optional echoes (safe to remove if not needed)
              packageFare.IsPackageDetailsMandatory = Boolean(
                packageDetailsMandatory
              );
              packageFare.IsDepartureDetailsMandatory = Boolean(
                departureDetailsMandatory
              );
            }

            const payload = {
              ...cleanedGuestPayload,
              extraInfo: extraInformation,
              ...(hasPackageFare ? { PackageFare: packageFare } : {}),
            };

            setApiLoading(true);
            await submitBooking(payload);
          }}
        >
          {(formik) => (
            <Form>
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
                              sx={{
                                fontWeight: "bold",
                                fontFamily: roboto.style,
                              }}
                              gutterBottom
                            >
                              {preBookResponse?.HotelResult?.[0]?.HotelName}
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
                                      (preBookResponse?.HotelResult?.[0]
                                        ?.HotelHotelRating || 0)
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
                              {preBookResponse?.HotelResult?.[0]?.HotelAddress}
                            </Typography>

                            {/* Room Promotions */}
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: nunito.style, mt: 1 }}
                            >
                              <strong>Room Promotions :</strong>{" "}
                              {Array.isArray(
                                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                  ?.RoomPromotion
                              )
                                ? preBookResponse.HotelResult[0].Rooms[0].RoomPromotion.join(
                                    ", "
                                  )
                                : preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                    ?.RoomPromotion ||
                                  "No promotions available"}
                            </Typography>

                            {/* Room Inclusion */}
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: nunito.style, mt: 1 }}
                            >
                              <strong>Inclusion :</strong>{" "}
                              {
                                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                  ?.Inclusion
                              }
                            </Typography>

                            {/* Meal Type */}
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: nunito.style, mt: 1 }}
                            >
                              <strong>Meal Type :</strong>{" "}
                              {
                                preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                  ?.MealType
                              }
                            </Typography>

                            {/* Supplements */}
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: nunito.style, mt: 1 }}
                            >
                              <strong>Supplements :</strong>{" "}
                              {preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                ?.Supplements?.length > 0 ? (
                                preBookResponse.HotelResult[0].Rooms[0].Supplements.map(
                                  (supplementGroup, groupIndex) => (
                                    <span key={groupIndex}>
                                      {supplementGroup.map((supplement, i) => (
                                        <span key={i}>
                                          {supplement.Description} -{" "}
                                          {supplement.Price}{" "}
                                          {supplement.Currency}
                                          {i < supplementGroup.length - 1 &&
                                            ", "}
                                        </span>
                                      ))}
                                    </span>
                                  )
                                )
                              ) : (
                                <span>No supplements</span>
                              )}
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

                    {/* Check in/out card */}
                    <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                      <CardContent>
                        <Grid2
                          container
                          spacing={2}
                          sx={{ alignItems: "center" }}
                        >
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
                              {checkIn}
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
                              {checkOut}
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
                              Children | {paxRoom?.length} Room
                            </Typography>
                          </Grid2>
                        </Grid2>
                      </CardContent>
                    </Card>

                    {/* Guest forms */}
                    <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                      {!isAuthenticated ? (
                        <Card sx={{ mb: "20px", p: "20px", mx: "auto" }}>
                          <UserVerifyForm />
                        </Card>
                      ) : (
                        <Card>
                          <CardContent>
                            {paxRoom?.map((room, index) => (
                              <Accordion
                                key={index}
                                expanded={expanded === `room-${index}`}
                                onChange={handleChange(`room-${index}`)}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
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
                                      values={formik.values.guestForms[index]}
                                      errors={formik.errors.guestForms?.[index]}
                                      touched={
                                        formik.touched.guestForms?.[index]
                                      }
                                      handleChange={formik.handleChange}
                                      handleBlur={formik.handleBlur}
                                      setFieldValue={formik.setFieldValue}
                                      setFieldTouched={formik.setFieldTouched}
                                      roomIndex={index}
                                      validationInfo={
                                        preBookResponse?.ValidationInfo
                                      }
                                    />
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </CardContent>

                          {/* Common Fields Section  */}
                          <CardContent>
                            <CommonFieldsForm
                              values={formik.values.commonFields}
                              errors={formik.errors.commonFields}
                              touched={formik.touched.commonFields}
                              handleChange={formik.handleChange}
                              handleBlur={formik.handleBlur}
                              setFieldValue={formik.setFieldValue}
                            />
                          </CardContent>
                        </Card>
                      )}
                    </Card>

                    {/* TRANSPORT: show only when server flags require it (true case) */}
                    {(packageDetailsMandatory || departureDetailsMandatory) && (
                      <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "700", fontFamily: roboto.style }}
                          >
                            Transport Details (required)
                          </Typography>

                          {/* Arrival */}
                          {packageDetailsMandatory && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="subtitle2">
                                Arrival Transport
                              </Typography>

                              <FormControl
                                fullWidth
                                sx={{ mt: 1 }}
                                error={Boolean(
                                  formik.errors?.arrivalTransport
                                    ?.ArrivalTransportType
                                )}
                              >
                                <InputLabel id="arrival-type-label">
                                  Type
                                </InputLabel>
                                <Select
                                  labelId="arrival-type-label"
                                  label="Type"
                                  {...formik.getFieldProps(
                                    "arrivalTransport.ArrivalTransportType"
                                  )}
                                  value={
                                    formik.values.arrivalTransport
                                      .ArrivalTransportType
                                  }
                                >
                                  <MenuItem value={0}>Flight</MenuItem>
                                  <MenuItem value={1}>Surface</MenuItem>
                                </Select>
                                <FormHelperText>
                                  {
                                    formik.errors?.arrivalTransport
                                      ?.ArrivalTransportType
                                  }
                                </FormHelperText>
                              </FormControl>

                              <TextField
                                fullWidth
                                label="Transport Info Id (e.g. flight no)"
                                sx={{ mt: 2 }}
                                {...formik.getFieldProps(
                                  "arrivalTransport.TransportInfoId"
                                )}
                                error={Boolean(
                                  formik.errors?.arrivalTransport
                                    ?.TransportInfoId
                                )}
                                helperText={
                                  formik.errors?.arrivalTransport
                                    ?.TransportInfoId
                                }
                              />

                              <TextField
                                fullWidth
                                label="Arrival Time"
                                type="datetime-local"
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                                {...formik.getFieldProps(
                                  "arrivalTransport.Time"
                                )}
                                error={Boolean(
                                  formik.errors?.arrivalTransport?.Time
                                )}
                                helperText={
                                  formik.errors?.arrivalTransport?.Time
                                }
                              />
                            </Box>
                          )}

                          {/* Departure */}
                          {departureDetailsMandatory && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="subtitle2">
                                Departure Transport
                              </Typography>

                              <FormControl
                                fullWidth
                                sx={{ mt: 1 }}
                                error={Boolean(
                                  formik.errors?.departureTransport
                                    ?.DepartureTransportType
                                )}
                              >
                                <InputLabel id="departure-type-label">
                                  Type
                                </InputLabel>
                                <Select
                                  labelId="departure-type-label"
                                  label="Type"
                                  {...formik.getFieldProps(
                                    "departureTransport.DepartureTransportType"
                                  )}
                                  value={
                                    formik.values.departureTransport
                                      .DepartureTransportType
                                  }
                                >
                                  <MenuItem value={0}>Flight</MenuItem>
                                  <MenuItem value={1}>Surface</MenuItem>
                                </Select>
                                <FormHelperText>
                                  {
                                    formik.errors?.departureTransport
                                      ?.DepartureTransportType
                                  }
                                </FormHelperText>
                              </FormControl>

                              <TextField
                                fullWidth
                                label="Transport Info Id (e.g. flight no)"
                                sx={{ mt: 2 }}
                                {...formik.getFieldProps(
                                  "departureTransport.TransportInfoId"
                                )}
                                error={Boolean(
                                  formik.errors?.departureTransport
                                    ?.TransportInfoId
                                )}
                                helperText={
                                  formik.errors?.departureTransport
                                    ?.TransportInfoId
                                }
                              />

                              <TextField
                                fullWidth
                                label="Departure Time"
                                type="datetime-local"
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                                {...formik.getFieldProps(
                                  "departureTransport.Time"
                                )}
                                error={Boolean(
                                  formik.errors?.departureTransport?.Time
                                )}
                                helperText={
                                  formik.errors?.departureTransport?.Time
                                }
                              />
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Cancellation policy card */}
                    <Card variant="outlined" sx={{ boxShadow: 1, mb: 3 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "700", fontFamily: roboto.style }}
                        >
                          Cancellation Policy
                        </Typography>

                        <List>
                          {cancellationMessages.map((msg, idx) => (
                            <ListItem
                              key={idx}
                              sx={{ alignItems: "flex-start", pl: 2 }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: roboto.style,
                                  fontWeight: 600,
                                }}
                              >
                                {msg}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Typography
                          mt={2}
                          color="text.primary"
                          sx={{
                            fontFamily: roboto.style,
                            fontWeight: 600,
                            pl: 2,
                          }}
                        >
                          Last Cancellation Deadline:{" "}
                          <strong>
                            {moment(
                              preBookResponse?.HotelResult?.[0]?.Rooms?.[0]
                                ?.LastCancellationDeadline,
                              "DD-MM-YYYY HH:mm:ss"
                            ).format("DD-MMM-YYYY, HH:mm")}
                          </strong>
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ boxShadow: 1 }}>
                      <RateConditionCard preBookResponse={preBookResponse} />
                    </Card>
                  </Box>
                </Grid2>

                {/* Right container */}
                <Grid2
                  size={{ xs: 12, md: 12, lg: 4 }}
                  sx={{
                    position: "sticky",
                    top: "80px",
                    alignSelf: "flex-start",
                    height: "fit-content",
                  }}
                >
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
                              Total Fare
                            </Typography>

                            <Typography
                              sx={{ fontFamily: roboto.style, fontWeight: 400, fontSize : 14 }}
                            >
                              ({roomCount} Room
                              {roomCount > 1 ? "s" : ""} × {nightCount} Night
                              {nightCount > 1 ? "s" : ""})
                            </Typography>
                          </Grid2>
                          <Grid2 item>
                            <Typography
                              sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                            >
                              ₹ {total.toFixed(2)}
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
                                sx={{
                                  fontFamily: roboto.style,
                                  fontWeight: 700,
                                }}
                                mr={1}
                              >
                                Total Tax
                              </Typography>
                            </Box>
                          </Grid2>
                          <Grid2 item>
                            <Typography
                              sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                            >
                              ₹{" "}
                              {preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.TotalTax?.toFixed(
                                2
                              )}
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
                                sx={{
                                  fontFamily: roboto.style,
                                  fontWeight: 700,
                                }}
                                mr={1}
                              >
                                Service Fees
                              </Typography>
                            </Box>
                          </Grid2>
                          <Grid2 item>
                            <Typography
                              sx={{ fontFamily: roboto.style, fontWeight: 700 }}
                            >
                              ₹{" "}
                              {serviceCharge?.toFixed(2)}
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
                              ₹{" "}
                              {(preBookResponse?.HotelResult?.[0]?.Rooms?.[0]?.TotalFare+serviceCharge).toFixed(
                                2
                              )}
                            </Typography>
                          </Grid2>
                        </Grid2>

                        <Button
                          variant="contained"
                          size="medium"
                          type="submit"
                          sx={{
                            width: "100%",
                            height: "30px",
                            my: 2,
                            py: 2,
                            bgcolor: COLORS.PRIMARY,
                            fontFamily: roboto.style,
                            fontWeight: 800,
                          }}
                        >
                          {apiLoading ? (
                            <ReactLoading
                              type={"bars"}
                              color={COLORS.BLACK}
                              height={30}
                              width={30}
                            />
                          ) : (
                            "Pay Now"
                          )}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                  <Container>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontFamily: nunito.style,
                        my: "15px",
                      }}
                    >
                      Amenities
                    </Typography>
                  </Container>

                  <Container>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                        mb: "25px",
                      }}
                    >
                      {/* Render first 3 amenities */}
                      {visibleAmenities.length === 0 ? (
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: nunito.style }}
                        >
                          No amenities listed.
                        </Typography>
                      ) : (
                        visibleAmenities.map((amenity, idx) => (
                          <Box key={`${amenity}-${idx}`}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontFamily: nunito.style,
                                padding: "6px 16px",
                                backgroundColor: getRandomColor(),
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                borderRadius: "23px",
                                fontWeight: 600,
                                textTransform: "capitalize",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {amenity}
                            </Typography>
                          </Box>
                        ))
                      )}

                      {/* +N amenities trigger */}
                      {shouldTruncateFacilities && (
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: nunito.style,
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              color: COLORS.GREEN,
                              "&:hover": { color: COLORS.PRIMARY },
                            }}
                            onClick={handleOpenFacilities}
                          >
                            +{remainingAmenities} amenities
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <CustomDialogFacilities
                      data={amenities}
                      open={openFacilities}
                      handleClose={handleCloseFacilities}
                    />
                  </Container>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>
      </Container>
    </Grid2>
  );
};

export default HotelPreBookPage;

function CustomDialogFacilities({ data, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.07)" } }}
      PaperProps={{
        sx: {
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.07)",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.PRIMARY,
        }}
      >
        Amenities
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((facility, index) => (
              <Box
                key={`${facility}-${index}`}
                sx={{
                  backgroundColor: getRandomColor(),
                  padding: "6px 12px",
                  borderRadius: "16px",
                  fontSize: "0.875rem",
                  fontFamily: nunito.style,
                  color: "#000",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                }}
              >
                {facility}
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
              No amenities available.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
