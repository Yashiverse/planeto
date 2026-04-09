import React from "react";

const WeeklyProgress = ({ habits = [] }) => {

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  // 👉 total possible = habits × 7 days
  const totalPossible = habits.length * 7;

  // 👉 actual completed
  let completed = 0;

  last7Days.forEach(date => {
    habits.forEach(habit => {
      if (habit.dates?.[date]) {
        completed++;
      }
    });
  });

  // 👉 percentage
  const progress =
    totalPossible === 0
      ? 0
      : Math.round((completed / totalPossible) * 100);

  return (
    <div className="weekly-card">

      <h3 className="card-title">Weekly Progress</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="progress-text">
        {progress}% of your weekly goals completed
      </p>

    </div>
  );
};

export default WeeklyProgress;