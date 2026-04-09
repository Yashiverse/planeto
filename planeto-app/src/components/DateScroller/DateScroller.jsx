import React, { useRef, useEffect } from "react";
import "./dateScroller.css";

const DateScroller = ({ selectedDate, setSelectedDate }) => {
  const containerRef = useRef(null);

  // 🔥 generate MANY days (past + future)
  const days = Array.from({ length: 120 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 60 + i);

    const iso = date.toISOString().split("T")[0];

    return {
      iso,
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" }),
    };
  });

  // 🔥 auto scroll to selected date
  useEffect(() => {
    const index = days.findIndex((d) => d.iso === selectedDate);
    if (index !== -1 && containerRef.current) {
      const container = containerRef.current;
      const child = container.children[index];

      if (child) {
        container.scrollLeft =
          child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2;
      }
    }
  }, [selectedDate]);

  useEffect(() => {
  const interval = setInterval(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, 60000); // checks every minute

  return () => clearInterval(interval);
}, []);

  return (
    <div className="date-scroller" ref={containerRef}>
      {days.map((d) => (
        <div
          key={d.iso}
          className={`date-card ${
            selectedDate === d.iso ? "active" : ""
          }`}
          onClick={() => setSelectedDate && setSelectedDate(d.iso)}
        >
          <span>{d.month}</span>
          <h3>{d.day}</h3>
          <p>{d.weekday}</p>
        </div>
      ))}
    </div>
  );
};

export default DateScroller;