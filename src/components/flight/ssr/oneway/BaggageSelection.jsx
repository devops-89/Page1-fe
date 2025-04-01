import * as React from "react";
import { Typography, Grid2 } from "@mui/material";
import { nunito } from "@/utils/fonts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LuggageIcon from '@mui/icons-material/Luggage';
import { COLORS } from "@/utils/colors";
import BaggageCard from "../../baggageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeBaggageDetails, setBaggageDetails } from "@/redux/reducers/baggagesInformation";

export default function BaggageSelection({ baggageData }) {
    const dispatch = useDispatch();
    const selectedBaggages = useSelector((state) => state?.BaggagesInformation?.baggages || []);
    
    console.log("selectedBaggages---------", selectedBaggages)
    // Organize baggage data by flight number
    let filtereddata = {};

    baggageData?.forEach((singleBaggage) => {
        singleBaggage?.forEach((data) => {
            if (!filtereddata[data.FlightNumber]) {
                filtereddata[data.FlightNumber] = [];
            }
            filtereddata[data.FlightNumber].push(data);
        });
    });

    // Handle baggage click (select or remove)
    const handleBaggageClick = (baggage, flightNumber) => {
        const baggageExists = selectedBaggages?.some(
            (flight) => flight.id === flightNumber && flight.selectedBaggage?.Code === baggage.Code
        );

        if (baggageExists) {
            // Remove baggage from selection
            dispatch(removeBaggageDetails({ flightNumber, baggageCode: baggage.Code }));
        } else {
            // Select baggage
            dispatch(setBaggageDetails({ flightNumber, selectedBaggage: baggage }));
        }
    };

    return (
        <>
            <Accordion sx={{ mb: '10px' }}>
                <AccordionSummary
                    expandIcon={<KeyboardArrowDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ backgroundColor: COLORS.SEMIGREY }}
                >
                    <Typography
                        variant="body1"
                        sx={{ fontFamily: nunito.style, fontWeight: 700, display: 'flex', alignItems: 'center' }}
                    >
                        <LuggageIcon sx={{ color: COLORS.PRIMARY, marginRight: '10px' }} /> Baggage
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1, maxHeight: "240px", overflowY: "auto" }}>

                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{ clickable: true }}
                        modules={[Navigation]}
                        id="baggage_box"
                    >
                        {Object.keys(filtereddata).map((flightNumber) => {
                            return (
                                <SwiperSlide key={flightNumber} style={{ overflow: "auto", maxHeight: "240px", position: 'relative' }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: nunito.style,
                                            fontWeight: 800,
                                            mb: '20px',
                                            p: '10px',
                                            position: 'sticky',
                                            top: '0',
                                            width: '100%',
                                            backgroundColor: COLORS.SEMIGREY,
                                            zIndex: 99
                                        }}
                                    >
                                        {`${filtereddata[flightNumber][0]?.Origin} - ${filtereddata[flightNumber][0]?.Destination}`}
                                    </Typography>
                                    <Grid2 container spacing={2} sx={{ flexWrap: "wrap" }}>
                                        {filtereddata[flightNumber]?.map((baggage, baggageIndex) => (
                                            <Grid2 key={baggageIndex} size={{ lg: 6, xs: 12 }}>
                                                <BaggageCard
                                                    baggage={baggage}
                                                    handleBaggageValue={() => handleBaggageClick(baggage, flightNumber)}
                                                    isSelected={selectedBaggages?.some(
                                                        (flight) => flight.id === flightNumber && flight.selectedBaggage?.Code === baggage.Code
                                                    )}
                                                />
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
