import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SeatMap from "./SeatMap";
import { COLORS } from "@/utils/colors.js";
import MealSelection from "../meal/MealSelection";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Tab Panel Component
function TabPanel({ children, value, index }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ width: "100%" }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0); // State for Tabs

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Flight Services
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        {/* AppBar with Close Button */}
        <AppBar sx={{ position: "relative", backgroundColor: COLORS.PRIMARY }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Seats And Meal Selection
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        {/* Tabs for Seat Booking & Meals */}
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Seat Booking" />
            <Tab label="Meals" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabIndex} index={0}>
          <SeatMap />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant="h5" align="center" sx={{ mt: 5 }}>
            <MealSelection/>
          </Typography>
        </TabPanel>
      </Dialog>
    </React.Fragment>
  );
}
