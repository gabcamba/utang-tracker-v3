import React, { useState, useEffect } from "react";
import { db } from "../firebase-database";
import { ref, update } from "firebase/database";
import useSound from "use-sound";
import pop from "../media/pop.wav";
import edit from "../media/edit.wav";
import { DELETED, GAB, HOT_TOAST_STYLES, UTANG_DELETED } from "../constants";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
const UtangItem = ({ utang, setUtangToEdit, setIsEdit, isEdit }) => {
  useEffect(() => {
    if (!isEdit) {
      setLocalEdit(false);
    }
  }, [isEdit]);
  const [del, setDelete] = useState(false);
  const [localEdit, setLocalEdit] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [play] = useSound(pop);
  const [playEdit] = useSound(edit);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      month: "2-digit",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const escape = () => {
    if (!del && !localEdit) return;
    playEdit();
    setDelete(false);
    setIsEdit(false);
    setUtangToEdit(null);
    setLocalEdit(false);
  };
  const toggleDelete = () => {
    if (!isEdit) {
      setDelete((del) => {
        return !del;
      });
    }
  };

  const confirmDelete = async (utang) => {
    play();
    const deletedUtang = {
      ...utang,
      status: DELETED,
    };
    await update(ref(db, utang.uid), deletedUtang);

    toggleDelete();
    toast.success(UTANG_DELETED, {
      style: HOT_TOAST_STYLES,
    });
  };

  const toggleEdit = (utang) => {
    setIsEdit(false);
    setLocalEdit(true);
    setIsEdit(true);
    setUtangToEdit(utang);
    playEdit();

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setDelete(false);
  };

  const toggleHistory = () => {
    setViewHistory(!viewHistory);
  };

  return (
    <>
      <div
        key={utang.id}
        className={`${localEdit && isEdit ? "editing" : ""} utang-item`}
      >
        <div className="title-person">
          <div className="utang-name">{utang.name}</div>
          <div className="utang-person">{formatDateTime(utang.date)}</div>
          {utang.edited && (
            <div onClick={() => toggleHistory()} className="utang-edited">
              Edited {utang.editDate ? formatDateTime(utang.editDate) : null}
            </div>
          )}
        </div>

        <div
          onClick={() => escape()}
          className={`amount ${utang.person === GAB ? "orange" : "red"}`}
        >
          {utang.person}
        </div>
        <div className="check">
          {del && !isEdit ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{ textAlign: "center" }}
                onClick={() => toggleEdit(utang)}
              >
                ✏️
              </div>
              <div
                style={{ textAlign: "center" }}
                onClick={() => confirmDelete(utang)}
              >
                ❌
              </div>
            </div>
          ) : (
            <div onClick={() => toggleDelete()} className="amount">
              {utang.amount.toLocaleString()}
            </div>
          )}
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
            fontFamily: "ui-monospace",
            background: 'none',
            '-webkit-backdrop-filter': 'blur(10px)',
            backdropFilter: 'blur(10px)',
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
                  <div
                    style={{ flex: 3, textAlign: "left", marginLeft: "10px" }}
                  >
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
                      flex: 1,
                    }}
                  >
                    {hist.person}
                  </div>
                  <div
                    style={{ flex: 3, textAlign: "right", marginRight: "10px" }}
                  >
                    {hist.amount.toLocaleString()}
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
