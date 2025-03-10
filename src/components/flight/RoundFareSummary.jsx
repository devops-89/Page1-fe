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

const RoundFareSummary = ({ fareData, commission }) => {
  const [onwardTaxBreakup, setOnwardTaxBreakup] = useState(
    fareData[0][0]?.Results?.Fare?.TaxBreakup || []
  );
  const [returnTaxBreakup, setReturnTaxBreakup] = useState(
    fareData[1][0]?.Results?.Fare?.TaxBreakup || []
  );

  const mergedTaxBreakup = onwardTaxBreakup.map((onwardTax, index) => ({
    key: onwardTax.key,
    value: onwardTax.value + (returnTaxBreakup[index]?.value || 0),
  }));

  const initialRoundFare = {
    base_amount:
      (fareData[0][0]?.Results?.Fare?.BaseFare || 0) +
      (fareData[1][0]?.Results?.Fare?.BaseFare || 0),
    tax:
      (fareData[0][0]?.Results?.Fare?.Tax || 0) +
      (fareData[1][0]?.Results?.Fare?.Tax || 0),
    discount:
      (fareData[0][0]?.Results?.Fare?.Discount || 0) +
      (fareData[1][0]?.Results?.Fare?.Discount || 0),
    publishFare:
      (fareData[0][0]?.Results?.Fare?.PublishedFare || 0) +
      (fareData[1][0]?.Results?.Fare?.PublishedFare || 0),
    taxBreakup : mergedTaxBreakup
  };


  let serviceFeeInFixed = parseFloat(commission?.percentage);
  let serviceFeeInPercent =
    (parseInt(initialRoundFare?.base_amount) * parseFloat(commission?.percentage)) /
    100;
  let publishFare = parseInt(initialRoundFare?.publishFare);

  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  // console.log("fareData", fareData)
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
             ₹ {initialRoundFare.base_amount} 
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
              ₹ {initialRoundFare.tax} 
            </Typography>
          </Box>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {initialRoundFare.taxBreakup.map((tax, index) => (
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
              ₹ {initialRoundFare.discount} 
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
         ₹ {initialRoundFare.publishFare} 
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
               ₹ {commission?.commission_type === COMMISSION_TYPE.FIXED
                  ? serviceFeeInFixed
                  : serviceFeeInPercent}{" "}
                
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
               ₹ {commission?.commission_type === COMMISSION_TYPE.FIXED
                  ? publishFare + serviceFeeInFixed
                  : publishFare + serviceFeeInPercent}{" "}
                
              </Typography>
            </Box>
    </Paper>
  );
};

export default RoundFareSummary;
