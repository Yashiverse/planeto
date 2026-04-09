import React from "react";
import HabitRow from "./HabitRow";


const TrackerGrid = ({
  habits,
  days,
  toggleHabit,
  deleteHabit,
  calculateStreak,
}) => {
  return (
    <div className="tracker-grid">
      <div className="grid-header">
        <div className="habit-col">Habit</div>

        {days.map((day) => (
          <div key={day.date} className="day-col">
            <div className="day-label">{day.label}</div>
            <div className="day-number">{day.day}</div>
          </div>
        ))}

        <div className="delete-col"></div>
      </div>

      {habits.map((habit) => (
        <HabitRow
          key={habit._id} 
          habit={habit}
          days={days}
          toggleHabit={toggleHabit}
          deleteHabit={deleteHabit}
          streak={calculateStreak(habit.dates)}
        />
      ))}
    </div>
  );
};

export default TrackerGrid;