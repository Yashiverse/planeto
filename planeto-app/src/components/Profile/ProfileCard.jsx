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
      const token = localStorage.getItem("token");

const res = await fetch("https://planeto.onrender.com/auth/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`
  },
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
              ? `https://planeto.onrender.com${image}`
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