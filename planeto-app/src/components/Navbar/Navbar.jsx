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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">

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

          {/* 🔥 CONDITIONAL RENDERING */}
          {user ? (
            <>
              <button 
                className="login-btn" 
                onClick={handleLogout}
              >
                Logout
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
              Login
            </button>
          )}

        </div>

      </div>

      <LeftPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;