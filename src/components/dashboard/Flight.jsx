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
  { key: "bookingRef", label: "Booking Ref" },
  { key: "passengerName", label: "Passenger Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "departure", label: "Departure" },
  { key: "arrival", label: "Arrival" },
  { key: "flightDate", label: "Flight Date" },
  { key: "status", label: "Status" },
  { key: "ticket", label: "Ticket" },
];

const dummyData = [
  {
    sl: 1,
    bookingRef: "FBK001",
    passengerName: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    departure: "Delhi (DEL)",
    arrival: "Mumbai (BOM)",
    flightDate: "2025-06-10",
    status: "Confirmed",
    ticket: "FBK001.pdf",
  },
  {
    sl: 2,
    bookingRef: "FBK002",
    passengerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9123456780",
    departure: "Bangalore (BLR)",
    arrival: "Chennai (MAA)",
    flightDate: "2025-06-12",
    status: "Pending",
    ticket: "FBK002.pdf",
  },
  {
    sl: 3,
    bookingRef: "FBK003",
    passengerName: "Alex Johnson",
    email: "alex@example.com",
    phone: "+91 9988776655",
    departure: "Kolkata (CCU)",
    arrival: "Hyderabad (HYD)",
    flightDate: "2025-06-15",
    status: "Cancelled",
    ticket: "FBK003.pdf",
  },
  {
    sl: 4,
    bookingRef: "FBK004",
    passengerName: "Emily Brown",
    email: "emily@example.com",
    phone: "+91 8877665544",
    departure: "Mumbai (BOM)",
    arrival: "Delhi (DEL)",
    flightDate: "2025-06-18",
    status: "Confirmed",
    ticket: "FBK004.pdf",
  },
  {
    sl: 5,
    bookingRef: "FBK005",
    passengerName: "Michael Green",
    email: "michael@example.com",
    phone: "+91 7766554433",
    departure: "Chennai (MAA)",
    arrival: "Bangalore (BLR)",
    flightDate: "2025-06-20",
    status: "Pending",
    ticket: "FBK005.pdf",
  },
  {
    sl: 6,
    bookingRef: "FBK006",
    passengerName: "Sophia Blue",
    email: "sophia@example.com",
    phone: "+91 6655443322",
    departure: "Hyderabad (HYD)",
    arrival: "Kolkata (CCU)",
    flightDate: "2025-06-22",
    status: "Confirmed",
    ticket: "FBK006.pdf",
  },
  {
    sl: 7,
    bookingRef: "FBK007",
    passengerName: "Daniel Black",
    email: "daniel@example.com",
    phone: "+91 5544332211",
    departure: "Delhi (DEL)",
    arrival: "Chennai (MAA)",
    flightDate: "2025-06-25",
    status: "Cancelled",
    ticket: "FBK007.pdf",
  },
  {
    sl: 8,
    bookingRef: "FBK008",
    passengerName: "Olivia White",
    email: "olivia@example.com",
    phone: "+91 4433221100",
    departure: "Mumbai (BOM)",
    arrival: "Bangalore (BLR)",
    flightDate: "2025-06-27",
    status: "Confirmed",
    ticket: "FBK008.pdf",
  },
  {
    sl: 9,
    bookingRef: "FBK009",
    passengerName: "Liam Brown",
    email: "liam@example.com",
    phone: "+91 3322110099",
    departure: "Kolkata (CCU)",
    arrival: "Delhi (DEL)",
    flightDate: "2025-06-30",
    status: "Pending",
    ticket: "FBK009.pdf",
  },
  {
    sl: 10,
    bookingRef: "FBK010",
    passengerName: "Ava Wilson",
    email: "ava@example.com",
    phone: "+91 2211009988",
    departure: "Chennai (MAA)",
    arrival: "Mumbai (BOM)",
    flightDate: "2025-07-02",
    status: "Confirmed",
    ticket: "FBK010.pdf",
  },
];

const Flight = () => {
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
      {/* Heading & Paragraph */}
      <Box mb={4} textAlign="center">
        <Typography
          variant="h5"
          sx={{ fontFamily: nunito.style, fontWeight: 700, mb: 1 }}
        >
          Flight Booking Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 400, color: COLORS.BLACK }}
        >
          Manage and monitor your flight bookings seamlessly. Use search and pagination controls to find and track booking details.
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
                <MenuItem
                  key={val}
                  value={val}
                  sx={{ fontFamily: nunito.style, fontWeight: 600 }}
                >
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
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
        }}
      >
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
                  No booking data available
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
                      {col.key === "ticket" ? (
                        <a href={`/${row[col.key]}`} download>
                          {row[col.key]}
                        </a>
                      ) : (
                        row[col.key]
                      )}
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

export default Flight;
