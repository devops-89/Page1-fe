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
        variant="outlined"
        sx={{ backgroundColor: COLORS.SECONDARY, color: COLORS.WHITE }}
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
        <AppBar sx={{ position: "relative", backgroundColor: COLORS.PRIMARY }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
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

        <SeatMap />
      </Dialog>
    </React.Fragment>
  );
}
