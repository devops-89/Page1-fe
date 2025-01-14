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

const CustomTable = ({ tableHead, tableData }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
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
          </TableHead>
          <TableBody>
            {tableData.map((val, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.value1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.value2}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: nunito.style,
                    }}
                  >
                    {val.value3}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
