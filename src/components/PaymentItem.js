import React, { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { formatDateTime } from "../utils/formatDate";
import PaymentHistoryModal from "./PaymentHistoryModal";
import { formatCurrency } from "../utils/converter";

const PaymentItem = ({ payment }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = (bool) => {
    setOpen(bool);
  };
  return (
    <>
      <div key={payment.id} className="utang-item">
        <div className="item namedate">
          <span className="name">{payment.whoPaid}</span>
          <span className="date">{formatDateTime(payment.datePaid)}</span>
        </div>
        <div className="item">{formatCurrency(payment.amount)}</div>
        <div className="item view">
          <VisibilityRoundedIcon
            onClick={() => toggleModal(true)}
            sx={{ color: "darksalmon !important", paddingRight: "20px" }}
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
