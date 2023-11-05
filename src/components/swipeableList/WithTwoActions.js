import React, { useState } from "react";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import "./WithTwoActions.css";
import UtangItem from "../UtangItem";
import { successToast } from "../../utils/toast";
import { DELETED, UTANG_DELETED, UTANG_PAID } from "../../constants";
import { paid, pay, updateItem } from "../../utils/database";
import useSound from "use-sound";
import pop from "../../media/pop.wav";
import edit from "../../media/edit.wav";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { generateUUID } from "../../utils/uuid";

const WithTwoActions = ({ list, setUtangToEdit, utangToEdit, view }) => {
  const [play] = useSound(pop);
  const [playEdit] = useSound(edit);
  const [editItemID, setEditItemID] = useState(null);
  const [parent] = useAutoAnimate();

  const handleDelete = async (utang) => {
    play();
    const deletedUtang = {
      ...utang,
      date: Date.now(),
      status: DELETED,
    };
    setUtangToEdit(null);
    await updateItem(deletedUtang);
    successToast(UTANG_DELETED);
  };

  const handleEdit = (utang) => {
    if (utangToEdit) {
      playEdit();
      setEditItemID(null);
      setUtangToEdit(null);
    } else {
      playEdit();
      setUtangToEdit(utang);
      setEditItemID(utang.uid);
    }
  };

  const handlePay = async(utang) => {
    console.log(utang);
    play();
    pay({
      id: `${Date.now()}-${generateUUID()}}`,
      datePaid: Date.now(),
      utangs: [utang],
      whoPaid: utang.person,
      amount: utang.amount,
    });

    await paid([utang]);

    successToast(UTANG_PAID);
  };

  const actionStyles = {
    display: "flex",
    color: "white",
    fontFamily: "ui-monospace",
    justifyContent: "center",
    alignItems: "center",
  };

  const trailingActions = (utang) => (
    <TrailingActions>
      {utangToEdit ? null : (
        <SwipeAction destructive={true} onClick={() => handlePay(utang)}>
          <div style={{ ...actionStyles, backgroundColor: "#69c881" }}>pay</div>
        </SwipeAction>
      )}

      <SwipeAction onClick={() => handleEdit(utang)}>
        <div style={{ ...actionStyles, backgroundColor: "darksalmon" }}>
          {utangToEdit && utang.uid === utangToEdit.uid ? "cancel" : "edit"}
        </div>
      </SwipeAction>
      {utangToEdit ? null : (
        <SwipeAction destructive={true} onClick={() => handleDelete(utang)}>
          <div style={{ ...actionStyles, backgroundColor: "#de6238" }}>
            delete
          </div>
        </SwipeAction>
      )}
    </TrailingActions>
  );

  const editStyle = (id) => {
    if (utangToEdit && editItemID === id) {
      return {
        border: "100px solid red !important",
        backgroundColor: "darkslateblue",
      };
    }
  };

  return (
    <div className="basic-swipeable-list__container lock-scroll">
      <SwipeableList
        ref={parent}
        fullSwipe={false}
        type={ListType.IOS}
        destructiveCallbackDelay={300}
      >
        {list.length &&
          list.map((utang) => (
            <SwipeableListItem
              key={utang.uid}
              trailingActions={trailingActions(utang)}
              blockSwipe={
                (utangToEdit && utang.uid !== utangToEdit.uid) ||
                view === "deleted"
              }
            >
              <div
                key={utang.uid}
                className="test-div"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  margin: "5px",
                  ...editStyle(utang.uid),
                }}
              >
                <UtangItem utang={utang} />
              </div>
            </SwipeableListItem>
          ))}
      </SwipeableList>
    </div>
  );
};

export default WithTwoActions;
