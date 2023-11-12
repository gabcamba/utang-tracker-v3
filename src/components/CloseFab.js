import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { CloseRounded } from "@mui/icons-material";
import { fabStyle } from "../styles";
import { deleteFabSpring } from "../springs";

const CloseFab = ({ toggleCreate }) => {
  const springs = useSpring(deleteFabSpring);
  return (
    <animated.div
      onClick={() => toggleCreate()}
      style={{
        ...springs,
        ...fabStyle,
        bottom: '26vh',
        backgroundColor: "#eb4c42",
      }}
    >
      <CloseRounded />
    </animated.div>
  );
};

export default CloseFab;
