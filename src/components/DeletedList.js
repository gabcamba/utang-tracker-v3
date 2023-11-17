import React from "react";
import { NO_UTANG_FOUND } from "../constants";
import WithTwoActions from "./swipeableList/WithTwoActions";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";

const DeletedList = ({
  setUtangToEdit,
  deleted,
  view,
  utangToEdit,
  setExploding,
  create,
  setCreate,
}) => {
  const list = deleted;
  const springs = useSpring(listItemSpring);

  return (
    <>
      <animated.div
        style={{ ...springs }}
        className={`${
          view === "deleted" || !create
            ? "utang-list list-expand"
            : "utang-list"
        }`}
      >
        {list.length ? (
          <WithTwoActions
            setUtangToEdit={setUtangToEdit}
            view={view}
            list={list}
            utangToEdit={utangToEdit}
            setExploding={setExploding}
            setCreate={setCreate}
          />
        ) : (
          <div className="no-utang">
            <span>
              {NO_UTANG_FOUND} {/*<br /> {GOOD_JOB}*/}
            </span>
            {/*<span
              style={{
                fontSize: "0.7rem",
                color: "#69c881",
                marginTop: "10px",
              }}
            >
              {APP_VERSION}
            </span>*/}
            {/*<a
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
            </a>*/}
            {/*<span style={{ fontSize: "0.7rem" }}>🍓🥕</span>*/}
          </div>
        )}
      </animated.div>
    </>
  );
};

export default DeletedList;
