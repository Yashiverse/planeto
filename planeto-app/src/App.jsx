import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Stars from "./components/Stars";
import AIInsights from "./components/AI/AiInsights";
import ProtectedRoute from "./components/ProtectedRoutes";

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

import "./App.css";

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/live-metrics"
          element={
            <ProtectedRoute>
              <LiveMetrics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/habit"
          element={
            <ProtectedRoute>
              <Habit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weekly"
          element={
            <ProtectedRoute>
              <Weekly />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideNavbar && <AIInsights />}
    </>
  );
}

function App() {
  return (
    <>
      <Stars />

      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;