import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import {
    Box,
    Typography,
    Paper,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BedIcon from "@mui/icons-material/Bed";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PolicyIcon from "@mui/icons-material/Policy";

import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { hotelController } from "@/api/hotelController";

const HotelDetail = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);

     // Redux
  const hotelSearchData = useSelector((state) => state?.HOTEL?.HotelSearchData);
  const reduxIp = hotelSearchData?.userIp || "";

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await hotelController.getBookingStatus({
                    order_id: id,
                    ip: reduxIp,
                });

                setDetail(res?.data?.data);
            } catch (e) {
                console.error("Hotel detail error", e);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading || !detail)
        return (
            <Typography sx={{ fontFamily: nunito.style, textAlign: "center", py: 4 }}>
                Loading hotel details...
            </Typography>
        );

    const hotel = detail.bookingDetails.GetBookingDetailResult;
    const rooms = hotel.Rooms || [];

    return (
        <Box>
            {/* PAGE TITLE */}
            <Typography
                variant="h5"
                sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 3 }}
            >
                Hotel Booking Details
            </Typography>

            {/* HEADER */}
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
                }}
            >
                {/* HOTEL INFO */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                        sx={{
                            width: 55,
                            height: 55,
                            borderRadius: 2,
                            background: `${COLORS.PRIMARY}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <HotelIcon sx={{ fontSize: 32, color: COLORS.PRIMARY }} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                            {hotel.HotelName}
                        </Typography>
                        <Typography sx={{ color: "#555" }}>
                            <LocationOnIcon sx={{ fontSize: 16 }} /> {hotel.City}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#777" }}>
                            {moment(hotel.CheckInDate).format("DD MMM")} →{" "}
                            {moment(hotel.CheckOutDate).format("DD MMM YYYY")}
                        </Typography>
                    </Box>
                </Box>

                {/* STATUS */}
                <Stack spacing={1}>
                    <Chip
                        icon={<CheckCircleIcon />}
                        label={detail.bookingStatus}
                        color="success"
                    />
                    <Typography sx={{ fontSize: 14 }}>
                        Confirmation No: {hotel.ConfirmationNo}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                        Invoice No: {hotel.InvoiceNo}
                    </Typography>
                </Stack>

                {/* PRICE */}
                <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontWeight: 700 }}>Total Amount</Typography>
                    <Typography
                        sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: COLORS.PRIMARY,
                        }}
                    >
                        ₹ {hotel.InvoiceAmount}
                    </Typography>
                </Box>
            </Paper>

            {/* ROOMS */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <PeopleAltIcon sx={{ color: COLORS.PRIMARY }} />
                    Room & Guest Details
                </Typography>

                {rooms.map((room, idx) => (
                    <Accordion
                        key={idx}
                        defaultExpanded={idx === 0}
                        sx={{ mb: 2, borderRadius: 2 }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 700 }}>
                                <BedIcon sx={{ fontSize: 18 }} /> {room.RoomTypeName}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {/* GUESTS */}
                            {room.HotelPassenger.map((pax, i) => (
                                <Typography key={i} sx={{ fontSize: 14, mb: 1 }}>
                                    {pax.Title.toUpperCase()} {pax.FirstName} {pax.LastName}
                                    {pax.LeadPassenger && " (Lead Guest)"}
                                </Typography>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            {/* AMENITIES */}
                            <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                Amenities
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {room.Amenities.map((a, i) => (
                                    <Chip key={i} label={a} size="small" />
                                ))}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* PRICE */}
                            <Typography sx={{ fontWeight: 600 }}>
                                <CurrencyRupeeIcon sx={{ fontSize: 16 }} /> Price Breakup
                            </Typography>
                            <Typography sx={{ fontSize: 14 }}>
                                Room Rate: ₹ {room.PriceBreakUp.RoomRate}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }}>
                                Tax: ₹ {room.PriceBreakUp.RoomTax}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>

            {/* CANCELLATION POLICY */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <PolicyIcon sx={{ color: COLORS.PRIMARY }} />
                    Cancellation Policy
                </Typography>

                {rooms[0]?.CancelPolicies?.map((p, i) => (
                    <Typography key={i} sx={{ fontSize: 14, mb: 1 }}>
                        {p.FromDate} → {p.ToDate} :{" "}
                        {p.ChargeType === 1
                            ? `₹ ${p.CancellationCharge}`
                            : `${p.CancellationCharge}%`}
                    </Typography>
                ))}
            </Paper>
        </Box>
    );
};

export default HotelDetail;
