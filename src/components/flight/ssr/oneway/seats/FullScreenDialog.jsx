import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SeatMap from "./SeatMap";
import { COLORS } from "@/utils/colors.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel({ children, value, index }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ width: "100%" }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

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
      <Button
        variant="text"
        sx={{color:"darkgreen" , fontWeight:600,fontSize:"15px",borderBottom:"2px solid darkgreen",p:"0px",borderRadius:0}}
        onClick={handleClickOpen}
      >
        Select Seat
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* AppBar with Close Button */}
        <AppBar sx={{ position: "relative", backgroundColor: COLORS.PRIMARY, zIndex:9999 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 ,fontSize:{lg:20 , xs:15} }} variant="h6" component="div">
              Seats And Meal Selection
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} sx={{fontSize:{lg:14 , md:14 ,xs:12}}}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <SeatMap />
      </Dialog>
    </React.Fragment>
  );
}
