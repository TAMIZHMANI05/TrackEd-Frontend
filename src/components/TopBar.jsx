import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";

const TopBar = ({ sidebarExpanded }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center justify-between bg-light-bg dark:bg-dark-bg border-b border-gray-200 dark:border-gray-700 px-4 transition-all rounded-b-2xl shadow-md
        ${sidebarExpanded ? "md:ml-56" : "md:ml-16"} ml-0
        ${!sidebarExpanded ? "sm:ml-0" : ""}
      `}
    >
      {/* Show logo in TopBar only when sidebar is shrunk */}
      {!sidebarExpanded && (
        <div className="flex items-center h-full ">
          <img
            src="/src/assets/images/TrackEd-Logo.svg"
            alt="TrackEd Logo"
            className="h-18 w-auto"
          />
        </div>
      )}
      <div className="flex items-center ml-auto">
        <ThemeToggle />
        <div className="relative ml-4" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer focus:outline-none transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </span>
            <div className="flex flex-col">
              <span className=" font-medium text-light-text-primary dark:text-dark-text-primary">
                {user?.username}
              </span>
              <span className="hidden md:inline text-xs text-gray-500 dark:text-gray-400">
                {user?.studentId}
              </span>
            </div>

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-light-bg dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg py-2">
              <a
                href="/profile"
                className="block px-4 py-2 text-light-text-primary dark:text-dark-text-primary rounded-xl"
              >
                My Profile
              </a>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2  rounded-xl cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
