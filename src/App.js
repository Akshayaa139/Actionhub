import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ Ensure `AuthProvider` wraps everything

// Importing pages
import Login from "./pages/Login";
import Register from "./pages/Register1"; // ✅ Fix case sensitivity
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Achievements from "./pages/Achievements";
import Team from "./pages/Team";
import Reports from "./pages/Reports";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
