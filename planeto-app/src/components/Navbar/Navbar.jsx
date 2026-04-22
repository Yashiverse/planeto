import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

import star from "../../assets/3d-star.png";
import chat from "../../assets/3d-chat.png";
import profile from "../../assets/3d-profile.png";

import LeftPanel from "../Menu/LeftPannel";

function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem("user");

      const parsedUser =
        stored && stored !== "undefined"
          ? JSON.parse(stored)
          : null;

      setUser(parsedUser);
    };

    updateUser();

    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <>
      <div className={`navbar ${isOpen ? "navbar-shrink" : ""}`}>
        <div className="nav-left">
          <img
            src={chat}
            className="threed-icon"
            onClick={() => setIsOpen(true)}
          />

          <img
            src={star}
            className="threed-icon"
            onClick={() => navigate("/live-metrics")}
          />
        </div>

        <div className="nav-center">
          <h1
            className="planeto-logo"
            onClick={() => navigate("/")}
          >
            PLAN/ETO
          </h1>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <button
                className="login-btn"
                onClick={handleLogout}
              >
                ABORT MISSION
              </button>

              <img
                src={profile}
                className="threed-icon"
                onClick={() => navigate("/profile")}
              />
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              LAUNCH
            </button>
          )}
        </div>
      </div>

      <LeftPanel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default Navbar;