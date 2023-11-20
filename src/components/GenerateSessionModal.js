import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { paymentModalStyle } from "../styles";
import { generateCode } from "../utils/sessionCodeGenerator";
import { createUser } from "../utils/database";
const GenerateSessionModal = ({ open, toggleModal, userId }) => {
  const code = generateCode();

  const onClickConfirm = () => {
    createUser({ userId: userId, sessionId: code });
  };

 
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
        session code:
      </DialogTitle>
      <DialogContent sx={{ margin: 0 }}>
        <div
          style={{ color: "white", fontSize: "1.5em", fontWeight: "bolder" }}
        >
          {code}
        </div>

        <div
          style={{ color: "white", fontSize: "0.8em", fontWeight: "bolder" }}
        >
          Send this code to someone to share a session with them
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={paymentModalStyle.close} onClick={() => toggleModal(false)}>
          cancel
        </Button>
        <Button sx={paymentModalStyle.close} onClick={() => onClickConfirm()}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateSessionModal;
