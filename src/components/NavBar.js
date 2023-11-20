import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/RestoreRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import { navStyle } from "../styles";

const LabelBottomNavigation = ({ view, setView }) => {
  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <BottomNavigation sx={navStyle} value={view} onChange={handleChange}>
      <BottomNavigationAction
        label="home"
        value="home"
        icon={<HomeIcon />}
        sx={{ color: "#404040" }}
      />
      <BottomNavigationAction
        label="history"
        value="history"
        icon={<RestoreIcon />}
        sx={{ color: "#404040" }}
      />
      <BottomNavigationAction
        label="deleted"
        value="deleted"
        icon={<AutoDeleteRoundedIcon />}
        sx={{ color: "#404040" }}
      />
    </BottomNavigation>
  );
};

export default LabelBottomNavigation;
