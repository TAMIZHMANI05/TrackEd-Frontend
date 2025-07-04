import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    studentId: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, loading, error, message, setError, setMessage } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.fullName ||
      !form.studentId ||
      !form.course ||
      !form.confirmPassword
    ) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }
    await signup({
      email: form.email,
      password: form.password,
      username: form.username,
      fullName: form.fullName,
      studentId: form.studentId,
      course: form.course,
    });
    if (error) toast.error(error);
    if (message) toast.success(message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-2 -mt-10 md:mt-0">
      <form
        onSubmit={handleSubmit}
        className="bg-light-bg dark:bg-dark-bg shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-md border border-gray-500"
      >
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center text-light-primary dark:text-dark-primary">
          Sign Up
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
          <input
            type="text"
            name="studentId"
            placeholder="Roll Number"
            value={form.studentId}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
          <input
            type="text"
            name="course"
            placeholder="Department"
            value={form.course}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 sm:mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
        />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors font-semibold text-base sm:text-lg cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="mt-3 sm:mt-4 text-center text-md sm:text-md">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-light-primary dark:text-dark-primary underline"
          >
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
