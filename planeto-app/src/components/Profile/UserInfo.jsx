import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/log-out.svg";
import ProfileCard from "./ProfileCard";

const UserInfo = ({ user }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...user,
    dob: user.dob || ""
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


//saved to backend.
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://planeto.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: {"Content-Type": "application/json", Authorization: token},
          body: JSON.stringify(formData)
        }
      );
      await res.json();
      alert("Updated successfully");
      setIsEditing(false);
      window.location.reload();
    }
    catch (err) {console.log(err);}
  };


  return (
    <div className="user-info">
      <ProfileCard user={user} />

      <div className="user-info-top">
        <h2 className="info-title">User Info</h2>

        <div className="info-item">
          <span>Name</span>
          {isEditing ? (
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div className="info-item">
          <span>Username</span>
          {isEditing ? (
            <input
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>

        <div className="info-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        {/* DOB FIELD */}
        <div className="info-item">
          <span>DOB</span>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
            />
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