import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";

const Leaderboard = () => {
  const categoryMap = {
    9: "General",
    21: "Sports",
    23: "History",
    17: "Science",
    18: "Tech",
  };
  const [users, setUsers] = useState([]);

  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "leaderboard"));
        const data = snapshot.docs.map((doc) => doc.data());
        setUsers(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchUsers();
  }, []);

  let filteredUsers =
    level === "All"
      ? users
      : users.filter((u) => u.difficulty === level.toLowerCase());

  filteredUsers = filteredUsers.filter((u) => u.score > 0);

  filteredUsers = filteredUsers.filter(
    (u) => u.email && u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const top3 = sortedUsers.slice(0, 3);

  const others = sortedUsers.slice(3);

  const getAvatar = (email) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${email}`;

  return (
    <>
      <Navbar />

      <main className="leaderboard-main">
        <div className="leaderboard-hero">
          <span className="leaderboard-tag">HALL OF FAME</span>
          <h1>Top Intellectuals</h1>
          <p>
            Celebrate the sharpest minds across the globe. Filter by difficulty
            to see who masters the toughest challenges.
          </p>
        </div>

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

              {index === 0 ? (
                <>
                  <div className="leaderboard-score-box">
                    <span className="leaderboard-score">{user.score}</span>
                    <small>Total Points</small>
                  </div>
                  <span className="leaderboard-badge">{user.difficulty}</span>
                  <span className="leaderboard-rank leaderboard-one">1</span>
                </>
              ) : (
                <>
                  <div className="leaderboard-score">{user.score}</div>
                  <small>{user.difficulty}</small>
                  <span className="leaderboard-rank">{index + 1}</span>
                </>
              )}
            </div>
          ))}
        </div>

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
                  <td>{categoryMap[user.category] || "General"}</td>
                  <td className={`leaderboard-${user.difficulty}`}>
                    {user.difficulty}
                  </td>
                  <td>{user.score}</td>
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
