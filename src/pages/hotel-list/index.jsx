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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Loading from "react-loading";

import HotelCard from "@/components/hotels/hotelCard";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { HOTEL_RATING } from "@/utils/enum";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [open, setOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hotellist = useSelector((state) => state.HOTEL.HotelList.hotelList);

  useEffect(() => {
    if (Array.isArray(hotellist)) {
      setHotels(hotellist);
      setLoading(false);

      const prices = hotellist
        .map((hotel) => hotel?.Rooms?.[0]?.TotalFare)
        .filter((fare) => typeof fare === "number");

      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));

      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
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
              setHasMore(newCount < filteredHotels.length);
              return newCount;
            });
            setLoadingMore(false);
          }, 1000);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, hotels.length, selectedFilters, searchTerm, priceRange]
  );

  const handleRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const toggleDrawer = (openState) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setOpen(openState);
  };

  const handleCheckboxChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFilters([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = searchTerm
      ? hotel?.HotelName?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const breakfastMatch = selectedFilters.includes("Breakfast Included")
      ? hotel?.HotelFacilities?.includes("Breakfast")
      : true;

    const budgetMatch = selectedFilters.includes("Budget")
      ? hotel?.price <= 1000
      : true;

    const ratingSelected = selectedFilters.filter((f) =>
      ["4 Star Hotels", "5 Star Hotels"].includes(f)
    );
    const ratingMatch =
      ratingSelected.length > 0
        ? ratingSelected.some((r) => {
            if (r === "4 Star Hotels") return HOTEL_RATING[hotel?.HotelRating] === 4;
            if (r === "5 Star Hotels") return HOTEL_RATING[hotel?.HotelRating] === 5;
            return false;
          })
        : true;

    const price = hotel?.Rooms?.[0]?.TotalFare;
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];

    return (
      nameMatch &&
      breakfastMatch &&
      budgetMatch &&
      ratingMatch &&
      priceMatch
    );
  });

  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

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
                    <FilterCard
                      {...{ searchTerm, setSearchTerm, priceRange, handleRangeChange, selectedFilters, handleCheckboxChange, resetFilters, minPrice, maxPrice }}
                    />
                  </Box>
                </Drawer>
              </Box>
            ) : (
              <Grid2 size={{ xs: 12, md: 3 }}>
                <FilterCard
                  {...{ searchTerm, setSearchTerm, priceRange, handleRangeChange, selectedFilters, handleCheckboxChange, resetFilters, minPrice, maxPrice }}
                />
              </Grid2>
            )}

            {/* Hotel List Section */}
            <Grid2 size={{ xs: 12, md: 9 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : filteredHotels.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center", mt: 5, fontFamily: nunito.style }}>
                  No hotels available.
                </Typography>
              ) : (
                filteredHotels.slice(0, visibleCount).map((val, i) => {
                  const isLast = i === visibleCount - 1;
                  return (
                    <Grid2 xs={12} key={i} ref={isLast ? lastBookElementRef : null}>
                      <HotelCard hotel={val} />
                    </Grid2>
                  );
                })
              )}

              {hasMore && (
                <Box sx={{ textAlign: "center", mt: 2, mx: "auto" }}>
                  {loadingMore && (
                    <Loading type="bars" width={50} height={50} color={COLORS.PRIMARY} />
                  )}
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

const FilterCard = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  handleRangeChange,
  selectedFilters,
  handleCheckboxChange,
  resetFilters,
  minPrice,
  maxPrice,
}) => (
  <Card
    sx={{
      position: "sticky",
      top: "75px",
      overflowY: "scroll",
      boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.1)",
      "::-webkit-scrollbar": { width: 5 },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#A8A8A8",
        borderRadius: 4,
      },
    }}
  >
    <CardHeader
      title={
        <Typography sx={{ fontFamily: nunito.style, fontWeight: 700 }} variant="h5">
          Filters
        </Typography>
      }
      action={
        <Button variant="text" color="primary" size="small" onClick={resetFilters} sx={{ fontFamily: nunito.style, fontWeight: 700 }}>
          Reset
        </Button>
      }
    />
    <CardContent>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontFamily: nunito.style }}>
        Search by Hotel Names
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search by Hotel Names"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "8px" }} />,
        }}
      />
      <Box mt={3}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: nunito.style }}>
          Price Range <br/> (₹{priceRange[0]} - ₹{priceRange[1]})
        </Typography>
        <Slider
          value={priceRange}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          step={100}
        />
      </Box>
      <Box mt={3}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: nunito.style }}>
          Popular
        </Typography>
        {["Breakfast Included", "Budget", "4 Star Hotels", "5 Star Hotels"].map((label) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox checked={selectedFilters.includes(label)} onChange={() => handleCheckboxChange(label)} />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: nunito.style }}>
                {label}
              </Typography>
            }
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default HotelList;
