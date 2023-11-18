import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import { fabStyle } from "../styles";

const Fab = ({ toggleCreate, create, utangToEdit }) => {
  const [springs, api] = useSpring(() => ({
    from: { bottom: '-10vh' },
    to: { bottom: create || utangToEdit ? '36vh' : '13vh' },
    config: {
      mass: 2,
      tension: 350,
    },
  }));

  useEffect(() => {
    if (create) {
      api.start({
        from: {
          bottom: '13vh',
        },
        to: {
          bottom: '36vh',
        },
      });
    }
  }, [create, api]);

  const handleClick = () => {
    if (create || utangToEdit) {
      api.start({
        from: {
          bottom: '36vh',
        },
        to: {
          bottom: '13vh',
        },
      });
    } else {
      api.start({
        from: {
        bottom: '13vh',
        },
        to: {
          bottom: '36vh',
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
        backgroundColor: !create ? "#20b2aa" : "tomato",
      }}
    >
      {create ? <CloseRounded /> : <AddRounded />}
    </animated.div>
  );
};

export default Fab;
