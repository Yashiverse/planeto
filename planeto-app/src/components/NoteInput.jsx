import React, { useState } from "react";

const NoteInput = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!title && !content) return;

    console.log("Note Created:", title, content);

    setTitle("");
    setContent("");
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