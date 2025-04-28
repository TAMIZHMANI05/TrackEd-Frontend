import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.classList.add(savedTheme);
        return savedTheme === "dark";
      }
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.add(prefersDark ? "dark" : "light");
      return prefersDark;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    const newTheme = darkMode ? "dark" : "light";
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
