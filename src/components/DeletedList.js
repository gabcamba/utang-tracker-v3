import React from "react";
import WithTwoActions from "./swipeableList/WithTwoActions";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";
import NoUtang from "./NoUtangDialog";
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
          <div className="no-utang" style={{ height: "73vh" }}>
            <NoUtang />
          </div>
        )}
      </animated.div>
    </>
  );
};

export default DeletedList;
