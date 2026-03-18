import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register Data:", formData);

    // future API call here

    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-card">
        <h2 className="register-title">CREATE ACCOUNT</h2>
        <form onSubmit={handleRegister}>

          <input className="register-input" type="text"
            name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required/>

          <input className="register-input"  type="email" name="email"
            placeholder="Enter Email" value={formData.email} onChange={handleChange} required/>

          <input className="register-input" type="password" name="password"
            placeholder="Enter Password" value={formData.password} onChange={handleChange} required/>

          <input className="register-input" type="password" name="confirmPassword" placeholder="Confirm Password" 
            value={formData.confirmPassword}onChange={handleChange}required/>

          <button className="register-button" type="submit">Register</button>
        </form>
        <p className="register-redirect">Already have an account?<Link to="/login"> Login</Link></p>
      </div>

    </div>
  );
}

export default Register;