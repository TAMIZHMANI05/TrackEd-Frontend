import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import DashboardImage from "../assets/images/Dashboard.svg";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const SEMS = Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);

const WelcomeBar = () => {
  const [date, setDate] = useState("");
  const { user } = useAuth();
  console.log(user);

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
    <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-400 p-6 flex flex-col md:flex-row items-center justify-between mb-8 shadow-lg sm:w-250">
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm mb-1">{date}</div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
          Welcome Back, {user.fullName} <span className="text-2xl">👋</span>
        </div>
        <div className="text-blue-100 mb-4 text-base">
          <span className="text-2xl align-top mr-1">“</span>
          {quote}
          <span className="text-2xl align-bottom ml-1">”</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[110px] max-w-xs bg-light-bg dark:bg-dark-bg rounded-lg px-5 py-3 flex flex-col items-center">
            <span className="text-gray-500 text-sm font-medium mb-1">
              Current CGPA
            </span>
            <span className="text-blue-700 text-xl font-bold">
              {user.currentCgpa}
            </span>
          </div>
          <div className="flex-1 min-w-[110px] max-w-xs bg-light-bg dark:bg-dark-bg rounded-lg px-5 py-3 flex flex-col items-center">
            <span className="text-gray-500 text-sm font-medium mb-1">
              Completed Semesters
            </span>
            <span className="text-green-600 text-xl font-bold">
              {semestersCompleted}
            </span>
          </div>
          <div className="flex-1 min-w-[110px] max-w-xs bg-light-bg dark:bg-dark-bg rounded-lg px-5 py-3 flex flex-col items-center">
            <span className="text-gray-500 text-sm font-medium mb-1">
              Completed Subjects
            </span>
            <span className="text-yellow-500 text-xl font-bold flex items-center gap-1">
              <span>{totalSubjects}</span>
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

const Dashboard = () => {
  const { token } = useAuth();
  const [gpaData, setGpaData] = useState({ gpas: [], cgpas: [] });

  useEffect(() => {
    if (!token) return;
    getCgpaData(token).then((data) => {
      // Support both array and { cgpaData: [...] } object
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
      setGpaData({ gpas, cgpas });
    });
  }, [token]);

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

  return (
    <div className="p-6">
      <WelcomeBar />
      <div className="bg-light-bg dark:bg-dark-bg rounded-xl shadow p-6 max-w-2xl mx-auto w-full overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">CGPA Progress</h2>
        <div style={{ minWidth: 500 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
