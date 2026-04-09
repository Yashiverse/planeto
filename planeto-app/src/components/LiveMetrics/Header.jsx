import React from "react";

const Header = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="live-header">

      <div>
        <h1 className="live-title">LIVE METRICS</h1>
        <p className="live-subtitle">
          Your real-time productivity, habits & progress
        </p>
      </div>

      <div className="live-date">
        {today}
      </div>

    </div>
  );
};

export default Header;