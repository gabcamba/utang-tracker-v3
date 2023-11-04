/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import UtangSummary from "./components/UtangSummary";
import UtangList from "./components/UtangList";
import PaymentsList from "./components/PaymentsList";
import CreateUtang from "./components/CreateUtang";
import NavBar from "./components/NavBar";

import ConfettiExplosion from "react-confetti-explosion";
import { Toaster } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getPayments, fetchUtangList } from "./utils/database";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [payments, setPayments] = useState([]);
  const [view, setView] = useState("home");
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const getHistory = async () => {
      await getPayments(setPayments);
    };

    const fetch = async () => {
      await fetchUtangList(setUtangs, setDeleted);
    };

    fetch();
    getHistory();
  }, [view]);

  return (
    <div ref={parent} className="App lock-scroll">
      <div>
        <Toaster />
      </div>
      {exploding && (
        <ConfettiExplosion particleCount={500} width={1600} duration={1500} />
      )}
      <UtangSummary
        setExploding={setExploding}
        utangs={utangs}
        forPay={forPay}
        setForPay={setForPay}
        setUtangToEdit={setUtangToEdit}
        setIsEdit={setIsEdit}
      />
      {view === "deleted" || view === "home" ? (
        <UtangList
          utangs={utangs}
          deleted={deleted}
          isEdit={isEdit}
          setUtangToEdit={setUtangToEdit}
          setIsEdit={setIsEdit}
          payments={payments}
          view={view}
        />
      ) : (
        <PaymentsList
          utangs={utangs}
          isEdit={isEdit}
          setUtangToEdit={setUtangToEdit}
          setIsEdit={setIsEdit}
          payments={payments}
        />
      )}

      <CreateUtang
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        utangToEdit={utangToEdit}
        view={view}
        setView={setView}
      />
      <NavBar view={view} setView={setView} />
    </div>
  );
}

export default App;
