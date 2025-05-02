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
import CGPATracker from "./pages/functional/CGPATracker";
import ProjectManager from "./pages/functional/ProjectManager";
import AIInsightsTool from "./pages/functional/AIInsightsTool";
import Profile from "./pages/Profile";
import DashboardLayout from "./pages/DashboardLayout";

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const publicOnly = (element) =>
    user ? <Navigate to="/dashboard" replace /> : element;
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cgpa-tracker" element={<CGPATracker />} />
        <Route path="/project-manager" element={<ProjectManager />} />
        <Route path="/ai-insights-tool" element={<AIInsightsTool />} />
      </Route>
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
            <CGPATracking />
        }
      />
      <Route
        path="/features/project-management"
        element={
            <ProjectManagement />
        }
      />
      <Route
        path="/features/ai-insights"
        element={
            <AIInsights />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
