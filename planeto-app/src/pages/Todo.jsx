import React, { useState, useEffect } from "react";
import "./pages.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");

  // GET all tasks
  useEffect(() => {
    fetch("https://planeto.onrender.com/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  }, []);

  const addTask = async (e) => {
    if (e) e.preventDefault();
    if (input.trim() === "") return;

    try {
      const res = await fetch("https://planeto.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: input })
      });

      const newTask = await res.json();

      setTasks([...tasks, newTask]);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://planeto.onrender.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">MISSION</h2>

      <div className="todo-input-section">
        <input
          type="text"
          placeholder="Add a new mission..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task._id} className="todo-item">
            {task.text}
            <span
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              🤖
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;