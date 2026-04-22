import React from "react";

const StreakSection = ({ habits = [] }) => {

  const today = new Date();

  const calculateStreak = (dates = {}) => {
    let streak = 0;

    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const dateStr = d.toISOString().split("T")[0];

      if (dates[dateStr]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const bestStreak = habits.reduce((max, habit) => {
    const streak = calculateStreak(habit.dates);
    return Math.max(max, streak);
  }, 0);

  return (
    <div className="streak-card">

      <h3 className="card-title">Current Streak</h3>

      <div className="streak-content">
        <h1 className="streak-number">{bestStreak}</h1>
        <span className="streak-days">days</span>
      </div>

      <p className="streak-sub">
        {bestStreak === 0
          ? "Start today, build your streak 🔥"
          : bestStreak < 5
          ? "Nice start, keep going 🚀"
          : bestStreak < 15
          ? "You're building momentum 💪"
          : "You're unstoppable🔥"}
      </p>

    </div>
  );
};

export default StreakSection;