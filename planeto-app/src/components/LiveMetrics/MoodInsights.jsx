import React from "react";

const MoodInsights = ({ notes = [] }) => {

  const moodCount = {};

  notes.forEach(note => {
    if (!note.mood) return;
    moodCount[note.mood] = (moodCount[note.mood] || 0) + 1;
  });

  const moods = Object.entries(moodCount);

  return (
    <div className="mood-card">

      <h3 className="card-title">Mood Insights</h3>

      {moods.length === 0 ? (
        <p>No mood data yet</p>
      ) : (
        <div className="mood-list">
          {moods.map(([mood, count], index) => (
            <div key={index} className="mood-item">
              <span>{mood}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MoodInsights;