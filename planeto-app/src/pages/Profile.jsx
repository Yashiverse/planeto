import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import UserInfo from "../components/Profile/UserInfo";
import AvatarStage from "../components/Profile/AvatarStage";

import "../components/Profile/profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch("https://planeto.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Sidebar user={user} />
      <div className="profile-main">
        <AvatarStage user={user} />
      </div>
      <UserInfo user={user} />
    </div>
  );
};

export default ProfilePage;