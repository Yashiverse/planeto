import React from "react";

const InsightPannel = ({ habits = [], notes = [] }) => {

  const today = new Date().toISOString().split("T")[0];

  const total = habits.length;

  const completedToday = habits.filter(h =>
    h.dates?.[today]
  ).length;

  const score = total
    ? Math.round((completedToday / total) * 100)
    : 0;

  const insights = [];

  if (total === 0) {
    insights.push("Start adding habits to track your growth 🚀");
  }

  if (score === 0) {
    insights.push("You haven't completed any habits today 👀");
  } else if (score < 50) {
    insights.push("You're getting there, keep pushing 💪");
  } else if (score < 80) {
    insights.push("Solid progress, stay consistent 🔥");
  } else {
    insights.push("You're absolutely crushing it 😤🔥");
  }

  if (notes.length === 0) {
    insights.push("Try journaling your thoughts ✍️");
  }

  return (
    <div className="insight-card">

      <h3 className="card-title">Insights</h3>

      <ul className="insight-list">
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>

    </div>
  );
};

export default InsightPannel;