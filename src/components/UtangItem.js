import React, { useState, useEffect } from "react";
import { db } from "../firebase-database";
import { ref, remove } from "firebase/database";
import useSound from "use-sound";
import trash from "../media/trash.mp3";
import { GAB } from "../constants";

const UtangItem = ({ utang, setIsFetching, setSnackDeleteOpen }) => {
  useEffect(() => {}, []);
  const [del, setDelete] = useState(false);
  const [play] = useSound(trash);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const toggleDelete = () => {
    setDelete((del) => {
      return !del;
    });
  };

  const confirmDelete = async (utang) => {
    play();
    setIsFetching(true);
    remove(ref(db, utang.uid));
    setIsFetching(false);
    toggleDelete();
    setSnackDeleteOpen(true);

    setTimeout(() => {
      setSnackDeleteOpen(false);
    }, 1500);
  };

  return (
    <>
      <div key={utang.id} className="utang-item">
        <div className="title-person">
          <div className="utang-name">{utang.name}</div>
          <div className="utang-person">{formatDateTime(utang.date)}</div>
        </div>

        <div
          onClick={() => setDelete(false)}
          className={`amount ${utang.person === GAB ? "orange" : "red"}`}
        >
          {utang.person}
        </div>
        <div className="check">
          {del ? (
            <div style={{textAlign: 'center'}} onClick={() => confirmDelete(utang)}>❌</div>
          ) : (
            <div onClick={() => toggleDelete()} className="amount">
              {utang.amount.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UtangItem;
