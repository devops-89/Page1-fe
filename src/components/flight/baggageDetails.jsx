import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { nunito } from "@/utils/fonts";

import { data } from "@/assests/data";
import BaggageTable from "./BaggageTable";
const BaggageDetails = ({ tableData }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ p: 1 }}>
        <Image src={tableData.AirlineLogo} width={30} height={30} alt={tableData.AirlineCode} />
        <Typography
          sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
        >
         {`${tableData.departure[0].Airline.AirlineName} Airline (${tableData.departure[0].Airline.AirlineCode} ${tableData.departure[0].Airline.FlightNumber})`}
        </Typography>
      </Stack>
      <Divider />
      <Box>
        <BaggageTable tableHead={data.flightBaggageHead} tableData={tableData} />
      </Box>
    </Card>
  );
};

export default BaggageDetails;
