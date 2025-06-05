import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Pagination,
  Stack,
} from "@mui/material";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";

// Define columns for the wedding booking data
const columns = [
  { key: "sl", label: "SL" },
  { key: "fullName", label: "Full Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "date", label: "Date" },
  { key: "weddingSide", label: "Wedding Side" },
  { key: "destination", label: "Destination" },
  { key: "guests", label: "Guests" },
  { key: "budget", label: "Budget" },
  { key: "theme", label: "Theme" },
  { key: "propertyType", label: "Property Type" },
  { key: "foodType", label: "Food Type" },
  { key: "entryVehicles", label: "Entry Vehicles" },
  { key: "musicTheme", label: "Music Theme" },
  { key: "eventType", label: "Event Type" },
  { key: "clothingJewellery", label: "Clothing & Jewellery" },
  { key: "additionalServices", label: "Additional Services" },
];

// Sample dummy data
const dummyData = [
  {
    sl: 1,
    fullName: "Ananya Sharma",
    phone: "+91 9876543210",
    email: "ananya@example.com",
    date: "2025-12-01",
    weddingSide: "Bride",
    destination: "Udaipur",
    guests: "200",
    budget: "25-30 Lakhs",
    theme: "Royal Palace",
    propertyType: "Heritage Hotel",
    foodType: "Vegetarian",
    entryVehicles: "Vintage Car",
    musicTheme: "Live Band",
    eventType: "Mehndi, Sangeet, Wedding",
    clothingJewellery: "Traditional + Designer",
    additionalServices: "Photography, Makeup, Decor",
  },
  {
    sl: 2,
    fullName: "Rahul Mehta",
    phone: "+91 9988776655",
    email: "rahul@example.com",
    date: "2026-01-15",
    weddingSide: "Groom",
    destination: "Goa",
    guests: "150",
    budget: "20-25 Lakhs",
    theme: "Beach Vibes",
    propertyType: "Resort",
    foodType: "Multi-cuisine",
    entryVehicles: "Horse & ATV",
    musicTheme: "DJ & Dhol",
    eventType: "Haldi, Sangeet, Wedding, Reception",
    clothingJewellery: "Contemporary",
    additionalServices: "Drone, Fireworks",
  },
];

const DestinationWedding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pageSize]);

  const filteredData = dummyData.filter((item) =>
    columns.some((col) =>
      String(item[col.key] || "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      {/* Heading */}
      <Box mb={4} textAlign="center">
        <Typography
          variant="h5"
          sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 1 }}
        >
          Destination Wedding Booking Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 400, color: COLORS.BLACK }}
        >
          View and manage destination wedding bookings. Use the filters and search to narrow down records.
        </Typography>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontFamily: nunito.style, fontWeight: 600 }}>Show</Typography>
          <FormControl size="small">
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              sx={{ minWidth: 60, fontFamily: nunito.style, fontWeight: 600 }}
            >
              {[5, 10, 25, 50].map((val) => (
                <MenuItem key={val} value={val} sx={{ fontFamily: nunito.style, fontWeight: 600 }}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ fontFamily: nunito.style, fontWeight: 600 }}>entries</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component="span"
            sx={{ mr: 1, fontFamily: nunito.style, fontWeight: 600 }}
          >
            Search:
          </Typography>
          <TextField
            size="small"
            value={searchTerm}
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead sx={{ backgroundColor: COLORS.PRIMARY }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    fontWeight: 600,
                    color: COLORS.WHITE,
                    textAlign: "center",
                    fontFamily: nunito.style,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 3, fontFamily: nunito.style, fontWeight: 600 }}
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{ fontFamily: nunito.style, fontWeight: 500, whiteSpace: "nowrap" }}
                    >
                      {row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        mt={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Typography sx={{ fontFamily: nunito.style, fontWeight: 500 }}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </Typography>

        <Stack spacing={2} direction="row">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default DestinationWedding;
