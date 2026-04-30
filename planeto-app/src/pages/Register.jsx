import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleRegister = async () => {
  try {
    const res = await fetch("https://planeto.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        dob
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully");
    } else {
      alert(data.error || "Register failed");
    }
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">ON/BOARDING</h2>

        <div className="auth-social">
          <button type="button" className="social-btn">Google</button>
          <button type="button" className="social-btn">Apple</button>
        </div>

        <div className="auth-divider">OR REGISTER WITH EMAIL</div>

        <form onSubmit={handleRegister}>
          <label className="field-label">Full Name</label>

          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="field-label">Username</label>

          <input
            className="register-input"
            type="text"
            name="username"
            placeholder="Choose username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="field-label">Email</label>

          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="field-label">Password</label>

          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="field-label">Confirm Password</label>

          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label className="terms-row">
            <input
              type="checkbox"
              name="accepted"
              checked={formData.accepted}
              onChange={handleChange}
            />
            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          <button className="register-button" type="submit">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="register-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;