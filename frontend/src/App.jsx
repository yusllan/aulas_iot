import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing/index.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./styles/theme.css";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
