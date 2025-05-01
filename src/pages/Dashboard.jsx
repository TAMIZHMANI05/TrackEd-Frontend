import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg px-2 mt-10">
      <div className="bg-light-bg dark:bg-dark-bg shadow-lg rounded-lg p-8 w-full max-w-xl border border-gray-500 text-center">
        <h2 className="text-3xl font-bold mb-6 text-light-primary dark:text-dark-primary">
          Dashboard
        </h2>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          Welcome, <span className="font-semibold">{user?.email}</span>!
        </p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
