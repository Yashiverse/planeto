import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import ProfileCard from "../components/Profile/ProfileCard";
import LevelCard from "../components/Profile/LevelCard";
import UserInfo from "../components/Profile/UserInfo";

import "../components/Profile/profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.log("No user logged in");
      return;
    }

    fetch(`http://localhost:5000/api/users/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  // loading
  if (!user) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <div className="profile-page">

      {/* LEFT SIDEBAR */}
      <Sidebar user={user} />

      {/* CENTER */}
      <div className="profile-main">
        <ProfileCard user={user} />
        <LevelCard user={user} />
      </div>

      {/* RIGHT */}
      <UserInfo user={user} />

    </div>
  );
};

export default ProfilePage;