import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/RestoreRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import { navStyle } from "../styles";

const LabelBottomNavigation = ({
  view,
  setView,
  setUtangToEdit,
  setCreate,
}) => {
  const handleChange = (event, newValue) => {
    setUtangToEdit(null);
    setCreate(false);
    setView(newValue);
  };

  return (
    <BottomNavigation sx={navStyle} value={view} onChange={handleChange}>
      <BottomNavigationAction
        label="home"
        value="home"
        icon={<HomeIcon />}
        sx={{ color: "gray" }}
      />
      <BottomNavigationAction
        label="history"
        value="history"
        icon={<RestoreIcon />}
        sx={{ color: "gray" }}
      />
      <BottomNavigationAction
        label="deleted"
        value="deleted"
        icon={<AutoDeleteRoundedIcon />}
        sx={{ color: "gray" }}
      />
    </BottomNavigation>
  );
};

export default LabelBottomNavigation;
