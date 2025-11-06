"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  useMediaQuery,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReactLoading from "react-loading";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useSelector } from "react-redux";
import { roboto } from "@/utils/fonts";
import { COMMISSION_TYPE } from "@/utils/enum";
import { COLORS } from "@/utils/colors";

const FareSummary = ({ fareData, commission, toggleDrawer }) => {
  const meals = useSelector((state) => state.Flight.MealsInformation.meals);
  const baggages = useSelector(
    (state) => state.Flight.BaggagesInformation.baggages
  );
  const seats = useSelector((state) => state.Flight.SeatsInformation.seats);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const readPrice = (obj) => {
    const v = obj?.Price ?? obj?.Amount ?? obj?.TotalAmount ?? obj?.Fare ?? 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const calculateTotalSeatPrice = (seats) => {
    let totalprice = 0;
    Object.values(seats || {}).forEach((seatData) => {
      const selectedSeats = Array.isArray(seatData?.selectedSeats)
        ? seatData.selectedSeats
        : [];
      const totalSeatPrice = selectedSeats.reduce(
        (total, seat) => total + readPrice(seat),
        0
      );
      totalprice += totalSeatPrice;
    });
    return totalprice;
  };

  const calculateTotalBaggagePrice = (data) => {
    let totalPrice = 0;
    Object.values(data || {}).forEach((passenger) => {
      const arr = Array.isArray(passenger?.selectedBaggages)
        ? passenger.selectedBaggages
        : [];
      arr.forEach((baggage) => {
        totalPrice += readPrice(baggage?.selectedBaggage);
      });
    });
    return totalPrice;
  };

  const calculateTotalMealPrice = (mealsData) => {
    let totalPrice = 0;
    Object.values(mealsData || {}).forEach((passengerData) => {
      const mealsArr = Array.isArray(passengerData?.meals)
        ? passengerData.meals
        : [];
      const passengerTotal = mealsArr.reduce(
        (total, mealEntry) => total + readPrice(mealEntry?.meal),
        0
      );
      totalPrice += passengerTotal;
    });
    return totalPrice;
  };

  const extraTotal =
    calculateTotalMealPrice(meals) +
    calculateTotalBaggagePrice(baggages) +
    calculateTotalSeatPrice(seats);
  const hasAnyMeal = Object.values(meals || {}).some(
    (p) => Array.isArray(p?.meals) && p.meals.length > 0
  );
  const hasAnyBaggage = Object.values(baggages || {}).some(
    (p) => Array.isArray(p?.selectedBaggages) && p.selectedBaggages.length > 0
  );
  const hasAnySeat = Object.values(seats || {}).some(
    (s) => Array.isArray(s?.selectedSeats) && s.selectedSeats.length > 0
  );
  const anyExtrasSelected = hasAnyMeal || hasAnyBaggage || hasAnySeat;
  const toggleCollapse = () => setOpen(!open);

  let serviceFeeInFixed = parseFloat(commission?.percentage);
  let serviceFeeInPercent =
    (parseInt(fareData?.Fare?.BaseFare) * parseFloat(commission?.percentage)) /
    100;
  let publishFare = parseInt(fareData?.Fare?.PublishedFare);

  const smallScreen = useMediaQuery("(max-width:1199px)");

  // Set loading state based on valid values
  useEffect(() => {
    const isFixed = commission?.commission_type === COMMISSION_TYPE.FIXED;
    const isValid = isFixed
      ? !isNaN(serviceFeeInFixed)
      : !isNaN(serviceFeeInPercent);

    if (isValid) {
      setLoading(false);
    }
  }, [commission, fareData]);

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
        <ReactLoading
          type={"bars"}
          color={COLORS.PRIMARY}
          height={50}
          width={50}
        />
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 2, height: "100%", boxShadow: { lg: 0, xs: 0 } }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 800,
            color: "#000",
            fontFamily: roboto.style,
          }}
        >
          Fare Summary
        </Typography>
        {smallScreen ? (
          <Button
            onClick={toggleDrawer.toggle}
            variant="contained"
            color="primary"
          >
            {!toggleDrawer.open ? (
              <KeyboardDoubleArrowUpOutlinedIcon />
            ) : (
              <KeyboardDoubleArrowDownOutlinedIcon />
            )}
          </Button>
        ) : null}
      </Stack>

      <Divider sx={{ marginY: 1 }} />

      {/* Base Amount */}
      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
              Base Amount
            </Typography>
          </ListItemText>
          <Typography
            variant="body1"
            sx={{ fontFamily: roboto.style, fontWeight: 700 }}
          >
            ₹ {fareData?.Fare?.BaseFare}
          </Typography>
        </ListItem>
      </List>

      {/* Taxes and Surcharges */}
      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          onClick={toggleCollapse}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            {open ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
              Taxes and Surcharges
            </Typography>
          </ListItemText>
          <Typography
            variant="body1"
            sx={{ fontFamily: roboto.style, fontWeight: 700 }}
          >
            ₹ {fareData?.Fare?.Tax}
          </Typography>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {fareData?.Fare?.TaxBreakup?.map((tax, index) => (
              <ListItem
                key={index}
                sx={{ justifyContent: "space-between", pl: 4 }}
              >
                <Typography variant="body2" sx={{ fontFamily: roboto.style }}>
                  {tax.key}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: roboto.style }}>
                  ₹ {tax.value}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      {/* Discount */}
      <List component="nav" sx={{ p: 0 }}>
        <ListItem
          button
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontFamily: roboto.style, fontWeight: 700 }}>
              Discount
            </Typography>
          </ListItemText>
          <Typography
            variant="body1"
            sx={{ fontFamily: roboto.style, fontWeight: 700 }}
          >
            ₹ {fareData?.Fare?.Discount}
          </Typography>
        </ListItem>
      </List>

      {/* Amount */}
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          Amount
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          ₹ {fareData?.Fare?.PublishedFare}
        </Typography>
      </Box>

      {/* Extra charges */}
      {anyExtrasSelected && (
        <>
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
              sx={{ fontFamily: roboto.style, fontWeight: 700 }}
            >
              Extra{" "}
              <span style={{ fontSize: "15px", fontWeight: 600 }}>
                (meal, seat, baggage)
              </span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: roboto.style, fontWeight: 700 }}
            >
              {extraTotal === 0 ? "Free" : `₹ ${extraTotal}`}
            </Typography>
          </Box>
        </>
      )}

      {/* Service Fee */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          Service Fee
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          ₹{" "}
          {commission?.commission_type === COMMISSION_TYPE.FIXED
            ? serviceFeeInFixed.toFixed(2)
            : serviceFeeInPercent.toFixed(2)}
        </Typography>
      </Box>

      {/* Grand Total */}
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          Grand Total
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: roboto.style, fontWeight: 700 }}
        >
          ₹{" "}
          {commission?.commission_type === COMMISSION_TYPE.FIXED
            ? (publishFare + serviceFeeInFixed + extraTotal).toFixed(2)
            : (publishFare + serviceFeeInPercent + extraTotal).toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FareSummary;
