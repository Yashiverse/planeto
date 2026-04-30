import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddHabit from "../components/HabitTracker/AddHabit";
import TrackerGrid from "../components/HabitTracker/TrackerGrid";
import StreakPanel from "../components/HabitTracker/StreakPanel";
import DateScroller from "../components/DateScroller/DateScroller";
import "../components/HabitTracker/tracker.css";

const Habit = () => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const API = "https://planeto.onrender.com/api/habits";

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // DAYS
  const getDays = () => {
    const days = [];
    const base = new Date(selectedDate);

    for (let i = 6; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);

      days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toLocaleDateString("en-CA"),
        day: d.getDate(),
      });
    }

    return days;
  };

  const days = getDays();

  // ACTIVE HABITS
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API}?active=true`, config)
      .then((res) => setHabits(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ADD
  const addHabit = (name, icon) => {
    if (!name.trim()) return;

    const newHabit = {
      name,
      icon,
      dates: {},
    };

    axios.post(API, newHabit, config)
      .then((res) => {
        setHabits((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };

  // SOFT DELETE
  const deleteHabit = (id) => {
    axios
      .put(`${API}/${id}`, { isActive: false }, config)
      .then(() => {
        setHabits((prev) => prev.filter((h) => h._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // TOGGLE
  const toggleHabit = (habitId, date) => {
    const habit = habits.find((h) => h._id === habitId);

    const updatedDates = {
      ...habit.dates,
      [date]: !habit.dates?.[date],
    };

    const updatedHabit = {
      ...habit,
      dates: updatedDates,
    };

    setHabits((prev) =>
      prev.map((h) =>
        h._id === habitId ? updatedHabit : h
      )
    );

    axios
      .put(`${API}/${habitId}`, updatedHabit, config)
      .catch((err) => console.log(err));
  };

  const calculateStreak = (dates = {}) => {
    return Object.values(dates || {}).filter(Boolean).length;
  };

  return (
    <div className="page-container">
      <div className="habit-page">

        <div className="habit-header">
          <h1 className="title">ORBIT</h1>
          <button className="history-btn" onClick={() => navigate("/history")}>
            BLUEPRINT
          </button>
        </div>

        <AddHabit addHabit={addHabit} />

        <div className="tracker-section">
          <DateScroller selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

        <div className="main-layout">
          <div className="tracker-section">
            <h3 className="subtitle">Last 7 days</h3>

            <TrackerGrid
              habits={habits}
              days={days}
              toggleHabit={toggleHabit}
              deleteHabit={deleteHabit}
              calculateStreak={calculateStreak}
            />
          </div>

          <StreakPanel
            habits={habits}
            calculateStreak={calculateStreak}
          />
        </div>

      </div>
    </div>
  );
};

export default Habit;