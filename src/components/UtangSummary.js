/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { GAB, MEI } from "../constants";
import { formatCurrency } from "../utils/converter";

const UtangSummary = ({ utangs, setExploding, setForPay }) => {
  const [gabUtang, setGabUtang] = useState(0);
  const [meiUtang, setMeiUtang] = useState(0);

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

  useEffect(() => {
    computeUtangs(utangs);
  }, [utangs, setExploding]);

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
              <div>All good!</div>
            ) : (
              "Mei pays:"
            )}{" "}
          </div>
          <div onClick={() => setForPay(true)} className="amount">
            {gabUtang !== meiUtang
              ? formatCurrency(Math.abs(gabUtang - meiUtang))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UtangSummary;
