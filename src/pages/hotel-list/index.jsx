import InnerBanner from "@/components/innerBanner";
import React, { useState } from "react";
import banner from "@/banner/hotel.jpg";

import {
  Box,
  Drawer,
  Card,
  Container,
  Grid2,
  Typography,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Slider,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import HotelCard from "@/components/hotels/hotelCard";
import { data } from "@/assests/data";
import Link from "next/link";
import { COLORS } from "@/utils/colors";
const HotelList = () => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [open, setOpen] = useState(false);

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
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

  return (
    <div>
      <InnerBanner img={banner.src} heading={"Hotel"} />

      <Box sx={{ pt: { lg: 10, xs: 5 }, pb: 10 }}>
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
                    {/* filter card start */}
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
                          // backgroundColor: COLORS.PRIMARY,
                        },
                        "::-webkit-scrollbar-thumb": {
                          backgroundColor: "#A8A8A8",
                          borderRadius: 4,
                          height: 20,
                          width: 20,
                        },
                      }}
                      style={{
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
                            startAdornment: (
                              <SearchIcon style={{ marginRight: "8px" }} />
                            ),
                          }}
                        />

                        {/* Popular Section */}
                        <div style={{ marginTop: "1rem" }}>
                          <Typography variant="subtitle1">Popular</Typography>
                          {[
                            "Breakfast Included",
                            "Budget",
                            "4 Star Hotels",
                            "5 Star Hotels",
                          ].map((label) => (
                            <FormControlLabel
                              key={label}
                              control={
                                <Checkbox
                                  defaultChecked={
                                    label === "Breakfast Included"
                                  }
                                />
                              }
                              label={label}
                            />
                          ))}
                        </div>

                        {/* Price Range Section */}
                        <div style={{ marginTop: "1rem" }}>
                          <Typography variant="subtitle1">
                            Price Per Night
                          </Typography>
                          <Slider
                            value={priceRange}
                            onChange={handleRangeChange}
                            valueLabelDisplay="auto"
                            min={200}
                            max={5695}
                          />
                          <Typography>
                            Range: ${priceRange[0]} - ${priceRange[1]}
                          </Typography>
                        </div>

                        {/* Airline Names Section */}
                        <div style={{ marginTop: "1rem" }}>
                          <Typography variant="subtitle1">
                            Hotel Names
                          </Typography>
                          {[
                            "American Hotel",
                            "Delta Hotel",
                            "Emirates",
                            "Air France",
                          ].map((label) => (
                            <FormControlLabel
                              key={label}
                              control={<Checkbox />}
                              label={label}
                            />
                          ))}
                        </div>

                        {/* Reviews Section */}
                        <div style={{ marginTop: "1rem" }}>
                          <Typography variant="subtitle1">Reviews</Typography>
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <FormControlLabel
                              key={stars}
                              control={<Checkbox />}
                              label={
                                <Typography>
                                  {[...Array(stars)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      style={{ color: "gold" }}
                                    />
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
                </Drawer>
              </Box>
            ) : (
              <Grid2 size={4} sx={{ position: "relative" }}>
                {/* filter card start */}
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
                      // backgroundColor: COLORS.PRIMARY,
                    },
                    "::-webkit-scrollbar-thumb": {
                      backgroundColor: "#A8A8A8",
                      borderRadius: 4,
                      height: 20,
                      width: 20,
                    },
                  }}
                  style={{
                    marginBottom: "1rem",
                    width: "100%",
                    boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                  }}
                >
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
                        startAdornment: (
                          <SearchIcon style={{ marginRight: "8px" }} />
                        ),
                      }}
                    />

                    {/* Popular Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Popular</Typography>
                      {[
                        "Breakfast Included",
                        "Budget",
                        "4 Star Hotels",
                        "5 Star Hotels",
                      ].map((label) => (
                        <FormControlLabel
                          key={label}
                          control={
                            <Checkbox
                              defaultChecked={label === "Breakfast Included"}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </div>

                    {/* Price Range Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">
                        Price Per Night
                      </Typography>
                      <Slider
                        value={priceRange}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        min={200}
                        max={5695}
                      />
                      <Typography>
                        Range: ${priceRange[0]} - ${priceRange[1]}
                      </Typography>
                    </div>

                    {/* Airline Names Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Hotel Names</Typography>
                      {[
                        "American Hotel",
                        "Delta Hotel",
                        "Emirates",
                        "Air France",
                      ].map((label) => (
                        <FormControlLabel
                          key={label}
                          control={<Checkbox />}
                          label={label}
                        />
                      ))}
                    </div>

                    {/* Reviews Section */}
                    <div style={{ marginTop: "1rem" }}>
                      <Typography variant="subtitle1">Reviews</Typography>
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <FormControlLabel
                          key={stars}
                          control={<Checkbox />}
                          label={
                            <Typography>
                              {[...Array(stars)].map((_, i) => (
                                <StarIcon key={i} style={{ color: "gold" }} />
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
            )}

            <Grid2
              size={{ lg: 8, md: 8, sm: 12, xs: 12 }}
              sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
            >
              {data.hotelName.map((val, i) => (
                <Grid2 size={{ lg: 6, md: 6, xs: 6, xs: 12 }} key={i}>
                  <Link
                    href={`/hotel-list/${i}/hotel-details`}
                    style={{ textDecoration: "none" }}
                  >
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
                  </Link>
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
