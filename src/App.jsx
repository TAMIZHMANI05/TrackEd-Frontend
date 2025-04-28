import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
