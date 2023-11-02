import React, { useEffect, useState } from "react";
import "./App.css";
import UtangSummary from "./components/UtangSummary";
import UtangList from "./components/UtangList";
import CreateUtang from "./components/CreateUtang";
import ConfettiExplosion from "react-confetti-explosion";
import { db } from "./firebase-database";
import { onValue, ref } from "firebase/database";
import { UNPAID } from "./constants";
import { Toaster } from "react-hot-toast";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
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

        const reversedRecs = records.reverse();
        setList(reversedRecs);
      });
    };
    fetch();
  }, []);

  return (
    <div className="App lock-scroll">
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
      <UtangSummary
        setExploding={setExploding}
        utangs={utangs}
        forPay={forPay}
        setForPay={setForPay}
        setUtangToEdit={setUtangToEdit}
        setIsEdit={setIsEdit}
      />
      <UtangList
        utangs={utangs}
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
