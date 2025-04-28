/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: "#F9FAFB",
          primary: "#3B82F6",
          secondary: "#60A5FA",
          accent: "#22C55E",
          text: {
            primary: "#111827",
            secondary: "#6B7280",
          },
          border: "#E5E7EB",
        },
        // Dark mode colors
        dark: {
          bg: "#000000",
          card: "#121212",
          primary: "#3B82F6",
          secondary: "#60A5FA",
          accent: "#22C55E",
          text: {
            primary: "#FFFFFF",
            secondary: "#9CA3AF",
          },
          border: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
