import React from "react";

const LevelCard = ({ user }) => {
  return (
    <div className="level-card">

      <h3 className="level-title">
        Level {user.level || 1}
      </h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${user.progress || 0}%` }}
        ></div>
      </div>

      <p className="progress-text">
        {user.progress || 0}% to next level
      </p>

    </div>
  );
};

export default LevelCard;