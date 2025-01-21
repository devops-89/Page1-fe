import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {data} from "../../assests/data";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FareSummary = ({ taxBreakup }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Paper sx={{ padding: 2, backgroundColor: "#F4F4F4", height: "auto" }}>
      <Typography
        variant="h6"
        sx={{ fontSize: 18, fontWeight: 600, color: "#000" }}
      >
        Fare Summary
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <List component="nav">
        <ListItem
          button
        
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon>  <AddCircleIcon/></ListItemIcon>
          <ListItemText primary="Base Amount" />
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"flex-end" }}>
            <Typography variant="body2" >
              ₹ 20000
            </Typography>
           
          </Box>
        </ListItem>
      
      </List>
     

      {/* Taxes and Surcharges Section */}
      <List component="nav">
        <ListItem
          button
          onClick={toggleCollapse}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItemIcon> {open ? <RemoveCircleIcon/>  : <AddCircleIcon/>}</ListItemIcon>
          <ListItemText primary="Taxes and Surcharges" />
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"flex-end" }}>
            <Typography variant="body2" >
              ₹ 1064
            </Typography>
           
          </Box>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.flightDetails.taxBreakup.map((tax, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 4,
                }}
              >
                <Typography variant="body2">{tax.key}</Typography>
                <Typography variant="body2">₹ {tax.value}</Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

     <Divider sx={{my:2}}/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <Typography>Total Amount</Typography>
        <Typography>₹ 3064</Typography>
      </Box>
    </Paper>
  );
};

export default FareSummary;
