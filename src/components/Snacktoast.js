import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const SnackToast = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          textWrap: "balance",
          width: "100%",
          backgroundColor: "#383838",
          color: "white",
          fontFamily: "ui-monospace",
          marginBottom: "20px",
          borderRadius: "50px",
          marginRight: "20px",
          marginLeft: "20px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackToast;
