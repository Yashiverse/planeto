import React from "react";
import defaultAvatar from "../../assets/default.png";
import overviewIcon from "../../assets/overview.svg";
import settingsIcon from "../../assets/settings.svg";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      {/* MENU */}
      <div className="sidebar-menu">

        <div className="menu-item">
          <img src={overviewIcon} alt="overview" className="icon-3d" />
          <span>Overview</span>
        </div>

        <div className="menu-item">
          <img src={settingsIcon} alt="settings" className="icon-3d" />
          <span>Settings</span>
        </div>

      </div>

    </div>
  );
};

export default Sidebar;