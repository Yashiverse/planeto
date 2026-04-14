import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          dob: ""
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        alert(data.error || "Registration failed");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">CREATE ACCOUNT</h2>

        <form onSubmit={handleRegister} autoComplete="off">

          {/* NAME */}
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name || ""}
            onChange={handleChange}
          />

          {/* USERNAME */}
          <input
            className="register-input"
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username || ""}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email || ""}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password || ""}
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}
          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
          />

          <button className="register-button" type="submit">
            Register
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