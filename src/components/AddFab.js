import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { AddRounded } from "@mui/icons-material";

const AddFab = ({ toggleCreate, create }) => {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 0 },
  });

  return (
    <animated.div
      onClick={() => toggleCreate()}
      style={{
        ...springs,
        borderRadius: "50%",
        height: 56,
        width: 56,
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: create ? "26vh" : 100,
        right: 16,
        backgroundColor: "#75d16d",
        color: "white",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <AddRounded />
    </animated.div>
  );
};

export default AddFab;
