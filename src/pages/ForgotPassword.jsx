import React, { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("If that email is registered, a reset link has been sent.");
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
          Forgot Password
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors font-semibold text-base sm:text-lg cursor-pointer"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
