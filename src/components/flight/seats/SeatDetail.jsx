import React from "react";
import FlightSharpIcon from "@mui/icons-material/FlightSharp";
import { Grid2, Button, Typography, Box, Stack } from "@mui/material";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SelectedList from "./SelectedList";
import { COLORS } from "@/utils/colors.js";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelIcon from "@mui/icons-material/Cancel";
const SeatDetail = () => {
  return (
    <Box
      item
      sx={{
        border: "1px solid gray",
        width: "440px",
        borderRadius: "10px",
        boxShadow: 2,
        backgroundColor: COLORS.WHITE,
      }}
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
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.PRIMARY,
              color: "white",
            }}
          >
            <PersonOutlineIcon />
          </Box>
          <Typography variant="subtitle2">Reserved</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "35px",
              height: "35px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.GREEN,
            }}
          ></Box>
          <Typography variant="subtitle2">Open</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "35px",
              height: "35px",
              p: 1,
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: COLORS.RED,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <CancelIcon />
          </Box>
          <Typography variant="subtitle2">Blocked</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatDetail;
