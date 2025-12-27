import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ResumeProvider } from "./contexts/ResumeContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Templates from "./pages/Templates";
import CoverLetter from "./pages/CoverLetter";

import React from "react";

export function App() {
  return (
    <Router>
      <AuthProvider>
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="builder"
                element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="builder/:resumeId"
                element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="templates"
                element={
                  <ProtectedRoute>
                    <Templates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cover-letter"
                element={
                  <ProtectedRoute>
                    <CoverLetter />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
