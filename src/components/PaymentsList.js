import React from "react";
import PaymentItem from "./PaymentItem";
import { useSpring, animated } from "@react-spring/web";
import { listItemSpring } from "../springs";
import NoUtang from "./NoUtangDialog";

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
          <div className="no-utang" style={{ height: "73vh" }}>
            <NoUtang />
          </div>
        )}
      </animated.div>
    </>
  );
};

export default UtangList;
