import { useSpring, animated, useTrail } from "@react-spring/web";
import React from "react";
import { menuSpring } from "../springs";
import {
  AddCircleRounded,
  ArrowCircleLeftRounded,
  CancelRounded,
  NightlightRounded,
  LightModeRounded,
  PaidRounded,
} from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const Menus = ({ toggleMenu, toggleCreate, handleLogout, handlePayAll }) => {
  const { theme, toggleTheme } = useTheme();
  const [springs, api] = useSpring(() => ({
    ...menuSpring,
  }));

  const [titleSprings, titleSpringsApi] = useSpring(() => ({
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
  }));

  const toggleDivClick = () => {
    api.start({
      from: {
        backdropFilter: "blur(40px)",
        "-webkit-backdrop-filter": "blur(40px)",
      },
      to: {
        backdropFilter: "blur(0px)",
        "-webkit-backdrop-filter": "blur(0px)",
      },
      config: {
        mass: 3,
        friction: 35,
        tension: 200,
      },
    });

    trailApi.start({
      from: {
        y: 0,
        opacity: 1,
      },
      to: {
        y: 20,
        opacity: 0,
      },
    });

    titleSpringsApi.start({
      from: {
        y: 0,
        opacity: 1,
      },
      to: {
        y: 20,
        opacity: 0,
      },
    });

    setTimeout(() => {
      toggleMenu();
    }, 500);
  };

  const handleCreate = () => {
    toggleCreate();
  };

  const menuItemMap = [
    {
      itemLabel: "Create",
      itemIcon: <AddCircleRounded />,
      iconColor: "#00a2ff",
      itemFunction: handleCreate,
    },
    {
      itemLabel: "Pay All",
      itemIcon: <PaidRounded />,
      iconColor: "#55e475",
      itemFunction: handlePayAll,
    },
    {
      itemLabel: "Delete all",
      itemIcon: <CancelRounded />,
      iconColor: "#ff6a64",
    },
    {
      itemLabel: "Logout",
      itemIcon: <ArrowCircleLeftRounded />,
      iconColor: "#c2aff1",
      itemFunction: handleLogout,
    },
    {
      itemLabel: theme === "dark" ? "Light Mode" : "Dark Mode",
      itemIcon: theme === "dark" ? <LightModeRounded /> : <NightlightRounded />,
      iconColor: theme === "dark" ? "#ffd700" : "#1a1a1a",
      itemFunction: toggleTheme,
    },
  ];

  const [trails, trailApi] = useTrail(
    menuItemMap.length,
    () => ({
      from: { y: 50, opacity: 0, scale: 0.9 },
      to: { y: 0, opacity: 1, scale: 1 },
      config: {
        mass: 1,
        friction: 30,
        tension: 300,
      },
    }),
    []
  );

  const handleItemClick = (e, itemFunction) => {
    e.stopPropagation();
    itemFunction();

    toggleDivClick();
  };
  return (
    <animated.div
      onClick={() => toggleDivClick()}
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...springs,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 30,
          flexDirection: "column",
          width: "100vw",
          height: "50vh",
          alignItems: "flex-start",
          marginLeft: 30,
        }}
      >
        <animated.div
          style={{
            color: "var(--text-primary)",
            fontFamily: "ui-monospace, SF Mono",
            fontSize: "1em",
            marginBottom: 20,
            ...titleSprings,
            // fontWeight: "bold",
          }}
        >
          Session code:{" "}
          <span
            style={{ letterSpacing: 5, color: "var(--accent-green)", fontWeight: "bold" }}
          >
            {localStorage.getItem("sessionId")}
          </span>
        </animated.div>

        {trails.map((props, index) => (
          <animated.div
            onClick={(e) => handleItemClick(e, menuItemMap[index].itemFunction)}
            style={{
              ...props,
              height: 50,
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                background: `${menuItemMap[index]?.iconColor}`,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {menuItemMap[index].itemIcon}
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                marginLeft: 20,
                fontFamily: "ui-monospace, SF Mono",
                fontSize: "0.85em",
              }}
            >
              {menuItemMap[index].itemLabel}
            </div>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
};

export default Menus;
