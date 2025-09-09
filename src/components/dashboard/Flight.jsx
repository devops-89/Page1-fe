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
import moment from "moment";
import { Cancel } from "@mui/icons-material";
import CancelDialog from "./CancelDialog";

const columns = [
  { key: "journey", label: "Journey Scope" },
  { key: "journey_type", label: "Trip Type" },
  { key: "amount", label: "Price" },
  { key: "updated_at", label: "Order Time" },
  { key: "flightDate", label: "Flight Date" },
  { key: "status", label: "Status" },
  { key: "pdf_url", label: "Ticket" },
  { key: "cancellation", label: "Cancel Ticket" },
];

const Flight = ({ userId }) => {
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

  // API Calling for the flight bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        let response = await dashboardController.getFlightBookingByUserId(
          userId,
          currentPage,
          pageSize,
          debouncedSearch?.trim() || ""
        );
        console.log("Fetched flight booking list: ", response.data.data.docs);

        setFetchedData(response.data.data.docs);
        setTotalItems(response.data.data.totalDocs);
      } catch (error) {
        console.error("API Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage, pageSize, debouncedSearch]);

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
          sx={{
            fontFamily: nunito.style,
            fontWeight: 400,
            color: COLORS.BLACK,
          }}
        >
          Manage and monitor your flight bookings seamlessly. Use search and
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
        sx={{
          overflowX: "auto",
          minHeight: "200px",
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
            }}
          >
            {col.key === "updated_at" || col.key === "flightDate"
              ? moment(row[col.key]).format("DD MMM YYYY, hh:mm A")
              : col.key === "cancellation"
              ? (() => {
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

                  return row.status === "COMPLETED" && bookingId ? (
                    <CancelDialog bookingId={bookingId} />
                  ) : (
                    "--"
                  );
                })()
              : col.key === "pdf_url"
              ? row["pdf_url"]
                ? (
                  <a
                    href={row["pdf_url"]}
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ color: COLORS.SECONDARY, textDecoration: "underline" }}
                    download
                  >
                    Download
                  </a>
                )
                : "--"
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
          {Math.min(currentPage * pageSize, paginatedData?.length)} of{" "}
          {paginatedData?.length} entries
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
