import { data } from "@/assests/data";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import moment from "moment";
import {
    FlightTakeoff,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    Collapse,
    Divider,
    Grid2,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TabPanel from "../tabPanel";
import FareDetails from "./fareDetail";
import BaggageDetails from "./baggageDetails";
import FlightBox from "./flightBox";

const InternationalRoundFlightBox = ({ details, traceId, journey }) => {
    const router = useRouter();

    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const [cabin, setCabin] = useState(null);

    const handleOpenFlightDetailsLeft = () => {
        setOpenLeft(!openLeft);
    };
    const handleOpenFlightDetailsRight = () => {
        setOpenRight(!openRight);
    };


    const [flightDetails, setFlightDetails] = useState(details);
    const [valueLeft, setValueLeft] = useState(0);
    const [valueRight, setValueRight] = useState(0);

    const tabChangeHandlerLeft = (e, newValue) => {
        setValueLeft(newValue);
    };

    const tabChangeHandlerRight = (e, newValue) => {
        setValueRight(newValue);
    };

    useEffect(() => {
        let cabinData = data.FLIGHT_CLASS_DATA.find((fligtClass) => {
            return fligtClass.value == flightDetails?.departure[0]?.CabinClass;
        });
        setCabin(cabinData?.label);
    }, [flightDetails, data.FLIGHT_CLASS_DATA]);

    return (
        <div>
            <Card sx={{ boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)", p: 2, mb:4 }}>
                <Grid2 container spacing={3}>
                    {/* left  */}
                    <Grid2 size={{lg:6 , xs:12}}>
                    <Typography variant="h6" sx={{fontWeight:700, fontFamily:nunito.style, mb:'10px'}}>Onward</Typography>
                    <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Image
                            src={flightDetails?.AirlineLogo}
                            alt="Image"
                            width={30}
                            height={30}
                        />
                        <Typography
                            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                        >
                            {`${flightDetails?.departure[0]?.Airline?.AirlineName} Airline`}{" "}
                            {`(${flightDetails?.AirlineCode} ${flightDetails?.departure[0]?.Airline?.FlightNumber})`}
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                    >
                        Travel Class : {cabin ? cabin : undefined}
                    </Typography>
                </Stack>
                <Grid2 container sx={{ mt: 3,p:1, backgroundColor:COLORS.SEMIGREY }} spacing={4} alignItems={"flex-start"}>
                    <Grid2 size={4}>
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
                        >
                            {moment(flightDetails?.departure[0]?.Origin?.DepTime).format(
                                "HH:mm"
                            )}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0]?.Origin?.Airport?.AirportCode} -{" "}
                            {flightDetails?.departure[0]?.Origin?.Airport?.Terminal} Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0]?.Origin?.Airport?.CityName}
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
                                    .duration(flightDetails?.departure[flightDetails?.departure.length - 1]?.AccumulatedDuration, "minutes")
                                    .asHours()
                            )} hrs ${moment
                                .duration(flightDetails?.departure[flightDetails?.departure.length - 1]?.AccumulatedDuration, "minutes")
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
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
                        >
                            {moment(flightDetails?.departure[flightDetails?.departure.length - 1]?.Destination?.ArrTime).format(
                                "HH:mm"
                            )}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[flightDetails?.departure.length - 1]?.Destination?.Airport?.AirportCode} -{" "}
                            {flightDetails?.departure[flightDetails?.departure.length - 1]?.Destination?.Airport?.Terminal}{" "}
                            Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[flightDetails?.departure.length - 1]?.Destination?.Airport?.CityName}
                        </Typography>
                    </Grid2>
                </Grid2>

                <Card
                    sx={{ boxShadow: "0px 0px 2px 2px rgb(0,0,0,0.10)", p: 1, mt: 2 }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            sx={{
                                fontSize: 15,
                                color: COLORS.DANGER,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                            }}
                        >
                            Only {flightDetails?.departure[0]?.NoOfSeatAvailable} seats left
                        </Typography>
                        <Button
                            sx={{
                                fontSize: 15,
                                p: 0.4,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                                color: COLORS.BLACK,
                                textTransform: "initial",
                            }}
                            endIcon={openLeft ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            onClick={handleOpenFlightDetailsLeft}>
                            Flight Details
                        </Button>
                    </Stack>
                </Card>
                <Collapse in={openLeft} sx={{ mt: 2 }}>
                    <Tabs
                        value={valueLeft}
                        onChange={tabChangeHandlerLeft}
                        sx={{
                            "& .Mui-selected": {
                                color: `${COLORS.BLACK} !important`,
                                backgroundColor: COLORS.PRIMARY,
                                transition: "0.5s ease all",
                            },
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .MuiTab-root": {
                                borderRadius: 8,
                            },
                        }}
                    >
                        {data.flightTab.map((val, i) => (
                            <Tab
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            textAlign: "center",
                                            fontFamily: nunito.style,
                                            fontWeight: 550,
                                        }}
                                    >
                                        {val.label}
                                    </Typography>
                                }
                                key={i}
                            />
                        ))}
                    </Tabs>
                    <TabPanel index={0} value={valueLeft}>
                        <FlightBox tableData={flightDetails?.departure} />
                    </TabPanel>
                    <TabPanel index={1} value={valueLeft}>
                        <FareDetails tableData={flightDetails} />
                    </TabPanel>
                    <TabPanel index={2} value={valueLeft}>
                        <BaggageDetails tableData={flightDetails} />
                    </TabPanel>
                </Collapse>
                    </Grid2>

                    {/* right */}
                    <Grid2 size={{lg:6 ,xs:12}}>
                    <Typography variant="h6" sx={{fontWeight:700, fontFamily:nunito.style, mb:'10px'}}>Return</Typography>
                    <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Image
                            src={flightDetails?.AirlineLogo}
                            alt="Image"
                            width={30}
                            height={30}
                        />
                        <Typography
                            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                        >
                            {`${flightDetails?.arrival[0]?.Airline?.AirlineName} Airline`}{" "}
                            {`(${flightDetails?.AirlineCode} ${flightDetails?.arrival[0]?.Airline?.FlightNumber})`}
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                    >
                        {/* Travel Class: {flightDetails?.departure[0].CabinClass} */}
                        Travel Class : {cabin ? cabin : undefined}
                    </Typography>
                </Stack>
                <Grid2 container sx={{ mt: 3, p:1, backgroundColor:COLORS.SEMIGREY }} spacing={4} alignItems={"flex-start"}>
                    <Grid2 size={4}>
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
                        >
                            {moment(flightDetails?.arrival[0]?.Origin?.DepTime).format(
                                "HH:mm"
                            )}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.arrival[0]?.Origin?.Airport?.AirportCode} -{" "}
                            {flightDetails?.arrival[0]?.Origin?.Airport?.Terminal} Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.arrival[0]?.Origin?.Airport?.CityName}
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
                                    .duration(flightDetails?.arrival[flightDetails?.arrival.length - 1]?.AccumulatedDuration, "minutes")
                                    .asHours()
                            )} hrs ${moment
                                .duration(flightDetails?.arrival[flightDetails?.arrival.length - 1]?.AccumulatedDuration, "minutes")
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
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
                        >
                            {moment(flightDetails?.arrival[flightDetails?.arrival.length - 1]?.Destination?.ArrTime).format(
                                "HH:mm"
                            )}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.arrival[flightDetails?.arrival.length - 1]?.Destination?.Airport?.AirportCode} -{" "}
                            {flightDetails?.arrival[flightDetails?.arrival.length - 1]?.Destination?.Airport?.Terminal}{" "}
                            Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.arrival[flightDetails?.arrival.length - 1]?.Destination?.Airport?.CityName}
                        </Typography>
                    </Grid2>
                </Grid2>

                <Card
                    sx={{ boxShadow: "0px 0px 2px 2px rgb(0,0,0,0.10)", p: 1, mt: 2 }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            sx={{
                                fontSize: 15,
                                color: COLORS.DANGER,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                            }}
                        >
                            Only {flightDetails?.arrival[0]?.NoOfSeatAvailable} seats left
                        </Typography>
                        <Button
                            sx={{
                                fontSize: 15,
                                p: 0.4,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                                color: COLORS.BLACK,
                                textTransform: "initial",
                            }}
                            endIcon={openRight ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            onClick={handleOpenFlightDetailsRight}
                        >
                            Flight Details
                        </Button>
                    </Stack>
                </Card>
                <Collapse in={openRight} sx={{ mt: 2 }}>
                    <Tabs
                        value={valueRight}
                        onChange={tabChangeHandlerRight}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        sx={{
                            "& .Mui-selected": {
                                color: `${COLORS.BLACK} !important`,
                                backgroundColor: COLORS.PRIMARY,
                                transition: "0.5s ease all",
                            },
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .MuiTab-root": {
                                borderRadius: 8,
                            },
                        }}
                    >
                        {data.flightTab.map((val, i) => (
                            <Tab
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            textAlign: "center",
                                            fontFamily: nunito.style,
                                            fontWeight: 550,
                                        }}
                                    >
                                        {val.label}
                                    </Typography>
                                }
                                key={i}
                            />
                        ))}
                    </Tabs>
                    <TabPanel index={0} value={valueRight}>
                        <FlightBox tableData={flightDetails?.arrival} />
                    </TabPanel>
                    <TabPanel index={1} value={valueRight}>
                        <FareDetails tableData={flightDetails} />
                    </TabPanel>
                    <TabPanel index={2} value={valueRight}>
                        <BaggageDetails tableData={flightDetails} />
                    </TabPanel>
                </Collapse>
                    </Grid2>

                    <Grid2 size={12} container >

                    <Grid2 size={6}>
                    <Typography
                            sx={{
                                fontSize: 15,
                                color: flightDetails?.IsRefundable
                                    ? COLORS.SUCCESS
                                    : COLORS.DANGER,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                            }}
                        >
                            {flightDetails?.IsRefundable ? "Refundable" : "Non Refundable"}
                        </Typography>
                        </Grid2>

                    <Grid2 size={{lg:6 , xs:12}} sx={{display:'flex', justifyContent: {lg:"flex-end" ,xs:"space-between"}, gap:'10px', alignItems:'center'}}>
                    <Typography
                            sx={{ fontSize: 22, fontWeight: 900, fontFamily: nunito.style }}
                        >
                          ₹ {flightDetails?.TotalFare}
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: COLORS.PRIMARY,
                                color: COLORS.BLACK,
                                fontWeight: 550,
                                fontSize: 12,
                                fontFamily: nunito.style,
                            }}
                            onClick={() => {
                                router.push({
                                    pathname: `/roundtrip-flightlist/${flightDetails?.AirlineCode}/view-details`,
                                    query: {
                                        ResultIndex: flightDetails?.ResultIndex,
                                        traceId: traceId,
                                        journey:journey
                                    },
                                });
                            }}
                        >
                            Book Now
                        </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
                
            </Card>
        </div>
    );
};

export default InternationalRoundFlightBox;
