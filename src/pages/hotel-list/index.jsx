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
const PRICE_BUCKETS = [
  { key: "b0", min: 0, max: 3500, label: "₹0 - ₹3500" },
  { key: "b1", min: 3500, max: 7000, label: "₹3500 - ₹7000" },
  { key: "b2", min: 7000, max: 10500, label: "₹7000 - ₹10500" },
  { key: "b3", min: 10500, max: 14000, label: "₹10500 - ₹14000" },
  { key: "b4", min: 14000, max: 15000, label: "₹14000 - ₹15000" },
  { key: "b5", min: 15000, max: 30000, label: "₹15000 - ₹30000" },
  { key: "b6", min: 30000, max: null, label: "₹30000+" },
];
// helper to parse room name string for bed type and smoking preference
const parseRoomName = (nameStr = "") => {
  const tokens = String(nameStr)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // bedType: try to find "king", "queen", "double", "single"
  const bedToken = tokens.find((t) => /king|queen|double|single/i.test(t));
  let bedType = "";
  if (bedToken) {
    const m = bedToken.match(/(king|queen|double|single)/i);
    if (m) {
      bedType = `${m[1][0].toUpperCase()}${m[1].slice(1).toLowerCase()} Bed`;
    } else {
      bedType = bedToken;
    }
  }

  // smoking token: check for NonSmoking or Smoking
  const smokingToken = tokens.find((t) =>
    /nonsmoking|non-smoking|smoking/i.test(t)
  );
  let smoking = "";
  if (smokingToken) {
    smoking = /non/i.test(smokingToken) ? "NonSmoking" : "Smoking";
  }

  return { bedType, smoking };
};
const HotelList = () => {
  const { query } = useRouter();
  const hotelCode = query.hotelCode;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [selectedStars, setSelectedStars] = useState([]);

  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [selectedPriceBuckets, setSelectedPriceBuckets] = useState([]);
  // bed type & smoking filters (multi)
  const [selectedBedTypes, setSelectedBedTypes] = useState([]);
  const [selectedSmokingPrefs, setSelectedSmokingPrefs] = useState([]);
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
    setSelectedStars([]);
    setSelectedMealTypes([]);
    setSelectedPriceBuckets([]);
    setSelectedBedTypes([]);
    setSelectedSmokingPrefs([]);
    setRefundableOnly(false);
    setPage(1);
  };

  // compute star counts
  const starCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    hotels.forEach((h) => {
      const s = HOTEL_RATING[h?.HotelRating];
      if (s && counts[s] !== undefined) counts[s] += 1;
    });
    return counts;
  }, [hotels]);

  // compute meal type counts
  const mealCounts = useMemo(() => {
    // WithMeal = at least one room with MealType present and not ROOM_ONLY
    // RoomOnly = at least one room with MealType === ROOM_ONLY
    let withMeal = 0;
    let roomOnly = 0;
    hotels.forEach((h) => {
      const rooms = Array.isArray(h?.Rooms) ? h.Rooms : [];
      const hasWithMeal =
        rooms.findIndex(
          (r) =>
            typeof r?.MealType === "string" &&
            r.MealType.trim().toUpperCase() !== "ROOM_ONLY" &&
            r.MealType.trim() !== ""
        ) !== -1;
      const hasRoomOnly =
        rooms.findIndex(
          (r) =>
            typeof r?.MealType === "string" &&
            r.MealType.trim().toUpperCase() === "ROOM_ONLY"
        ) !== -1;
      if (hasWithMeal) withMeal += 1;
      if (hasRoomOnly) roomOnly += 1;
    });
    return { WithMeal: withMeal, RoomOnly: roomOnly };
  }, [hotels]);

  // compute counts for each price bucket from the full hotels list
  const priceCounts = useMemo(() => {
    const counts = PRICE_BUCKETS.reduce((acc, b) => {
      acc[b.key] = 0;
      return acc;
    }, {});
    hotels.forEach((h) => {
      const price = Number(h?.Rooms?.[0]?.TotalFare ?? NaN);
      if (!Number.isFinite(price)) return;
      PRICE_BUCKETS.forEach((b) => {
        const minOk = price >= b.min;
        const maxOk = b.max === null ? true : price <= b.max;
        if (minOk && maxOk) counts[b.key] += 1;
      });
    });
    return counts;
  }, [hotels]);
  const refundableCount = useMemo(() => {
    let cnt = 0;
    hotels.forEach((h) => {
      const rooms = Array.isArray(h?.Rooms) ? h.Rooms : [];
      const hasRefundable =
        rooms.findIndex((r) => r?.IsRefundable === true) !== -1;
      if (hasRefundable) cnt += 1;
    });
    return cnt;
  }, [hotels]);

  // compute bedType & smoking counts (per-hotel)
  const { bedTypeCounts, smokingCounts } = useMemo(() => {
    const bt = {};
    const sc = {};

    hotels.forEach((h) => {
      const rooms = Array.isArray(h?.Rooms) ? h.Rooms : [];
      const seenBed = new Set();
      const seenSmoking = new Set();

      rooms.forEach((r) => {
        const names = Array.isArray(r?.Name) ? r.Name : [r?.Name];
        names.forEach((nm) => {
          if (!nm) return;
          const { bedType, smoking } = parseRoomName(nm);
          if (bedType) seenBed.add(bedType);
          if (smoking) seenSmoking.add(smoking);
        });
      });

      seenBed.forEach((val) => (bt[val] = (bt[val] || 0) + 1));
      seenSmoking.forEach((val) => (sc[val] = (sc[val] || 0) + 1));
    });

    return { bedTypeCounts: bt, smokingCounts: sc };
  }, [hotels]);
  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = searchTerm
      ? hotel?.HotelName?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // optional: if you later add a "Budget" toggle somewhere
    const budgetMatch = selectedFilters.includes("Budget")
      ? hotel?.price <= 1000
      : true;

    //  exact star match; change to >= if you want “at least N stars”
    const hotelStars = HOTEL_RATING[hotel?.HotelRating];
    const ratingMatch =
      selectedStars && selectedStars.length > 0
        ? selectedStars.includes(hotelStars)
        : true;

    const price = hotel?.Rooms?.[0]?.TotalFare ?? NaN;
    let priceMatch = true;
    if (selectedPriceBuckets && selectedPriceBuckets.length > 0) {
      priceMatch = selectedPriceBuckets.some((key) => {
        const bucket = PRICE_BUCKETS.find((b) => b.key === key);
        if (!bucket) return false;
        const minOk = Number.isFinite(price) ? price >= bucket.min : false;
        const maxOk =
          bucket.max === null
            ? Number.isFinite(price)
            : Number.isFinite(price)
            ? price <= bucket.max
            : false;
        return minOk && maxOk;
      });
    } else {
      priceMatch = true;
    }
    // NEW: meal type matching using selectedMealTypes (multi-select)
    const rooms = Array.isArray(hotel?.Rooms) ? hotel.Rooms : [];
    const normalizeMeal = (mt) =>
      typeof mt === "string" ? mt.trim().toUpperCase() : "";

    // compute whether hotel has WithMeal and/or RoomOnly rooms
    const hasWithMeal =
      rooms.findIndex(
        (r) =>
          normalizeMeal(r?.MealType) &&
          normalizeMeal(r?.MealType) !== "ROOM_ONLY"
      ) !== -1;
    const hasRoomOnly =
      rooms.findIndex((r) => normalizeMeal(r?.MealType) === "ROOM_ONLY") !== -1;

    let mealMatch = true;
    if (selectedMealTypes && selectedMealTypes.length > 0) {
      // If user selected any meal types, the hotel must match at least one selected type
      mealMatch = selectedMealTypes.some((mt) => {
        if (mt === "WithMeal") return hasWithMeal;
        if (mt === "RoomOnly") return hasRoomOnly;
        return false;
      });
    } else {
      mealMatch = true; // no meal filter selected
    }
    const refundableMatch = refundableOnly
      ? rooms.findIndex((r) => r?.IsRefundable === true) !== -1
      : true;
    let bedTypeMatch = true;
    if (selectedBedTypes && selectedBedTypes.length > 0) {
      bedTypeMatch = rooms.some((r) => {
        const names = Array.isArray(r?.Name) ? r.Name : [r?.Name];
        return names.some((nm) => {
          if (!nm) return false;
          const { bedType } = parseRoomName(nm);
          return bedType && selectedBedTypes.includes(bedType);
        });
      });
    }
    // smoking match
    let smokingMatch = true;
    if (selectedSmokingPrefs && selectedSmokingPrefs.length > 0) {
      smokingMatch = rooms.some((r) => {
        const names = Array.isArray(r?.Name) ? r.Name : [r?.Name];
        return names.some((nm) => {
          if (!nm) return false;
          const { smoking } = parseRoomName(nm);
          return smoking && selectedSmokingPrefs.includes(smoking);
        });
      });
    }

    return (
      nameMatch &&
      budgetMatch &&
      ratingMatch &&
      priceMatch &&
      mealMatch &&
      refundableMatch &&
      bedTypeMatch &&
      smokingMatch
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
  }, [
    searchTerm,
    selectedMealTypes,
    refundableOnly,
    selectedPriceBuckets,
    selectedBedTypes,
    selectedSmokingPrefs,
  ]);

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
                        selectedStars,
                        setSelectedStars,
                        starCounts,
                        selectedMealTypes,
                        setSelectedMealTypes,
                        mealCounts,
                        selectedPriceBuckets,
                        setSelectedPriceBuckets,
                        priceCounts,
                        selectedBedTypes,
                        setSelectedBedTypes,
                        bedTypeCounts,
                        selectedSmokingPrefs,
                        setSelectedSmokingPrefs,
                        smokingCounts,
                        setPage,
                        refundableOnly,
                        refundableCount,
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
                    selectedStars,
                    setSelectedStars,
                    starCounts,
                    selectedMealTypes,
                    setSelectedMealTypes,
                    mealCounts,
                    selectedPriceBuckets,
                    setSelectedPriceBuckets,
                    priceCounts,
                    selectedBedTypes,
                    setSelectedBedTypes,
                    bedTypeCounts,
                    selectedSmokingPrefs,
                    setSelectedSmokingPrefs,
                    smokingCounts,
                    setPage,
                    refundableOnly,
                    refundableCount,
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
  selectedStars,
  setSelectedStars,
  starCounts = {},
  selectedMealTypes,
  setSelectedMealTypes,
  mealCounts,
  selectedPriceBuckets = [],
  setSelectedPriceBuckets,
  priceCounts = {},
  selectedBedTypes = [],
  setSelectedBedTypes,
  bedTypeCounts = {},
  selectedSmokingPrefs = [],
  setSelectedSmokingPrefs,
  smokingCounts = {},
  setPage,
  refundableOnly,
  setRefundableOnly,
  refundableCount = {},
}) => {
  // helper to render checkbox lists
  const renderCheckboxList = (
    items,
    selected,
    onToggle,
    countsMap,
    labelFormatter
  ) => {
    return items.map((key) => {
      const checked = selected.includes(key);
      const count = countsMap?.[key] ?? 0;
      return (
        <Box
          key={key}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => {
                  if (checked)
                    onToggle((prev) => prev.filter((x) => x !== key));
                  else onToggle((prev) => [...prev, key]);
                  setPage(1);
                }}
                size="small"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              />
            }
            label={labelFormatter ? labelFormatter(key) : key}
            sx={{
              mr: 0,
              "& .MuiFormControlLabel-label": {
                fontFamily: roboto.style,
                fontWeight: 400,
              },
            }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary", mr: 1 }}>
            ({count})
          </Typography>
        </Box>
      );
    });
  };

  const bedTypeKeys = Object.keys(bedTypeCounts).sort(
    (a, b) => (bedTypeCounts[b] || 0) - (bedTypeCounts[a] || 0)
  );
  const smokingKeys = Object.keys(smokingCounts).sort(
    (a, b) => (smokingCounts[b] || 0) - (smokingCounts[a] || 0)
  );

  return (
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

        {/* <Box mt={3}>
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
      </Box> */}
        {/* Price buckets UI (checkbox list with counts) */}
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Price per night
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {PRICE_BUCKETS.map((b) => {
              const checked = selectedPriceBuckets.includes(b.key);
              const count = priceCounts?.[b.key] ?? 0;
              return (
                <Box
                  key={b.key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setSelectedPriceBuckets((prev) =>
                              prev.filter((x) => x !== b.key)
                            );
                          } else {
                            setSelectedPriceBuckets((prev) => {
                              const next = [...prev, b.key];
                              return next;
                            });
                          }
                          setPage(1);
                        }}
                        size="small"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      />
                    }
                    label={b.label}
                    sx={{
                      mr: 0,
                      "& .MuiFormControlLabel-label": {
                        fontFamily: roboto.style,
                        fontWeight: 400,
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mr: 1 }}
                  >
                    ({count})
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Star Category
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {[2, 3, 4, 5].map((s) => {
              const checked = selectedStars.includes(s);
              const count = starCounts?.[s] ?? 0;
              return (
                <Box
                  key={`star-${s}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setSelectedStars((prev) =>
                              prev.filter((x) => x !== s)
                            );
                          } else {
                            setSelectedStars((prev) => {
                              const next = [...prev, s];
                              return next.sort((a, b) => b - a);
                            });
                          }
                          setPage(1);
                        }}
                        size="small"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      />
                    }
                    label={`${s} Star`}
                    sx={{
                      mr: 0,
                      "& .MuiFormControlLabel-label": {
                        fontFamily: roboto.style,
                        fontWeight: 400,
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mr: 1 }}
                  >
                    ({count})
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* NEW: Meal Type dropdown */}
        {/* <Box mt={3}>
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
      </Box> */}
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Meal Category
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {[
              { key: "WithMeal", label: "With Meal" },
              { key: "RoomOnly", label: "Without Meal" },
            ].map(({ key, label }) => {
              const checked = selectedMealTypes.includes(key);
              const count = mealCounts?.[key] ?? 0;
              return (
                <Box
                  key={`meal-${key}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setSelectedMealTypes((prev) =>
                              prev.filter((x) => x !== key)
                            );
                          } else {
                            setSelectedMealTypes((prev) => {
                              const next = [...prev, key];
                              // keep deterministic order (optional)
                              return next;
                            });
                          }
                          setPage(1);
                        }}
                        size="small"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      />
                    }
                    label={label}
                    sx={{
                      mr: 0,
                      "& .MuiFormControlLabel-label": {
                        fontFamily: roboto.style,
                        fontWeight: 400,
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mr: 1 }}
                  >
                    ({count})
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        {/* Bed Type */}
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Bed Type
          </Typography>
          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {bedTypeKeys.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", px: 1 }}
              >
                No bed type data
              </Typography>
            ) : (
              renderCheckboxList(
                bedTypeKeys,
                selectedBedTypes,
                setSelectedBedTypes,
                bedTypeCounts
              )
            )}
          </Box>
        </Box>

        {/* Smoking preference */}
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Smoking
          </Typography>
          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {smokingKeys.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", px: 1 }}
              >
                No smoking data
              </Typography>
            ) : (
              renderCheckboxList(
                smokingKeys,
                selectedSmokingPrefs,
                setSelectedSmokingPrefs,
                smokingCounts,
                (k) =>
                  k === "NonSmoking"
                    ? "Non-smoking"
                    : k === "Smoking"
                    ? "Smoking"
                    : k
              )
            )}
          </Box>
        </Box>
        {/* refundable */}
        <Box mt={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: roboto.style, mb: 1 }}
          >
            Refundable
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              mt: 1,
              py: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={refundableOnly}
                    onChange={(e) => {
                      setRefundableOnly(e.target.checked);
                      setPage(1);
                    }}
                    size="small"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                  />
                }
                label="Refundable Only"
                sx={{
                  mr: 0,
                  "& .MuiFormControlLabel-label": {
                    fontFamily: roboto.style,
                    fontWeight: 400,
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mr: 1 }}
              >
                ({refundableCount})
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelList;
