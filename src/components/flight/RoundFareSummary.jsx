"use client";
import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  Stack,
  Button,
} from "@mui/material";
import ReactLoading from "react-loading";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useSelector } from "react-redux";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/colors";
import { COMMISSION_TYPE } from "@/utils/enum";

const RoundFareSummary = ({ fareData, commission, toggleDrawer }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const meals = useSelector((state) => state.Flight.RoundDomesticMealsInformation);
  const baggages = useSelector((state) => state.Flight.RoundDomesticBaggagesInformation);
  const seatsOutgoing = useSelector((state) => state.Flight.RoundInternationalSeatsInformation.outgoingSeats);
  const seatsReturn = useSelector((state) => state.Flight.RoundInternationalSeatsInformation.incomingSeats);
  const smallScreen = useMediaQuery("(max-width:1199px)");

  const calculateTotalSeatPrice = (seats) => {
    let total = 0;
    Object.values(seats || {}).forEach((seatData) => {
      total += seatData.selectedSeats?.reduce((sum, seat) => sum + seat.Price, 0) || 0;
    });
    return total;
  };

  const calculateTotalBaggagePrice = (data) => {
    let total = 0;
    Object.values(data || {}).forEach((direction) => {
      Object.values(direction || {}).forEach((passenger) => {
        passenger.baggages?.forEach((baggage) => {
          total += baggage.baggage?.Price || 0;
        });
      });
    });
    return total;
  };

  const calculateTotalMealPrice = (data) => {
    let total = 0;
    Object.values(data || {}).forEach((direction) => {
      Object.values(direction || {}).forEach((passenger) => {
        passenger.meals?.forEach((mealEntry) => {
          total += mealEntry.meal?.Price || 0;
        });
      });
    });
    return total;
  };

  const extraTotal =
    calculateTotalMealPrice(meals) +
    calculateTotalBaggagePrice(baggages) +
    calculateTotalSeatPrice(seatsOutgoing) +
    calculateTotalSeatPrice(seatsReturn);

  const onwardFare = fareData?.[0]?.[0]?.Results?.Fare || {};
  const returnFare = fareData?.[1]?.[0]?.Results?.Fare || {};

  const initialRoundFare = {
    base_amount: (onwardFare.BaseFare || 0) + (returnFare.BaseFare || 0),
    tax: (onwardFare.Tax || 0) + (returnFare.Tax || 0),
    discount: (onwardFare.Discount || 0) + (returnFare.Discount || 0),
    publishFare: (onwardFare.PublishedFare || 0) + (returnFare.PublishedFare || 0),
    taxBreakup: (onwardFare.TaxBreakup || []).map((tax, i) => ({
      key: tax.key,
      value: tax.value + (returnFare.TaxBreakup?.[i]?.value || 0),
    })),
  };

  const baseFare = Number(initialRoundFare.base_amount);
  const publishedFare = Number(initialRoundFare.publishFare);
  const percentage = Number(commission?.percentage);

  const serviceFeeInFixed = percentage;
  const serviceFeeInPercent = (baseFare * percentage) / 100;
  const isFixed = commission?.commission_type === COMMISSION_TYPE.FIXED;
  const serviceFee = isFixed ? serviceFeeInFixed : serviceFeeInPercent;
  const grandTotal = publishedFare + serviceFee + extraTotal;

  useEffect(() => {
    const isValid =
      !isNaN(baseFare) && !isNaN(publishedFare) && !isNaN(percentage) && !isNaN(serviceFee);
    if (isValid) setLoading(false);
  }, [commission, fareData]);

  const toggleCollapse = () => setOpen((prev) => !prev);

  if (loading) {
    return (
      <Paper
        sx={{
          padding: 2,
          height: "300px",
          boxShadow: { lg: 0, xs: 0 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading type="bars" color={COLORS.PRIMARY} height={50} width={50} />
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 2, boxShadow: { lg: 0, xs: 0 }, height: "auto" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 800, fontFamily: roboto.style }}>
          Fare Summary
        </Typography>
        {smallScreen && (
          <Button onClick={toggleDrawer.toggle} variant="contained" color="primary">
            {!toggleDrawer.open ? <KeyboardDoubleArrowUpOutlinedIcon /> : <KeyboardDoubleArrowDownOutlinedIcon />}
          </Button>
        )}
      </Stack>

      <Divider sx={{ my: 1 }} />

      <List sx={{ p: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText primary="Base Amount" sx={{ fontFamily: roboto.style, fontWeight: 700 }} />
          <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>₹ {baseFare}</Typography>
        </ListItem>
      </List>

      <List sx={{ p: 0 }}>
        <ListItem button onClick={toggleCollapse} sx={{ justifyContent: "space-between" }}>
          <ListItemIcon>{open ? <RemoveCircleIcon /> : <AddCircleIcon />}</ListItemIcon>
          <ListItemText primary="Taxes and Surcharges" sx={{ fontFamily: roboto.style, fontWeight: 700 }} />
          <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>₹ {initialRoundFare.tax}</Typography>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {initialRoundFare.taxBreakup.map((tax, i) => (
              <ListItem key={i} sx={{ justifyContent: "space-between", pl: 4 }}>
                <Typography sx={{ fontFamily: roboto.style }}>{tax.key}</Typography>
                <Typography sx={{ fontFamily: roboto.style }}>₹ {tax.value}</Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <List sx={{ p: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText primary="Discount" sx={{ fontFamily: roboto.style, fontWeight: 700 }} />
          <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>₹ {initialRoundFare.discount}</Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}>
        <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>Amount</Typography>
        <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>₹ {publishedFare}</Typography>
      </Box>

      {extraTotal > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}>
            <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
              Extra <span style={{ fontSize: 15, fontWeight: 600 }}>(meal, seat, baggage)</span>
            </Typography>
            <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>₹ {extraTotal}</Typography>
          </Box>
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>Service Fee</Typography>
        <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
          ₹ {serviceFee.toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
          Grand Total
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
          ₹ {grandTotal.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default RoundFareSummary;
