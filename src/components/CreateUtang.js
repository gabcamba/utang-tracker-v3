import React, { useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { db } from "../firebase-database";
import { set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
const CreateUtang = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [person, setPerson] = useState("Gab");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSelectPerson = (e) => {
    setPerson(e.target.value);
  };

  const onClickPlus = () => {
    setConfirm(true);
  };

  const onClickOK = async () => {
    setLoading(true);

    const uid = uuidv4();
    const date = Date.now();
    await set(ref(db, `${date}${uid}`), {
      date: Date.now(),
      name: title,
      amount: parseInt(amount),
      person: person,
      status: "UNPAID",
      uid: `${date}${uid}`,
    });

    setOpen(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTitle("");
    setAmount("");
    setConfirm(false);
    setLoading(false);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <div className="create-utang">
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="success" />
        </Box>
      ) : null}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#383838",
            color: "white",
            fontFamily: "ui-monospace",
            marginBottom: "20px",
            borderRadius: "50px",
            marginRight: "20px",
            marginLeft: "20px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }}
        >
          Utang created
        </Alert>
      </Snackbar>

      <input
        value={title}
        onChange={(e) => onChangeTitle(e)}
        placeholder="utang description"
        maxLength={10}
        className="input-title"
        type="text"
      />
      <div className="amount-person">
        <input
          value={amount}
          onChange={(e) => onChangeAmount(e)}
          placeholder="amount"
          maxLength={5}
          className="amount"
          pattern="[0-9]*"
        />
        <select
          value={person}
          onChange={(e) => onSelectPerson(e)}
          className="select"
          name="cars"
          id="cars"
        >
          <option value="Gab">Gab</option>
          <option value="Mei">Mei</option>
        </select>
        <div className="create">
          {confirm && !loading ? (
            <button
              disabled={!amount || amount === "0" || loading}
              onClick={() => onClickOK()}
              className="btn pulse-text"
            >
              ok
            </button>
          ) : (
            <button
              disabled={!amount || amount === "0" || loading}
              onClick={onClickPlus}
              className="btn"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUtang;
