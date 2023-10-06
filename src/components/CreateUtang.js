import React, { useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { db } from "../firebase-database";
import { set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import SnackToast from "./Snacktoast";
import {
  ERROR,
  FIELD_ERROR,
  GAB,
  MEI,
  SUCCESS,
  UNPAID,
  UTANG_CREATED,
} from "../constants";
const CreateUtang = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [person, setPerson] = useState(GAB);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openValidation, setOpenValidation] = useState(false);

  const onChangeTitle = (e) => {
    setConfirm(false);
    setTitle(e.target.value);
  };

  const onChangeAmount = (e) => {
    setConfirm(false);
    setAmount(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleValidationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenValidation(false);
  };

  const onSelectPerson = (e) => {
    setConfirm(false);
    setPerson(e.target.value);
  };

  const onClickPlus = () => {
    setConfirm(true);
  };

  const onClickOK = async () => {
    setLoading(true);

    if (
      !title ||
      !amount ||
      isNaN(parseInt(amount)) ||
      isNaN(Number(parseFloat(amount).toFixed(2)))
    ) {
      setOpenValidation(true);

      setTimeout(() => {
        setOpenValidation(false);
      }, 1500);

      setLoading(false);
      return;
    }
    const uid = uuidv4();
    const date = Date.now();
    await set(ref(db, `${date}${uid}`), {
      date: Date.now(),
      name: title,
      amount: amount.includes(".")
        ? Number(parseFloat(amount).toFixed(2))
        : parseInt(amount),
      person: person,
      status: UNPAID,
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
          <LinearProgress color={SUCCESS} />
        </Box>
      ) : null}
      <SnackToast
        open={open}
        onClose={handleClose}
        severity={SUCCESS}
        message={UTANG_CREATED}
      />
      <SnackToast
        open={openValidation}
        onClose={handleValidationClose}
        severity={ERROR}
        message={FIELD_ERROR}
      />
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
          maxLength={10}
          className="amount"
          pattern="[0-9]*"
          inputMode="decimal"
          required
        />
        <select
          value={person}
          onChange={(e) => onSelectPerson(e)}
          className="select"
          name="cars"
          id="cars"
        >
          <option value="Gab">{GAB}</option>
          <option value="Mei">{MEI}</option>
        </select>
        <div className="create">
          {confirm && !loading ? (
            <button
              disabled={loading}
              onClick={() => onClickOK()}
              className="btn"
            >
              ok
            </button>
          ) : (
            <button disabled={loading} onClick={() => onClickPlus()} className="btn">
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUtang;
