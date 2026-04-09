import React from "react";

const ProductivityScore = ({ habits = [] }) => {

  const today = new Date().toISOString().split("T")[0];

  const total = habits.length;

  const done = habits.filter(habit =>
    habit.dates?.[today]
  ).length;

  const score = total
    ? Math.round((done / total) * 100)
    : 0;

  return (
    <div className="score-card">

      <h3 className="card-title">Productivity Score</h3>

      <div
        className="score-circle"
        style={{
          background: `conic-gradient(
            #a855f7 0% ${score}%,
            rgba(255,255,255,0.1) ${score}% 100%
          )`
        }}
      >
        <span>{score}%</span>
      </div>

      <p className="score-sub">
        {score === 0
          ? "Let’s get started 💪"
          : score < 50
          ? "You can do better 🚀"
          : score < 80
          ? "Good progress 🔥"
          : "You're crushing it 😤🔥"}
      </p>

    </div>
  );
};

export default ProductivityScore;