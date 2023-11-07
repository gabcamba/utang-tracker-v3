import React from "react";
import { APP_VERSION, GOOD_JOB, HOME_VIEW, NO_UTANG_FOUND } from "../constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import WithTwoActions from "./swipeableList/WithTwoActions";
const UtangList = ({
  utangs,
  setUtangToEdit,
  deleted,
  view,
  utangToEdit,
  setExploding,
}) => {
  const [parent] = useAutoAnimate();
  const list = view === HOME_VIEW ? utangs : deleted;
  return (
    <>
      <div
        ref={parent}
        className={`${
          view === "deleted" ? "utang-list list-expand" : "utang-list"
        }`}
      >
        {list.length ? (
          <WithTwoActions
            setUtangToEdit={setUtangToEdit}
            view={view}
            list={list}
            utangToEdit={utangToEdit}
            setExploding={setExploding}
          />
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
              {APP_VERSION }
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
            <span style={{ fontSize: "0.7rem" }}>🍓🥕</span>
          </div>
        )}
      </div>
    </>
  );
};

export default UtangList;
