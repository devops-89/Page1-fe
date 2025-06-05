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
  { key: "orderNo", label: "Order No" },
  { key: "customerName", label: "Customer Name" },
  { key: "customerEmail", label: "Customer Email" },
  { key: "customerPhone", label: "Customer Phone" },
  { key: "orderDate", label: "Order Date" },
  { key: "orderStatus", label: "Order Status" },
  { key: "invoice", label: "Invoice" },
];

const dummyData = [
  {
    sl: 1,
    orderNo: "ORD001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+91 9876543210",
    orderDate: "2025-06-01",
    orderStatus: "Confirmed",
    invoice: "INV001.pdf",
  },
  {
    sl: 2,
    orderNo: "ORD002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+91 9123456780",
    orderDate: "2025-06-02",
    orderStatus: "Pending",
    invoice: "INV002.pdf",
  },
  {
    sl: 3,
    orderNo: "ORD003",
    customerName: "Alex Johnson",
    customerEmail: "alex@example.com",
    customerPhone: "+91 9988776655",
    orderDate: "2025-06-03",
    orderStatus: "Cancelled",
    invoice: "INV003.pdf",
  },
  {
    sl: 4,
    orderNo: "ORD004",
    customerName: "Emily Brown",
    customerEmail: "emily@example.com",
    customerPhone: "+91 8877665544",
    orderDate: "2025-06-04",
    orderStatus: "Confirmed",
    invoice: "INV004.pdf",
  },
  {
    sl: 5,
    orderNo: "ORD005",
    customerName: "Michael Green",
    customerEmail: "michael@example.com",
    customerPhone: "+91 7766554433",
    orderDate: "2025-06-05",
    orderStatus: "Pending",
    invoice: "INV005.pdf",
  },
  {
    sl: 6,
    orderNo: "ORD006",
    customerName: "Sophia Blue",
    customerEmail: "sophia@example.com",
    customerPhone: "+91 6655443322",
    orderDate: "2025-06-06",
    orderStatus: "Confirmed",
    invoice: "INV006.pdf",
  },
  {
    sl: 7,
    orderNo: "ORD007",
    customerName: "Daniel Black",
    customerEmail: "daniel@example.com",
    customerPhone: "+91 5544332211",
    orderDate: "2025-06-07",
    orderStatus: "Cancelled",
    invoice: "INV007.pdf",
  },
  {
    sl: 8,
    orderNo: "ORD008",
    customerName: "Olivia White",
    customerEmail: "olivia@example.com",
    customerPhone: "+91 4433221100",
    orderDate: "2025-06-08",
    orderStatus: "Confirmed",
    invoice: "INV008.pdf",
  },
  {
    sl: 9,
    orderNo: "ORD009",
    customerName: "Liam Brown",
    customerEmail: "liam@example.com",
    customerPhone: "+91 3322110099",
    orderDate: "2025-06-09",
    orderStatus: "Pending",
    invoice: "INV009.pdf",
  },
  {
    sl: 10,
    orderNo: "ORD010",
    customerName: "Ava Wilson",
    customerEmail: "ava@example.com",
    customerPhone: "+91 2211009988",
    orderDate: "2025-06-10",
    orderStatus: "Confirmed",
    invoice: "INV010.pdf",
  },
];
const Package = () => {
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
          Order Management Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 400, color: COLORS.BLACK }}
        >
          Monitor and manage your customer orders efficiently. Use the search and pagination
          controls to navigate through your order data.
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
                    fontWeight: 600,
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
                      {col.key === "invoice" ? (
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

export default Package;
