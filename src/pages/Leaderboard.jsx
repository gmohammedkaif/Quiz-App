import React from "react";
// import "./index.css";

const Leaderboard = () => {
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
            <button className="leaderboard-active">All Levels</button>
            <button>Easy</button>
            <button>Medium</button>
            <button>Hard</button>
          </div>

          <input placeholder="Find a master..." />
        </div>

        {/* TOP 3 */}
        <div className="leaderboard-top3">

          {/* 2 */}
          <div className="leaderboard-card">
            <img src="https://i.pravatar.cc/100?img=1" alt="" />
            <h3>Alex Rivera</h3>
            <p>alex.riv@gmail.com</p>
            <div className="leaderboard-score">14,820</div>
            <span className="leaderboard-rank">2</span>
          </div>

          {/* 1 */}
          <div className="leaderboard-card leaderboard-big">
            <img src="https://i.pravatar.cc/100?img=2" alt="" />
            <h3>Sarah Jenkins</h3>
            <p>s.jenkins@academy.edu</p>

            <div className="leaderboard-score-box">
              <span className="leaderboard-score">15,400</span>
              <small>Total Points</small>
            </div>

            <span className="leaderboard-badge">Grand Master</span>
            <span className="leaderboard-rank leaderboard-one">1</span>
          </div>

          {/* 3 */}
          <div className="leaderboard-card">
            <img src="https://i.pravatar.cc/100?img=3" alt="" />
            <h3>Marcus Thorne</h3>
            <p>m.thorne@tech.io</p>
            <div className="leaderboard-score">13,950</div>
            <span className="leaderboard-rank">3</span>
          </div>

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
              <tr>
                <td>#4</td>
                <td>Elena Lupo</td>
                <td>Quantum Physics</td>
                <td className="leaderboard-hard">Hard</td>
                <td>12,400</td>
              </tr>

              <tr>
                <td>#5</td>
                <td>David Kim</td>
                <td>World History</td>
                <td className="leaderboard-medium">Medium</td>
                <td>11,900</td>
              </tr>

              <tr>
                <td>#6</td>
                <td>Maya Singh</td>
                <td>Art</td>
                <td className="leaderboard-easy">Easy</td>
                <td>10,250</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </>
  );
};

export default Leaderboard;