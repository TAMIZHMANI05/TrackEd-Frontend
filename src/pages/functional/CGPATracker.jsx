import React, { useState, useEffect, useRef } from "react";
import { getCgpaData, updateCgpaData } from "../../services/cgpa";
import { useAuth } from "../../context/AuthContext";

const GRADE_POINTS = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
};

const SEMESTERS = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);



const gradeOptions = Object.keys(GRADE_POINTS);

const CGPATracker = () => {
  const {token } = useAuth();
  const [cgpaData, setCgpaData] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [currentCgpa, setCurrentCgpa] = useState(0);
  const [forms, setForms] = useState(
    SEMESTERS.map(() => ({ subject: "", credits: "", grade: "A+" }))
  );
  const [loading, setLoading] = useState(false);

  // Fetch cgpaData on mount and after every update
  const fetchCgpaData = async () => {
    if (!token) return;
    try {
      const data = await getCgpaData(token);
      
      // Handle both array and object with cgpaData property
      if (Array.isArray(data)) {
        setCgpaData(data);
      } else if (data && Array.isArray(data.cgpaData)) {
        setCurrentCgpa(data.currentCgpa);
        setCgpaData(data.cgpaData);
      } else {
        setCgpaData([]);
      }
    } catch {
      setCgpaData([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCgpaData().finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [token]);


  const semesters = Array(8)
    .fill(null)
    .map((_, i) => {
      const found = cgpaData.find((s) => s.semester === i + 1);
      return found ? found.subjects : [];
    });


  const handleExpand = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  const handleInput = (semIdx, e) => {
    setForms((prev) =>
      prev.map((f, i) =>
        i === semIdx ? { ...f, [e.target.name]: e.target.value } : f
      )
    );
  };

  const handleAdd = async (semIdx) => {
    const { subject, credits, grade } = forms[semIdx];
    if (!subject || !credits || !grade) return;
    setLoading(true);
    const updated = semesters.map((list, i) =>
      i === semIdx ? [...list, { subject, credits, grade }] : list
    );
    const newCgpaData = updated.map((subjects, i) => ({
      semester: i + 1,
      subjects,
    }));
    try {
      await updateCgpaData(token, newCgpaData);
      setForms((prev) =>
        prev.map((f, i) =>
          i === semIdx ? { subject: "", credits: "", grade: "A+" } : f
        )
      );
      await fetchCgpaData();
    } catch {}
    setLoading(false);
  };

  const handleDelete = async (semIdx, subjIdx) => {
    setLoading(true);
    const updated = semesters.map((list, i) =>
      i === semIdx ? list.filter((_, j) => j !== subjIdx) : list
    );
    const newCgpaData = updated.map((subjects, i) => ({
      semester: i + 1,
      subjects,
    }));
    try {
      await updateCgpaData(token, newCgpaData);
      await fetchCgpaData();
    } catch {}
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen py-8 px-2 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-light-primary dark:text-dark-primary text-center">
          CGPA Tracker
        </h1>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
              <div className="text-center md:text-left">
                <span className="text-lg font-semibold">Current CGPA: </span>
                <span className="text-3xl font-bold text-light-primary dark:text-dark-primary">
                  {currentCgpa}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full">
              {SEMESTERS.map((sem, semIdx) => {
                const semesterData = cgpaData.find(
                  (s) => s.semester === semIdx + 1
                );
                return (
                  <div
                    key={sem}
                    className={`bg-light-bg dark:bg-dark-card rounded-xl shadow p-6 flex flex-col transition-all duration-300 w-full border border-light-border dark:border-dark-border px-4 py-2 bg-light-bg dark:bg-dark-card ${
                      expanded === semIdx
                        ? "ring-2 ring-light-primary dark:ring-dark-primary"
                        : ""
                    }`}
                  >
                    <button
                      className="w-full flex justify-between items-center text-xl font-semibold text-left focus:outline-none mb-4 cursor-pointer"
                      onClick={() => handleExpand(semIdx)}
                      type="button"
                      aria-expanded={expanded === semIdx}
                      aria-controls={`semester-panel-${semIdx}`}
                    >
                      <span>{sem}</span>
                      <span className="flex items-center gap-4">
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                          SGPA:{" "}
                          <span className="font-bold text-light-primary dark:text-dark-primary">
                            {semesterData
                              ? semesterData.sgpa != 0
                                ? semesterData.sgpa
                                : "-"
                              : "-"}
                          </span>
                        </span>
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                          CGPA:{" "}
                          <span className="font-bold text-light-primary dark:text-dark-primary">
                            {semesterData
                              ? semesterData.cgpa != 0
                                ? semesterData.cgpa
                                : "-"
                              : "-"}
                          </span>
                        </span>
                        <span className="text-2xl">
                          {expanded === semIdx ? "-" : "+"}
                        </span>
                      </span>
                    </button>
                    <div
                      id={`semester-panel-${semIdx}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        expanded === semIdx
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                      style={{
                        willChange: "max-height, opacity",
                        pointerEvents: expanded === semIdx ? "auto" : "none",
                      }}
                    >
                      <div aria-hidden={expanded !== semIdx}>
                        {expanded === semIdx && (
                          <>
                            <table className="w-full mb-4 text-base">
                              <thead>
                                <tr className="text-gray-500 dark:text-gray-400">
                                  <th className="py-1">Subject</th>
                                  <th className="py-1">Credits</th>
                                  <th className="py-1">Grade</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {semesters[semIdx].map((subj, subjIdx) => (
                                  <tr
                                    key={subjIdx}
                                    className="border-b last:border-b-0"
                                  >
                                    <td className="py-1">{subj.subject}</td>
                                    <td className="py-1">{subj.credits}</td>
                                    <td className="py-1">{subj.grade}</td>
                                    <td>
                                      <button
                                        className="text-red-500 hover:underline text-xs"
                                        onClick={() =>
                                          handleDelete(semIdx, subjIdx)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex flex-col md:flex-row gap-2 md:items-end">
                              <input
                                type="text"
                                name="subject"
                                placeholder="Subject Name"
                                value={forms[semIdx].subject}
                                onChange={(e) => handleInput(semIdx, e)}
                                className="flex-1 px-3 py-2 border rounded focus:outline-none  bg-light-bg dark:bg-dark-bg placeholder-gray-400 dark:placeholder-gray-500"
                              />
                              <input
                                type="number"
                                name="credits"
                                placeholder="Credits"
                                min="1"
                                value={forms[semIdx].credits}
                                onChange={(e) => handleInput(semIdx, e)}
                                className="w-28 px-3 py-2 border rounded focus:outline-none  bg-light-bg dark:bg-dark-bg placeholder-gray-400 dark:placeholder-gray-500"
                              />
                              <select
                                name="grade"
                                value={forms[semIdx].grade}
                                onChange={(e) => handleInput(semIdx, e)}
                                className="w-32 px-3 py-2 border rounded focus:outline-none  bg-light-bg dark:bg-dark-bg"
                              >
                                {gradeOptions.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded hover:bg-light-secondary dark:hover:bg-dark-secondary font-semibold"
                                onClick={() => handleAdd(semIdx)}
                              >
                                Add
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CGPATracker;
