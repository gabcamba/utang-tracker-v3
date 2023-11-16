import React from "react";
import PaymentItem from "./PaymentItem";
import { NO_UTANG_FOUND } from "../constants";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";

const UtangList = ({ payments }) => {
  const springs = useSpring(listItemSpring);
  return (
    <>
      <animated.div style={{ ...springs }} className="utang-list list-expand">
        {payments.length ? (
          payments.map((payment) => (
            <PaymentItem key={payment.id} payment={payment} />
          ))
        ) : (
          <div className="no-utang">
            <span>{NO_UTANG_FOUND}</span>
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
