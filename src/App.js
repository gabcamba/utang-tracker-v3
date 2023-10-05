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
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
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
          console.log("DATA", data);
          if (data.status === "UNPAID") {
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
      <Snackbar
        open={snackDeleteOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
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
          Utang deleted
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackPaidOpen}
        autoHideDuration={1500}
        onClose={handleClose}
      >
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
          Utangs paid
        </Alert>
      </Snackbar>

      {isFetching ? <LinearProgress sx={{ top: 0 }} color="success" /> : null}
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
