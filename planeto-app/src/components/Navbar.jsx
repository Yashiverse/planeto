import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/*LEFT*/}
        <div className="nav-left">
            <i className="ri-menu-line nav-icon"></i>
            <i className="ri-planet-line nav-icon"></i>
        </div>

      {/*CENTER*/}
        <div className="nav-center">
            <h1 className="planeto-logo" onClick={() => navigate("/")}>PLAN/ETO</h1>
        </div>

      {/*RIGHT*/}
        <div className="nav-right">
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            <i className="ri-user-line nav-icon" onClick={() => navigate("/profile")}></i>
        </div>

    </div>
  );
}

export default Navbar;