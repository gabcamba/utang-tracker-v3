/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import ding from "../media/success.wav";
import { GAB, MEI, UTANG_PAID } from "../constants";
import { pay, paid } from "../utils/database";
import { formatCurrency } from "../utils/converter";
import { successToast } from "../utils/toast";
import { generateUUID } from "../utils/uuid";

const UtangSummary = ({
  utangs,
  setExploding,
  setForPay,
  forPay,
  setUtangToEdit,
  setIsEdit,
}) => {
  const [gabUtang, setGabUtang] = useState(0);
  const [meiUtang, setMeiUtang] = useState(0);
  const [allGoodCount, setAllGoodCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState(
    "Hai baby! Bakit pindut ng pindut?? 🤔"
  );

  const [play] = useSound(ding);

  const computeUtangs = (utangs) => {
    let gabAmount = 0;
    let meiAmount = 0;

    utangs.map((utang) => {
      if (utang.person === GAB) {
        gabAmount += utang.amount;
      } else if (utang.person === MEI) {
        meiAmount += utang.amount;
      }
    });

    setGabUtang(gabAmount);
    setMeiUtang(meiAmount);
  };

  const markAsPaid = async () => {
    play();
    setExploding(true);
    setForPay(false);
    setUtangToEdit(null);
    setIsEdit(false);

    pay({
      id: `${Date.now()}-${generateUUID()}}`,
      datePaid: Date.now(),
      utangs,
      whoPaid: gabUtang > meiUtang ? "Gab" : "Mei",
      amount: Math.abs(gabUtang - meiUtang),
    });

    successToast(UTANG_PAID);

    await paid(utangs);

    setTimeout(() => {
      setExploding(false);
    }, 2000);
  };

  useEffect(() => {
    computeUtangs(utangs);
    if (allGoodCount === 5) {
      setAlertMessage("🤔");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 20) {
      setAlertMessage("Abnuy ba u?? 🤨");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 30) {
      setAlertMessage("Ahhhhy!! Masisira yung app kow!! 😭");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 50) {
      setAlertMessage(
        "Aysus walang magawa ambabung!! Kala naman nya may mangyayari sa dulo 🤔"
      );
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 80) {
      setAlertMessage("yieeeeeee susuko na syaaaa");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 100) {
      setAlertMessage("🤨📸");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 130) {
      setAlertMessage(
        "feel ko naku-cutean ka nanaman saken kung umabot ka dito...."
      );
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 150) {
      setAlertMessage("AMACCANA AKLA!!");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 170) {
      setAlertMessage("GRRRR 🦖");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 200) {
      setAlertMessage("baby....");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 205) {
      setAlertMessage("i just wanna say...");
      successToast(alertMessage);
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 230) {
      setExploding(true);
      setAllGoodCount(0);

      setAlertMessage("I love you!! HAHAHA 😘");
      successToast(alertMessage);

      setTimeout(() => {
        setExploding(false);
      }, 3000);
      setAllGoodCount(0);
    }
  }, [utangs, forPay, allGoodCount, alertMessage, setExploding]);

  return (
    <>
      <div className="utang-summary">
        <div className="gab">
          <div className="name">{GAB}</div>
          <div className="amount">{formatCurrency(gabUtang)}</div>
        </div>
        <div className="mei">
          <div className="name">{MEI}</div>
          <div className="amount">{formatCurrency(meiUtang)}</div>
        </div>
        <div className="summary">
          <div className={`name ${gabUtang === meiUtang ? "green" : ""}`}>
            {gabUtang > meiUtang ? (
              "Gab pays:"
            ) : gabUtang === meiUtang ? (
              <div onClick={() => setAllGoodCount(allGoodCount + 1)}>
                All good!
              </div>
            ) : (
              "Mei pays:"
            )}{" "}
          </div>
          {forPay && utangs.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 30,
                paddingTop: 12,
              }}
            >
              <div onClick={() => markAsPaid()}>🤑</div>
              <div onClick={() => setForPay(false)}>❌</div>
            </div>
          ) : (
            <div onClick={() => setForPay(true)} className="amount">
              {gabUtang !== meiUtang
                ? formatCurrency(Math.abs(gabUtang - meiUtang))
                : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UtangSummary;
