import React, { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { formatDateTime } from "../utils/formatDate";
import PaymentHistoryModal from "./PaymentHistoryModal";
import { formatCurrency } from "../utils/converter";
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';

const PaymentItem = ({ payment }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = (bool) => {
    setOpen(bool);
  };
  return (
    <>
      <div key={payment.id} className="utang-item">
        <div style={{flex: 6}} className="item namedate">
          <span className="name">{payment.whoPaid}</span>
        
          <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#69c881"}} className="date">
          <PlaylistAddCheckRoundedIcon sx={{ marginRight: "5px", fontSize: '2em' }} />
          {formatDateTime(payment.datePaid)}
          </span>
        </div>
        <div style={{flex: 2.5}} className="item">{formatCurrency(payment.amount)}</div>
        <div style={{flex: 2.5}} className="item view">
          <VisibilityRoundedIcon
            onClick={() => toggleModal(true)}
            sx={{ color: "#69c881 !important", paddingRight: "20px" }}
          />
        </div>
      </div>

      <PaymentHistoryModal
        open={open}
        toggleModal={toggleModal}
        payment={payment}
      />
    </>
  );
};

export default PaymentItem;
