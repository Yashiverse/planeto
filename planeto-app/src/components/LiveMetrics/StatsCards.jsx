import React from "react";

const StatsCards = ({ habits = [], todos = [] }) => {

  const totalHabits = habits.length;
  const totalTodos = todos.length;

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.reduce((acc, habit) => {
    return acc + (habit.dates?.[today] ? 1 : 0);
  }, 0);

  const stats = [
    { value: totalTodos, label: "Total tasks created" },
    { value: completedToday, label: "Tasks completed today" },
    { value: totalHabits, label: "Active habits" },
    { value: completedToday, label: "Today's habit streak" },
  ];

  return (
    <div className="stats-container">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <h2 className="stat-value">{item.value}</h2>
          <p className="stat-label">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;