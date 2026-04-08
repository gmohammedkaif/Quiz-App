import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { GiTrophy } from "react-icons/gi";
import { FaRedo } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();

  if (!location.state?.answers) {
    console.log("No state, but staying on page");
  }
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No Data Found</h2>;

  const { score, total, answers, category, difficulty } = state;

  const correctCount = answers.filter((a) => a.status === "correct").length;
  const wrongCount = answers.filter((a) => a.status === "wrong").length;
  const skippedCount = answers.filter((a) => a.status === "skipped").length;

  const percentage = (score / total) * 100;

  return (
    <div className="result-main-wrap">

      <div className="result-header-box">
        <div className="result-icon">
          <GiTrophy />
        </div>
        <h1>Great Job!</h1>
        <p>
          You've successfully completed the <span>Quiz</span>. Your cognitive
          agility is impressive.
        </p>
      </div>

  
      <div className="result-top-grid">
   
        <div className="result-score-card">
          <h2 className="result-score-number">
            {score} <span>/ {total}</span>
          </h2>

          <p className="result-points">POINTS EARNED: {score * 100}</p>

          <div className="result-progress-bar">
            <div
              className="result-progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="result-actions">
          <button
            className="result-btn retake-btn"
            onClick={() =>
              navigate("/quiz", {
                state: {
                  questionsCount: total,
                  category,
                  difficulty,
                },
                replace: true,
              })
            }
          >
            <FaRedo /> Retake Quiz
          </button>

          <button
          className="result-btn leaderboard-btn"
           onClick={() => navigate("/leaderboard")}>
            < MdLeaderboard /> View Leaderboard
          </button>

          <button
            className="result-btn dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome /> Go to Dashboard
          </button>
        </div>
      </div>

      <div className="result-review-head">
        <h2>Question Review</h2>

        <div className="result-badges">
          <span className="badge-correct">● {correctCount} Correct</span>
          <span className="badge-wrong">● {wrongCount} Incorrect</span>
          <span className="badge-skip">● {skippedCount} Skipped</span>
        </div>
      </div>

      <div className="result-questions-wrap">
        {answers.map((item, index) => (
          <div
            key={index}
            className={`result-question-card ${
              item.status === "correct"
                ? "correct-card"
                : item.status === "wrong"
                  ? "wrong-card"
                  : "skip-card"
            }`}
          >
            <p className="result-q-no">QUESTION {index + 1}</p>

            <h3 dangerouslySetInnerHTML={{ __html: item.question }} />

            <div className="result-answer-row">
    
              <div
                className={`result-answer-box ${
                  item.status === "correct"
                    ? "ans-correct"
                    : item.status === "wrong"
                      ? "ans-wrong"
                      : "ans-skip"
                }`}
              >
                <p>Your Answer</p>
                <span>
                  {item.selected ? (
                    <span dangerouslySetInnerHTML={{ __html: item.selected }} />
                  ) : (
                    "Skipped"
                  )}
                </span>
              </div>

              <div className="result-answer-box ans-correct">
                <p>Correct Answer</p>
                <span dangerouslySetInnerHTML={{ __html: item.correct }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
