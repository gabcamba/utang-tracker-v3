import React, { useState } from "react";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import UtangItem from "../UtangItem";
import { successToast } from "../../utils/toast";
import { DELETED, UTANG_DELETED, UTANG_PAID_SINGULAR } from "../../constants";
import { createPayment, deleteItem, createDeleted } from "../../utils/database";
import useSound from "use-sound";
import pop from "../../media/pop.wav";
import edit from "../../media/edit.wav";
import { generateUUID } from "../../utils/uuid";
import { swipeActionStyle } from "../../styles";

const WithTwoActions = ({
  list,
  setUtangToEdit,
  utangToEdit,
  view,
  setExploding,
  setCreate,
}) => {
  const [play] = useSound(pop);
  const [playEdit] = useSound(edit);

  const handleDelete = async (utang) => {
    play();
    const deletedUtang = {
      ...utang,
      date: Date.now(),
      status: DELETED,
    };
    setUtangToEdit(null);
    await deleteItem(deletedUtang);
    await createDeleted(deletedUtang);
    successToast(UTANG_DELETED);
  };

  const handleEdit = (utang) => {
    if (utangToEdit) {
      playEdit();
      setUtangToEdit(null);
    } else {
      playEdit();
      setUtangToEdit(utang);
      setCreate(true);
    }
  };

  const handlePay = async (utang) => {
    setExploding(true);
    play();
    createPayment({
      id: `${Date.now()}-${generateUUID()}}`,
      datePaid: Date.now(),
      utangs: [utang],
      whoPaid: utang.person,
      amount: utang.amount,
    });

    await deleteItem(utang);

    successToast(UTANG_PAID_SINGULAR);
    setTimeout(() => {
      setExploding(false);
    }, 2000);
  };

  const trailingActions = (utang) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handlePay(utang)}>
        <div
          style={{
            ...swipeActionStyle,
            backgroundColor: "#69c881",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          pay
        </div>
      </SwipeAction>

      <SwipeAction onClick={() => handleEdit(utang)}>
        <div style={{ ...swipeActionStyle, backgroundColor: "darkslateblue" }}>
          edit
        </div>
      </SwipeAction>

      <SwipeAction destructive={true} onClick={() => handleDelete(utang)}>
        <div style={{ ...swipeActionStyle, backgroundColor: "tomato" }}>
          del
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  const editStyle = (id) => {
    if (utangToEdit?.uid  === id) {
      return {
        backgroundColor: "darkslateblue",
      };
    }
  };

  return (
    <div className="basic-swipeable-list__container">
      <SwipeableList
        fullSwipe={false}
        type={ListType.IOS}
        destructiveCallbackDelay={300}
      >
        {list.length &&
          list.map((utang) => (
            <SwipeableListItem
              key={utang.uid}
              trailingActions={trailingActions(utang)}
              blockSwipe={utangToEdit || view === "deleted"}
            >
              <div
                key={utang.uid}
                className="test-div"
                style={{
                  width: "100%",
                  ...editStyle(utang.uid),
                }}
              >
                <UtangItem key={utang.uid} utang={utang} view={view} />
              </div>
            </SwipeableListItem>
          ))}
      </SwipeableList>
    </div>
  );
};

export default WithTwoActions;
