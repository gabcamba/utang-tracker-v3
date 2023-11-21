import React, { useEffect } from "react";
import { APP_VERSION } from "../constants";
import WithTwoActions from "./swipeableList/WithTwoActions";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";
import NoUtang from "./NoUtangDialog";

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
    localStorage.setItem("scrollPos", window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const setScroll = async () => {
      window.scrollTo({
        top: parseInt(localStorage.getItem("scrollPos")),
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
          fontFamily: "ui-monospace, SF Mono",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "gray", marginTop: 10 }}>
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
          <div className="no-utang" style={{ height: "73vh" }}>
            <NoUtang />
          </div>
        )}
      </animated.div>
    </>
  );
};

export default UtangList;
