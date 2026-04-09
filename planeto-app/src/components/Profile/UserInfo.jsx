import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/log-out.svg";

const UserInfo = ({ user }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const email = currentUser?.email;

    const res = await fetch(
      `http://localhost:5000/api/users/update?email=${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await res.json();

    alert("Updated successfully 😤");

    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="user-info">

      <div className="user-info-top">
        <h2 className="info-title">User Info</h2>

        <div className="info-item">
          <span>Name</span>
          {isEditing ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div className="info-item">
          <span>Username</span>
          {isEditing ? (
            <input name="username" value={formData.username} onChange={handleChange} />
          ) : (
            <p>{user.username}</p>
          )}
        </div>

        <div className="info-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="info-item">
          <span>DOB</span>
          {isEditing ? (
            <input name="dob" value={formData.dob} onChange={handleChange} />
          ) : (
            <p>{user.dob || "Not set"}</p>
          )}
        </div>
      </div>

      <div className="user-actions">

        {!isEditing ? (
          <button className="edit-btn" onClick={handleEdit}>
            Edit Info
          </button>
        ) : (
          <button className="edit-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout" className="logout-icon" />
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserInfo;