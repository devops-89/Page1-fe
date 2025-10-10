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

export default function CancelHotelDialog({ orderId, onInitiate }) {
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Ip_address = useSelector((state) => state?.HOTEL?.HotelSearchData?.userIp);

  const cancelHotelBooking = async () => {
    if (!remarks.trim()) {
      setError("Please provide a reason for cancellation.");
      return;
    }
    if (!Ip_address) {
      setError("Missing user IP. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        Remarks: remarks,
        orderId: orderId,
        ip: Ip_address,
      };

      const response = await hotelController.cancelHotel(payload);
      const data = response?.data?.data;

      if (data?.ResponseStatus === 1) {
        alert(
          "✅ Booking cancellation initiated. Please use 'Check Status' to track progress."
        );
        if (typeof onInitiate === "function") onInitiate(orderId, "CANCELLING");
        handleClose(true);
      } else if (data?.ResponseStatus === 2) {
        alert("❌ Cancellation failed. Please try again.");
      } else if (data?.ResponseStatus === 3) {
        alert("⚠️ Invalid cancellation request.");
      } else if (data?.ResponseStatus === 4) {
        alert("⚠️ Invalid session. Please log in again.");
      } else if (data?.ResponseStatus === 5) {
        alert("⚠️ Invalid credentials.");
      } else {
        alert(
          `⚠️ Something went wrong: ${data?.Error?.ErrorMessage || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Error initiating cancellation:", err);
      setError("Failed to initiate cancellation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = (reset = false) => {
    setOpen(false);
    setError(null);
    if (reset) setRemarks("");
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
        onClose={() => handleClose(true)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { minWidth: 300, maxWidth: 450, width: "100%" } }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FlightTakeoffIcon sx={{ color: COLORS.PRIMARY }} />
            <Typography sx={{ fontWeight: 600, color: COLORS.PRIMARY }}>
              Confirm Cancellation
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          {error && (
            <DialogContentText>
              <Typography sx={{ color: COLORS.DANGER }}>{error}</Typography>
            </DialogContentText>
          )}

          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to cancel this booking?
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
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: COLORS.PRIMARY }} onClick={() => handleClose(true)}>
            No
          </Button>
          <Button sx={{ color: COLORS.PRIMARY }} onClick={cancelHotelBooking}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ReactLoading type="bars" color={COLORS.PRIMARY} height={60} width={60} />
        </Box>
      )}
    </React.Fragment>
  );
}
