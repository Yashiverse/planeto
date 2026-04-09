import React from "react";
import fireIcon from "../../assets/3d-fire.png";

const StreakPanel = ({ habits, calculateStreak }) => {
  return (
    <div className="streak-panel">
      <h3 className="streak-title">STREAKS!</h3>

      {habits.length === 0 ? (
        <p className="no-habits">No habits yet</p>
      ) : (
        habits.map((habit) => {
            const streak = calculateStreak(habit.dates);
          return (
            <div className="streak-item" key={habit._id}>
              <span className="streak-habit">
                {habit.emoji} {habit.name}
              </span>
                <div className="streak-count">
                    <span>{streak}</span>
                    <img src={fireIcon} className="fire-icon" />
                </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StreakPanel;