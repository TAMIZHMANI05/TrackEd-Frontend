import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import Dashboard from "./pages/Dashboard";
import CGPATracking from "./pages/features/CGPATracking";
import ProjectManagement from "./pages/features/ProjectManagement";
import AIInsights from "./pages/features/AIInsights";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const publicOnly = (element) =>
    user ? <Navigate to="/dashboard" replace /> : element;
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={publicOnly(<Landing />)} />
      <Route path="/about" element={publicOnly(<About />)} />
      <Route path="/signup" element={publicOnly(<Signup />)} />
      <Route path="/login" element={publicOnly(<Login />)} />
      <Route path="/forgot-password" element={publicOnly(<ForgotPassword />)} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/reset-password" element={publicOnly(<ResetPassword />)} />
      <Route
        path="/features/cgpa-tracking"
        element={
          <ProtectedRoute>
            <CGPATracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/project-management"
        element={
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/ai-insights"
        element={
          <ProtectedRoute>
            <AIInsights />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
