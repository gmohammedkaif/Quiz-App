import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdOutlineSportsSoccer } from "react-icons/md";
import { BsTerminal } from "react-icons/bs";
import { MdOutlinePsychology } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
const email = useSelector((state) => state.user?.email);
  console.log(email);

  // ✅ STATE
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [difficulty, setDifficulty] = useState("medium");
  const [questionsCount, setQuestionsCount] = useState(10);

  // ✅ CATEGORY DATA (WITH API IDS)
  const categories = [
    { id: 21, name: "Sports", icon: <MdOutlineSportsSoccer />, desc: "Athletics, tournaments, and legendary players." },
    { id: 18, name: "Technology", icon: <BsTerminal />, desc: "Future tech, history of computing and digital trends" },
    { id: 9, name: "General Knowledge", icon: <MdOutlinePsychology />, desc: "Test your limits with a mix of everything." },
    { id: 24, name: "Politics", icon: <RiGovernmentLine />, desc: "Global affairs, governance, and civic structures." },
    { id: 11, name: "Entertainment", icon: <BiMoviePlay />, desc: "Pop culture, cinema, music, and the arts." },
    { id: 22, name: "Geography", icon: <FaHistory />, desc: "Explore the world and its wonders." },
  ];

  // ✅ START QUIZ
  const handleStartQuiz = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    navigate("/quiz", {
      state: {
        category: selectedCategory,
        difficulty,
        questionsCount,
      },
    });
  };

  return (
    <div className="dashboard-container">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="dashboard-nav-left">
          <span className="dashboard-logo">Quiz Master</span>

          <div className="dashboard-nav-links">
            <a className="dashboard-active">Dashboard</a>
            <a>Leaderboard</a>
            <a>Categories</a>
          </div>
        </div>

        <div className="dashboard-nav-right">
          <div className="dashboard-user-info">
            <span>lucid.user@intellectual.com</span>
            <small>Premium Member</small>
          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="dashboard-avatar"
          />
        </div>
      </nav>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* HERO */}
        <div className="dashboard-hero">
          <h1>
            Welcome back, <br />
            <span>Master of Inquiry.</span>
          </h1>
          <p>
            Unlock new cognitive heights. Select a category below to challenge
            <br /> your intellect or pick up where you left off..
          </p>
        </div>

        {/* GRID */}
        <div className="dashboard-grid">
          {/* LEFT */}
          <div className="dashboard-left-section">
            <div className="dashboard-section-header">
              <h2>Start a Quiz</h2>
              <span>Browse All</span>
            </div>

            <div className="dashboard-cards">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`dashboard-card-box ${
                    selectedCategory === cat.id ? "dashboard-card-active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon}
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="dashboard-right-section">
            <div className="dashboard-settings">
              <h2>Quiz Settings</h2>

              {/* DIFFICULTY */}
              <div className="dashboard-difficulty">
                <p>Difficulty</p>
                <div className="dashboard-btn-group">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      className={difficulty === level ? "dashboard-active" : ""}
                      onClick={() => setDifficulty(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* RANGE */}
              <div className="dashboard-range">
                <p>Questions: {questionsCount}</p>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={questionsCount}
                 onChange={(e) => setQuestionsCount(Number(e.target.value))}
                />
              </div>

              {/* START */}
              <button
                className="dashboard-start-btn"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </button>
            </div>

            {/* STATS */}
            <div className="dashboard-stats">
              <h3>Last Performance</h3>
              <h1>88%</h1>
              <p>Correct in General Science</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;