import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { db } from "../firebase-database";
import { ref, update } from "firebase/database";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import useSound from "use-sound";
import ding from "../done.wav";

const UtangSummary = ({
  utangs,
  isFetching,
  setExploding,
  setForPay,
  forPay,
  setSnackPaidOpen,
}) => {
  const [gabUtang, setGabUtang] = useState(0);
  const [meiUtang, setMeiUtang] = useState(0);
  const [allGoodCount, setAllGoodCount] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [play] = useSound(ding);

  const computeUtangs = (utangs) => {
    let gabAmount = 0;
    let meiAmount = 0;

    utangs.map((utang) => {
      if (utang.person === "Gab") {
        gabAmount += utang.amount;
      } else if (utang.person === "Mei") {
        meiAmount += utang.amount;
      }
    });

    setGabUtang(gabAmount);
    setMeiUtang(meiAmount);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const markAsPaid = async () => {
    play();
    setExploding(true);
    setSnackPaidOpen(true);
    setForPay(false);

    utangs.map(async (utang) => {
      const utangNew = { ...utang, status: "PAID" };
      await update(ref(db, utang.uid), utangNew);
    });

    setTimeout(() => {
      setExploding(false);
      setSnackPaidOpen(false);
    }, 1500);
  };

  useEffect(() => {
    computeUtangs(utangs);
    if (allGoodCount === 5) {
      setAlertOpen(true);
      setAlertMessage("Hai baby! Bakit pindut ng pindut?? 🤔");
      setAllGoodCount(allGoodCount + 1);

      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 20) {
      setAlertOpen(true);
      setAlertMessage("Abnuy ba u?? 🤨");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 30) {
      setAlertOpen(true);
      setAlertMessage("Ahhhhy!! Masisira yung app kow!! 😭");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 50) {
      setAlertOpen(true);
      setAlertMessage(
        "Aysus walang magawa ambabung!! Kala naman nya may mangyayari sa dulo 🤔"
      );
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 80) {
      setAlertOpen(true);
      setAlertMessage("yieeeeeee susuko na syaaaa");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 100) {
      setAlertOpen(true);
      setAlertMessage("🤨📸");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 130) {
      setAlertOpen(true);
      setAlertMessage(
        "feel ko naku-cutean ka nanaman saken kung umabot ka dito...."
      );
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 150) {
      setAlertOpen(true);
      setAlertMessage("AMACCANA AKLA!!");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 170) {
      setAlertOpen(true);
      setAlertMessage("GRRRR 🦖");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 200) {
      setAlertOpen(true);
      setAlertMessage("baby....");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 205) {
      setAlertOpen(true);
      setAlertMessage("i just wanna say...");
      setAllGoodCount(allGoodCount + 1);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }

    if (allGoodCount === 230) {
      setAlertOpen(true);
      setExploding(true);
      setAllGoodCount(0);

      setAlertMessage("I love you!! HAHAHA 😘");

      setTimeout(() => {
        setExploding(false);
        setAlertOpen(false);
      }, 3000);
      setAllGoodCount(0);
    }
  }, [utangs, forPay, allGoodCount]);

  return (
    <>
      <div className="utang-summary">
        <div className="gab">
          <div className="name">Gab</div>
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
          <div className="name">Mei</div>
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

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textWrap: 'balance',
            textAlign: 'center',
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
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UtangSummary;
