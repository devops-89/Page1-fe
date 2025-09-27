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
import ReactLoading from "react-loading";
import { nunito } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { dashboardController } from "@/api/dashboardController";
import CancelHotelDialog from "./CancelHotelDialog";

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
                        row.status === "CANCELLING" ? (
                          <button
                            style={{
                              padding: "6px 12px",
                              backgroundColor: COLORS.PRIMARY,
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontFamily: nunito.style,
                              fontWeight: 600,
                            }}
                            onClick={() =>
                              alert(
                                "Use Check Cancellation Status API to get the latest status"
                              )
                            }
                          >
                            Check Status
                          </button>
                        ) : row.status === "COMPLETED" ? (
                          <CancelHotelDialog
                            orderId={row.order_id}
                            onInitiate={() => handleUpdateRow(row.order_id, "CANCELLING")}
                          />
                        ) : (
                          "--"
                        )
                      ) : col.key === "status" ? (
                        row.status
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
          {Math.min(currentPage * pageSize, fetchedData?.length)} of{" "}
          {fetchedData?.length} entries
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
