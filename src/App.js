import React, { useEffect, useState } from "react";
import "./App.css";
import UtangSummary from "./components/UtangSummary";
import UtangList from "./components/UtangList";
import CreateUtang from "./components/CreateUtang";
import ConfettiExplosion from "react-confetti-explosion";
import { db } from "./firebase-database";
import LinearProgress from "@mui/material/LinearProgress";
import { onValue, ref } from "firebase/database";
import { UNPAID, SUCCESS } from "./constants";
import { Toaster } from "react-hot-toast";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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
      <div>
        <Toaster />
      </div>
      {exploding && (
        <ConfettiExplosion
          colors={["#de6238", "#967ae9", "#69c881", "#ff718d", "#fdff6a"]}
          particleCount={250}
          width={1600}
          duration={1500}
        />
      )}
      {isFetching && <LinearProgress sx={{ top: 0 }} color={SUCCESS} />}
      <UtangSummary
        setExploding={setExploding}
        isFetching={isFetching}
        utangs={utangs}
        forPay={forPay}
        setForPay={setForPay}
        setUtangToEdit={setUtangToEdit}
        setIsEdit={setIsEdit}
      />
      <UtangList
        isFetching={isFetching}
        utangs={utangs}
        setIsFetching={setIsFetching}
        isEdit={isEdit}
        setUtangToEdit={setUtangToEdit}
        setIsEdit={setIsEdit}
      />
      <CreateUtang
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        utangToEdit={utangToEdit}
      />
    </div>
  );
}

export default App;
