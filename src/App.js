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
import { getDeleted, getPayments, getUtangs } from "./utils/database";
import { DELETED_VIEW, HOME_VIEW } from "./constants";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [payments, setPayments] = useState([]);
  const [view, setView] = useState(HOME_VIEW);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const getHistory = async () => {
      await getPayments(setPayments);
    };

    const fetch = async () => {
      await getUtangs(setUtangs);
    };

    const fetchDeleted = async () => {
      await getDeleted(setDeleted);
    };

    fetch();
    getHistory();
    fetchDeleted();
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
      />
      {view === DELETED_VIEW || view === HOME_VIEW ? (
        <UtangList
          utangs={utangs}
          deleted={deleted}
          setUtangToEdit={setUtangToEdit}
          utangToEdit={utangToEdit}
          payments={payments}
          view={view}
          setExploding={setExploding}
        />
      ) : (
        <PaymentsList
          utangs={utangs}
          setUtangToEdit={setUtangToEdit}
          payments={payments}
        />
      )}

      {view === HOME_VIEW && (
        <CreateUtang
          utangToEdit={utangToEdit}
          view={view}
          setView={setView}
          setUtangToEdit={setUtangToEdit}
        />
      )}
      <NavBar view={view} setView={setView} />
    </div>
  );
}

export default App;
