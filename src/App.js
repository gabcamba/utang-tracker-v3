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
import { auth } from "./firestore";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [utangs, setUtangs] = useState(
    JSON.parse(localStorage.getItem("utangs")) || []
  );

  const [deleted, setDeleted] = useState([]);
  const [exploding, setExploding] = useState(false);
  const [forPay, setForPay] = useState(false);
  const [utangToEdit, setUtangToEdit] = useState(null);
  const [payments, setPayments] = useState([]);
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(HOME_VIEW);
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));

  const toggleCreate = () => {
    setCreate(!create);

    if (utangToEdit && create) {
      setUtangToEdit(null);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        getUtangs(setUtangs);
        getDeleted(setDeleted);
        getPayments(setPayments);
      } else {
        setIsSignedIn(false);
      }
    });
  }, [sessionId]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <button
        style={{
          zIndex: 9999999999,
          position: "fixed",
          backgroundColor: "#121212",
          outline: "none",
          border: "none",
          color: "#121212",
        }}
        onClick={() => {
          // migrateUtangs();
          signOut(auth);
          localStorage.removeItem("user");
          localStorage.removeItem("sessionId");
          setSessionId(null);
          setIsSignedIn(false);
          setView(HOME_VIEW);
        }}
      >
        logout
      </button>
      {isSignedIn && sessionId ? (
        <div className="App">
          {exploding && (
            <ConfettiExplosion
              particleCount={500}
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
      ) : (
        <Login
          setIsSignedIn={setIsSignedIn}
          setSessionId={setSessionId}
          setUtangs={setUtangs}
          setDeleted={setDeleted}
          setPayments={setPayments}
        />
      )}
    </>
  );
}

export default App;
