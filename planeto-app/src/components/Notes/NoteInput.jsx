import React, { useState } from "react";
import axios from "axios";

const NoteInput = ({ fetchNotes, selectedMood }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://planeto.onrender.com/api/notes",
        {
          title,
          content,
          date: new Date().toLocaleDateString(),
          mood: selectedMood
        },
        {
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">
        Create Note
      </button>
    </form>
  );
};

export default NoteInput;