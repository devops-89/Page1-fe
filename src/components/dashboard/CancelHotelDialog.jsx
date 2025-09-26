"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { Typography, Box } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { hotelController } from "@/api/hotelController";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CancelHotelBooking({ bookingId }) {
  const [open, setOpen] = React.useState(false);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const Ip_address = useSelector((state) => state.HOTEL.HotelSearchData.userIp);

  const cancelHotelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        Remarks: remarks,
        BookingId: bookingId,
        ip_address: Ip_address,
      };
      console.log("jdhegvrfbhdjkwjcvhfbrdsmkmednrfmed,lerncekm", payload);
      const response = await hotelController.cancelHotel(payload);
      console.log("Cancellation Charges Response: ", response.data);
    } catch (err) {
      console.error("Error fetching cancellation charges:", err);
      setError("Failed to load cancellation charges.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleCancel = () => {
    console.log("Cancel booking for ID:", bookingId);
    cancelHotelBooking();
    handleClose();
  };

  return (
    <React.Fragment>
      <button
        style={{
          padding: "6px 12px",
          backgroundColor: COLORS.PRIMARY,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontFamily: nunito.style,
          fontWeight: 600,
        }}
        onClick={handleClickOpen}
      >
        Cancel
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            minWidth: 300,
            maxWidth: 450,
            width: "100%",
          },
        }}
      >
        <DialogTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FlightTakeoffIcon sx={{ color: COLORS.PRIMARY }} />
            <span style={{ fontWeight: 600, color: COLORS.PRIMARY }}>
              Confirm Cancellation
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <DialogContentText id="alert-dialog-slide-description">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 5,
                }}
              >
                <ReactLoading
                  type="bars"
                  color={COLORS.PRIMARY}
                  height={40}
                  width={40}
                />
              </Box>
            </DialogContentText>
          ) : error ? (
            <DialogContentText>
              <Typography sx={{ color: COLORS.DANGER }}>{error}</Typography>
            </DialogContentText>
          ) : (
            <>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ mb: 2 }}
              >
                Are you sure you want to cancel this booking?
                <br />
              </DialogContentText>

              <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                label="Remarks (Reason for cancellation) *"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                helperText="Please provide a reason for cancellation"
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: COLORS.PRIMARY }} onClick={handleClose}>
            No
          </Button>
          <Button sx={{ color: COLORS.PRIMARY }} onClick={handleCancel}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
