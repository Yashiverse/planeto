import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("https://planeto.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userChanged"));
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">PLANETO ACCESS</h2>
        <p className="auth-subtitle">
          Enter your credentials to launch your mission.
        </p>

        <div className="auth-social">
          <button type="button" className="social-btn">Google</button>
          <button type="button" className="social-btn">Apple</button>
        </div>

        <div className="auth-divider">OR SIGN IN WITH EMAIL</div>

        <form onSubmit={handleSubmit}>
          <label className="field-label">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="auth-row">
            <label className="field-label">Password</label>

            <a href="#" className="auth-link-mini">
              Forgot Password?
            </a>
          </div>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "👁"}
            </span>
          </div>

          <button type="submit">LAUNCH</button>
        </form>

        <button type="button" className="auth-alt-btn">
          Sign in with OTP
        </button>

        <p className="register-text">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;