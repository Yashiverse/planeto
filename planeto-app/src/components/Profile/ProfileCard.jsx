import React, { useState } from "react";
import defaultAvatar from "../../assets/default.png";

const ProfileCard = ({ user }) => {
  const [image, setImage] = useState(user.profilePic || "");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = storedUser?.email;

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("email", email);

    try {
      const res = await fetch("http://localhost:5000/api/users/upload", {
        method: "POST",
        body: formData
      });
      const text = await res.text();
      console.log(text);
      const data = JSON.parse(text);

      setImage(data.profilePic);
      localStorage.setItem("user", JSON.stringify(data));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-card">

      <label className="avatar-wrapper">
        <img
          src={
            image
              ? `http://localhost:5000${image}`
              : defaultAvatar
          }
          alt="profile"
          className="profile-avatar-main"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </label>
    </div>
  );
};

export default ProfileCard;