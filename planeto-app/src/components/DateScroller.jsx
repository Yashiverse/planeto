import React from "react";

const DateScroller = () => {
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" })
    };
  });

  return (
    <div className="date-scroller">
      {days.map((d, index) => (
        <div className="date-card" key={index}>
          <span>{d.month}</span>
          <h3>{d.day}</h3>
          <p>{d.weekday}</p>
        </div>
      ))}
    </div>
  );
};

export default DateScroller;