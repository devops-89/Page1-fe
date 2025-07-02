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
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { roboto } from "@/utils/fonts";
import { COMMISSION_TYPE } from "@/utils/enum";
import { COLORS } from "@/utils/colors";

const InternationalFareSummary = ({ fareData, commission, toggleDrawer }) => {
  const meals = useSelector((state) => state.Flight.MealsInformation.meals);
  const baggages = useSelector((state) => state.Flight.BaggagesInformation.baggages);
  const seatsOutgoing = useSelector((state) => state.Flight.RoundInternationalSeatsInformation.outgoingSeats);
  const seatsReturn = useSelector((state) => state.Flight.RoundInternationalSeatsInformation.incomingSeats);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const calculateTotalSeatPrice = (seats) => {
    let total = 0;
    Object.values(seats).forEach((seatData) => {
      total += seatData.selectedSeats?.reduce((sum, seat) => sum + seat.Price, 0) || 0;
    });
    return total;
  };

  const calculateTotalBaggagePrice = (data) => {
    let total = 0;
    Object.values(data).forEach((passenger) => {
      passenger.selectedBaggages?.forEach((baggage) => {
        total += baggage?.selectedBaggage?.Price || 0;
      });
    });
    return total;
  };

  const calculateTotalMealPrice = (data) => {
    let total = 0;
    Object.values(data).forEach((passenger) => {
      total += passenger.meals?.reduce((sum, item) => sum + item.meal.Price, 0) || 0;
    });
    return total;
  };

  const extraTotal =
    calculateTotalMealPrice(meals) +
    calculateTotalBaggagePrice(baggages) +
    calculateTotalSeatPrice(seatsOutgoing) +
    calculateTotalSeatPrice(seatsReturn);

  const baseFare = Number(fareData?.Fare?.BaseFare);
  const publishedFare = Number(fareData?.Fare?.PublishedFare);
  const percentage = Number(commission?.percentage);

  const serviceFeeInFixed = percentage;
  const serviceFeeInPercent = (baseFare * percentage) / 100;

  const isFixed = commission?.commission_type === COMMISSION_TYPE.FIXED;
  const serviceFee = isFixed ? serviceFeeInFixed : serviceFeeInPercent;
  const grandTotal = publishedFare + serviceFee + extraTotal;

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
  
   

  const toggleCollapse = () => setOpen(!open);

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
    <Paper sx={{ padding: 2, height: "100%", boxShadow: { lg: 0, xs: 0 } }}  >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 800, fontFamily: roboto.style }}>
          Fare Summary
        </Typography>
        {smallScreen && (
          <Button onClick={toggleDrawer.toggle} variant="contained" color="primary">
            {toggleDrawer.open ? <KeyboardDoubleArrowDownOutlinedIcon /> : <KeyboardDoubleArrowUpOutlinedIcon />}
          </Button>
        )}
      </Stack>

      <Divider sx={{ my: 1 }} />

      <List component="nav" sx={{ p: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>Base Amount</Typography>}
          />
          <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>
            ₹ {baseFare}
          </Typography>
        </ListItem>
      </List>

      <List component="nav" sx={{ p: 0 }}>
        <ListItem button onClick={toggleCollapse} sx={{ justifyContent: "space-between" }}>
          <ListItemIcon>{open ? <RemoveCircleIcon /> : <AddCircleIcon />}</ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>Taxes and Surcharges</Typography>}
          />
          <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>
            ₹ {fareData?.Fare?.Tax}
          </Typography>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {fareData?.Fare?.TaxBreakup?.map((tax, i) => (
              <ListItem key={i} sx={{ justifyContent: "space-between", pl: 4 }}>
                <Typography sx={{ fontFamily: roboto.style }}>{tax.key}</Typography>
                <Typography sx={{ fontFamily: roboto.style }}>₹ {tax.value}</Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <List component="nav" sx={{ p: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>Discount</Typography>}
          />
          <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>
            ₹ {fareData?.Fare?.Discount}
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>Amount</Typography>
        <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>₹ {publishedFare}</Typography>
      </Box>

      {extraTotal > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>
              Extra <span style={{ fontSize: 15, fontWeight: 600 }}>(meal, seat, baggage)</span>
            </Typography>
            <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>₹ {extraTotal}</Typography>
          </Box>
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>Service Fee</Typography>
        <Typography sx={{ fontWeight: 700, fontFamily: roboto.style }}>
          ₹ {serviceFee.toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: roboto.style }}>
          Grand Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: roboto.style }}>
          ₹ {grandTotal.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default InternationalFareSummary;
