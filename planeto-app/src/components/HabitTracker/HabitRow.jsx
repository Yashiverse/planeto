import React from "react";
import DayCheckbox from "./DayCheckbox";

const HabitRow = ({
  habit,
  days,
  toggleHabit,
  deleteHabit,
}) => {
  return (
    <div className="habit-row">
      
      {/* Habit Info */}
      <div className="habit-info">
        <img
          src={habit.icon}
          alt="icon"
          className="habit-icon-img"
        />
        <span className="habit-name">{habit.name}</span>
      </div>

      {/* Checkboxes */}
      {days.map((day) => (
        <DayCheckbox
          key={day.date}
          checked={!!habit.dates?.[day.date]}
          onChange={() => toggleHabit(habit._id, day.date)}
        />
      ))}

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={() => deleteHabit(habit._id)}
      >
        ✕
      </button>

    </div>
  );
};

export default HabitRow;