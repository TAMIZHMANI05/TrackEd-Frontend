import React, { createContext, useContext, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  verifyEmail as verifyEmailApi,
  getMe,
  setAuthToken,
  clearAuthToken,
} from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await signupApi(email, password);
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await loginApi(email, password);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setAuthToken(res.token);
      const me = await getMe();
      setUser(me.user);
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
      clearAuthToken();
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await verifyEmailApi(token);
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    if (!token) return;
    setAuthToken(token);
    try {
      const me = await getMe();
      setUser(me.user);
    } catch {
      setUser(null);
      clearAuthToken();
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  React.useEffect(() => {
    if (token) fetchMe();
    // eslint-disable-next-line
  }, [token]);

  const logout = () => {
    setUser(null);
    clearAuthToken();
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        message,
        signup,
        login,
        verifyEmail,
        logout,
        setError,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
