import React from "react";
import CustomTable from "./customTable";
import { data } from "@/assests/data";
import { Card, Typography } from "@mui/material";
import { COLORS } from "@/utils/colors";

const FareDetails = ({ tableData }) => {
  return (
    <Card sx={{ p: 1, mt: 2 }}>
      <CustomTable tableHead={data.flightFareHead} tableData={tableData} />
      <Typography sx={{ fontSize: 12, color: COLORS.BLACK, mt: 2, px: 1 }}>
        *From The Date Of Departure
      </Typography>
    </Card>
  );
};

export default FareDetails;
