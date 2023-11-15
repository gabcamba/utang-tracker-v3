import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { AddRounded } from "@mui/icons-material";
import { fabStyle } from "../styles";
import { addFabSpring } from "../springs";

const AddFab = ({ toggleCreate }) => {
  const springs = useSpring(addFabSpring);
  return (
    <animated.div
      onClick={() => toggleCreate()}
      style={{
        ...springs,
        ...fabStyle,
        bottom: 100,
        backgroundColor: "#20b2aa",
      }}
    >
      <AddRounded />
    </animated.div>
  );
};

export default AddFab;
