import React, { useState } from "react";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }

    } catch (err) {
      console.log(err);
      alert("Server error 💀");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">ON/BOARDING</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Launch Login
        </button>

        <p className="register-text">
          Don't have an account? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;