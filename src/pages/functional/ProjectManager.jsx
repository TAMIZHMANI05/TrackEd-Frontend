import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTasks,
  FaMagic,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}`;

const initialProject = {
  title: "",
  description: "",
  dueDate: "",
  status: "Active",
  tasks: [],
  notes: [],
};

const initialTask = {
  title: "",
  description: "",
  dueDate: "",
  status: "To Do",
  notes: [],
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState(initialProject);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState(initialTask);
  const [selectedProject, setSelectedProject] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRec, setLoadingRec] = useState(false);
  const [descModal, setDescModal] = useState({ open: false, desc: "" });
  const user = useAuth();
  const token = user.token;

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/project`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects || []);
    } catch {
      setProjects([]);
    }
    setLoading(false);
  };

  const fetchRecommendations = async () => {
    setLoadingRec(true);
    try {
      const res = await axios.post(
        `${API_URL}/gemini/recommend-projects`,
        { context: "IT student, semester 4" }, // You can make this dynamic
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(res.data.projects);
    } catch {
      setRecommendations([]);
    }
    setLoadingRec(false);
  };

  // Project CRUD
  const handleProjectFormChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const openAddProject = () => {
    setEditingProject(null);
    setProjectForm(initialProject);
    setShowProjectModal(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project._id);
    setProjectForm({
      ...project,
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
    });
    setShowProjectModal(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`${API_URL}/project/${editingProject}`, projectForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/project`, projectForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Remove from recommendations if present (case-insensitive match)
        setRecommendations((prev) =>
          prev.filter(
            (proj) =>
              proj.title.trim().toLowerCase() !==
              projectForm.title.trim().toLowerCase()
          )
        );
      }
      setShowProjectModal(false);
      fetchProjects();
    } catch {}
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch {}
  };

  // Task CRUD
  const openAddTask = (project) => {
    setSelectedProject(project);
    setEditingTask(null);
    setTaskForm(initialTask);
    setShowTaskModal(true);
  };

  const openEditTask = (project, task, idx) => {
    setSelectedProject(project);
    setEditingTask(idx);
    setTaskForm({
      ...task,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
    setShowTaskModal(true);
  };

  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    const updatedTasks = [...(selectedProject.tasks || [])];
    if (editingTask !== null) {
      updatedTasks[editingTask] = { ...taskForm };
    } else {
      updatedTasks.push({ ...taskForm });
    }
    try {
      await axios.put(
        `${API_URL}/project/${selectedProject._id}`,
        {
          ...selectedProject,
          tasks: updatedTasks,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowTaskModal(false);
      fetchProjects();
    } catch {}
  };

  const handleDeleteTask = async (project, idx) => {
    if (!window.confirm("Delete this task?")) return;
    const updatedTasks = [...(project.tasks || [])];
    updatedTasks.splice(idx, 1);
    try {
      await axios.put(
        `${API_URL}/project/${project._id}`,
        {
          ...project,
          tasks: updatedTasks,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProjects();
    } catch {}
  };

  return (
    <div className="w-full max-w-5xl bg-light-bg dark:bg-dark-card rounded-lg shadow p-8 mx-auto my-8 flex-1 flex-row md:flex-row gap-8 border border-light-border dark:border-dark-border">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Project Manager</h1>
        <button
          onClick={openAddProject}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition text-white text-sm sm:text-base"
        >
          <FaPlus /> Add Project
        </button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={fetchRecommendations}
          className="flex items-center gap-2 bg-purple-600  px-4 py-2 rounded hover:bg-purple-700 transition text-white text-sm sm:text-base"
        >
          <FaMagic /> Recommend Projects
        </button>
        {loadingRec && (
          <span className="text-gray-500">Loading recommendations...</span>
        )}
      </div>
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Recommended Projects</h2>
          <div className="grid gap-4 md:grid-cols-2 ">
            {recommendations.map((proj, i) => (
              <div
                key={i}
                className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-4 border border-light-border dark:border-dark-border"
              >
                <h3 className="font-bold text-blue-700 mb-1">{proj.title}</h3>
                <p className="mb-2">{proj.description}</p>
                <ul className="list-disc ml-5 text-sm">
                  {proj.tasks.map((task, j) => (
                    <li key={j}>
                      <span className="font-semibold">{task.title}:</span>{" "}
                      {task.description}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-3 text-sm sm:text-md bg-blue-600  px-3 py-1 rounded hover:bg-blue-700 text-white"
                  onClick={() => {
                    setProjectForm({
                      ...proj,
                      dueDate: "",
                      status: "Active",
                      tasks: proj.tasks,
                      notes: [],
                    });
                    setShowProjectModal(true);
                  }}
                >
                  Add to My Projects
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {loading ? (
        <div>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          No projects found. Start by adding a new project!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const completedTasks = (project.tasks || []).filter(
              (t) => t.status === "Done"
            ).length;
            const totalTasks = (project.tasks || []).length;
            const progress = totalTasks
              ? Math.round((completedTasks / totalTasks) * 100)
              : 0;
            return (
              <div
                key={project._id}
                className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-6 flex flex-col gap-2 border border-light-border dark:border-dark-border"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditProject(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="mb-2">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Status:{" "}
                    <span className="font-semibold">{project.status}</span>
                  </span>
                  <span>
                    Due:{" "}
                    {project.dueDate
                      ? new Date(project.dueDate).toLocaleDateString()
                      : "-"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaTasks /> {totalTasks} tasks
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">
                    Progress: {progress}%
                  </span>
                  <button
                    onClick={() => openAddTask(project)}
                    className="flex items-center gap-1 text-xs bg-green-600  px-2 py-1 rounded hover:bg-green-700 text-white"
                  >
                    <FaPlus /> Add Task
                  </button>
                </div>
                {/* Task List with info button for description */}
                {(project.tasks || []).map((task, idx) => (
                  <div key={idx} className="py-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            setDescModal({ open: true, desc: task.description })
                          }
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          title="View Description"
                        >
                          <FaInfoCircle />
                        </button>
                        <span
                          className={`font-semibold text-xs ${
                            task.status === "Done"
                              ? "text-green-600"
                              : task.status === "In Progress"
                              ? "text-yellow-600"
                              : ""
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditTask(project, task, idx);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit Task"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(project, idx);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Task"
                        >
                          <FaTrash />
                        </button>
                        {task.status !== "Done" && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const updatedTasks = [...project.tasks];
                              updatedTasks[idx] = { ...task, status: "Done" };
                              await axios.put(
                                `${API_URL}/project/${project._id}`,
                                { ...project, tasks: updatedTasks },
                                {
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              );
                              fetchProjects();
                            }}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as Done"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Description Modal */}
      {descModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-up border border-light-border dark:border-dark-border">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
              onClick={() => setDescModal({ open: false, desc: "" })}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" /> Task Description
            </h2>
            <div className="whitespace-pre-line">
              {descModal.desc}
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-up border border-light-border dark:border-dark-border">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowProjectModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Add Project"}
            </h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectFormChange}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg dark:bg-dark-bg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectFormChange}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg dark:bg-dark-bg"
                  rows={2}
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={projectForm.dueDate}
                    onChange={handleProjectFormChange}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg dark:bg-dark-bg"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={projectForm.status}
                    onChange={handleProjectFormChange}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg dark:bg-dark-bg"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold text-white"
                >
                  {editingProject ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-4xl cursor-pointer"
              onClick={() => setShowTaskModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingTask !== null ? "Edit Task" : "Add Task"}
            </h2>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleTaskFormChange}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-light-bg dark:bg-dark-bg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={taskForm.description}
                  onChange={handleTaskFormChange}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-light-bg dark:bg-dark-bg"
                  rows={2}
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskForm.dueDate}
                    onChange={handleTaskFormChange}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-light-bg dark:bg-dark-bg"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={taskForm.status}
                    onChange={handleTaskFormChange}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-light-bg dark:bg-dark-bg"
                    required
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-white"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold text-white"
                >
                  {editingTask !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
