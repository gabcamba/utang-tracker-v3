import React, { useEffect } from "react";
import { APP_VERSION, NO_UTANG_FOUND } from "../constants";
import WithTwoActions from "./swipeableList/WithTwoActions";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";

const UtangList = ({
  utangs,
  setUtangToEdit,
  view,
  utangToEdit,
  setExploding,
  create,
  setCreate,
}) => {
  const list = utangs;
  const springs = useSpring(listItemSpring);

  const handleScroll = () => {
    sessionStorage.setItem("scrollPos", window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const setScroll = async () => {
      window.scrollTo({
        top: parseInt(sessionStorage.getItem("scrollPos")),
      });
    };

    setScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [view]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          height: 80,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "ui-monospace",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "gray", marginTop: 10}}>
          Made with ❤️ by 🍓🥕
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            color: "#69c881",
            marginTop: "10px",
          }}
        >
          {APP_VERSION}
        </span>
      </div>
      <animated.div
        style={{ ...springs }}
        className={`${
          view === "deleted" || !create
            ? "utang-list list-expand"
            : utangToEdit
            ? "utang-list lock-scroll"
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
            <span style={{ fontSize: "0.7rem" }}>🍓🥕</span>*/}
          </div>
        )}
      </animated.div>
    </>
  );
};

export default UtangList;
