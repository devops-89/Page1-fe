import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ToastBar = ({ open, message, severity, handleClose }) => {
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToastBar;
