import React from "react";
import UtangItem from "./UtangItem";
import { GOOD_JOB, NO_UTANG_FOUND } from "../constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const UtangList = ({
  utangs,
  setUtangToEdit,
  setIsEdit,
  isEdit,
}) => {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <>
      <div ref={parent} className={`${isEdit ? "lock-scroll" : null} utang-list`}>
        {utangs.length ? (
          utangs.map((utang) => (
            <UtangItem
              key={utang.uid}
              utang={utang}
              setUtangToEdit={setUtangToEdit}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          ))
        ) : (
          <div className="no-utang">
            <span>
              {NO_UTANG_FOUND} <br /> {GOOD_JOB}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#69c881",
                marginTop: "10px",
              }}
            >
              v3.10823a
            </span>
            <a
              href="https://github.com/gabcamba"
              rel="noreferrer"
              target="_blank"
              style={{
                fontSize: "0.5rem",
                color: "darksalmon",
                marginTop: "20px",
              }}
            >
              github.com/gabcamba
            </a>
            <a
              href="https://github.com/meinardxd"
              rel="noreferrer"
              target="_blank"
              style={{
                fontSize: "0.5rem",
                color: "darksalmon",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            >
              github.com/meinardxd
            </a>
            <span style={{fontSize: '0.7rem'}}>🍓🥕</span>
          </div>
        )}
      </div>
    </>
  );
};

export default UtangList;
