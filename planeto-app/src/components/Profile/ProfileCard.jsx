import React from "react";
import defaultAvatar from "../../assets/default.png";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">

      <img
        src={defaultAvatar}
        alt="profile"
        className="profile-avatar-main"
      />

      <h2 className="profile-name">
        {user.name || "Your Name"}
      </h2>

      <p className="profile-username">
        {user.username || "@username"}
      </p>

    </div>
  );
};

export default ProfileCard;