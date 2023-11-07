import React, { useState } from "react";
import { GAB } from "../constants";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { formatDateTime } from "../utils/formatDate";
import { formatCurrency } from "../utils/converter";
const UtangItem = ({ utang }) => {
  const [viewHistory, setViewHistory] = useState(false);

  const toggleHistory = () => {
    setViewHistory(!viewHistory);
  };

  return (
    <>
      <div key={utang.uid} className="utang-item">
        <div className="title-person">
          <div className="utang-name">{utang.name}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
          {!utang.edited && <div className="utang-person">{formatDateTime(utang.date)}</div>}
            {utang.edited && (
              <div onClick={() => toggleHistory()} className="utang-edited">
                <EditNoteRoundedIcon
                  sx={{ marginRight: "2px", fontSize: '2em' }}
                />
                {utang.editDate ? `${formatDateTime(utang.editDate)}` : null}
              </div>
            )}
          </div>
        </div>
        <div className="check">
          <div className="amount">{formatCurrency(utang.amount)}</div>
        </div>
        <div className={`amount ${utang.person === GAB ? "orange" : "red"}`}>
          <span style={{ marginRight: 20 }}>{utang.person}</span>
        </div>
      </div>

      <Dialog
        open={viewHistory}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px",
            border: "1px solid darksalmon",
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
          edit history
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
            {utang.hist &&
              utang.hist.map((hist) => (
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
                >
                  <div style={{ flex: 5, textAlign: "left" }}>
                    <div>{hist.name}</div>
                    <div style={{ fontSize: "0.6rem", color: "darksalmon" }}>
                      {hist.date
                        ? formatDateTime(hist.date)
                        : hist.editDate
                        ? formatDateTime(hist.editDate)
                        : ""}
                    </div>
                  </div>
                  <div
                    style={{
                      color: hist.person === "Gab" ? "orange" : "tomato",
                      flex: 2.5,
                    }}
                  >
                    {hist.person}
                  </div>
                  <div style={{ flex: 2.5, textAlign: "right" }}>
                    {formatCurrency(hist.amount)}
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
            onClick={() => toggleHistory()}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UtangItem;
