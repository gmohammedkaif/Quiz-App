import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserScore } from "../features/leaderboardSlice.js";
import { useSelector } from "react-redux";

const Quiz = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);

  const amount = state?.questionsCount || 10;
  const category = state?.category || 9;
  const difficulty = state?.difficulty || "medium";

  const hasFetched = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [answers, setAnswers] = useState([]);
  

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  // FETCH
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    axios
      .get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .then((res) => {
        const formatted = res.data.results.map((q) => ({
          ...q,
          answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  // TIMER
  useEffect(() => {
    if (timer === 0) {
  setTimeout(() => {
    handleNext("skip");
  }, 0);
}

    const interval = setInterval(() => {
  setTimer((prev) => (prev > 0 ? prev - 1 : 0));
}, 1000);

    return () => clearInterval(interval);
  }, [timer,questions]);

  const handleSelect = (ans) => {
    setSelected(ans);
  };

  // ✅ MAIN NEXT FUNCTION (handles submit + skip)
  const handleNext = (type = "submit") => {
    const currentQ = questions[current];
    if (!currentQ) return;
    const correct = currentQ.correct_answer;

    // ❌ prevent submit without selecting
    if (type === "submit" && !selected) {
      alert("Please select an answer!");
      return;
    }

    let updatedScore = score;
    let status = "skipped";

    if (type === "submit") {
      if (selected === correct) {
        updatedScore = score + 1;
        setScore(updatedScore);
        status = "correct";
      } else {
        status = "wrong";
      }
    }

    const updatedAnswers = [
      ...answers,
      {
        question: currentQ.question,
        correct,
        selected: type === "skip" ? null : selected,
        options: currentQ.answers,
        status, // correct / wrong / skipped
      },
    ];

    setAnswers(updatedAnswers);
    setSelected(null);
    setTimer(30);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
    

      dispatch(
        addUserScore({
          email: userEmail,
          score: updatedScore,
          total: questions.length,
          difficulty,
          category,
        })
      );
      navigate("/result", {
        state: {
          score: updatedScore,
          total: questions.length,
          answers: updatedAnswers,
        },
      });
    }
  };

  if (!questions.length) return <h2 className="quiz-loading">Loading...</h2>;

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-main">
      {/* TOP */}
      <div className="quiz-top">
        <div>
          <p className="quiz-progress-text">CURRENT PROGRESS</p>
          <h2>
            Question {current + 1} of {questions.length}
          </h2>
        </div>

        <div className="quiz-timer-box">
          ⏱ <span>{timer}</span>
          <p>Seconds Remaining</p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* CARD */}
      <div className="quiz-card-new">
        {/* ✅ FIXED CATEGORY */}
        <span className="quiz-tag">{q.category}</span>

        <h3 dangerouslySetInnerHTML={{ __html: q.question }} />

        <div className="quiz-options-grid">
          {q.answers.map((ans, i) => (
            <div
              key={i}
              className={`quiz-option ${selected === ans ? "quiz-selected" : ""
                }`}
              onClick={() => handleSelect(ans)}
            >
              <span className="quiz-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="quiz-bottom">
          <p className="quiz-report">⚑ Report Issue</p>

          <div style={{ display: "flex", gap: "10px" }}>
            {/* ✅ NEW SKIP BUTTON */}
            <button
              className="quiz-skip-btn"
              onClick={() => handleNext("skip")}
            >
              Skip
            </button>

            <button
              className="quiz-submit-btn"
              onClick={() => handleNext("submit")}
            >
              Submit Answer →
            </button>
          </div>
        </div>
      </div>

      {/* EXTRA */}
      <div className="quiz-footer-cards">
        <div className="quiz-hint">
          💡 This principle is a fundamental limit to how much we can know.
        </div>

        <div className="quiz-streak">🔥 5 IN A ROW</div>
      </div>
    </div>
  );
};

export default Quiz;