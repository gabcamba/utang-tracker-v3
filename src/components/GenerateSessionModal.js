import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { paymentModalStyle } from "../styles";
import { generateCode } from "../utils/sessionCodeGenerator";
import { createUser } from "../utils/database";
import { successToast } from "../utils/toast";
import { CircularProgress } from "@mui/material";

const code = generateCode();

const GenerateSessionModal = ({ open, toggleModal, userId, setSessionId }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickConfirm = () => {
    setLoading(true);
    localStorage.setItem("user", userId);
    localStorage.setItem("sessionId", code);
    setTimeout(() => {
      createUser({ userId: userId, sessionId: code }, true);
      setSessionId(code);
      toggleModal(false);
    }, 3000);
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
          onClick={() => {
            navigator.clipboard.writeText(code);
            successToast("Code copied to clipboard");
            setClicked(true);
          }}
          style={{
            color: clicked ? "cornflowerblue" : "white",
            fontSize: "1.5em",
            fontWeight: "bolder",
            textAlign: "center",
            marginTop: 40,
            letterSpacing: 10,
            fontFamily: "ui-monospace, SF Mono",
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#69c881",
                height: "25px !important",
                width: "25px !important",
                // marginBottom: 5,
              }}
            />
          ) : (
            code
          )}
        </div>

        <div
          style={{
            color: "white",
            fontSize: "0.8em",
            marginTop: 60,
            textAlign: "center",
            textWrap: "balance",
          }}
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
