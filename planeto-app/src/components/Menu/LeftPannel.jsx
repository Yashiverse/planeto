import React from "react";
import "./LeftPannel.css";
import { useNavigate, useLocation } from "react-router-dom";

const LeftPannel = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Notes", path: "/notes" },
    { name: "Todo", path: "/todo" },
    { name: "Habit Tracker", path: "/habit" },
    { name: "Weekly", path: "/weekly" },
  ];

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`left-panel ${isOpen ? "open" : ""}`}>
        <div className="panel-header">
          <h2>MAP</h2>
        </div>

        <div className="menu">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => handleClick(item.path)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftPannel;