import React, { useState } from "react";
import { DELETED_VIEW, GAB, HOME_VIEW } from "../constants";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { formatDateTime } from "../utils/formatDate";
import { formatCurrency } from "../utils/converter";
import { useSpring, animated } from "@react-spring/web";

import {
  AttachMoneyRounded,
  BoltRounded,
  DirectionsBusRounded,
  HomeRounded,
  LunchDiningRounded,
  ShoppingCartRounded,
  StarRounded,
} from "@mui/icons-material";
import { editModalStyle, utangItemIconStyle } from "../styles";
import { utangItemSpring } from "../springs";

const UtangItem = ({ utang, view }) => {
  const [viewHistory, setViewHistory] = useState(false);

  const springs = useSpring(utangItemSpring);
  const toggleHistory = () => {
    setViewHistory(!viewHistory);
  };

  const categoryIconList = {
    food: {
      icon: <LunchDiningRounded />,
      color: "cornflowerblue",
    },
    transpo: {
      icon: <DirectionsBusRounded />,
      color: "#DDACF5",
    },
    home: {
      icon: <HomeRounded />,
      color: "#9854CB",
    },
    household: {
      icon: <HomeRounded />,
      color: "#9854CB",
    },
    grocery: {
      icon: <ShoppingCartRounded />,
      color: "#64379F",
    },
    leisure: {
      icon: <StarRounded />,
      color: "#27104E",
    },
    bills: {
      icon: <BoltRounded />,
      color: "#fcd12a",
    },
  };

  return (
    <>
      <animated.div
        style={{ ...springs }}
        key={utang.uid}
        className="utang-item"
      >
        <div
          style={{
            ...utangItemIconStyle,
            backgroundColor: utang.category
              ? categoryIconList[utang.category]?.color
              : "blueviolet",
          }}
        >
          {utang.category ? (
            categoryIconList[utang.category]?.icon
          ) : (
            <AttachMoneyRounded />
          )}
        </div>
        <div className="title-person">
          <div className="utang-name">{utang.name}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {!utang.edited && view === HOME_VIEW && (
              <div className="utang-person">{formatDateTime(utang.date)}</div>
            )}
            {utang.edited && view !== DELETED_VIEW && (
              <div onClick={() => toggleHistory()} className="utang-edited">
                <EditNoteRoundedIcon
                  sx={{ marginRight: "5px", fontSize: "2em" }}
                />
                {utang.editDate ? `${formatDateTime(utang.editDate)}` : null}
              </div>
            )}

            {view === DELETED_VIEW && (
              <div className="utang-deleted">
                <DeleteSweepRoundedIcon
                  sx={{ marginRight: "5px", fontSize: "2em" }}
                />
                {formatDateTime(utang.date)}
              </div>
            )}
          </div>
        </div>
        <div className="check">
          <div className="amount">{formatCurrency(utang.amount)}</div>
        </div>
        <div className={`amount ${utang.person === GAB ? "orange" : "red"}`}>
          <span style={{ marginRight: 20 }}>{utang.person}</span>
        </div>
      </animated.div>

      <Dialog
        open={viewHistory}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: editModalStyle,
        }}
      >
        <DialogTitle
          sx={{
            color: "darksalmon",
            fontFamily: "ui-monospace, SF Mono",
            fontSize: "1em",
          }}
          id="alert-dialog-title"
        >
          edit history
        </DialogTitle>
        <DialogContent sx={{ margin: 0 }}>
          <div
            style={{
              width: "70vw",
              maxHeight: "40vh",
              color: "white",
              fontSize: "50px",
            }}
          >
            {utang.hist &&
              utang.hist.map((hist) => (
                <div
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    height: "50px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ flex: 7, textAlign: "left" }}>
                    <div>{hist.name}</div>
                    <div style={{ fontSize: "0.6rem", color: "darksalmon" }}>
                      {hist.date
                        ? formatDateTime(hist.date)
                        : hist.editDate
                        ? formatDateTime(hist.editDate)
                        : ""}
                    </div>
                  </div>
                  <div
                    style={{
                      color: hist.person === "Gab" ? "orange" : "tomato",
                      flex: 2.5,
                    }}
                  >
                    {hist.person}
                  </div>
                  <div style={{ flex: 2.5, textAlign: "right" }}>
                    {formatCurrency(hist.amount)}
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "ui-monospace, SF Mono",
              textTransform: "lowercase",
              color: "#69c881",
            }}
            onClick={() => toggleHistory()}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UtangItem;
