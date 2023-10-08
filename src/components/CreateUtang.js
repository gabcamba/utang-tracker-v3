import React, { useState, useEffect } from "react";
import { db } from "../firebase-database";
import { set, ref, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import useSound from "use-sound";
import pop from "../media/pop.wav";
import error from "../media/error.wav";

import {
  FIELD_ERROR,
  GAB,
  GAB_LC,
  HOT_TOAST_STYLES,
  MEI,
  MEI_LC,
  UNPAID,
  UTANG_CREATED,
  UTANG_UPDATED,
} from "../constants";
import toast from "react-hot-toast";
const CreateUtang = ({ isEdit, utangToEdit, setIsEdit }) => {
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
      isNaN(parseInt(amount)) ||
      isNaN(Number(parseFloat(amount).toFixed(2))) ||
      parseInt(amount) === 0 ||
      Number(parseFloat(amount).toFixed(2)) === 0
    ) {
      playError();

      toast.error(FIELD_ERROR, {
        style: HOT_TOAST_STYLES,
      });
      setLoading(false);
      return;
    }

    if (isEdit) {
      play();
      const date = Date.now();
      const updatedUtang = {
        ...utangToEdit,
        name: title,
        amount: amount.includes(".")
          ? Number(parseFloat(amount).toFixed(2))
          : parseInt(amount),
        person: person,
        edited: true,
        editDate: date,
      };

      updatedUtang.hist = [
        ...utangToEdit.hist,
        {
          name: title,
          amount: amount.includes(".")
            ? Number(parseFloat(amount).toFixed(2))
            : parseInt(amount),
          person: person,
          editDate: date,
        },
      ];
      await update(ref(db, utangToEdit.uid), updatedUtang);
      setIsEdit(false);
      toast.success(UTANG_UPDATED, {
        style: HOT_TOAST_STYLES,
      });
    } else {
      play();
      const uid = uuidv4();
      const date = Date.now();
      const utangObj = {
        date: Date.now(),
        name: title,
        amount: amount.includes(".")
          ? Number(parseFloat(amount).toFixed(2))
          : parseInt(amount),
        person: person,
        status: UNPAID,
        uid: `${date}${uid}`,
        edited: false,
      };
      utangObj.hist = [{ ...utangObj }];
      await set(ref(db, `${date}${uid}`), utangObj);

      toast.success(UTANG_CREATED, {
        style: HOT_TOAST_STYLES,
      });
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTitle("");
    setAmount("");
    setConfirm(false);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
