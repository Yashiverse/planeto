import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/LiveMetrics/Header";
import StatsCards from "../components/LiveMetrics/StatsCards";
import StreaksSection from "../components/LiveMetrics/StreaksSection";
import ProductivityScore from "../components/LiveMetrics/ProductivityScore";
import WeeklyProgress from "../components/LiveMetrics/WeeklyProgress";
import MoodInsights from "../components/LiveMetrics/MoodInsights";
import ActivityGraph from "../components/LiveMetrics/ActivityGraph";
import InsightPannel from "../components/LiveMetrics/InsightPannel";

import "../components/LiveMetrics/LiveMetrics.css";

const LiveMetrics = () => {
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: token
          }
        };

        const [habitRes, todoRes, noteRes] = await Promise.all([
          axios.get("http://localhost:5000/api/habits", config),
          axios.get("http://localhost:5000/api/todos", config),
          axios.get("http://localhost:5000/api/notes", config)
        ]);

        setHabits(habitRes.data);
        setTodos(todoRes.data);
        setNotes(noteRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="live-metrics-container">

      <Header />
      <StatsCards habits={habits} todos={todos} notes={notes} />

      <div className="top-row">
        <StreaksSection habits={habits} />
        <ProductivityScore habits={habits} todos={todos} />
      </div>

      <div className="middle-row">
        <WeeklyProgress habits={habits} />
        <MoodInsights notes={notes} />
      </div>

      <ActivityGraph habits={habits} todos={todos} />

      <InsightPannel habits={habits} notes={notes} />

    </div>
  );
};

export default LiveMetrics;