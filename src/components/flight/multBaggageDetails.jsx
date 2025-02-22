import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/icons/blogzine.svg";
import { nunito } from "@/utils/fonts";

import { data } from "@/assests/data";
import BaggageTable from "./BaggageTable";
import MultiBaggageTable from "./multiBaggageTable";
const MultiBaggageDetails = ({ tableData }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ p: 1 }}>
        {/* <Image src={tableData?.AirlineLogo} width={30} height={30} alt={tableData?.AirlineCode} /> */}
        <Typography
          sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
        >
         {`${tableData[0]?.Airline?.AirlineName} Airline (${tableData[0]?.Airline?.AirlineCode} ${tableData[0]?.Airline?.FlightNumber})`}
        </Typography>
      </Stack>
      <Divider />
      <Box>
        <MultiBaggageTable tableHead={data.flightBaggageHead} tableData={tableData} />
      </Box>
    </Card>
  );
};

export default MultiBaggageDetails;
