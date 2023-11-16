import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import { fabStyle } from "../styles";

const Fab = ({ toggleCreate, create, utangToEdit }) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 100 },
    to: { y: create || utangToEdit ? -190 : 0 },
    config: {
      mass: 2,
      tension: 500,
    },
  }));

  useEffect(() => {
    if (create) {
      api.start({
        from: {
          y: 0,
        },
        to: {
          y: -190,
        },
      });
    }
  }, [create, api]);

  const handleClick = () => {
    if (create || utangToEdit) {
      api.start({
        from: {
          y: -190,
        },
        to: {
          y: 0,
        },
      });
    } else {
      api.start({
        from: {
          y: 0,
        },
        to: {
          y: -190,
        },
      });
    }

    toggleCreate();
  };
  return (
    <animated.div
      onClick={() => handleClick()}
      style={{
        ...springs,
        ...fabStyle,
        bottom: 100,
        backgroundColor: !create ? "#20b2aa" : "tomato",
      }}
    >
      {create ? <CloseRounded /> : <AddRounded />}
    </animated.div>
  );
};

export default Fab;
