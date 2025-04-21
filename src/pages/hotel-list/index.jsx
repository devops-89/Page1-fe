import InnerBanner from "@/components/innerBanner";
import React, { useState, useEffect, useRef, useCallback } from "react";
import banner from "@/banner/hotel.jpg";
import { useSelector } from "react-redux";
import {
  Box,
  Drawer,
  Card,
  Container,
  Typography,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Slider,
  Grid2,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import HotelCard from "@/components/hotels/hotelCard";
import Link from "next/link";
import { COLORS } from "@/utils/colors";
import Loading from "react-loading";


const HotelList = () => {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [open, setOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hotellist = useSelector((state) => state.HOTEL.HotelList.hotelList);
   console.log("hotel-list:",hotellist)
  useEffect(() => {
    if (Array.isArray(hotellist)) {
      setLoading(false);
      setHotels(hotellist);
      setHasMore(hotellist.length > visibleCount);
    }
  }, [hotellist]);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loadingMore || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => {
              const newCount = prev + 10;
              setHasMore(newCount < hotels.length);
              return newCount;
            });
            setLoadingMore(false);
          }, 1000);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, hotels.length]
  );

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Grid2 container spacing={3}>
            {/* Filters Section */}
            {phone ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Button onClick={toggleDrawer(true)}>
                  <FilterAltIcon sx={{ fontSize: 30, color: COLORS.PRIMARY }} />
                </Button>

                <Drawer open={open} onClose={toggleDrawer(false)}>
                  <Box sx={{ width: 300, p: 2 }}>
                    <Card>
                      <CardHeader
                        action={
                          <Button onClick={toggleDrawer(false)}>
                            <CloseIcon sx={{ fontSize: 30 }} />
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
                        <Box mt={2}>
                          <Typography variant="subtitle1">Popular</Typography>
                          {["Breakfast Included", "Budget", "4 Star Hotels", "5 Star Hotels"].map(
                            (label) => (
                              <FormControlLabel
                                key={label}
                                control={<Checkbox defaultChecked={label === "Breakfast Included"} />}
                                label={label}
                              />
                            )
                          )}
                        </Box>
                        <Box mt={2}>
                          <Typography variant="subtitle1">Price Per Night</Typography>
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
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Drawer>
              </Box>
            ) : (
              <Grid2 size={{xs:12, md:3}}>
                <Card
                  sx={{
                    position: "sticky",
                    top: "75px",
                    overflowY: "scroll",
                    boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.1)",
                    p: 2,
                    "::-webkit-scrollbar": { width: 5 },
                    "::-webkit-scrollbar-thumb": {
                      backgroundColor: "#A8A8A8",
                      borderRadius: 4,
                    },
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
                    <Box mt={2}>
                      <Typography variant="subtitle1">Popular</Typography>
                      {["Breakfast Included", "Budget", "4 Star Hotels", "5 Star Hotels"].map(
                        (label) => (
                          <FormControlLabel
                            key={label}
                            control={<Checkbox defaultChecked={label === "Breakfast Included"} />}
                            label={label}
                          />
                        )
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            )}

            {/* Hotel List Section */}
            <Grid2 size={{xs:12, md:9}} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : hotels.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                  No hotels available.
                </Typography>
              ) : (
                hotels.slice(0, visibleCount).map((val, i) => {
                  const isLast = i === visibleCount - 1;
                  return (
                    <Grid2
                      xs={12}
                      key={i}
                      ref={isLast ? lastBookElementRef : null}
                    >
                      
                        <HotelCard hotel={val} />
                    </Grid2>
                  );
                })
              )}
              {hasMore && (
                <Box sx={{ textAlign: "center", mt: 2, mx:'auto' }}>
                  {loadingMore && <Loading
                                  type="bars"
                                  width={50}
                                  height={50}
                                  color={COLORS.PRIMARY}
                                />}
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default HotelList;
