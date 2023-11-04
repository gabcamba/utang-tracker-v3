/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import pop from "../media/pop.wav";
import error from "../media/error.wav";
import { createItem, updateItem } from "../utils/database";

import {
  FIELD_ERROR,
  GAB,
  GAB_LC,
  MEI,
  MEI_LC,
  NO_FIELDS_CHANGED,
  UNPAID,
  UTANG_CREATED,
  UTANG_UPDATED,
} from "../constants";
import { toFloat, toInt } from "../utils/converter";
import { errorToast, successToast } from "../utils/toast";
import { generateUUID } from "../utils/uuid";
const CreateUtang = ({ isEdit, utangToEdit, setIsEdit, view, setView }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [person, setPerson] = useState(GAB);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [play] = useSound(pop);
  const [playError] = useSound(error);

  useEffect(() => {
    if (isEdit) {
      setAmount(utangToEdit.amount.toString());
      setTitle(utangToEdit.name);
      setPerson(utangToEdit.person);
    } else {
      setAmount("");
      setTitle("");
      setPerson(GAB);
    }
  }, [isEdit, utangToEdit]);

  const onChangeTitle = (e) => {
    setConfirm(false);
    setTitle(e.target.value);
  };

  const onChangeAmount = (e) => {
    setConfirm(false);
    setAmount(e.target.value);
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
      title.trim().length === 0 ||
      isNaN(toInt(amount)) ||
      isNaN(toFloat(amount)) ||
      toInt(amount) === 0 ||
      toFloat(amount) === 0
    ) {
      playError();
      errorToast(FIELD_ERROR);
      setLoading(false);
      return;
    }

    if (
      utangToEdit &&
      isEdit &&
      utangToEdit.name == title &&
      utangToEdit.amount == amount &&
      utangToEdit.person == person
    ) {
      errorToast(NO_FIELDS_CHANGED);
      playError();
      setLoading(false);
      return;
    }

    if (isEdit) {
      play();
      const date = Date.now();
      const updatedUtang = {
        ...utangToEdit,
        name: title,
        amount: amount.includes(".") ? toFloat(amount) : toInt(amount),
        person: person,
        edited: true,
        editDate: date,
      };

      updatedUtang.hist = [
        ...utangToEdit.hist,
        {
          name: title,
          amount: amount.includes(".") ? toFloat(amount) : toInt(amount),
          person: person,
          editDate: date,
        },
      ];
      await updateItem(utangToEdit, updatedUtang);
      setIsEdit(false);
      successToast(UTANG_UPDATED);
    } else {
      const uid = generateUUID();
      const date = Date.now();
      const utangObj = {
        date: Date.now(),
        name: title,
        amount: amount.includes(".") ? toFloat(amount) : toInt(amount),
        person: person,
        status: UNPAID,
        uid: `${date}${uid}`,
        edited: false,
      };
      utangObj.hist = [{ ...utangObj }];

      await createItem(utangObj);

      play();
      successToast(UTANG_CREATED);
    }

    if (view !== "home") {
      setView("home");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTitle("");
    setAmount("");
    setConfirm(false);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardText = e.clipboardData.getData("text/plain");
    const numericText = clipboardText.replace(/[^0-9]/g, "");
    setAmount(numericText);
  };

  return (
    <div className="create-utang">
      <input
        value={title}
        onChange={(e) => onChangeTitle(e)}
        placeholder="description"
        maxLength={10}
        className={`${isEdit ? "editing" : ""} input-title`}
        type="text"
      />
      <div className="amount-person">
        <div style={{ flex: 3, display: "flex" }}>
          <input
            value={amount}
            onChange={(e) => onChangeAmount(e)}
            placeholder="amount"
            maxLength={8}
            className="amount"
            pattern="[0-9]*"
            inputMode="decimal"
            required
            onPaste={handlePaste}
          />
        </div>

        <select
          value={person}
          onChange={(e) => onSelectPerson(e)}
          className="select"
        >
          <option value={GAB}>{GAB_LC}</option>
          <option value={MEI}>{MEI_LC}</option>
        </select>
        <div className={`${confirm ? "confirm" : ""} create`}>
          {confirm && !loading ? (
            <button
              disabled={loading}
              onClick={() => onClickOK()}
              className="btn confirm"
            >
              ok
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={() => onClickPlus()}
              className="btn"
            >
              {isEdit ? "edit" : "create"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUtang;
