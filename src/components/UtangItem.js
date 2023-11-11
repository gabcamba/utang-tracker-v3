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

import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import {
  AttachMoneyRounded,
  DirectionsBusRounded,
  HomeRounded,
  ShoppingCartRounded,
  StarRounded,
} from "@mui/icons-material";

const UtangItem = ({ utang, view }) => {
  const [viewHistory, setViewHistory] = useState(false);

  const toggleHistory = () => {
    setViewHistory(!viewHistory);
  };

  const categoryIconList = {
    food: {
      icon: <RestaurantRoundedIcon />,
      color: "forestgreen",
    },
    transpo: {
      icon: <DirectionsBusRounded />,
      color: "#967ae9",
    },
    home: {
      icon: <HomeRounded />,
      color: "blueviolet",
    },
    household: {
      icon: <HomeRounded />,
      color: "blueviolet",
    },
    grocery: {
      icon: <ShoppingCartRounded />,
      color: "cornflowerblue",
    },
    leisure: {
      icon: <StarRounded />,
      color: "darkorange",
    },
  };

  return (
    <>
      <div key={utang.uid} className="utang-item">
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: utang.category
              ? categoryIconList[utang.category]?.color
              : "blueviolet",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",

            marginLeft: 20,
            marginRight: 12,
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
            {utang.edited && (
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
      </div>

      <Dialog
        open={viewHistory}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px",
            border: "1px solid darksalmon",
            fontFamily: "ui-monospace",
            background: "none",
            "-webkit-backdrop-filter": "blur(10px)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "darksalmon",
            fontFamily: "ui-monospace",
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
              fontFamily: "ui-monospace",
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
