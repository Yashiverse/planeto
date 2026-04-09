import React, { useState, useEffect } from "react";
import "./Notes.css";
import axios from "axios";

import NotesTabs from "../components/Notes/NotesTabs";
import MoodSelector from "../components/Notes/MoodSelector";
import NoteInput from "../components/Notes/NoteInput";
import NotesList from "../components/Notes/NotesList";
import DateScroller from "../components/DateScroller/DateScroller";

const Notes = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("personal");
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-page">

      <NotesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="notes-wrapper">

        {activeTab === "personal" && (
          <div className="notes-layout">

            <div className="notes-left">

              <div className="notes-card">
                <h3>Select Date</h3>
                <DateScroller />
              </div>

              <div className="notes-card">
                <h3>How are you feeling?</h3>
                <MoodSelector 
                  selectedMood={selectedMood}
                  setSelectedMood={setSelectedMood}
                />
              </div>

            </div>

            <div className="notes-right">

              <div className="notes-card">
                <h3>Notes for Today</h3>
                <NoteInput 
                  fetchNotes={fetchNotes}
                  selectedMood={selectedMood}
                />
              </div>

              <div className="notes-card">
                <NotesList 
                  notes={notes}
                  fetchNotes={fetchNotes}
                />
              </div>

            </div>

          </div>
        )}

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
                <NoteInput 
                  fetchNotes={fetchNotes}
                  selectedMood={selectedMood}
                />
              </div>

              <div className="notes-card">
                <NotesList 
                  notes={notes}
                  fetchNotes={fetchNotes}
                />
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Notes;