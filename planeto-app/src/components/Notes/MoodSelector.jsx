import React from "react";

const MoodSelector = ({ selectedMood, setSelectedMood }) => {

  const moods = [
    { emoji: "😊", value: "happy" },
    { emoji: "😐", value: "neutral" },
    { emoji: "😴", value: "tired" },
    { emoji: "😢", value: "sad" },
    { emoji: "😵", value: "stressed" }
  ];

  return (
    <div className="mood-container">
      {moods.map((mood, i) => (
        <div
          key={i}
          className={`mood-card ${selectedMood === mood.value ? "selected" : ""}`}
          onClick={() => setSelectedMood(mood.value)}
        >
          <div className="emoji">{mood.emoji}</div>
          <p>{mood.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;