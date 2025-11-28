import InnerBanner from "@/components/innerBanner";
import React, { useState, useEffect, useMemo } from "react";
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
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import HotelCard from "@/components/hotels/hotelCard";
import { COLORS } from "@/utils/colors";
import { nunito, roboto } from "@/utils/fonts";
import { HOTEL_RATING } from "@/utils/enum";

const PAGE_SIZE = 10;

const HotelList = () => {
  const { query } = useRouter();
  const hotelCode = query.hotelCode;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchTerm, setSearchTerm] = useState("");
  console.log("hotel code is : ", hotelCode);
  // keep for any additional flags you may add later (e.g., "Budget")
  const [selectedFilters, setSelectedFilters] = useState([]);

  // ⭐ star filter (default 2 stars)
  const [selectedStar, setSelectedStar] = useState(0);
  const [mealFilter, setMealFilter] = useState("All");
  const [refundableOnly, setRefundableOnly] = useState(false);
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
    if (
      event?.type === "keydown" &&
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
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFilters([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedStar(0); // ⭐ back to 2 stars
    setMealFilter("All");
    setRefundableOnly(false);
    setPage(1);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = searchTerm
      ? hotel?.HotelName?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // optional: if you later add a "Budget" toggle somewhere
    const budgetMatch = selectedFilters.includes("Budget")
      ? hotel?.price <= 1000
      : true;

    // ⭐ exact star match; change to >= if you want “at least N stars”
    const hotelStars = HOTEL_RATING[hotel?.HotelRating];
    const ratingMatch = selectedStar ? hotelStars === selectedStar : true;

    const price = hotel?.Rooms?.[0]?.TotalFare ?? 0;
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    // NEW: meal type matching
    // If no rooms or no MealType info, treat conservatively (allow unless filter is specific)
    const rooms = Array.isArray(hotel?.Rooms) ? hotel.Rooms : [];

    const normalizeMeal = (mt) =>
      typeof mt === "string" ? mt.trim().toUpperCase() : "";

    let mealMatch = true;
    if (mealFilter === "WithMeal") {
      // at least one room where MealType is present and not "ROOM_ONLY"
      mealMatch =
        rooms.findIndex(
          (r) =>
            normalizeMeal(r?.MealType) &&
            normalizeMeal(r?.MealType) !== "ROOM_ONLY"
        ) !== -1;
    } else if (mealFilter === "RoomOnly") {
      // at least one room where MealType === "ROOM_ONLY"
      mealMatch =
        rooms.findIndex((r) => normalizeMeal(r?.MealType) === "ROOM_ONLY") !==
        -1;
    } else {
      mealMatch = true; // "All"
    }
    const refundableMatch = refundableOnly
      ? rooms.findIndex((r) => r?.IsRefundable === true) !== -1
      : true;

    return (
      nameMatch &&
      budgetMatch &&
      ratingMatch &&
      priceMatch &&
      mealMatch &&
      refundableMatch
    );
  });

  // Find matched hotel from FULL hotels list (so deep link works regardless of filters)
  const matchedHotel = useMemo(() => {
    if (!hotelCode) return null;
    return hotels.find(
      (h) => String(h?.HotelCode ?? h?.hotelCode ?? "") === String(hotelCode)
    );
  }, [hotels, hotelCode]);

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setPage(1);
  }, [searchTerm, mealFilter, refundableOnly]);

  return (
    <div>
      <InnerBanner img={banner.src} heading={"Hotel"} />

      <Box sx={{ pt: { lg: 10, xs: 5 }, pb: 10 }}>
        <Container>
          <Grid2 container spacing={3}>
            {/* Filters Section */}
            {phone ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
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
                        mealFilter,
                        setMealFilter,
                        refundableOnly,
                        setRefundableOnly,
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
                    mealFilter,
                    setMealFilter,
                    refundableOnly,
                    setRefundableOnly,
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
                  {hotelCode && matchedHotel ? (
                    <>
                      {/* <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                        Featured Result
                      </Typography> */}
                      <Grid2 xs={12}>
                        <HotelCard hotel={matchedHotel} highlight />
                      </Grid2>

                      <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                          Nearby Hotels
                        </Typography>
                      </Box>
                    </>
                  ) : hotelCode && !matchedHotel ? (
                    // If hotelCode present but no match
                    <Box
                      sx={{
                        p: 2,
                        mb: 1,
                        borderRadius: 1,
                        bgcolor: "#fff3f0",
                        border: "1px solid rgba(255,120,80,0.15)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, fontFamily: roboto.style }}
                      >
                        No hotel found
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Showing nearby hotels below.
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                          Nearby Hotels
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}

                  {/* Render nearby / rest hotels (paginated) */}
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
  mealFilter,
  setMealFilter,
  refundableOnly,
  setRefundableOnly,
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
        <Typography
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
          variant="h5"
        >
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

      {/* <Box mt={3}>
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
      </Box> */}
      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
        >
          Star Rating
        </Typography>

        <FormControl fullWidth size="small">
          <Select
            value={selectedStar}
            onChange={(e) => {
              // Select returns string for value; cast to number
              const val = Number(e.target.value);
              setSelectedStar(val);
              setPage(1);
            }}
          >
            <MenuItem value={0}>Select Rating</MenuItem>
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Star</MenuItem>
            <MenuItem value={3}>3 Star</MenuItem>
            <MenuItem value={4}>4 Star</MenuItem>
            <MenuItem value={5}>5 Star</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* NEW: Meal Type dropdown */}
      <Box mt={3}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
        >
          Meal Type
        </Typography>

        <FormControl fullWidth size="small">
          <Select
            labelId="meal-filter-label"
            value={mealFilter}
            // label="Meal Type"
            onChange={(e) => {
              setMealFilter(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="WithMeal">
              WithMeal (Breakfast / Dinner / etc.)
            </MenuItem>
            <MenuItem value="RoomOnly">RoomOnly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={refundableOnly}
              onChange={(e) => {
                setRefundableOnly(e.target.checked);
                setPage(1);
              }}
              size="small"
            />
          }
          label="Refundable Only"
        />
      </Box>
    </CardContent>
  </Card>
);

export default HotelList;
