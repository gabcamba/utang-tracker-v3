import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { formatDateTime } from "../utils/formatDate";
import { formatCurrency } from "../utils/converter";
const PaymentHistoryModal = ({ open, payment, toggleModal }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          borderRadius: "15px",
          fontFamily: "ui-monospace",
          background: "none",
          "-webkit-backdrop-filter": "blur(10px)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "darksalmon",
          fontFamily: "ui-monospace",
          fontSize: "1em",
        }}
        id="alert-dialog-title"
      >
        history
      </DialogTitle>
      <DialogContent sx={{ margin: 0 }}>
        <div
          style={{
            width: "70vw",
            maxHeight: "40vh",
            color: "white",
            fontSize: "50px",
          }}
        >
          {
            payment.utangs.map((payment) => (
              <div
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  height: "50px",
                  textAlign: "center",
                }}
                key={payment.id}
              >
                <div style={{ flex: 5, textAlign: "left",}}>
                  <div>{payment.name}</div>
                  <div style={{ fontSize: "0.6rem", color: "darksalmon" }}>
                    {formatDateTime(payment.date)}
                  </div>
                </div>
                <div
                  style={{
                    color: payment.person === "Gab" ? "orange" : "tomato",
                    flex: 2.5,
                  }}
                >
                  {payment.person}
                </div>
                <div
                  style={{ flex: 2.5, textAlign: "right",}}
                >
                  {formatCurrency(payment.amount)}
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            fontFamily: "ui-monospace",
            textTransform: "lowercase",
            color: "#69c881",
          }}
          onClick={() => toggleModal(false)}
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentHistoryModal;
