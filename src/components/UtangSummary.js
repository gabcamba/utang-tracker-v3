import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { db } from "../firebase-database";
import { ref, update } from "firebase/database";
import useSound from "use-sound";
import ding from "../media/success.wav";
import { GAB, HOT_TOAST_STYLES, MEI, PAID, UTANG_PAID } from "../constants";
import toast from "react-hot-toast";

const UtangSummary = ({
  utangs,
  isFetching,
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

    toast.success(UTANG_PAID, {
      style: HOT_TOAST_STYLES,
    });

    utangs.map(async (utang) => {
      const utangNew = { ...utang, status: PAID };
      await update(ref(db, utang.uid), utangNew);
    });

    setTimeout(() => {
      setExploding(false);
    }, 2000);
  };

  useEffect(() => {
    computeUtangs(utangs);
    if (allGoodCount === 5) {
      setAlertMessage("🤔");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 20) {
      setAlertMessage("Abnuy ba u?? 🤨");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 30) {
      setAlertMessage("Ahhhhy!! Masisira yung app kow!! 😭");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 50) {
      setAlertMessage(
        "Aysus walang magawa ambabung!! Kala naman nya may mangyayari sa dulo 🤔"
      );
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 80) {
      setAlertMessage("yieeeeeee susuko na syaaaa");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 100) {
      setAlertMessage("🤨📸");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 130) {
      setAlertMessage(
        "feel ko naku-cutean ka nanaman saken kung umabot ka dito...."
      );
      setAllGoodCount(allGoodCount + 1);
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
    }

    if (allGoodCount === 150) {
      setAlertMessage("AMACCANA AKLA!!");
      setAllGoodCount(allGoodCount + 1);
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
    }

    if (allGoodCount === 170) {
      setAlertMessage("GRRRR 🦖");
      setAllGoodCount(allGoodCount + 1);
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
    }

    if (allGoodCount === 200) {
      setAlertMessage("baby....");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 205) {
      setAlertMessage("i just wanna say...");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });
      setAllGoodCount(allGoodCount + 1);
    }

    if (allGoodCount === 230) {
      setExploding(true);
      setAllGoodCount(0);

      setAlertMessage("I love you!! HAHAHA 😘");
      toast.success(alertMessage, {
        icon: "🥰",
        style: HOT_TOAST_STYLES,
      });

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
          <div className="amount">
            {isFetching ? (
              <>
                <Skeleton
                  circle={true}
                  sx={{ margin: 2 }}
                  width={50}
                  height={20}
                />
              </>
            ) : (
              gabUtang.toLocaleString()
            )}
          </div>
        </div>
        <div className="mei">
          <div className="name">{MEI}</div>
          <div className="amount">
            {isFetching ? (
              <>
                <Skeleton
                  circle={true}
                  sx={{ margin: 2 }}
                  width={50}
                  height={20}
                />
              </>
            ) : (
              meiUtang.toLocaleString()
            )}
          </div>
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
          {isFetching ? (
            <Skeleton circle={true} sx={{ margin: 2 }} width={50} height={20} />
          ) : forPay ? (
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
                ? Math.abs(gabUtang - meiUtang).toLocaleString()
                : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UtangSummary;
