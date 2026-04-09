import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import Notes from "./pages/Notes";  
import Weekly from "./pages/Weekly";
import Habit from "./pages/Habit";
import Profile from "./pages/Profile";
import LiveMetrics from "./pages/LiveMetrics";
import History from "./pages/History";
import Stars from "./components/Stars";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <>
    <Stars />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/live-metrics" element={<ProtectedRoute><LiveMetrics /></ProtectedRoute>} />
        <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/habit" element={<ProtectedRoute><Habit /></ProtectedRoute>} />
        <Route path="/weekly" element={<ProtectedRoute><Weekly /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;