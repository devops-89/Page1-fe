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
import { dashboardController } from "@/api/dashboardController";
import CancelHotelDialog from "./CancelHotelDialog";
const columns = [
  { key: "sl", label: "SL" },
  { key: "bookingId", label: "Booking ID" },
  { key: "guestName", label: "Guest Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "roomType", label: "Room Type" },
  { key: "checkIn", label: "Check-In" },
  { key: "checkOut", label: "Check-Out" },
  { key: "status", label: "Status" },
  { key: "invoice", label: "Invoice" },
];

const dummyData = [
  {
    sl: 1,
    bookingId: "HB001",
    guestName: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    roomType: "Deluxe",
    checkIn: "2025-06-10",
    checkOut: "2025-06-13",
    status: "Confirmed",
    invoice: "INV001.pdf",
  },
  {
    sl: 2,
    bookingId: "HB002",
    guestName: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9123456780",
    roomType: "Suite",
    checkIn: "2025-06-12",
    checkOut: "2025-06-14",
    status: "Pending",
    invoice: "INV002.pdf",
  },
  {
    sl: 3,
    bookingId: "HB003",
    guestName: "Alex Johnson",
    email: "alex@example.com",
    phone: "+91 9988776655",
    roomType: "Standard",
    checkIn: "2025-06-11",
    checkOut: "2025-06-13",
    status: "Cancelled",
    invoice: "INV003.pdf",
  },
  {
    sl: 4,
    bookingId: "HB004",
    guestName: "Emily Brown",
    email: "emily@example.com",
    phone: "+91 8877665544",
    roomType: "Deluxe",
    checkIn: "2025-06-15",
    checkOut: "2025-06-17",
    status: "Confirmed",
    invoice: "INV004.pdf",
  },
  {
    sl: 5,
    bookingId: "HB005",
    guestName: "Michael Green",
    email: "michael@example.com",
    phone: "+91 7766554433",
    roomType: "Suite",
    checkIn: "2025-06-16",
    checkOut: "2025-06-18",
    status: "Pending",
    invoice: "INV005.pdf",
  },
];

const Hotel = () => {
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
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        let response = await dashboardController.getHotelBookingByUserId(
          userId,
          currentPage,
          pageSize,
          debouncedSearch?.trim() || ""
        );

        // Map response → table rows
        const docs = response.data.data.docs.map((item) => {
          let orderDetails = {};
          try {
            orderDetails = JSON.parse(item.order_request_second || "{}");
          } catch (e) {
            console.error("Error parsing order_request_second", e);
          }

          return {
            ...item,
            journey: orderDetails.hotelName || "--", // Hotel Name
            journey_type: orderDetails.roomType || "--", // Room Type
            updated_at: orderDetails.checkIn || item.updated_at, // Check In
            flightDate: orderDetails.checkOut || item.updated_at, // Check Out
            amount: item.amount, // Amount stays same
          };
        });

        setFetchedData(docs);
        setTotalItems(response.data.data.totalDocs);
      } catch (error) {
        console.error("Error fetching hotel bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, currentPage, debouncedSearch]);

  // required Data
  const paginatedData = fetchedData;
  const pageCount = Math.ceil(totalItems / pageSize);
  // console.log("PaginatedData: ", fetchedData);

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
          Hotel Booking Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: nunito.style,
            fontWeight: 400,
            color: COLORS.BLACK,
          }}
        >
          View, manage, and monitor your hotel bookings easily. Search, filter,
          and export guest booking information in real-time.
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
          <Typography sx={{ fontFamily: nunito.style, fontWeight: 600 }}>
            Show
          </Typography>
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
          <Typography sx={{ fontFamily: nunito.style, fontWeight: 600 }}>
            entries
          </Typography>
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
            placeholder="Search guest or booking ID"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 220 }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 5,
                    }}
                  >
                    <ReactLoading
                      type="bars"
                      color={COLORS.PRIMARY}
                      height={40}
                      width={40}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ) : paginatedData?.length === 0 ? (
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
              paginatedData?.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        fontFamily: nunito.style,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {col.key === "pdf_url" ? (
                        row.pdf_url ? (
                          <a
                            href={row.pdf_url}
                            target="_self"
                            rel="noopener noreferrer"
                            style={{
                              color: COLORS.SECONDARY,
                              textDecoration: "underline",
                            }}
                            download
                          >
                            Download
                          </a>
                        ) : (
                          "--"
                        )
                      ) : col.key === "cancellation" ? (
                        (() => {
                          let parsedResponse = null;
                          try {
                            parsedResponse = row.success_response
                              ? JSON.parse(row.success_response)
                              : null;
                          } catch (err) {
                            parsedResponse = null;
                          }

                          const bookingId =
                            parsedResponse?.Response?.Response?.BookingId ||
                            parsedResponse?.BookingId;

                          if (
                            row.status === "COMPLETED" &&
                            bookingId &&
                            row.status !== "CANCELLED"
                          ) {
                            return <CancelHotelDialog bookingId={bookingId} />;
                          }

                          return "--";
                        })()
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
          {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
          {filteredData.length} bookings
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

export default Hotel;
