import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiMenu,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiBarChart2,
  FiFolder,
  FiCpu,
  FiHome,
} from "react-icons/fi";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/cgpa-tracker", label: "CGPA Tracker", icon: <FiBarChart2 /> },
  { to: "/project-manager", label: "Project Manager", icon: <FiFolder /> },
  { to: "/ai-insights-tool", label: "TrackEd Assistant", icon: <FiCpu /> },
];

import logo from "../assets/images/TrackEd-Logo.svg";


const Sidebar = ({ expanded, setExpanded }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-1 left-4 z-40 bg-light-bg dark:bg-dark-bg p-2 rounded-xl shadow border border-light-border dark:border-dark-border"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border transition-all duration-400
          ${expanded ? "w-56" : "w-16"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          rounded-r-2xl md:rounded-r-2xl shadow-lg md:shadow-xl
        `}
        style={{ minWidth: expanded ? 200 : 64 }}
      >
        <div
          className={`flex items-center justify-between  md:border-b border-light-border dark:border-dark-border ${
            expanded ? "px-4" : "p-4"
          }`}
        >
          <img
            src={logo}
            alt=""
            className={` h-20  transition-all duration-200 ${
              expanded ? "block" : "hidden"
            }`}
          />
          <button
            className="hidden md:block ml-auto cursor-pointer p-2 rounded-xl  bg-light-bg dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setExpanded((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {expanded ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}
          </button>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={` flex items-center gap-3 px-4 py-2 rounded-xl transition-colors
                ${
                  isActive(link.to)
                    ? "bg-light-primary text-white dark:bg-dark-primary"
                    : "text-light-text-primary dark:text-dark-text-primary hover:text-white dark:hover:bg-[#3b82f6] dark:hover:text-white"
                }
                ${expanded ? "justify-start" : "justify-center"}
              `}
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-xl">{link.icon}</span>
              {expanded && <span className="text-base">{link.label}</span>}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-4 py-2 mt-8 w-full text-left hover:text-white text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition-colors rounded-xl ${
            expanded ? "justify-start" : "justify-center"
          }`}
        >
          <FiLogOut className="text-xl" />
          {expanded && <span>Logout</span>}
        </button>
      </aside>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
