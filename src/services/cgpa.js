// CGPA service for fetching and updating user's CGPA data
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

export async function getCgpaData(token) {
  // Use /api/cgpa to get cgpaData, cgpa, and sgpa
  const res = await axios.get(`${API_BASE}/cgpa`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  
  return res.data; // { cgpaData, cgpa, sgpa }
}

export async function updateCgpaData(token, cgpaData) {
  // Still use /api/cgpa for updating
  const res = await axios.put(
    `${API_BASE}/cgpa`,
    { cgpaData },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  return res.data; // { cgpaData, cgpa, sgpa }
}
