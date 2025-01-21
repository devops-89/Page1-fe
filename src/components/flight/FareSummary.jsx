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
import { nunito } from "@/utils/fonts";

const FareSummary = ({ fareData }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Paper sx={{ padding: 2, backgroundColor: "#F4F4F4", height: "auto" }}>
      <Typography
        variant="h6"
        sx={{ fontSize: 18, fontWeight: 800, color: "#000",fontFamily:nunito.style }}
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
          <ListItemText><Typography sx={{fontFamily:nunito.style,fontWeight:700}} >Base Amount</Typography></ListItemText>
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"flex-end" }}>
            <Typography variant="body2" sx={{fontFamily:nunito.style,fontWeight:700}} >
            {fareData?.Fare?.BaseFare}  ₹
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
          <ListItemText><Typography sx={{fontFamily:nunito.style,fontWeight:700}} >Taxes and Surcharges</Typography></ListItemText>
          <Box sx={{ display: "flex", alignItems: "flex-start",justifyContent:"flex-end" }}>
            <Typography variant="body2" sx={{fontFamily:nunito.style,fontWeight:700}} >
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
                  fontFamily:nunito.style
                }}
              >
                <Typography variant="body2" sx={{fontFamily:nunito.style}}>{tax.key}</Typography>
                <Typography variant="body2" sx={{fontFamily:nunito.style}}>₹ {tax.value}</Typography>
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
        <Typography sx={{fontFamily:nunito.style, fontWeight:800}}>Total Amount</Typography>
        <Typography sx={{fontFamily:nunito.style,fontWeight:800}}>{fareData?.Fare?.PublishedFare} ₹</Typography>
      </Box>
    </Paper>
  );
};

export default FareSummary;
