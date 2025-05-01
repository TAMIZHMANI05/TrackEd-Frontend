import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../services/auth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      toast.success("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-2 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-light-bg dark:bg-dark-bg shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-md border border-gray-500"
      >
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center text-light-primary dark:text-dark-primary">
          Reset Password
        </h2>
        <input
          type="password"
          name="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
        />
        <button
          type="submit"
          className="w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors font-semibold text-base sm:text-lg"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
