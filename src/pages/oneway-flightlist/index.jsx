import InnerBanner from "@/components/innerBanner";
import React, { useEffect, useState } from "react";
import banner from "@/banner/flight.jpg";
import {
    Box,
    Drawer,
    Card,
    Container,
    Grid2,
    Typography,
    CardHeader,
    CardContent,
    FormControlLabel,
    TextField,
    Button,
    Slider,
    useMediaQuery,
    Radio,
    RadioGroup,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import FlightForm from "@/components/flight/flightForm";
import FlightListBox from "@/components/flight/flightListBox";
import Loader from "@/utils/Loader";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import Loading from "react-loading";
import filterImage from '@/assests/flight_image/filter.svg'
import Image from "next/image";

const FlightList = () => {
    const [flightList, setFlightList] = useState(null);
    const [traceId, setTraceId] = useState("");
    const [open, setOpen] = useState(false);
    const [journey, setJourney] = useState("");
    const [searchAirline, setSearchAirline] = useState("");
    const [priceRange, setPriceRange] = useState([0, 25000]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [selectedTime, setSelectedTime] = useState("Anytime");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = () => {
            try {
                const flightData = JSON.parse(localStorage.getItem("flightData") || "{}");
                if (flightData?.segments?.flightData) {
                    setFlightList(flightData);
                    setTraceId(flightData.trace_id);
                    setJourney(flightData.type);
                } else {
                    console.log("No valid flight data found in localStorage");
                }
            } catch (error) {
                console.log("Error parsing flight data from localStorage:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const getTimeCategory = (depTime) => {
        const hours = new Date(depTime).getHours();
        if (hours >= 5 && hours < 12) return "Morning";
        if (hours >= 12 && hours < 17) return "AfterNoon";
        if (hours >= 17 && hours < 21) return "Evening";
        return "Night";
    };

    const phone = useMediaQuery("(max-width:899px)");
    const toggleDrawer = (openState) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(openState);
    };

    useEffect(() => {
        if (flightList?.segments?.flightData) {
            setLoading(true);
            const filtered = flightList.segments.flightData.filter((flight) => {
                const airlineMatch = flight?.departure?.[0]?.Airline?.AirlineName.toLowerCase().includes(
                    searchAirline.toLowerCase()
                );
                const priceMatch = flight?.TotalFare >= priceRange[0] && flight?.TotalFare <= priceRange[1];
                const departureCategory = getTimeCategory(flight?.departure[0]?.Origin?.DepTime);
                const departureMatch = selectedTime === "Anytime" || selectedTime === departureCategory;
                return priceMatch && airlineMatch && departureMatch;
            });
            setFilteredFlights(filtered);
            setLoading(false);
        }
    }, [priceRange, searchAirline, selectedTime, flightList]);

    const handleResetFilters = () => {
        setSearchAirline("");
        setPriceRange([0, 25000]);
        setSelectedTime("Anytime");
    };

    const NoFlightsFound = () => (
        <Grid2
            size={12}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:'column'
            }}
        >
            <Typography variant="h5" sx={{ fontFamily: nunito.style, fontWeight:700, mb:'10px' }}>
                No flight available!
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: nunito.style}}>
                Sorry, there are no flights matching this criteria. Please modify the filters & try again.
            </Typography>
            <Image
                src={filterImage.src}
                alt="Image"
                width={300}
                height={300}
            />
        </Grid2>
    );

    const FlightListResults = () => (
        <>
            <Grid2 size={12}>
                <Typography variant="body1">{`Search Results ${filteredFlights.length}`}</Typography>
            </Grid2>
            {filteredFlights.map((val, i) => (
                <Grid2 size={12} key={i}>
                    <FlightListBox details={val} traceId={traceId} journey={journey} />
                </Grid2>
            ))}
        </>
    );

    return (
        <>
            <InnerBanner img={banner.src} heading={"OnewayFlight"} />

            <Box sx={{ pt: 10 }}>
                <Container>
                    <Card sx={{ boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.20)", p: 2 }}>
                        <Typography sx={{ fontSize: 18, fontFamily: nunito.style }}>
                            {" "}
                            Search Flight
                        </Typography>
                        <FlightForm />
                    </Card>
                </Container>
            </Box>

            <Box sx={{ pt: { lg: 10, md: 5, sm: 5, xs: 5 }, pb: 10 }}>
                <Container>
                    <Grid2 container spacing={4}>
                        {phone ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginLeft: "auto",
                                }}
                            >
                                <Button onClick={toggleDrawer(true)}>
                                    <FilterAltIcon sx={{ fontSize: 30, color: COLORS.PRIMARY }} />
                                </Button>
                                <Drawer open={open} onClose={toggleDrawer(false)}>
                                    <Grid2 size={12} sx={{ position: "relative" }}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                position: "sticky",
                                                top: "75px",
                                                width: "100%",
                                                height: "100vh",
                                                overflowY: "scroll",
                                                "::-webkit-scrollbar": {
                                                    width: 5,
                                                    borderRadius: 4,
                                                },
                                                "::-webkit-scrollbar-thumb": {
                                                    backgroundColor: "#A8A8A8",
                                                    borderRadius: 4,
                                                    height: 20,
                                                    width: 20,
                                                },
                                                marginBottom: "1rem",
                                                width: "100%",
                                                boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                                            }}
                                        >
                                            <CardHeader
                                                action={
                                                    <Button onClick={toggleDrawer(false)}>
                                                        <CloseIcon
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "flex-end",
                                                                marginLeft: "auto",
                                                                fontSize: 30,
                                                                fontWeight: "bold",
                                                            }}
                                                        />
                                                    </Button>
                                                }
                                            />
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                                    >
                                                        Filters
                                                    </Typography>
                                                }
                                                action={
                                                    <Button
                                                        variant="text"
                                                        color="primary"
                                                        size="small"
                                                        onClick={handleResetFilters}
                                                        sx={{ fontFamily: nunito.style }}
                                                    >
                                                        Reset
                                                    </Button>
                                                }
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                                >
                                                    Search by Airline Names
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        fontFamily: nunito.style,
                                                        marginBottom: "20px",
                                                    }}
                                                    name="search"
                                                    value={searchAirline}
                                                    onChange={(e) => setSearchAirline(e.target.value)}
                                                    placeholder="Search by Airline Names"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <SearchIcon style={{ marginRight: "8px" }} />
                                                        ),
                                                    }}
                                                />

                                                {/* Departure Time */}
                                                <Box sx={{ marginBottom: "20px" }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                                    >
                                                        Departure Time
                                                    </Typography>
                                                    <RadioGroup
                                                        aria-label="departure-time"
                                                        name="departureTime"
                                                        value={selectedTime}
                                                        onChange={handleTimeChange}
                                                    >
                                                        {[
                                                            "Anytime",
                                                            "Morning",
                                                            "AfterNoon",
                                                            "Evening",
                                                            "Night",
                                                        ].map((label) => (
                                                            <FormControlLabel
                                                                key={label}
                                                                value={label}
                                                                control={
                                                                    <Radio
                                                                        sx={{
                                                                            color: COLORS.PRIMARY,
                                                                            "&.Mui-checked": {
                                                                                color: COLORS.PRIMARY,
                                                                            },
                                                                        }}
                                                                    />
                                                                }
                                                                label={
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontFamily: nunito.style,
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {label}
                                                                    </Typography>
                                                                }
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </Box>

                                                {/* Price Range Section */}
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                                    >
                                                        Flight Price
                                                    </Typography>
                                                    <Slider
                                                        value={priceRange}
                                                        onChange={handleRangeChange}
                                                        valueLabelDisplay="auto"
                                                        min={0}
                                                        max={25000}
                                                        sx={{
                                                            color: "#ff5722",
                                                            "& .MuiSlider-thumb": {
                                                                backgroundColor: COLORS.PRIMARY,
                                                            },
                                                            "& .MuiSlider-track": {
                                                                backgroundColor: COLORS.PRIMARY,
                                                            },
                                                            "& .MuiSlider-rail": {
                                                                backgroundColor: COLORS.PRIMARY,
                                                            },
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 500, fontFamily: nunito.style }}
                                                    >
                                                        Range: ₹ {priceRange[0]} - ₹ {priceRange[1]}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                </Drawer>
                            </Box>
                        ) : (
                            <Grid2 size={4} sx={{ position: "relative", height: "auto" }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        position: "sticky",
                                        top: "75px",
                                        overflowY: "scroll",
                                        "::-webkit-scrollbar": {
                                            width: 5,
                                            borderRadius: 4,
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#A8A8A8",
                                            borderRadius: 4,
                                            height: 20,
                                            width: 20,
                                        },
                                        marginBottom: "1rem",
                                        width: "100%",
                                        boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                                    }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography
                                                variant="h5"
                                                sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                            >
                                                Filters
                                            </Typography>
                                        }
                                        action={
                                            <Button
                                                variant="text"
                                                color="primary"
                                                size="small"
                                                onClick={handleResetFilters}
                                                sx={{ fontFamily: nunito.style }}
                                            >
                                                Reset
                                            </Button>
                                        }
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                        >
                                            Search by Airline Names
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            sx={{ fontFamily: nunito.style, marginBottom: "20px" }}
                                            name="search"
                                            value={searchAirline}
                                            onChange={(e) => setSearchAirline(e.target.value)}
                                            placeholder="Search by Airline Names"
                                            InputProps={{
                                                startAdornment: (
                                                    <SearchIcon style={{ marginRight: "8px" }} />
                                                ),
                                            }}
                                        />

                                        {/* Departure Time */}
                                        <Box sx={{ marginBottom: "20px" }}>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                            >
                                                Departure Time
                                            </Typography>
                                            <RadioGroup
                                                aria-label="departure-time"
                                                name="departureTime"
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                            >
                                                {[
                                                    "Anytime",
                                                    "Morning",
                                                    "AfterNoon",
                                                    "Evening",
                                                    "Night",
                                                ].map((label) => (
                                                    <FormControlLabel
                                                        key={label}
                                                        value={label}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: COLORS.PRIMARY,
                                                                    "&.Mui-checked": {
                                                                        color: COLORS.PRIMARY,
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    fontFamily: nunito.style,
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                {label}
                                                            </Typography>
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </Box>

                                        {/* Price Range Section */}
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontFamily: nunito.style, fontWeight: 700 }}
                                            >
                                                Flight Price
                                            </Typography>
                                            <Slider
                                                value={priceRange}
                                                onChange={handleRangeChange}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={25000}
                                                sx={{
                                                    color: "#ff5722",
                                                    "& .MuiSlider-thumb": {
                                                        backgroundColor: COLORS.PRIMARY,
                                                    },
                                                    "& .MuiSlider-track": {
                                                        backgroundColor: COLORS.PRIMARY,
                                                    },
                                                    "& .MuiSlider-rail": {
                                                        backgroundColor: COLORS.PRIMARY,
                                                    },
                                                }}
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{ fontWeight: 500, fontFamily: nunito.style }}
                                            >
                                                Range: ₹ {priceRange[0]} - ₹ {priceRange[1]}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        )}

                        <Grid2 size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                            <Grid2 container spacing={3}>
                                {loading ? (
                                    <Grid2
                                        size={12}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "200px",
                                        }}
                                    >
                                        <Loading type="bars" width={20} height={20} color={COLORS.PRIMARY} />
                                    </Grid2>
                                ) : filteredFlights.length > 0 ? (
                                    <FlightListResults />
                                ) : (
                                    <NoFlightsFound />
                                )}
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
            {loading && !flightList?.segments?.flightData && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                        marginBottom: "50px",
                    }}
                >
                    <Loader open={true} />
                </Box>
            )}
        </>
    );
};

export default FlightList;