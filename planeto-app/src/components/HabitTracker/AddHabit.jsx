import React, { useState } from "react";
import fire from "../../assets/3d-fire.png";
import heart from "../../assets/3d-heart.png";
import rocket from "../../assets/3d-rocket.png";
import sun from "../../assets/3d-sun.png";
import target from "../../assets/3d-target.png";
import tea from "../../assets/3d-tea.png";
import wallet from "../../assets/3d-wallet.png";

const icons = [fire, heart, rocket, sun, target, tea, wallet];

const AddHabit = ({ addHabit }) => {
  const [input, setInput] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

 const handleAdd = () => {
  if (!input.trim()) return;

  addHabit(input, selectedIcon);
  setInput("");
};
  const handleKeyDown = (e) => {
  if (e.key === "Enter") { handleAdd();}};


  return (
    <div className="add-habit-wrapper">
      <div className="add-habit-container">
        <img src={selectedIcon} className="habit-icon-img" />

        <input
          type="text"
          placeholder="Add a new habit..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          className="habit-input"
        />

        <button className="add-btn" onClick={handleAdd}>
          + Add
        </button>
      </div>
      <div className="icon-picker">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            className={`icon-option ${
              selectedIcon === icon ? "selected" : ""
            }`}
            onClick={() => setSelectedIcon(icon)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddHabit;