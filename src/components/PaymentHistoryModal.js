import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { formatDateTime } from "../utils/formatDate";
import { formatCurrency } from "../utils/converter";
import { paymentModalStyle } from "../styles";
const PaymentHistoryModal = ({ open, payment, toggleModal }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: paymentModalStyle.main,
      }}
    >
      <DialogTitle sx={paymentModalStyle.header} id="alert-dialog-title">
        utang/s paid:
      </DialogTitle>
      <DialogContent sx={{ margin: 0 }}>
        <div style={paymentModalStyle.itemContainer}>
          {payment.utangs.map((payment) => (
            <div style={paymentModalStyle.item} key={payment.id}>
              <div style={{ flex: 6, textAlign: "left" }}>
                <div>{payment.name}</div>
                <div style={{ fontSize: "0.6rem", color: "#69c881" }}>
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
              <div style={{ flex: 2.5, textAlign: "right" }}>
                {formatCurrency(payment.amount)}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={paymentModalStyle.close} onClick={() => toggleModal(false)}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentHistoryModal;
