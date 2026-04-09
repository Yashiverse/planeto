import React, { useState, useEffect } from "react";
import "./pages.css";

function Todo() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(currentUser._id);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // GET all tasks on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async (e) => {
    if (e) e.preventDefault();
    if (input.trim() === "") return;

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter(task => task._id !== id));
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