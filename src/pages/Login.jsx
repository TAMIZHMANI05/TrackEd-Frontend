import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading, error, message, setError, setMessage } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      toast.error("Both fields are required.");
      return;
    }
    await login(form.email, form.password);
    if (error) toast.error(error);
    if (message) toast.success(message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-light-bg dark:bg-dark-bg shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-md border border-gray-500"
      >
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center text-light-primary dark:text-dark-primary">
          Log In
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 sm:mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 sm:mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
        />
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div></div>
          <a
            href="/forgot-password"
            className="text-xs sm:text-sm text-light-primary dark:text-dark-primary underline"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors font-semibold text-base sm:text-lg"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-light-primary dark:text-dark-primary underline"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
