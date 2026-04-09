import React from "react";

const DayCheckbox = ({ checked, onChange }) => {
  return (
    <div
      className={`checkbox ${checked ? "checked" : ""}`}
      onClick={onChange}
    >
      {checked && <span className="tick">✓</span>}
    </div>
  );
};

export default DayCheckbox;