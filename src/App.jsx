import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import CGPATracking from "./pages/features/CGPATracking";
import ProjectManagement from "./pages/features/ProjectManagement";
import AIInsights from "./pages/features/AIInsights";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
            <Toaster position="top-right" />
            <Navbar />
            <ScrollToTopOnNavigate />
            <ScrollToTopButton />
            <AppRoutes />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
