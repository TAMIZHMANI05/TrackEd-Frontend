import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../services/auth";
import toast from "react-hot-toast";
import {
  FaUser,
  FaIdBadge,
  FaIdCard,
  FaGraduationCap,
  FaLock,
} from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || "",
    fullName: user?.fullName || "",
    studentId: user?.studentId || "",
    course: user?.course || "",
  });
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [pwSaving, setPwSaving] = useState(false);

  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile(form);
      setUser(res.user);
      toast.success("Profile updated!");
      setEdit(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const handlePwSave = async (e) => {
    e.preventDefault();
    if (
      !pwForm.currentPassword ||
      !pwForm.newPassword ||
      !pwForm.confirmNewPassword
    ) {
      toast.error("All fields are required.");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(pwForm.currentPassword, pwForm.newPassword);
      toast.success("Password changed!");
      setPwForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-light-bg dark:bg-dark-card rounded-lg shadow p-8 mx-auto my-8 flex-1 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-light-primary dark:text-dark-primary">
            Profile
          </h2>
          <form onSubmit={handleProfileSave} className="space-y-4 mb-8">
            <div>
              <label className="font-semibold block mb-1">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleProfileChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                  disabled={!edit}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <FaIdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleProfileChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                  disabled={!edit}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Student ID</label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="text"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleProfileChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                  disabled={!edit}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Course</label>
              <div className="relative">
                <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleProfileChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                  disabled={!edit}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {edit ? (
                <>
                  <button
                    type="submit"
                    className="bg-light-primary dark:bg-dark-primary text-white px-6 py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary font-semibold"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded font-semibold"
                    onClick={() => {
                      setEdit(false);
                      setForm({
                        username: user?.username || "",
                        fullName: user?.fullName || "",
                        studentId: user?.studentId || "",
                        course: user?.course || "",
                      });
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="bg-light-primary dark:bg-dark-primary text-white px-6 py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-light-primary dark:text-dark-primary">
            Change Password
          </h3>
          <form onSubmit={handlePwSave} className="space-y-4">
            <div>
              <label className="font-semibold block mb-1">
                Current Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="password"
                  name="currentPassword"
                  value={pwForm.currentPassword}
                  onChange={handlePwChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">New Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="password"
                  name="newPassword"
                  value={pwForm.newPassword}
                  onChange={handlePwChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-light-primary dark:text-dark-primary" />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={pwForm.confirmNewPassword}
                  onChange={handlePwChange}
                  className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary bg-light-bg dark:bg-dark-bg"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-light-primary dark:bg-dark-primary text-white px-6 py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary font-semibold"
              disabled={pwSaving}
            >
              {pwSaving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
