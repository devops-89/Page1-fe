import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { nunito } from "@/utils/fonts";
import { COMMISSION_TYPE } from "@/utils/enum";

const FareSummary = ({ fareData, commission }) => {
  const [open, setOpen] = useState(false);
  // console.log("commission", commission)
  const toggleCollapse = () => {
    setOpen(!open);
  };
  let serviceFeeInFixed = parseFloat(commission?.percentage);
  let serviceFeeInPercent =
    (parseInt(fareData?.Fare?.BaseFare) * parseFloat(commission?.percentage)) /
    100;
  let publishFare = parseInt(fareData?.Fare?.PublishedFare);
  return (
    <Paper sx={{ padding: 2, backgroundColor: "#F4F4F4", height: "auto" }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: 18,
          fontWeight: 800,
          color: "#000",
          fontFamily: nunito.style,
        }}
      >
        Fare Summary
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            {" "}
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: nunito.style, fontWeight: 700 }}>
              Base Amount
            </Typography>
          </ListItemText>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontFamily: nunito.style, fontWeight: 700 }}
            >
              {fareData?.Fare?.BaseFare} ₹
            </Typography>
          </Box>
        </ListItem>
      </List>

      {/* Taxes and Surcharges Section */}
      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          onClick={toggleCollapse}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            {" "}
            {open ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: nunito.style, fontWeight: 700 }}>
              Taxes and Surcharges
            </Typography>
          </ListItemText>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontFamily: nunito.style, fontWeight: 700 }}
            >
              {fareData?.Fare?.Tax} ₹
            </Typography>
          </Box>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {fareData?.Fare?.TaxBreakup?.map((tax, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 4,
                  fontFamily: nunito.style,
                }}
              >
                <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                  {tax.key}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: nunito.style }}>
                  ₹ {tax.value}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            {" "}
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: nunito.style, fontWeight: 700 }}>
              Discount
            </Typography>
          </ListItemText>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontFamily: nunito.style, fontWeight: 700 }}
            >
              {fareData?.Fare?.Discount} ₹
            </Typography>
          </Box>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "10px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          Amount
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          {fareData?.Fare?.PublishedFare} ₹
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          Service Fee
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          {commission?.commission_type === COMMISSION_TYPE.FIXED
            ? serviceFeeInFixed
            : serviceFeeInPercent}{" "}
          ₹
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          Grand Total
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: nunito.style, fontWeight: 700 }}
        >
          {commission?.commission_type === COMMISSION_TYPE.FIXED
            ? publishFare + serviceFeeInFixed
            : publishFare + serviceFeeInPercent}{" "}
          ₹
        </Typography>
      </Box>
    </Paper>
  );
};

export default FareSummary;
