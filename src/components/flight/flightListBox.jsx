import { data } from "@/assests/data";
import logo from "@/icons/blogzine.svg";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { useRouter } from "next/router";
import moment from "moment";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
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
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TabPanel from "../tabPanel";
import FlightBox from "./flightBox";
import FareDetails from "./fareDetail";
import BaggageDetails from "./baggageDetails";

// import Cancellation from "./cancellationRules";
import { FARE_TYPE } from "@/utils/enum";


const FlightListBox = ({ details, traceId }) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleOpenFlightDetails = () => {
        setOpen(!open);
    };

    const [flightDetails, setFlightDetails] = useState(details);
    const [value, setValue] = useState(0);

    const tabChangeHandler = (e, newValue) => {
        setValue(newValue);
    };

    console.log("flight Deatils:", flightDetails);


    return (
        <div>
            <Card sx={{ boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)", p: 2 }}>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Image src={flightDetails.AirlineLogo} alt="Image" width={30} height={30} />
                        <Typography
                            sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                        >
                            {flightDetails.departure[0].Airline.AirlineName} {`(${flightDetails?.departure[0].Airline.FlightNumber})`}
                        </Typography>
                    </Stack>
                    <Typography

                        sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
                    >
                        Travel Class: {flightDetails?.departure[0].CabinClass}
                    </Typography>
                </Stack>
                <Grid2 container sx={{ mt: 3 }} spacing={4} alignItems={"flex-start"}>
                    <Grid2 size={3}>
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style, }}
                        >
                            {moment(flightDetails?.departure[0].Origin.DepTime).format("HH:mm")}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0].Origin.Airport.AirportCode} -{" "}
                            {flightDetails?.departure[0].Origin.Airport.Terminal} Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0].Origin.Airport.CityName}
                        </Typography>
                    </Grid2>
                    <Grid2 size={3}>
                        <Typography
                            sx={{  
                                fontSize: 18,
                                fontWeight: 700,
                                fontFamily: nunito.style,
                                textAlign: "center",
                            }}
                        >
                            {`${Math.floor(moment.duration(flightDetails?.departure[0].Duration, 'minutes').asHours())} hrs ${moment.duration(flightDetails?.departure[0].Duration, 'minutes').minutes()} min`}
                        </Typography>



                        <Divider sx={{ borderColor: COLORS.BLACK, mt: 1 }}>
                            <Avatar sx={{ backgroundColor: COLORS.PRIMARY }}>
                                <FlightTakeoff sx={{ fontSize: 17 }} />
                            </Avatar>
                        </Divider>
                    </Grid2>
                    <Grid2 size={3}>
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, fontFamily: nunito.style }}
                        >
                            {moment(flightDetails?.departure[0].Destination.ArrTime).format("HH:mm")}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0].Destination.Airport.AirportCode} -{" "}
                            {flightDetails?.departure[0].Destination.Airport.Terminal} Terminal
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 600, fontFamily: nunito.style }}
                        >
                            {flightDetails?.departure[0].Destination.Airport.CityName}
                        </Typography>
                    </Grid2>
                    <Grid2 size={3} textAlign={"center"}>
                        <Typography
                            sx={{ fontSize: 25, fontWeight: 900, fontFamily: nunito.style }}
                        >
                            {flightDetails?.TotalFare} ₹
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: COLORS.PRIMARY,
                                color: COLORS.BLACK,
                                fontWeight: 550,
                                fontSize: 12,
                                fontFamily: nunito.style,
                                mt: 1,
                            }}

                            onClick={() => {
                                router.push({
                                    pathname: `/flight-list/${flightDetails?.AirlineCode}/view-details`,
                                    query: {
                                        ResultIndex: flightDetails?.ResultIndex,
                                        traceId: traceId
                                    }
                                })
                            }
                            }
                        >
                            Book Now
                        </Button>
                    </Grid2>
                    <Grid2 size={12} container gap={0}>
                        <Typography sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            fontFamily: nunito.style,
                            marginBottom:'10px'
                        }}>Intermediate</Typography>
                        <TableContainer>
                            <Table>
                                <TableRow sx={{border:`1px solid ${COLORS.GREY}`}}>
                                    <TableCell sx={{padding:'8px'}}><Typography sx={{
                                        textAlign: "start",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        fontFamily: nunito.style,
                                    }}>VNS(15:20)</Typography></TableCell>
                                    <TableCell sx={{textAlign:'center', padding:'8px'}}><ArrowRightAltIcon sx={{ color: COLORS.PRIMARY }} /></TableCell>
                                    <TableCell sx={{padding:'8px'}}><Typography sx={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        fontFamily: nunito.style,
                                        textAlign: 'end'
                                    }}>DEL(16:55)</Typography></TableCell>
                                </TableRow>
                                <TableRow sx={{border:`1px solid ${COLORS.GREY}`}}>
                                    <TableCell sx={{padding:'8px'}}><Typography sx={{
                                        textAlign: "start",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        fontFamily: nunito.style,
                                    }}>DEL(16:55)</Typography></TableCell>
                                    <TableCell sx={{textAlign:'center', padding:'8px'}}><ArrowRightAltIcon sx={{ color: COLORS.PRIMARY }} /></TableCell>
                                    <TableCell sx={{padding:'8px'}}><Typography sx={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        fontFamily: nunito.style,
                                        textAlign: 'end'
                                    }}>DXB(20:55)</Typography></TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>

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
                            Only {flightDetails?.departure[0].NoOfSeatAvailable} seats left
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 15,
                                color:
                                    flightDetails?.fareType === FARE_TYPE.NONREFUNDABLE
                                        ? COLORS.DANGER
                                        : COLORS.SUCCESS,
                                fontFamiy: nunito.style,
                                fontWeight: 500,
                            }}
                        >
                            {flightDetails?.departure[0].FareClassification.Type}
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
                            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            onClick={handleOpenFlightDetails}
                        >
                            Flight Details
                        </Button>
                    </Stack>
                </Card>
                <Collapse in={open} sx={{ mt: 2 }}>
                    <Tabs
                        value={value}
                        onChange={tabChangeHandler}
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
                    <TabPanel index={0} value={value}>
                        <FlightBox data={flightDetails} />
                    </TabPanel>
                    <TabPanel index={1} value={value}>
                        <FareDetails tableData={flightDetails} />
                    </TabPanel>
                    <TabPanel index={2} value={value}>
                        <BaggageDetails
                            tableData={flightDetails}
                        />
                    </TabPanel>
                    {/* <TabPanel index={3} value={value}>
            <Cancellation
              tableData={flightDetails?.flightDetails?.cancellationDetails}
              departureDetails={flightDetails?.departureDetails}
              arrivalDetails={flightDetails?.arrivalDetails}
            />
          </TabPanel> */}
                </Collapse>
            </Card>
        </div>
    );
};

export default FlightListBox;
