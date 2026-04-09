import React from "react";

const ActivityGraph = ({ habits = [] }) => {

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toISOString().split("T")[0]
      });
    }
    return days;
  };

  const days = getLast7Days();

  const data = days.map(day => {
    let count = 0;

    habits.forEach(habit => {
      if (habit.dates?.[day.date]) count++;
    });

    return { ...day, count };
  });

  const max = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="activity-card">

      <h3 className="card-title">Weekly Activity</h3>

      <div className="graph-container">

        {data.map((d, i) => (
          <div key={i} className="bar-wrapper">

            <div className="bar-bg">

              <div
                className="bar-fill"
                style={{
                  height: `${(d.count / max) * 100}%`
                }}
              ></div>

            </div>

            <span className="bar-value">{d.count}</span>
            <span className="bar-label">{d.label}</span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityGraph;