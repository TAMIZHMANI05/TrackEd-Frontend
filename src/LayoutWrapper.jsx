import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./components/ThemeToggle";
import TopBar from "./components/TopBar";

const LayoutWrapper = () => {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const showSidebar =
    location.pathname.startsWith("/dashboard") ||
    // location.pathname.startsWith("/features") ||
    location.pathname.startsWith("/cgpa-tracker") ||
    location.pathname.startsWith("/project-manager") ||
    location.pathname.startsWith("/ai-insights-tool") ||
    location.pathname.startsWith("/profile");
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Toaster position="top-right" />
      {!showSidebar && <Navbar />}
      {showSidebar && (
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      )}
      {showSidebar && <TopBar sidebarExpanded={sidebarExpanded} />}
      <ScrollToTopOnNavigate />
      <ScrollToTopButton />
      <div
        className={
          showSidebar
            ? `${
                sidebarExpanded ? "md:ml-56" : "md:ml-16"
              } ml-0 transition-all pt-20`
            : "pt-8"
        }
      >
        <AppRoutes />
      </div>
      {!showSidebar && <Footer />}
    </div>
  );
};

export default LayoutWrapper;
