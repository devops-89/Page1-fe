import React from "react";
import FlightSharpIcon from "@mui/icons-material/FlightSharp";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SelectedList from "./SelectedList";
const SeatDetail = () => {
  return (
    <Box
      item
      style={{ marginTop: "55px" }}

      sx={{ border: "1px solid gray", width: "440px", borderRadius: "10px",boxShadow:2 }}
    >
      <Typography variant="body1" sx={{ m: 2, fontWeight: "bold" }}>
        New Delhi (DEL) to Mumbai (BOM)
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid gray",
        }}
      >
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <FlightSharpIcon />
          <Box>
            <Typography variant="subtitle2">Flight 2429</Typography>
            <Typography variant="subtitle2">Operated by: AI</Typography>
          </Box>
        </Stack>

        <Typography variant="subtitle2">Travel time: 2h 15m</Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid gray",
        }}
      >
       <SelectedList />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "40px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          >
            <AttachMoneySharpIcon />
          </Box>
          <Typography variant="subtitle2">Extra</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "40px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          >
            <CheckBoxOutlineBlankSharpIcon />
          </Box>
          <Typography variant="subtitle2">Empty</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "40px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          >
            <CloseSharpIcon />
          </Box>
          <Typography variant="subtitle2">Unavailable</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "50px",
              height: "45px",
              border: "1px solid gray",
              borderRadius: "4px",
              background: "blue",
            }}
          ></Box>
          <Typography variant="subtitle2">Extra</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatDetail;
