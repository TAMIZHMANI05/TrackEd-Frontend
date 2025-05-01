import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail, loading, error, message, setError, setMessage } =
    useAuth();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    setError(null);
    setMessage(null);
    console.log("EmailVerification.jsx: token=", token);
    if (!token) {
      setStatus("Invalid verification link.");
      setError("Invalid verification link.");
      toast.error("Invalid verification link.");
      return;
    }
    verifyEmail(token)
      .then(() => {
        setStatus("Email verified successfully! You can now log in.");
        toast.success("Email verified successfully!");
      })
      .catch((err) => {
        setStatus("Verification failed. The link may be invalid or expired.");
        toast.error(
          err?.message ||
            "Verification failed. The link may be invalid or expired."
        );
      });
    // Cleanup on unmount
    return () => {
      setError(null);
      setMessage(null);
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-2 mt-10">
      <div className="bg-light-bg dark:bg-dark-bg shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-md border border-gray-500 text-center">
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-light-primary dark:text-dark-primary">
          Email Verification
        </h2>
        {loading && (
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Verifying...
          </p>
        )}
        {/* Remove error/message in-form display, only use toast */}
        {!loading && !error && !message && (
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
        {status.includes("successfully") && (
          <a
            href="/login"
            className="block mt-6 text-light-primary dark:text-dark-primary underline"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
