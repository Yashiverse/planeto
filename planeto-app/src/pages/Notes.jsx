import React, { useState, useEffect } from "react";
import "./Notes.css";
import axios from "axios";

import MoodSelector from "../components/Notes/MoodSelector";
import NoteInput from "../components/Notes/NoteInput";
import NotesList from "../components/Notes/NotesList";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "https://planeto.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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
      <div className="notes-wrapper">
        <div className="notes-layout">

          <div className="notes-left">
            <div className="notes-card">
              <h3>Create Note</h3>

              <NoteInput
                fetchNotes={fetchNotes}
                selectedMood={selectedMood}
              />
            </div>
          </div>

          <div className="notes-right">

            <div className="notes-card">
              <h3>How are you feeling?</h3>

              <MoodSelector
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
              />
            </div>

            <div className="notes-card">
              <h3>Your Notes</h3>

              <NotesList
                notes={notes}
                fetchNotes={fetchNotes}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Notes;