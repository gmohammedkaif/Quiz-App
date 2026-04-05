import React, { useState } from "react";
import { useSelector } from "react-redux";
// import "./index.css";

const Leaderboard = () => {
  const users = useSelector((state) => state.leaderboard.users);

  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");

  // 🎯 FILTER BY DIFFICULTY
  let filteredUsers =
    level === "All"
      ? users
      : users.filter((u) => u.difficulty === level.toLowerCase());

  // 🔍 SEARCH FILTER
  filteredUsers = filteredUsers.filter((u) =>
  u.email && u.email.toLowerCase().includes(search.toLowerCase())
);

  // 📊 SORT BY SCORE
  const sortedUsers = [...filteredUsers].sort((a, b) => b.score - a.score);

  // 🏆 TOP 3
  const top3 = sortedUsers.slice(0, 3);

  // 📋 REST USERS
  const others = sortedUsers.slice(3);

  // 🎨 RANDOM IMAGE
  const getAvatar = (email) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${email}`;

  return (
    <>
      {/* NAVBAR */}
      <nav className="leaderboard-navbar">
        <div className="leaderboard-nav-container">
          <div className="leaderboard-nav-left">
            <h2 className="leaderboard-logo">Quiz Master</h2>

            <div className="leaderboard-nav-links">
              <span>Dashboard</span>
              <span className="leaderboard-active">Leaderboard</span>
              <span>Categories</span>
            </div>
          </div>

          <div className="leaderboard-nav-right">
            <button className="leaderboard-profile-btn">Profile</button>
            <button className="leaderboard-logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="leaderboard-main">
        {/* HERO */}
        <div className="leaderboard-hero">
          <span className="leaderboard-tag">HALL OF FAME</span>
          <h1>Top Intellectuals</h1>
          <p>
            Celebrate the sharpest minds across the globe. Filter by difficulty
            to see who masters the toughest challenges.
          </p>
        </div>

        {/* FILTER */}
        <div className="leaderboard-filter">
          <div className="leaderboard-levels">
            <button
              className={level === "All" ? "leaderboard-active" : ""}
              onClick={() => setLevel("All")}
            >
              All Levels
            </button>

            <button
              onClick={() => setLevel("easy")}
              className={level === "easy" ? "leaderboard-active" : ""}
            >
              Easy
            </button>

            <button
              onClick={() => setLevel("medium")}
              className={level === "medium" ? "leaderboard-active" : ""}
            >
              Medium
            </button>

            <button
              onClick={() => setLevel("hard")}
              className={level === "hard" ? "leaderboard-active" : ""}
            >
              Hard
            </button>
          </div>

          <input
            placeholder="Find a master..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TOP 3 */}
        <div className="leaderboard-top3">
          {top3.map((user, index) => (
            <div
              key={index}
              className={`leaderboard-card ${
                index === 1 ? "leaderboard-big" : ""
              }`}
            >
              <img src={getAvatar(user.email)} alt="" />
              <h3>{user.email.split("@")[0]}</h3>
              <p>{user.email}</p>

              {index === 1 ? (
                <>
                  <div className="leaderboard-score-box">
                    <span className="leaderboard-score">
                      {user.score * 100}
                    </span>
                    <small>Total Points</small>
                  </div>
                  <span className="leaderboard-badge">Grand Master</span>
                  <span className="leaderboard-rank leaderboard-one">
                    1
                  </span>
                </>
              ) : (
                <>
                  <div className="leaderboard-score">
                    {user.score * 100}
                  </div>
                  <span className="leaderboard-rank">
                    {index === 0 ? 2 : 3}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {others.map((user, index) => (
                <tr key={index}>
                  <td>#{index + 4}</td>
                  <td>{user.email}</td>
                  <td>{user.category || "General"}</td>
                  <td
                    className={`leaderboard-${user.difficulty}`}
                  >
                    {user.difficulty}
                  </td>
                  <td>{user.score * 100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Leaderboard;