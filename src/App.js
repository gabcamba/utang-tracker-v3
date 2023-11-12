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
import { getDeleted, getPayments, getUtangs } from "./utils/database";
import { DELETED_VIEW, HOME_VIEW } from "./constants";
import DeletedList from "./components/DeletedList";
import AddFab from "./components/AddFab";
import CloseFab from "./components/CloseFab";
import LoginPage from "./components/Login";
import {auth} from "./firestore"


function App() {
  const [user, setUser] = useState(null);
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

    const getAuthUser = () => {
      // console.log(auth.currentUser?.email);
      setUser(auth.currentUser?.email);
    };

    fetch();
    getHistory();
    fetchDeleted();
    getAuthUser();
  }, [auth.currentUser]);

  return (
    <>
      {!user ? (
        <LoginPage />
      ) : (
        <div className="App lock-scroll">
          <div>
            <Toaster />
          </div>
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
              deleted={deleted}
              setUtangToEdit={setUtangToEdit}
              utangToEdit={utangToEdit}
              payments={payments}
              view={view}
              setExploding={setExploding}
              create={create}
              setCreate={setCreate}
            />
          ) : view === DELETED_VIEW ? (
            <DeletedList
              utangs={utangs}
              deleted={deleted}
              setUtangToEdit={setUtangToEdit}
              utangToEdit={utangToEdit}
              payments={payments}
              view={view}
              setExploding={setExploding}
              create={create}
              setCreate={setCreate}
            />
          ) : (
            <PaymentsList
              utangs={utangs}
              setUtangToEdit={setUtangToEdit}
              payments={payments}
            />
          )}

          {view === HOME_VIEW && create && (
            <CreateUtang
              utangToEdit={utangToEdit}
              view={view}
              setView={setView}
              setUtangToEdit={setUtangToEdit}
              create={create}
            />
          )}
          {view === HOME_VIEW && !create && (
            <AddFab toggleCreate={toggleCreate} create={create} />
          )}
          {view === HOME_VIEW && create && (
            <CloseFab toggleCreate={toggleCreate} create={create} />
          )}
          <NavBar view={view} setView={setView} />
        </div>
      )}
    </>
  );
}

export default App;
