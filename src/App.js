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
import Menu from "./components/Menu.js";
import ConfettiExplosion from "react-confetti-explosion";
import { Toaster } from "react-hot-toast";
import {
  createPayment,
  deleteItem,
  getDeleted,
  getPayments,
  getUtangs,
} from "./utils/database";
import { DELETED_VIEW, GAB, HOME_VIEW, MEI, UTANG_PAID } from "./constants";
import { auth } from "./firestore";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import useSound from "use-sound";
import ding from "./media/success.wav";
import { generateUUID } from "./utils/uuid.js";
import { successToast } from "./utils/toast.js";

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
  const [loggedOut, setIsLoggedOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [play] = useSound(ding);

  const computeUtangs = () => {
    let gabAmount = 0;
    let meiAmount = 0;

    // eslint-disable-next-line array-callback-return
    utangs.map((utang) => {
      if (utang.person === GAB) {
        return (gabAmount += utang.amount);
      } else if (utang.person === MEI) {
        return (meiAmount += utang.amount);
      }
    });

    return {
      shouldNotProceed: Math.abs(gabAmount - meiAmount) === 0,
      whoPays: gabAmount > meiAmount ? GAB : MEI,
      amount: Math.abs(gabAmount - meiAmount),
    };
  };

  const handlePayAll = () => {
    if (!utangs.length) return;
    const { whoPays, amount, shouldNotProceed } = computeUtangs();
    if (shouldNotProceed) return;

    play();
    setExploding(true);
    setForPay(false);
    setUtangToEdit(null);
    createPayment({
      id: `${Date.now()}-${generateUUID()}}`,
      datePaid: Date.now(),
      utangs,
      whoPaid: whoPays,
      amount: amount,
    });

    successToast(UTANG_PAID);

    utangs.map((utang) => {
      return deleteItem(utang);
    });

    setTimeout(() => {
      setExploding(false);
    }, 2000);
  };

  const toggleCreate = () => {
    setCreate(!create);

    if (utangToEdit && create) {
      setUtangToEdit(null);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        getUtangs(setUtangs);
        getDeleted(setDeleted);
        getPayments(setPayments);
      } else {
        setSessionId(null);
        setIsSignedIn(false);
        setUtangs([]);
        localStorage.removeItem("user");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("utangs");
        // setIsSignedIn(false);
        setIsLoggedOut(true);
        setView(HOME_VIEW);
      }
    });
  }, [sessionId]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      
      {isSignedIn && sessionId ? (
        <div className="App">
        {menuOpen && (
          <Menu
            toggleMenu={toggleMenu}
            toggleCreate={toggleCreate}
            handleLogout={handleLogout}
            handlePayAll={handlePayAll}
          />
        )}
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
              toggleMenu={toggleMenu}
              menuOpen={menuOpen}
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
          loggedOut={loggedOut}
        />
      )}
    </>
  );
}

export default App;
