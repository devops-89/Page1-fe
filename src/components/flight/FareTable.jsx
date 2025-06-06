import { nunito } from "@/utils/fonts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const FareTable = ({ tableHead, tableData }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((val, i) => (
                <TableCell key={i}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
         
                <TableCell >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                    }}
                  >
                    {tableData.TotalFare} {tableData.Currency}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                    }}
                  >
                    {tableData.Tax} {tableData.Currency}
                  </Typography>
                </TableCell>
         
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FareTable;
