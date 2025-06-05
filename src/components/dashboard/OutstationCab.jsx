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

const columns = [
  { key: "sl", label: "SL" },
  { key: "email", label: "Email" },
  { key: "pickupLocation", label: "Pickup Location" },
  { key: "dropLocation", label: "Drop Location" },
  { key: "mobile", label: "Mobile Number" },
  { key: "persons", label: "No. of Persons" },
  { key: "pickupDate", label: "Pickup Date" },
  { key: "pickupTime", label: "Pickup Time" },
  { key: "isRoundTrip", label: "Round Trip" },
  { key: "returnDate", label: "Return Date" },
];

// Example dummy data
const dummyData = [
  {
    sl: 1,
    email: "john@example.com",
    pickupLocation: "Delhi",
    dropLocation: "Agra",
    mobile: "+91 9876543210",
    persons: 2,
    pickupDate: "2025-06-10",
    pickupTime: "10:00 AM",
    isRoundTrip: true,
    returnDate: "2025-06-12",
  },
  {
    sl: 2,
    email: "jane@example.com",
    pickupLocation: "Mumbai",
    dropLocation: "Pune",
    mobile: "+91 9123456780",
    persons: 3,
    pickupDate: "2025-06-11",
    pickupTime: "09:00 AM",
    isRoundTrip: false,
    returnDate: "",
  },
];

const OutstationCab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Reset page when search or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pageSize]);

  // Filter data by search term (case-insensitive across all columns)
  const filteredData = dummyData.filter((item) =>
    columns.some((col) => {
      let value = item[col.key];
      if (typeof value === "boolean") {
        value = value ? "yes" : "no";
      }
      return String(value || "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
    })
  );

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, sm: 4, md: 5 } }}>
      {/* Heading */}
      <Box mb={4} textAlign="center">
        <Typography variant="h5" sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 1 }}>
          Outstation Cab Booking Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 400, color: COLORS.BLACK }}
        >
          Manage and track outstation cab bookings with ease. Use search and pagination for efficient navigation.
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
          <Typography component="span" sx={{ mr: 1, fontFamily: nunito.style, fontWeight: 600 }}>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
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
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{ fontFamily: nunito.style, fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                      {col.key === "isRoundTrip"
                        ? row[col.key]
                          ? "Yes"
                          : "No"
                        : col.key === "returnDate" && !row.isRoundTrip
                        ? "-"
                        : row[col.key]}
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

export default OutstationCab;
