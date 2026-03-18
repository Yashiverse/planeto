import React, { useState } from "react";

const MoodSelector = () => {
  const [selected, setSelected] = useState(null);

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😵", label: "Stressed" }
  ];

  return (
    <div className="mood-container">
      {moods.map((mood, i) => (
        <div
          key={i}
          className={`mood-card ${selected === i ? "selected" : ""}`}
          onClick={() => setSelected(i)}
        >
          <div className="emoji">{mood.emoji}</div>
          <p>{mood.label}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;