import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PaymentItem from "./PaymentItem";
import { NO_UTANG_FOUND } from "../constants";
const UtangList = ({ payments }) => {
  const [parent] = useAutoAnimate();

  return (
    <>
      <div ref={parent} className="utang-list">
        {payments.length ? (
          payments.map((payment) => (
            <PaymentItem key={payment.id} payment={payment} />
          ))
        ) : (
          <div className="no-utang">
            <span>{NO_UTANG_FOUND}</span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#69c881",
                marginTop: "10px",
              }}
            >
              v3.110223a
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
            <span style={{ fontSize: "0.7rem" }}>🍓🥕</span>
          </div>
        )}
      </div>
    </>
  );
};

export default UtangList;
