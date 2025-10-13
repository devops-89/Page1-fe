import InnerBanner from "@/components/innerBanner";
import React, { useState, useEffect } from "react";
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
  TextField,
  Button,
  Slider,
  Grid2,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Rating,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import HotelCard from "@/components/hotels/hotelCard";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";
import { HOTEL_RATING } from "@/utils/enum";

const PAGE_SIZE = 10;

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchTerm, setSearchTerm] = useState("");

  // keep for any additional flags you may add later (e.g., "Budget")
  const [selectedFilters, setSelectedFilters] = useState([]);

  // ⭐ star filter (default 2 stars)
  const [selectedStar, setSelectedStar] = useState(2);

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const hotellist = useSelector((state) => state.HOTEL.HotelList.hotelList);

  useEffect(() => {
    if (Array.isArray(hotellist)) {
      setHotels(hotellist);
      setLoading(false);

      const prices = hotellist
        .map((hotel) => hotel?.Rooms?.[0]?.TotalFare)
        .filter((fare) => typeof fare === "number" && !Number.isNaN(fare));

      const min = prices.length ? Math.floor(Math.min(...prices)) : 0;
      const max = prices.length ? Math.ceil(Math.max(...prices)) : 5000;

      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    } else {
      setLoading(false);
    }
  }, [hotellist]);

  const handleRangeChange = (_event, newValue) => {
    setPriceRange(newValue);
    setPage(1);
  };

  const toggleDrawer = (openState) => (event) => {
    if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setOpen(openState);
  };

  const handleCheckboxChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFilters([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedStar(2); // ⭐ back to 2 stars
    setPage(1);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = searchTerm
      ? hotel?.HotelName?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // optional: if you later add a "Budget" toggle somewhere
    const budgetMatch = selectedFilters.includes("Budget") ? hotel?.price <= 1000 : true;

    // ⭐ exact star match; change to >= if you want “at least N stars”
    const hotelStars = HOTEL_RATING[hotel?.HotelRating];
    const ratingMatch = selectedStar ? hotelStars === selectedStar : true;

    const price = hotel?.Rooms?.[0]?.TotalFare ?? 0;
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];

    return nameMatch && budgetMatch && ratingMatch && priceMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentHotels = filteredHotels.slice(startIndex, startIndex + PAGE_SIZE);

  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
                      {...{
                        searchTerm,
                        setSearchTerm,
                        priceRange,
                        handleRangeChange,
                        selectedFilters,
                        handleCheckboxChange,
                        resetFilters,
                        minPrice,
                        maxPrice,
                        selectedStar,
                        setSelectedStar,
                        setPage,
                      }}
                    />
                  </Box>
                </Drawer>
              </Box>
            ) : (
              <Grid2 size={{ xs: 12, md: 3 }}>
                <FilterCard
                  {...{
                    searchTerm,
                    setSearchTerm,
                    priceRange,
                    handleRangeChange,
                    selectedFilters,
                    handleCheckboxChange,
                    resetFilters,
                    minPrice,
                    maxPrice,
                    selectedStar,
                    setSelectedStar,
                    setPage,
                  }}
                />
              </Grid2>
            )}

            {/* Hotel List Section */}
            <Grid2
              size={{ xs: 12, md: 9 }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : filteredHotels.length === 0 ? (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mt: 5, fontFamily: roboto.style }}
                >
                  No hotels available.
                </Typography>
              ) : (
                <>
                  {currentHotels.map((val, i) => (
                    <Grid2 xs={12} key={`${val?.HotelCode || i}-${i}`}>
                      <HotelCard hotel={val} />
                    </Grid2>
                  ))}

                  {/* Pagination */}
                  <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                      shape="rounded"
                      size={phone ? "small" : "medium"}
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </>
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
  selectedStar,
  setSelectedStar,
  setPage,
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
        <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }} variant="h5">
          Filters
        </Typography>
      }
      action={
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={resetFilters}
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          Reset
        </Button>
      }
    />
    <CardContent>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, fontFamily: roboto.style }}
      >
        Search by Hotel Name
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search by Hotel Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "8px" }} />,
        }}
      />

      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontFamily: roboto.style }}
        >
          Price Range <br /> (₹{priceRange[0]} - ₹{priceRange[1]})
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
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontFamily: roboto.style }}
        >
          Star Rating
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Rating
            name="hotel-star-filter"
            value={selectedStar}
            max={5}
            precision={1}
            onChange={(_, value) => {
              setSelectedStar(value);
              setPage(1);
            }}
          />
 
        </Box>
      </Box>

    </CardContent>
  </Card>
);

export default HotelList;
