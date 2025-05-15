import React from "react";
import { useEffect, useState } from "react";
import { Line, Pie, Doughnut } from "react-chartjs-2";
import { getCgpaData } from "../services/cgpa";
import { useAuth } from "../context/AuthContext";
import { quotes as MOTIVATIONAL_QUOTES } from "../utils/quotes";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import DashboardImage from "../assets/images/Dashboard.svg";
import axios from "axios";
import { FaTasks } from "react-icons/fa";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const SEMS = Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);

const WelcomeBar = ({ projects }) => {
  const [date, setDate] = useState("");
  const { user } = useAuth();

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const today = new Date();
    setDate(
      today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    // Pick a random motivational quote
    const randomIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuote(MOTIVATIONAL_QUOTES[randomIdx]);
  }, []);
  const semestersCompleted = user.cgpaData.filter(
    (s) => typeof s.sgpa === "number" && s.sgpa !== null
  ).length;

  const totalSubjects = user.cgpaData.reduce(
    (sum, s) => sum + (s.subjects ? s.subjects.length : 0),
    0
  );

  return (
    <div className="rounded-2xl bg-gradient-to-r bg-light-bg dark:bg-dark-bg p-6 flex flex-col md:flex-row items-center justify-between mb-8 shadow-lg border border-light-border dark:border-dark-border">
      <div className="flex-1 min-w-0">
        <div className="text-sm mb-1">{date}</div>
        <div className="text-2xl md:text-2xl font-bold mb-1 flex items-center gap-2">
          Welcome Back, {user.fullName} <span className="text-2xl">👋</span>
        </div>
        <div className="mb-4 text-base">"{quote}"</div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[110px] max-w-xs rounded-lg px-5 py-3 flex flex-col items-center border border-light-border dark:border-dark-border">
            <span className="text-sm font-medium mb-1">Current CGPA</span>
            <span className="text-blue-700 text-xl font-bold">
              {user.currentCgpa}
            </span>
          </div>
          <div className="flex-1 min-w-[110px] max-w-xs rounded-lg px-5 py-3 flex flex-col items-center border border-light-border dark:border-dark-border">
            <span className="text-sm font-medium mb-1 whitespace-nowrap">
              Completed Semesters
            </span>
            <span className="text-green-600 text-xl font-bold">
              {semestersCompleted}
            </span>
          </div>
          <div className="flex-1 min-w-[110px] max-w-xs rounded-lg px-5 py-3 flex flex-col items-center border border-light-border dark:border-dark-border">
            <span className="text-sm font-medium mb-1 whitespace-nowrap">
              Completed Projects
            </span>
            <span className="text-yellow-500 text-xl font-bold flex items-center gap-1">
              <span>
                {projects.filter((p) => p.status === "Completed").length}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={DashboardImage}
          alt="Dashboard Illustration"
          className="object-contain  w-80"
        />
      </div>
    </div>
  );
};

// Recent Projects Table Component
const RecentProjectsTable = ({ projects }) => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg rounded-2xl shadow-lg p-5 border border-light-border dark:border-dark-border w-full">
      <h2 className="text-xl font-bold mb-4 text-light-primary dark:text-dark-primary flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Recent Projects
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-light-border dark:border-dark-border">
              <th className="text-left py-2 px-3 font-semibold">Title</th>
              <th className="text-left py-2 px-3 font-semibold">Status</th>
              <th className="text-left py-2 px-3 font-semibold">Due</th>
              <th className="text-left py-2 px-3 font-semibold">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  No projects
                </td>
              </tr>
            ) : (
              projects.map((p) => {
                const completed = (p.tasks || []).filter(
                  (t) => t.status === "Done"
                ).length;
                const total = (p.tasks || []).length;
                const progress = total
                  ? Math.round((completed / total) * 100)
                  : 0;
                return (
                  <tr
                    key={p._id}
                    className="border-b last:border-b-0 border-light-border dark:border-dark-border hover:bg-blue-50/40 dark:hover:bg-blue-900/20 transition group"
                  >
                    <td className="py-2 px-3 font-medium max-w-[90px] truncate flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 group-hover:scale-125 transition-transform"></span>
                      <span title={p.title}>{p.title}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold
                          ${
                            p.status === "Completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : p.status === "Active"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : p.status === "On Hold"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300"
                          }
                        `}
                        style={{
                          color:
                            p.status === "Completed"
                              ? "#15803d"
                              : p.status === "Active"
                              ? "#1d4ed8"
                              : p.status === "On Hold"
                              ? "#b45309"
                              : "#374151",
                          backgroundColor:
                            p.status === "Completed"
                              ? "#dcfce7"
                              : p.status === "Active"
                              ? "#dbeafe"
                              : p.status === "On Hold"
                              ? "#fef9c3"
                              : "#f3f4f6",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-xs text-gray-500 dark:text-gray-400">
                      {p.dueDate
                        ? new Date(p.dueDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2 min-w-[60px]">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress === 100 ? "bg-green-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold tabular-nums w-8 text-right">
                          {progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { token } = useAuth();
  const [gpaData, setGpaData] = useState({ gpas: [], cgpas: [] });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) return;
    getCgpaData(token).then((data) => {
      const cgpaArray = Array.isArray(data)
        ? data
        : data && Array.isArray(data.cgpaData)
        ? data.cgpaData
        : [];
      const gpas = Array(8)
        .fill(null)
        .map((_, i) => {
          const found = cgpaArray.find((s) => s.semester === i + 1);
          return found && typeof found.sgpa === "number" ? found.sgpa : null;
        });
      const cgpas = Array(8)
        .fill(null)
        .map((_, i) => {
          const found = cgpaArray.find((s) => s.semester === i + 1);
          return found && typeof found.cgpa === "number" ? found.cgpa : null;
        });
      // --- Prediction Algorithm: Use average of completed SGPAs for future semesters ---
      const completedSgpas = gpas.filter(
        (g) => typeof g === "number" && g !== null
      );
      const avgSgpa =
        completedSgpas.length > 0
          ? completedSgpas.reduce((a, b) => a + b, 0) / completedSgpas.length
          : null;
      const predictedGpas = gpas.map((g) => (g === null ? avgSgpa : g));
      // Predicted CGPA: recalculate CGPA using predictedGpas
      let runningTotal = 0;
      let runningCount = 0;
      const predictedCgpas = predictedGpas.map((g) => {
        if (typeof g === "number" && g !== null) {
          runningTotal += g;
          runningCount++;
          return Number((runningTotal / runningCount).toFixed(2));
        }
        return null;
      });
      setGpaData({ gpas, cgpas, predictedGpas, predictedCgpas });
    });
    // Fetch recent projects
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_URL}/project`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects || []);
      } catch {
        setProjects([]);
      }
    };
    fetchProjects();
  }, [token]);

  // Project Donut Chart Data
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const donutData = {
    labels: ["Active", "Completed", "On Hold"],
    datasets: [
      {
        data: [
          activeProjects,
          completedProjects,
          totalProjects - activeProjects - completedProjects,
        ],
        backgroundColor: ["#6366f1", "#22c55e", "#f59e42"],
        borderWidth: 1,
      },
    ],
  };
  const donutOptions = {
    plugins: {
      legend: { display: true, position: "bottom" },
    },
    cutout: "70%",
    maintainAspectRatio: false,
  };

  // Task Pie Chart Data (across all projects)
  const allTasks = projects.flatMap((p) => p.tasks || []);
  const doneTasks = allTasks.filter((t) => t.status === "Done").length;
  const inProgressTasks = allTasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const todoTasks = allTasks.filter((t) => t.status === "To Do").length;
  const pieData = {
    labels: ["Done", "In Progress", "To Do"],
    datasets: [
      {
        data: [
          doneTasks,
          inProgressTasks,
          todoTasks,
          allTasks.length - doneTasks - inProgressTasks - todoTasks,
        ],
        backgroundColor: ["#22c55e", "#f59e42", "#6366f1", "#a3a3a3"],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: { display: true, position: "bottom" },
    },
    maintainAspectRatio: false,
  };

  const chartData = {
    labels: SEMS,
    datasets: [
      {
        label: "SGPA",
        data: gpaData.gpas || [],
        fill: true,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        tension: 0.4,
        pointBackgroundColor: "#6366f1",
      },
      {
        label: "CGPA",
        data: gpaData.cgpas || [],
        fill: false,
        borderColor: "#f59e42",
        backgroundColor: "rgba(245,158,66,0.1)",
        tension: 0.4,
        pointBackgroundColor: "#f59e42",
      },
    ],
  };

  const predictedChartData = {
    labels: SEMS,
    datasets: [
      {
        label: "Predicted SGPA",
        data: gpaData.predictedGpas || [],
        fill: false,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.1)",
        borderDash: [4, 4],
        tension: 0.4,
        pointBackgroundColor: "#22c55e",
      },
      {
        label: "Predicted CGPA",
        data: gpaData.predictedCgpas || [],
        fill: false,
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.1)",
        borderDash: [2, 6],
        tension: 0.4,
        pointBackgroundColor: "#0ea5e9",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" }, // Show legend at the top
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 11,
        ticks: { stepSize: 1 },
        title: { display: true, text: "SGPA" },
      },
      x: {
        title: { display: true, text: "Sem" },
      },
    },
  };

  // Sort and pick recent projects
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
        <div className="flex-1 min-w-0">
          <WelcomeBar projects={projects} />
        </div>
        <div className="w-full md:w-auto">
          <RecentProjectsTable projects={recentProjects} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch">
        <div className="flex flex-col gap-6 flex-1 min-w-0 max-w-full md:min-w-[320px] md:max-w-xl">
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-4 sm:p-6 overflow-x-auto border border-light-border dark:border-dark-border">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              GPA Progress
            </h2>
            <div className="w-full" style={{ minWidth: 0 }}>
              <Line
                data={chartData}
                options={{ ...chartOptions, maintainAspectRatio: false }}
                height={220}
              />
            </div>
          </div>
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-4 sm:p-6 overflow-x-auto border border-light-border dark:border-dark-border">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Predicted Progress
            </h2>
            <div className="w-full" style={{ minWidth: 0 }}>
              <Line
                data={predictedChartData}
                options={{ ...chartOptions, maintainAspectRatio: false }}
                height={220}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 max-w-full md:min-w-[320px] md:max-w-xl flex flex-col gap-6">
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-4 border border-light-border dark:border-dark-border flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-3">Project Progress</h2>
            <div
              className="w-full flex flex-col items-center justify-center"
              style={{ minHeight: 240 }}
            >
              {totalProjects === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No project data
                </div>
              ) : (
                <Doughnut
                  data={donutData}
                  options={donutOptions}
                  height={200}
                />
              )}
            </div>
          </div>
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-4 border border-light-border dark:border-dark-border flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-3">Task Progress</h2>
            <div
              className="w-full flex flex-col items-center justify-center"
              style={{ minHeight: 240 }}
            >
              {allTasks.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No task data
                </div>
              ) : (
                <Pie data={pieData} options={pieOptions} height={200} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
