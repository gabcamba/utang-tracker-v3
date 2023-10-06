import React, { useEffect, useState } from "react";
import "./App.css";
import UtangSummary from "./components/UtangSummary";
import UtangList from "./components/UtangList";
import CreateUtang from "./components/CreateUtang";
import ConfettiExplosion from "react-confetti-explosion";
import { db } from "./firebase-database";

import LinearProgress from "@mui/material/LinearProgress";
import { onValue, ref } from "firebase/database";
import HeaderTitle from "./components/HeaderTitle";
import SnackToast from "./components/Snacktoast";
import { UNPAID, INFO, SUCCESS, UTANG_DELETED, UTANG_PAID } from "./constants";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [snackDeleteOpen, setSnackDeleteOpen] = useState(false);
  const [snackPaidOpen, setSnackPaidOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackDeleteOpen(false);
  };

  useEffect(() => {
    setIsFetching(true);
    const setList = (list) => {
      setUtangs(list);
    };
    const fetch = async () => {
      onValue(ref(db), (snapshot) => {
        let records = [];
        snapshot.forEach((child) => {
          let data = child.val();
          if (data.status === UNPAID) {
            records.push(data);
          }
        });
        setList(records);
      });
    };
    fetch();
    setIsFetching(false);
  }, []);

  return (
    <div className="App">
      {exploding && (
        <ConfettiExplosion particleCount={500} width={1600} duration={2000} />
      )}

      <SnackToast
        open={snackDeleteOpen}
        onClose={handleClose}
        severity={INFO}
        message={UTANG_DELETED}
      />
      <SnackToast
        open={snackPaidOpen}
        onClose={handleClose}
        severity={SUCCESS}
        message={UTANG_PAID}
      />

      {isFetching && <LinearProgress sx={{ top: 0 }} color={SUCCESS} />}
      <HeaderTitle />
      <UtangSummary
        setExploding={setExploding}
        isFetching={isFetching}
        utangs={utangs}
        forPay={forPay}
        setForPay={setForPay}
        setSnackPaidOpen={setSnackPaidOpen}
      />
      <UtangList
        isFetching={isFetching}
        utangs={utangs}
        setIsFetching={setIsFetching}
        setSnackDeleteOpen={setSnackDeleteOpen}
      />
      <CreateUtang />
    </div>
  );
}

export default App;
