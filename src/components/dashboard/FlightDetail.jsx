import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    Grid2,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
    AirlineSeatReclineNormal as SeatIcon,
    Restaurant as MealIcon,
    Luggage as BaggageIcon,
    FlightTakeoff as FlightIcon,
    ConfirmationNumber as PnrIcon,
    ReceiptLong as BookingIcon,
    CheckCircle as StatusIcon,
    LocalOffer as OfferIcon,
    CardTravel as CardIcon,
    EventSeat as TicketStatusIcon,
    AccessTime as TimeIcon,
    LocationOn as LocationIcon,
    ArrowForward as ArrowIcon,
} from "@mui/icons-material";

import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { flightController } from "@/api/flightController";

const journeyMap = {
    1: "ONEWAY",
    2: "ROUNDTRIP",
    3: "MULTITRIP",
};

// Helper for SSR icon
const getSsrIcon = (code = "") => {
    const c = code.toLowerCase();
    if (c.includes("seat")) return <SeatIcon sx={{ color: COLORS.PRIMARY }} />;
    if (c.includes("meal") || c.includes("ml"))
        return <MealIcon sx={{ color: COLORS.PRIMARY }} />;
    if (c.includes("bag") || c.includes("bg"))
        return <BaggageIcon sx={{ color: COLORS.PRIMARY }} />;
    return <StatusIcon sx={{ color: COLORS.PRIMARY }} />;
};

// SSR Display Component
const SsrBlock = ({ ssr }) => (
    <Box
        sx={{
            p: 2,
            mb: 1.5,
            borderRadius: 2,
            background: "#f9fbff",
            border: "1px solid #e3e8ef",
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
        }}
    >
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `${COLORS.PRIMARY}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}
        >
            {getSsrIcon(ssr?.SsrCode)}
        </Box>

        <Box>
            <Typography sx={{ fontFamily: nunito.style, fontWeight: 600 }}>
                {ssr?.SsrCode}
            </Typography>
            <Typography sx={{ fontFamily: nunito.style, fontSize: 14, color: "#555" }}>
                {ssr?.Detail}
            </Typography>
        </Box>
    </Box>
);

const FlightDetail = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [itinerary, setItinerary] = useState(null);
    const [commission,setCommission]=useState(0);
    const reduxIp = useSelector(
        (state) => state?.FlightPersist?.FlightState?.ip_address
    );

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await flightController.getBookingStatus({
                    ip: reduxIp,
                    order_id: id,
                });
                const detailData = response?.data?.data?.bookingDetails?.Response;
                setCommission(response?.data?.data?.commission || 0);
                setItinerary({
                    ...detailData?.FlightItinerary,
                    bookingStatus: response?.data?.data?.bookingStatus,
                });
            } catch (e) {
                console.error("Error fetching flight detail", e);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    console.log("itienary:", itinerary)

    if (loading || !itinerary)
        return (
            <Typography
                sx={{ fontFamily: nunito.style, textAlign: "center", py: 4 }}
            >
                Loading flight details...
            </Typography>
        );

    const { Segments: segments = [], Passenger: passengers = [] } = itinerary;
    const journeyType = journeyMap[itinerary.JourneyType];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 3 }}>
                Flight Booking Details
            </Typography>

            {/* Booking Header */}
            <Paper
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 3,
                    background: "linear-gradient(135deg, #ffffff 0%, #f4f7fb 100%)",
                    border: `1px solid ${COLORS.BORDER_LIGHT}`,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                    "&:hover": { boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
                }}
            >
                {/* Airline & Route */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            width: 55,
                            height: 55,
                            borderRadius: "14px",
                            background: `${COLORS.PRIMARY}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FlightIcon sx={{ fontSize: 32, color: COLORS.PRIMARY }} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontFamily: nunito.style, fontWeight: 700, fontSize: 20 }}>
                            {itinerary?.Origin} → {itinerary?.Destination}
                        </Typography>
                        <Typography sx={{ fontFamily: nunito.style, color: "#555" }}>
                            {moment(segments?.[0]?.Origin?.DepTime).format("DD MMM, hh:mm A")}
                        </Typography>
                    </Box>
                </Box>

                {/* PNR / Booking ID / Status */}
                <Stack direction="row" spacing={3} sx={{ minWidth: 260 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PnrIcon sx={{ color: COLORS.PRIMARY }} />
                        <Typography sx={{ fontFamily: nunito.style }}>PNR: {itinerary?.PNR}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BookingIcon sx={{ color: COLORS.PRIMARY }} />
                        <Typography sx={{ fontFamily: nunito.style }}>
                            Booking ID: {itinerary?.BookingId}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <StatusIcon sx={{ color: "green" }} />
                        <Typography sx={{ fontFamily: nunito.style }}>
                            Booking Status: {itinerary?.bookingStatus}
                        </Typography>
                    </Box>
                </Stack>

                {/* Fare Summary */}
                <Box sx={{ minWidth: 200, textAlign: "right" }}>
                    <Typography sx={{ fontFamily: nunito.style, fontWeight: 700, fontSize: 16 }}>
                        Fare Summary
                    </Typography>
                    <Typography sx={{ fontFamily: nunito.style, fontWeight: 700, fontSize: 22, color: COLORS.PRIMARY }}>
                       ₹{(
  (Number(itinerary?.Fare?.PublishedFare) || 0) +
  commission
).toFixed(2)}
                    </Typography>
                    <Typography sx={{ fontFamily: nunito.style, color: "#777" }}>
                        Invoice No: {itinerary?.InvoiceNo}
                    </Typography>
                </Box>
            </Paper>

            {/* SSR Section */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 3,
                    background: "#fff",
                    border: `1px solid ${COLORS.BORDER_LIGHT}`,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: nunito.style,
                        fontSize: 18,
                        fontWeight: 700,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <PeopleAltIcon sx={{ color: COLORS.PRIMARY }} /> Passenger Details
                </Typography>

                {passengers.map((pax, idx) => (
                    <Accordion
                        key={idx}
                        defaultExpanded={idx === 0}    // FIRST ACCORDION OPEN
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #e0e0e0",
                            "&:before": { display: "none" },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                background: "#f7f9fc",
                                borderBottom: "1px solid #e0e0e0",
                                "& .MuiAccordionSummary-content": {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%"
                                },
                            }}
                        >
                            {/* LEFT: Passenger Name */}
                            <Typography
                                sx={{
                                    fontFamily: nunito.style,
                                    fontWeight: 700,
                                    color: COLORS.PRIMARY,
                                }}
                            >
                                {pax.Title} {pax.FirstName} {pax.LastName}
                            </Typography>

                            {/* RIGHT: Ticket Details */}
                            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>

                                {/* Ticket Number */}
                                {pax?.Ticket?.TicketNumber && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                        <TicketStatusIcon sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                                        <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                                            {pax?.Ticket?.TicketNumber}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Seat */}
                                {pax.SeatDynamic?.length > 0 && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                        <SeatIcon sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                                        <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                                            {pax.SeatDynamic[0].Code}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Meal */}
                                {pax.MealDynamic?.length > 0 && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                        <MealIcon sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                                        <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                                            {pax.MealDynamic[0].Code}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Baggage */}
                                {pax.Baggage?.length > 0 && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                        <BaggageIcon sx={{ fontSize: 20, color: COLORS.PRIMARY }} />
                                        <Typography sx={{ fontSize: 14, fontFamily: nunito.style }}>
                                            {pax.Baggage[0].Weight} Kg
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </AccordionSummary>


                        <AccordionDetails sx={{ background: "#fff", p: 2 }}>

                            {/* SEAT DYNAMIC */}
                            {pax.SeatDynamic?.length > 0 && (
                                <Box
                                    sx={{
                                        p: 2,
                                        mb: 1.5,
                                        borderRadius: 2,
                                        background: "#f9fbff",
                                        border: "1px solid #e3e8ef",
                                        display: "flex",
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            background: `${COLORS.PRIMARY}15`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SeatIcon sx={{ color: COLORS.PRIMARY }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontFamily: nunito.style }}>
                                            Seat Selected
                                        </Typography>
                                        {pax.SeatDynamic.map((seat, i) => (
                                            <Typography
                                                key={i}
                                                sx={{
                                                    fontFamily: nunito.style,
                                                    fontSize: 14,
                                                    color: "#555",
                                                }}
                                            >
                                                {seat.Code} —
                                                {seat.Description === 2 ? "Paid Seat" : "Seat"}
                                                (Row {seat.RowNo}, {seat.SeatNo})
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* MEAL DYNAMIC */}
                            {pax.MealDynamic?.length > 0 && (
                                <Box
                                    sx={{
                                        p: 2,
                                        mb: 1.5,
                                        borderRadius: 2,
                                        background: "#f9fbff",
                                        border: "1px solid #e3e8ef",
                                        display: "flex",
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            background: `${COLORS.PRIMARY}15`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <MealIcon sx={{ color: COLORS.PRIMARY }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontFamily: nunito.style }}>
                                            Meal Added
                                        </Typography>
                                        {pax.MealDynamic.map((meal, i) => (
                                            <Typography
                                                key={i}
                                                sx={{
                                                    fontFamily: nunito.style,
                                                    fontSize: 14,
                                                    color: "#555",
                                                }}
                                            >
                                                {meal.Code} — {meal.AirlineDescription} (₹{meal.Price})
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* BAGGAGE */}
                            {pax.Baggage?.length > 0 && (
                                <Box
                                    sx={{
                                        p: 2,
                                        mb: 1.5,
                                        borderRadius: 2,
                                        background: "#f9fbff",
                                        border: "1px solid #e3e8ef",
                                        display: "flex",
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            background: `${COLORS.PRIMARY}15`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <BaggageIcon sx={{ color: COLORS.PRIMARY }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontFamily: nunito.style }}>
                                            Extra Baggage
                                        </Typography>
                                        {pax.Baggage.map((bag, i) => (
                                            <Typography
                                                key={i}
                                                sx={{
                                                    fontFamily: nunito.style,
                                                    fontSize: 14,
                                                    color: "#555",
                                                }}
                                            >
                                                {bag.Weight} Kg (₹{bag.Price})
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* NORMAL SSR ITEMS */}
                            {pax.Ssr?.length > 0 &&
                                pax.Ssr.map((ssr, i) => <SsrBlock key={i} ssr={ssr} />)}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>

            {/* Trip Information */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                    <FlightIcon sx={{ color: COLORS.PRIMARY }} /> Trip Information
                </Typography>

                {/* Group segments by TripIndicator */}
                {(() => {
                    const trips = {};
                    segments.forEach(seg => {
                        if (!trips[seg.TripIndicator]) trips[seg.TripIndicator] = [];
                        trips[seg.TripIndicator].push(seg);
                    });
                    return Object.keys(trips).map((tripKey, idx) => (
                        <Box key={idx} sx={{ mb: 3 }}>
                            {/* Optional title for return/multi trips */}
                            {journeyType !== "ONEWAY" && (
                                <Typography sx={{ fontWeight: 700, mb: 1, color: COLORS.PRIMARY }}>
                                    {tripKey === "1" ? "Outbound" : tripKey === "2" ? "Return" : `Trip ${tripKey}`}
                                </Typography>
                            )}

                            {trips[tripKey].map((seg, sidx) => (
                                <Box key={sidx} sx={{ mb: 2.5, p: 2, borderRadius: 2, border: "1px solid #e0e0e0", background: "#fafafa" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1 }}>
                                        <LocationIcon sx={{ color: COLORS.PRIMARY }} />
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {seg.Origin.Airport.CityName} ({seg.Origin.Airport.AirportCode})
                                        </Typography>
                                        <ArrowIcon sx={{ opacity: 0.6 }} />
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {seg.Destination.Airport.CityName} ({seg.Destination.Airport.AirportCode})
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 0.5 }}>
                                        <TimeIcon sx={{ color: COLORS.PRIMARY }} />
                                        <Typography sx={{ color: "#555" }}>
                                            {moment(seg.Origin.DepTime).format("DD MMM YYYY, hh:mm A")} → {moment(seg.Destination.ArrTime).format("DD MMM YYYY, hh:mm A")}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mt: 0.5, fontSize: 14, color: "#777" }}>
                                        Airline: {seg.Airline.AirlineName} ({seg.Airline.AirlineCode}) | Flight No: {seg.Airline.FlightNumber} | Status: {seg.FlightStatus}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ));
                })()}
            </Paper>


        </Box>
    );
};

export default FlightDetail;
