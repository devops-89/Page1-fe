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
import { GrLinkPrevious } from "react-icons/gr";
import SeatMap from "./SeatMap";
import { COLORS } from "@/utils/colors.js";
import { useDispatch } from "react-redux";
import { resetSeatDetails } from "@/redux/reducers/roundInternationalSeatsInformation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenDialog({flightDetailType}) {
  const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    dispatch(resetSeatDetails());
    setOpen(false);
  };

  const handleSave=()=>{
    setOpen(false);
  }

 

  return (
    <>
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
             <GrLinkPrevious />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 ,fontSize:{lg:20 , xs:15} }} variant="h6" component="div">
              Seats Selection
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <SeatMap flightDetailType={flightDetailType}/>
      </Dialog>
    </>
  );
}
