import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import CGPATracking from "./pages/features/CGPATracking";
import ProjectManagement from "./pages/features/ProjectManagement";
import AIInsights from "./pages/features/AIInsights";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
          <Navbar />
          <ScrollToTopOnNavigate />
          <ScrollToTopButton />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features/cgpa-tracking" element={<CGPATracking />} />
            <Route
              path="/features/project-management"
              element={<ProjectManagement />}
            />
            <Route path="/features/ai-insights" element={<AIInsights />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
