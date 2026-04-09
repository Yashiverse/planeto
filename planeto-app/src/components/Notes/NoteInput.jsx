import React, { useState } from "react";
import axios from "axios";

const NoteInput = ({ fetchNotes , selectedMood }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    if (!title && !content) return;
    console.log("Selected Mood:", selectedMood);
    try {
      await axios.post("http://localhost:5000/api/notes", {
        title,
        content,
        date: new Date().toLocaleDateString(),
        mood: selectedMood
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="note-input">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleCreate}>Create Note</button>
    </div>
  );
};

export default NoteInput;