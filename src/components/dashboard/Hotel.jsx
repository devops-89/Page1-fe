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
  Button,
} from "@mui/material";
import ReactLoading from "react-loading";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { dashboardController } from "@/api/dashboardController";
import CancelHotelDialog from "./CancelHotelDialog";
import { hotelController } from "@/api/hotelController";
import { useSelector } from "react-redux";
const columns = [
  { key: "journey", label: "Hotel Name" },
  { key: "journey_type", label: "Room Type" },
  { key: "amount", label: "Price" },
  { key: "updated_at", label: "Check In" },
  { key: "flightDate", label: "Check Out" },
  { key: "status", label: "Status" },
  { key: "pdf_url", label: "Invoice" },
  { key: "cancellation", label: "Cancel Booking" },
];

const Hotel = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [checkingId, setCheckingId] = useState(null);
  const Ip_address = useSelector(
    (state) => state?.HOTEL?.HotelSearchData?.userIp
  );
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
        const response = await dashboardController.getHotelBookingByUserId(
          userId,
          currentPage,
          pageSize,
          debouncedSearch?.trim() || ""
        );

        const docs = response.data.data.docs.map((item) => {
          let orderDetails = {};
          try {
            orderDetails = JSON.parse(item.order_request_second || "{}");
          } catch (e) {
            console.error("Error parsing order_request_second", e);
          }

          return {
            ...item,
            journey: orderDetails.hotelName || "--",
            journey_type: orderDetails.roomType || "--",
            updated_at: orderDetails.checkIn || item.updated_at,
            flightDate: orderDetails.checkOut || item.updated_at,
            amount: item.amount,
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

  const pageCount = Math.ceil(totalItems / pageSize);

  const handleUpdateRow = (orderId, newStatus) => {
    // Update the row in fetchedData after cancel API response
    setFetchedData((prev) =>
      prev.map((row) =>
        row.order_id === orderId ? { ...row, status: newStatus } : row
      )
    );
  };

  const formatBreakup = (breakup) => {
    if (!breakup) return "No breakup details available.";
    try {
      if (Array.isArray(breakup)) {
        if (breakup.length === 0) return "No breakup details available.";
        return breakup
          .map((b, idx) =>
            typeof b === "object"
              ? `${idx + 1}. ${Object.entries(b)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ")}`
              : `${idx + 1}. ${String(b)}`
          )
          .join("\n");
      }
      if (typeof breakup === "object") {
        const entries = Object.entries(breakup);
        if (entries.length === 0) return "No breakup details available.";
        return entries.map(([k, v]) => `${k}: ${v}`).join("\n");
      }
      // primitive/string
      return String(breakup);
    } catch {
      return "No breakup details available.";
    }
  };

  const handleCheckStatus = async (orderId) => {
    if (!orderId) return;
    if (!Ip_address) {
      alert("IP address missing. Please retry after a fresh search.");
      return;
    }

    setCheckingId(orderId);
    try {
      const payload = { orderId, ip: Ip_address };

      // Call your check-status API
      const response = await hotelController.checkCancellationStatus(payload);
      const data = response?.data;
      if (data?.ResponseStatus !== 1) {
        const msg =
          data?.Error?.ErrorMessage || "Unable to fetch cancellation status.";
        alert(`❌ ${msg}`);
        return;
      }
      const crId = data?.ChangeRequestId;
      const status = data?.ChangeRequestStatus;
      console.log("njncjd", status);
      // Map messages per enum
      if (status === 1) {
        alert(
          `🕓 Your booking cancellation is in PENDING.\nChange Request ID: ${crId}`
        );
        handleUpdateRow(orderId, "CANCELLING");
      } else if (status === 2) {
        alert(
          `🔄 Your booking cancellation is IN PROGRESS.\nChange Request ID: ${crId}`
        );
        handleUpdateRow(orderId, "CANCELLING");
      } else if (status === 3) {
        // Processed → show all details and mark as cancelled
        const details = [
          `✅ Your booking cancellation is PROCESSED.`,
          `Change Request ID: ${crId}`,
          `Trace ID: ${data?.TraceId || "-"}`,
          `Total Service Charge: ${data?.TotalServiceCharge ?? 0}`,
          `B2B2B Status: ${data?.B2B2BStatus ? "True" : "False"}`,
          `Cancellation Charge Breakup:\n${formatBreakup(
            data?.CancellationChargeBreakUp
          )}`,
        ].join("\n");
        alert(details);
        handleUpdateRow(orderId, "CANCELLED");
      } else if (status === 4) {
        alert(
          `⛔ Your booking cancellation is REJECTED.\nChange Request ID: ${crId}`
        );
        // keep status as whatever it was prior; don't force change
      } else {
        alert(
          `ℹ️ Unknown status (${status}).\nChange Request ID: ${crId}\nTrace ID: ${
            data?.TraceId || "-"
          }`
        );
      }
    } catch (err) {
      console.error("Error checking cancellation status:", err);
      alert("❌ Failed to check cancellation status. Please try again.");
    } finally {
      setCheckingId(null);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
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
          Manage and monitor your hotel bookings seamlessly. Use search and
          pagination controls to find and track booking details.
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
              onChange={(e) => setPageSize(Number(e.target.value))}
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
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", minHeight: "200px" }}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 5 }}
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
            ) : fetchedData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    py: 3,
                    fontFamily: nunito.style,
                    fontWeight: 600,
                  }}
                >
                  No booking data available
                </TableCell>
              </TableRow>
            ) : (
              fetchedData.map((row, i) => (
                <TableRow key={`${row?.order_id || i}-${i}`}>
                  {columns.map((col) => {
                    const commonSx = {
                      fontFamily: nunito.style,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      maxWidth: 220,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    };

                    if (col.key === "pdf_url") {
                      return (
                        <TableCell key={col.key} align="center" sx={commonSx}>
                          {row.pdf_url ? (
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
                          )}
                        </TableCell>
                      );
                    }

                    if (col.key === "cancellation") {
                      return (
                        <TableCell key={col.key} align="center" sx={commonSx}>
                          {row.status === "CANCELLING" ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleCheckStatus(row.order_id)}
                              disabled={checkingId === row.order_id}
                              sx={{
                                backgroundColor: COLORS.PRIMARY,
                                textTransform: "none",
                                fontWeight: 700,
                              }}
                            >
                              {checkingId === row.order_id
                                ? "Checking..."
                                : "Check Status"}
                            </Button>
                          ) : row.status === "COMPLETED" ? (
                            <CancelHotelDialog
                              orderId={row.order_id}
                              onInitiate={() =>
                                handleUpdateRow(row.order_id, "CANCELLING")
                              }
                            />
                          ) : (
                            "--"
                          )}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={col.key} align="center" sx={commonSx}>
                        {col.key === "status"
                          ? row.status
                          : row[col.key] ?? "--"}
                      </TableCell>
                    );
                  })}
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
          Showing {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
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
