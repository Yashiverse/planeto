import axios from "axios";

const moodEmoji = {happy: "😊",neutral: "😐",tired: "😴",sad: "😢",stressed: "😵"};
const NotesList = ({ notes = [], fetchNotes }) => {

// DELETE NOTE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${id}`,
        {headers: {Authorization: token}}
      );
      fetchNotes();
    } 
    catch (err) {console.log(err);}
  };

  if (!notes.length) {return <p className="empty-text">No notes yet</p>;}

  return (
    <div style={{ marginTop: "10px" }}>
      {notes.map((note) => (
        <div key={note._id} className="note-item">
          <div className="note-content">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.mood && moodEmoji[note.mood]} {note.mood}</p>
            <span className="note-date">{note.date}</span>
          </div>
          <button className="delete-btn" onClick={() => handleDelete(note._id)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;