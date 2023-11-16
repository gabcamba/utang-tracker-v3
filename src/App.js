/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import CreateUtang from "./components/CreateUtang";
import DeletedList from "./components/DeletedList";
import Fab from "./components/Fab";
import NavBar from "./components/NavBar";
import PaymentsList from "./components/PaymentsList";
import UtangList from "./components/UtangList";
import UtangSummary from "./components/UtangSummary";

import ConfettiExplosion from "react-confetti-explosion";
import { Toaster } from "react-hot-toast";
import { getDeleted, getPayments, getUtangs } from "./utils/database";
import { DELETED_VIEW, HOME_VIEW } from "./constants";

function App() {
  const [utangs, setUtangs] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [payments, setPayments] = useState([]);
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(HOME_VIEW);

  const toggleCreate = () => {
    setCreate(!create);

    if (utangToEdit && create) {
      setUtangToEdit(null);
    }
  };
  useEffect(() => {
    const fetch = () => {
      getUtangs(setUtangs);
    };

    const fetchDeleted = () => {
      getDeleted(setDeleted);
    };

    const getHistory = () => {
      getPayments(setPayments);
    };

    fetch();
    getHistory();
    fetchDeleted();
  }, []);

  return (
    <div className="App lock-scroll">
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
      {view === HOME_VIEW ? (
        <UtangList
          utangs={utangs}
          setUtangToEdit={setUtangToEdit}
          utangToEdit={utangToEdit}
          view={view}
          setExploding={setExploding}
          create={create}
          setCreate={setCreate}
        />
      ) : view === DELETED_VIEW ? (
        <DeletedList
          deleted={deleted}
          setUtangToEdit={setUtangToEdit}
          utangToEdit={utangToEdit}
          view={view}
          setExploding={setExploding}
          create={create}
          setCreate={setCreate}
        />
      ) : (
        <PaymentsList payments={payments} />
      )}

      {view === HOME_VIEW && create && (
        <CreateUtang
          utangToEdit={utangToEdit}
          setUtangToEdit={setUtangToEdit}
        />
      )}
      {view === HOME_VIEW && (
        <Fab
          toggleCreate={toggleCreate}
          create={create}
          utangToEdit={utangToEdit}
        />
      )}
      <NavBar
        view={view}
        setView={setView}
        setUtangToEdit={setUtangToEdit}
        setCreate={setCreate}
      />
    </div>
  );
}

export default App;
