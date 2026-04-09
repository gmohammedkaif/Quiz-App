import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserScore } from "../features/leaderboardSlice.js";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { auth } from "../services/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { PiSmileySadLight } from "react-icons/pi";

const Quiz = () => {
  const location = useLocation();

  if (!location.state?.questionsCount) {
    return <Navigate to="/dashboard" replace />;
  }
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const userEmail = auth.currentUser?.email;

  const amount = state?.questionsCount || 10;
  const category = state?.category || 9;
  const difficulty = state?.difficulty || "medium";

  const hasFetched = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [streak, setStreak] = useState(0);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
  const storageKey = `quiz_${amount}_${category}_${difficulty}`;
  const saved = localStorage.getItem(storageKey);

  if (saved) {
    setQuestions(JSON.parse(saved));
    return;
  }

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      const formatted = res.data.results.map((q) => ({
        ...q,
        answers: shuffle([...q.incorrect_answers, q.correct_answer]),
      }));

      setQuestions(formatted);

      // 🔥 SAVE TO LOCAL STORAGE
      localStorage.setItem(storageKey, JSON.stringify(formatted));

    } catch (err) {
      if (err.response?.status === 429) {
        alert("Too many requests 😅 Please wait a few seconds and try again.");
      } else {
        alert("Failed to load quiz.");
      }
      console.error(err);
    }
  };

  fetchQuestions();
}, [amount, category, difficulty]);
  useEffect(() => {
    if (timer === 0) {
      setTimeout(() => {
        handleNext("skip").catch(console.error);
      }, 0);
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, questions]);

  const handleSelect = (ans) => {
    setSelected(ans);
    setError("");
  };

  const handleNext = async (type = "submit") => {
    const currentQ = questions[current];
    if (!currentQ) return;
    const correct = currentQ.correct_answer;

    if (type === "submit" && !selected) {
      setError("⚠ Please select an option before submitting");
      return;
    }

    let updatedScore = score;
    let status = "skipped";

    if (type === "submit") {
      if (selected === correct) {
        updatedScore = score + 1;
        setScore(updatedScore);
        setStreak((prev) => prev + 1);
        status = "correct";
      } else {
        setStreak(0);
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
        status,
      },
    ];

    setAnswers(updatedAnswers);
    setSelected(null);
    setTimer(30);
    setError("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const finalScore = Math.round((updatedScore / questions.length) * 100);

      try {
        if (finalScore > 0) {
          await setDoc(doc(db, "leaderboard", userEmail || "guest@gmail.com"), {
            email: userEmail || "guest@gmail.com",
            score: finalScore,
            total: questions.length,
            difficulty,
            category,
            createdAt: new Date(),
          });
        }
      } catch (err) {
        console.error("Firebase error:", err);
      }

      dispatch(
        addUserScore({
          email: userEmail || "guest@gmail.com",
          score: finalScore,
          total: questions.length,
          difficulty,
          category,
        }),
      );
      localStorage.setItem(
        "lastQuiz",
        JSON.stringify({
          score: finalScore,
          category,
        }),
      );
      navigate("/result", {
        state: {
          score: updatedScore,
          total: questions.length,
          answers: updatedAnswers,
          category,
          difficulty,
        },
        replace: true,
      });
    }
  };

  if (!questions.length) {
    return (
      <div className="quiz-loader-wrapper">
        <h2 className="quiz-loader-text">Loading Quiz...</h2>
        <div className="quiz-spinner"></div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-main">
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

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="quiz-card-new">
        <span className="quiz-tag">{q.category}</span>

        <h3 dangerouslySetInnerHTML={{ __html: q.question }} />

        <div className="quiz-options-grid">
          {q.answers.map((ans, i) => (
            <div
              key={i}
              className={`quiz-option ${
                selected === ans ? "quiz-selected" : ""
              }`}
              onClick={() => handleSelect(ans)}
            >
              <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </div>
          ))}
        </div>

        <div className="quiz-bottom">
          {error && <p className="quiz-error-text">{error}</p>}
          <p className="quiz-report">⚑ Report Issue</p>

          <div style={{ display: "flex", gap: "10px" }}>
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

      <div className="quiz-footer-cards">
        <div className="quiz-hint">
          💡 This principle is a fundamental limit to how much we can know.
        </div>

        <div className="quiz-streak">
          {streak > 0 ? (
            `🔥 ${streak} IN A ROW`
          ) : (
            <>
              <PiSmileySadLight /> No streak
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
