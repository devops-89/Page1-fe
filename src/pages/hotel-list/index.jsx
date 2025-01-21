import InnerBanner from "@/components/innerBanner";
import React, {  useState } from "react";
import banner from "@/banner/hotel.jpg";

import {
    Box, Card, Container, Grid2, Typography,

    CardHeader,
    CardContent,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Slider,
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';

import HotelCard from "@/components/hotels/hotelCard";
import { data } from "@/assests/data";
const HotelList = () => {









    const [priceRange, setPriceRange] = useState([500, 2000]);

    const handleRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };


    return (
        <div>
            <InnerBanner img={banner.src} heading={"Hotel"} />

            <Box sx={{ pt: 10, pb: 10 }}>
                <Container>
                    <Grid2 container spacing={4}  >
                        <Grid2 size={4} sx={{ position: "relative" }}>
                            {/* filter card start */}
                            <Card variant="outlined" sx={{ position: "sticky", top: "75px" }} style={{ marginBottom: '1rem', width: '100%', boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)" }}>
                                <CardHeader
                                    title="Filters"
                                    action={
                                        <Button variant="text" color="primary" size="small">
                                            Reset
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Search by Hotel Names
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="search"
                                        placeholder="Search by Hotel Names"


                                        InputProps={{
                                            startAdornment: <SearchIcon style={{ marginRight: '8px' }} />,
                                        }}
                                    />

                                    {/* Popular Section */}
                                    <div style={{ marginTop: '1rem' }}>
                                        <Typography variant="subtitle1">Popular</Typography>
                                        {['Breakfast Included', 'Budget', '4 Star Hotels', '5 Star Hotels'].map((label) => (
                                            <FormControlLabel
                                                key={label}
                                                control={<Checkbox defaultChecked={label === 'Breakfast Included'} />}
                                                label={label}
                                            />
                                        ))}
                                    </div>

                                    {/* Price Range Section */}
                                    <div style={{ marginTop: '1rem' }}>
                                        <Typography variant="subtitle1">Price Per Night</Typography>
                                        <Slider
                                            value={priceRange}
                                            onChange={handleRangeChange}
                                            valueLabelDisplay="auto"
                                            min={200}
                                            max={5695}
                                        />
                                        <Typography>Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
                                    </div>

                                    {/* Airline Names Section */}
                                    <div style={{ marginTop: '1rem' }}>
                                        <Typography variant="subtitle1">Hotel Names</Typography>
                                        {['American Hotel', 'Delta Hotel', 'Emirates', 'Air France'].map((label) => (
                                            <FormControlLabel
                                                key={label}
                                                control={<Checkbox />}
                                                label={label}
                                            />
                                        ))}
                                    </div>

                                    {/* Reviews Section */}
                                    <div style={{ marginTop: '1rem' }}>
                                        <Typography variant="subtitle1">Reviews</Typography>
                                        {[5, 4, 3, 2, 1].map((stars) => (

                                            <FormControlLabel
                                                key={stars}
                                                control={<Checkbox />}

                                                label={
                                                    <Typography>
                                                        {[...Array(stars)].map((_, i) => (
                                                            <StarIcon key={i} style={{ color: 'gold' }} />
                                                        ))}
                                                    </Typography>
                                                }
                                            />

                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* filter card end */}
                        </Grid2>

                        <Grid2 size={8} sx={{display:"flex", flexWrap:'wrap', gap:"20px"}}>
                            {data.hotelName.map((val, i) => (
                                <Grid2 size={{xs:6}} key={i}>
                                    <HotelCard
                                        img={val.img}
                                        hotelName={val.hotelName}
                                        rooms={val.rooms}
                                        rating={val.rating}
                                        bathroom={val.bathroom}
                                        location={val.location}
                                        price={val.price}
                                        follower={val.follower}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </div>
    );
};

export default HotelList;
