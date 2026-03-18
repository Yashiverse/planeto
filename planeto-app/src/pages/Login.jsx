import React, { useState } from "react";
import "./pages.css";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">ON/BOARDING</h2>
        <input type="email"placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Launch Login</button>
        <p className="register-text">Don't have an account? <Link to="/register"> Register</Link></p>
      </div>
    </div>
  );
}

export default Login;