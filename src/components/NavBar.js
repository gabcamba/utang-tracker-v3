import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/RestoreRounded";
import AutoDeleteRoundedIcon from "@mui/icons-material/AutoDeleteRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";

const LabelBottomNavigation = ({ view, setView }) => {
  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        height: "10vh",
        backgroundColor: "transparent",
        textColor: "white",
      }}
      value={view}
      onChange={handleChange}
    >
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
