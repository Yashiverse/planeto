import React from "react";

const NotesTabs = ({ activeTab, setActiveTab }) => {

  return (
    <div className="notes-tabs">
      <button
        className={activeTab === "personal" ? "tab active" : "tab"}
        onClick={() => setActiveTab("personal")}
      >Personal</button>
      
      <button
        className={activeTab === "work" ? "tab active" : "tab"}
        onClick={() => setActiveTab("work")}
      >Work</button>
    </div>
  );
};

export default NotesTabs;