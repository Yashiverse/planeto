import React, { useState } from "react";
import "./Notes.css";

import NotesTabs from "../components/NotesTabs";
import DateScroller from "../components/DateScroller";
import MoodSelector from "../components/MoodSelector";
import NoteInput from "../components/NoteInput";
import NotesList from "../components/NotesList";

const Notes = () => {

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="notes-page">

      <NotesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="notes-wrapper">

        {/* PERSONAL TAB */}
        {activeTab === "personal" && (

          <div className="notes-layout">

            <div className="notes-left">

              <div className="notes-card">
                <h3>Select Date</h3>
                <DateScroller />
              </div>

              <div className="notes-card">
                <h3>How are you feeling?</h3>
                <MoodSelector />
              </div>

            </div>

            <div className="notes-right">

              <div className="notes-card">
                <h3>Notes for Today</h3>
                <NoteInput />
              </div>

              <div className="notes-card">
                <NotesList />
              </div>

            </div>

          </div>

        )}


        {/* WORK TAB */}
        {activeTab === "work" && (

          <div className="notes-layout">

            <div className="notes-left">

              <div className="notes-card">

                <h3>Upcoming Deadlines</h3>

                <input
                  className="deadline-input"
                  placeholder="What needs to be done?"
                />

                <DateScroller />

                <button className="deadline-btn">
                  + Add Deadline
                </button>

              </div>

            </div>


            <div className="notes-right">

              <div className="notes-card">
                <h3>Work Notes</h3>
                <NoteInput />
              </div>

              <div className="notes-card">
                <p className="empty-text">No work notes yet</p>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Notes;