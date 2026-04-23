import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [hoverData, setHoverData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const API = "https://planeto.onrender.com/api/habits";

  // FETCH ALL (active + deleted)
  useEffect(() => {
    axios.get(API)
      .then(res => setHabits(res.data))
      .catch(err => console.log(err));
  }, []);

  // MONTH DAYS
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);

      days.push({
        label: i,
        full: d.toDateString(),
        date: d.toLocaleDateString("en-CA"),
      });
    }

    return days;
  };

  const days = getDaysInMonth();

  // HARD DELETE 
  const deleteForever = async (id) => {
    await axios.delete(`${API}/${id}`);
    setHabits(prev => prev.filter(h => h._id !== id));
  };

  return (
    <div className="history-page">

      <button className="back-btn" onClick={() => navigate("/habit")}> ⬅DEPORT </button>
      <div className="month-nav">
        <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}> ← </button>
        <h3 className="month-title">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={() =>  setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>  →</button>
      </div>

      <div className="heatmap">

        <div className="heatmap-row header">
          <div className="habit-name"></div>
          {days.map((d, i) => (
            <div key={i} className="day-label">{d.label}</div>
          ))}
        </div>

        {habits.map((habit, i) => (
          <div key={i} className="heatmap-row">

            <div className="habit-name">
              <img src={habit.icon} className="habit-icon" />
              {habit.name}

              {/* DELETE FOREVER */}
              {!habit.isActive && (
                <button  className="delete-permanent"  onClick={() => deleteForever(habit._id)} >KILL</button>)}
            </div>

            {days.map((day, j) => {
              const done = habit.dates?.[day.date];

              return (
                <div
                  key={j}
                  className={`heat-cell ${done ? "done" : ""}`}
                  onMouseEnter={() =>
                    setHoverData({
                      habit: habit.name,
                      date: day.full,
                      status: done ? "Completed ✅" : "Missed ❌",
                    })
                  }
                  onMouseLeave={() => setHoverData(null)}
                />
              );
            })}

          </div>
        ))}

      </div>

      {/* HOVER */}
      {hoverData && (
        <div className="hover-box">
          <p><strong>{hoverData.habit}</strong></p>
          <p>{hoverData.date}</p>
          <p>{hoverData.status}</p>
        </div>
      )}

    </div>
  );
};

export default History;