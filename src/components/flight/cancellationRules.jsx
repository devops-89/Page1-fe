import { Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/icons/blogzine.svg";
import { nunito } from "@/utils/fonts";
import CustomTable from "./BaggageTable";
import { data } from "@/assests/data";
const Cancellation = ({ tableData, departureDetails, arrivalDetails }) => {
  return (
    <Card sx={{}}>
      <Stack direction={"row"} alignItems={"center"} spacing={3} sx={{ p: 1 }}>
        <Image src={logo} width={30} />
        <Typography sx={{ fontSize: 15, fontFamily: nunito.style }}>
          {departureDetails?.departureAirportCode} -{" "}
          {arrivalDetails?.arrivalAirportCode}
        </Typography>
      </Stack>
      <Divider />
      <CustomTable
        tableHead={data.flightCancellationHeader}
        tableData={tableData}
      />
    </Card>
  );
};

export default Cancellation;
