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
import { Typography, Box } from "@mui/material";
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
      console.log("Cancellation Charges Response: ", response.data);
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
  };

  const handleCancel = () => {
    console.log("Cancel booking for ID:", bookingId);
    // Add your cancellation logic here
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
          ) : cancellationCharges?.ResponseStatus === 1 ? (
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to cancel this booking?
              <br />
              <strong>Booking ID:</strong> {bookingId}
              <br />
              <strong>Refund Amount:</strong> ₹
              {cancellationCharges.RefundAmount}
              <br />
              <strong>Cancellation Fee:</strong> ₹
              {cancellationCharges.CancellationCharge}
            </DialogContentText>
          ) : (
            <DialogContentText>
              <Typography sx={{ color: COLORS.DANGER }}>
                Failed to load the cancellation charges.
              </Typography>
            </DialogContentText>
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
