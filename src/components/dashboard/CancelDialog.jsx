"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { COLORS } from "@/utils/colors";
import { nunito } from "@/utils/fonts";
import { flightController } from "@/api/flightController";
import { Typography, Box, TextField } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ReactLoading from "react-loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CancelDialog({ bookingId }) {
  const [open, setOpen] = React.useState(false);
  const [cancellationCharges, setCancellationCharges] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [remarks, setRemarks] = React.useState("");
  const [showRemarks, setShowRemarks] = React.useState(false); // 👈 NEW

  const fetchCancellationCharges = async () => {
    setLoading(true);
    setError(null);
    try {
      const { ip_address } = JSON.parse(localStorage.getItem("state"));
      const payload = {
        BookingId: bookingId,
        RequestType: "1",
        BookingMode: "5",
        EndUserIp: ip_address,
      };

      const response = await flightController.getCancellationCharges(payload);
      setCancellationCharges(response.data?.data);
    } catch (err) {
      console.error("Error fetching cancellation charges:", err);
      setError("Failed to load cancellation charges.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchCancellationCharges();
  };

  const handleClose = () => {
    setOpen(false);
    setCancellationCharges(null);
    setError(null);
    setRemarks("");
    setShowRemarks(false); // RESET
  };

  const handleCancel = () => {
    // First click should show the remarks field
    if (!showRemarks) {
      setShowRemarks(true);
      return;
    }

    // Now validate remarks
    if (!remarks.trim()) {
      setError("Please provide cancellation remarks.");
      return;
    }

    console.log("Cancel booking for ID:", bookingId, "Remarks:", remarks);
    alert(`Cancellation is Successffullly  Initiated For Booking Id: ${bookingId}`);
    // TODO: Add cancellation API call
    // await flightController.cancelFlight({ bookingId, remarks })

    handleClose();
  };

  return (
    <>
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
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <ReactLoading type="bars" color={COLORS.PRIMARY} height={40} width={40} />
            </Box>
          ) : error ? (
            <Typography sx={{ color: COLORS.DANGER }}>{error}</Typography>
          ) : cancellationCharges?.ResponseStatus === 1 ? (
            <>
              {!showRemarks && (
                <DialogContentText>
                  Are you sure you want to cancel this booking?
                  <br />
                  <strong>Booking ID:</strong> {bookingId}
                  <br />
                  <strong>Refund Amount:</strong> ₹{cancellationCharges.RefundAmount}
                  <br />
                  <strong>Cancellation Fee:</strong> ₹{cancellationCharges.CancellationCharge}
                </DialogContentText>
              )}

              {/* 👇 Show remarks only after YES CANCEL clicked */}
              {showRemarks && (
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  label="Remarks (Reason for cancellation) *"
                  sx={{ mt: 2 }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              )}
            </>
          ) : (
            <Typography sx={{ color: COLORS.DANGER }}>
              Failed to load the cancellation charges.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: COLORS.PRIMARY }} onClick={handleClose}>
            No
          </Button>

          {/* Button text changes dynamically */}
          <Button sx={{ color: COLORS.PRIMARY }} onClick={handleCancel}>
            {showRemarks ? "Confirm Cancel" : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
