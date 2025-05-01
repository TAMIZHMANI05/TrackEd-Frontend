import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/TrackEd-Logo.svg";
import useScrollPosition from "../hooks/useScrollPosition";
import { useState, useRef } from "react";

const Navbar = () => {
  const isScrolled = useScrollPosition();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownTimeout = useRef();
  const location = useLocation();

  const navigationItems = [
    // {
    //   name: "Features",
    //   isDropdown: true,
    //   items: [
    //     { name: "CGPA Tracking", path: "/features/cgpa-tracking" },
    //     { name: "Project Management", path: "/features/project-management" },
    //     { name: "AI Insights", path: "/features/ai-insights" },
    //   ],
    // },
    // { name: "Resources", path: "/resources" },
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "CGPA Tracking", path: "/features/cgpa-tracking" },
    { name: "Project Management", path: "/features/project-management" },
    { name: "AI Insights", path: "/features/ai-insights" },
    { name: "Contact", path: "#footer" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-20" : "h-25"
          }`}
        >
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "h-10 w-28" : "h-12 w-32"
              } rounded-lg flex items-center justify-center`}
            >
              <img src={logo} alt="TrackEd Logo" />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Right side items - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) =>
                item.name === "Contact" ? (
                  <a
                    key={item.name}
                    href="#footer"
                    onClick={(e) => {
                      e.preventDefault();
                      const footer = document.getElementById("footer");
                      if (footer) {
                        footer.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`nav-underline transition-colors px-2 py-1 rounded-md
                      ${
                        location.hash === "#footer"
                          ? "text-light-primary dark:text-dark-primary font-bold bg-light-primary/10 dark:bg-dark-primary/10 active"
                          : "text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                      }
                    `}
                  >
                    {item.name}
                  </a>
                ) : item.isDropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => {
                      clearTimeout(dropdownTimeout.current);
                      setIsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeout.current = setTimeout(
                        () => setIsDropdownOpen(false),
                        150
                      );
                    }}
                  >
                    <button
                      className={`nav-underline flex items-center space-x-1 transition-colors px-2 py-1 rounded-md
                        ${
                          item.items.some(
                            (sub) => location.pathname === sub.path
                          )
                            ? "text-light-primary dark:text-dark-primary font-bold bg-light-primary/10 dark:bg-dark-primary/10 active"
                            : "text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                        }
                      `}
                    >
                      <span>{item.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-56 rounded-lg bg-light-bg dark:bg-dark-bg shadow-lg transform transition-all duration-200 ease-out origin-top-left ${
                        isDropdownOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="py-2">
                        {item.items.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`nav-underline block px-4 py-2 rounded-md transition-colors duration-150
                              ${
                                location.pathname === subItem.path
                                  ? "text-light-primary dark:text-dark-primary font-bold bg-light-primary/10 dark:bg-dark-primary/10 active"
                                  : "text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                              }
                            `}
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-underline transition-colors px-2 py-1 rounded-md
                      ${
                        location.pathname === item.path
                          ? "text-light-primary dark:text-dark-primary font-bold bg-light-primary/10 dark:bg-dark-primary/10 active"
                          : "text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
            <Link
              to="/signup"
              className="transition-all duration-300 px-4 py-2 text-base rounded-lg bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 transform w-64 bg-light-bg dark:bg-dark-bg shadow-lg transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 pb-6 space-y-6">
            {navigationItems.map((item) =>
              item.isDropdown ? (
                <div key={item.name} className="space-y-2">
                  <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    {item.name}
                  </p>
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`nav-underline block text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary
                          ${
                            location.pathname === subItem.path
                              ? "font-bold bg-light-primary/10 dark:bg-dark-primary/10 active"
                              : ""
                          }
                        `}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.name === "Contact" ? (
                <a
                  key={item.name}
                  href="#footer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const footer = document.getElementById("footer");
                      if (footer) {
                        footer.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 200); // Wait for menu to close
                  }}
                  className="nav-underline block w-full text-left text-lg px-4 py-3 rounded-md transition-colors text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-underline block w-full text-left text-lg px-4 py-3 rounded-md transition-colors text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 flex flex-col space-y-4 border-t border-light-border dark:border-dark-border mt-4">
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors text-lg"
              >
                Sign In
              </Link>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
