import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/icons/blogzine.svg";
import { nunito } from "@/utils/fonts";
import CustomTable from "./customTable";
import { data } from "@/assests/data";
const BaggageDetails = ({ tableData }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ p: 1 }}>
        <Image src={logo} width={30} />
        <Typography
          sx={{ fontSize: 15, fontFamily: nunito.style, fontWeight: 550 }}
        >
          Blogzine Airline (FFR - 5682)
        </Typography>
      </Stack>
      <Divider />
      <Box>
        <CustomTable tableHead={data.flightBaggageHead} tableData={tableData} />
        <Typography
          sx={{
            px: 1,
            fontSize: 12,
            p: 1,
            fontFamily: nunito.style,
            fontWeight: 550,
          }}
        >
          *1PC = 23KG
        </Typography>
      </Box>
    </Card>
  );
};

export default BaggageDetails;
