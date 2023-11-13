/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import pop from "../media/pop.wav";
import error from "../media/error.wav";
import { createUtang, updateItem } from "../utils/database";
import { useSpring, animated } from "@react-spring/web";

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
import { createUtangSpring } from "../springs";
import { Button, MenuItem, Select } from "@mui/material";

const CreateUtang = ({ utangToEdit, setUtangToEdit, create }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [person, setPerson] = useState("");
  const [category, setCategory] = useState("category");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [play] = useSound(pop);
  const [playError] = useSound(error);

  const springs = useSpring(createUtangSpring);

  useEffect(() => {
    if (utangToEdit) {
      setAmount(utangToEdit.amount.toString());
      setTitle(utangToEdit.name);
      setPerson(utangToEdit.person);
      setCategory(utangToEdit.category);
    } else {
      setAmount("");
      setTitle("");
      setPerson(GAB);
    }
  }, [utangToEdit]);

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

  const onSelectCategory = (e) => {
    setConfirm(false);
    setCategory(e.target.value);
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
      toFloat(amount) === 0 ||
      !category || category === 'category'
    ) {
      playError();
      errorToast(FIELD_ERROR);
      setLoading(false);
      return;
    }

    if (
      utangToEdit &&
      utangToEdit.name == title &&
      utangToEdit.amount == amount &&
      utangToEdit.person == person &&
      title.trim() === utangToEdit.name
    ) {
      errorToast(NO_FIELDS_CHANGED);
      playError();
      setLoading(false);
      return;
    }

    if (utangToEdit) {
      play();
      const date = Date.now();
      const updatedUtang = {
        ...utangToEdit,
        name: title,
        amount: amount.includes(".") ? toFloat(amount) : toInt(amount),
        person: person,
        edited: true,
        editDate: date,
        category: category,
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
      await updateItem(updatedUtang);
      setUtangToEdit(null);
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
        category: category,
        uid: `${date}${uid}`,
        edited: false,
      };
      utangObj.hist = [{ ...utangObj }];

      await createUtang(utangObj);

      play();
      successToast(UTANG_CREATED);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

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
    <animated.div className="create-utang" style={{ ...springs }}>
      <input
        value={title}
        onChange={(e) => onChangeTitle(e)}
        placeholder="description"
        maxLength={20}
        className={`${utangToEdit ? "editing" : ""} input-title`}
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
        <Select
          value={person}
          onChange={(e) => onSelectPerson(e)}
          className="select"
          sx={{
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        >
          <MenuItem value="category" disabled>
            <em>person</em>
          </MenuItem>
          <MenuItem value={GAB}>{GAB_LC}</MenuItem>
          <MenuItem value={MEI}>{MEI_LC}</MenuItem>
        </Select>
        <Select
          defaultValue="category"
          value={category}
          onChange={(e) => onSelectCategory(e)}
          className="select category"
          sx={{
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        >
          <MenuItem value="category" disabled>
            <em>category</em>
          </MenuItem>
          <MenuItem value="food">food</MenuItem>
          <MenuItem value="transpo">transpo</MenuItem>
          <MenuItem value="home">home</MenuItem>
          <MenuItem value="grocery">grocery</MenuItem>
          <MenuItem value="leisure">leisure</MenuItem>
        </Select>
      </div>
      <div className={`${confirm ? "confirm" : ""} create`}>
        {confirm && !loading ? (
          <Button
            onClick={() => onClickOK()}
            className="btn confirm"
            sx={{textTransform: 'uppercase'}}
          >
            ok
          </Button>
        ) : (
          <Button
            onClick={() => onClickPlus()}
            className="btn"
            sx={{textTransform: 'lowercase'}}
          >
            {utangToEdit ? "edit" : "create"}
          </Button>
        )}
      </div>
    </animated.div>
  );
};

export default CreateUtang;
