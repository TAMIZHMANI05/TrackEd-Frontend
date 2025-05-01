// Auth API service for signup, login, and email verification
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = null;
}

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

export async function signup(email, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function verifyEmail(token) {
  console.log("auth.js: Calling backend /verify-email with token:", token);
  const res = await fetch(`${API_URL}/verify-email`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Verification failed");
  return data;
}

export async function getMe() {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Unauthorized");
  return data;
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send reset email");
  return data;
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to reset password");
  return data;
}
