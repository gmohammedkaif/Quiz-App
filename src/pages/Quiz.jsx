import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [answers, setAnswers] = useState([]);

  // FETCH
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${state.questions}&category=${state.category}&difficulty=${state.difficulty}&type=multiple`
      )
      .then((res) => {
        const formatted = res.data.results.map((q) => ({
          ...q,
          answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
      });
  }, []);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  // TIMER
  useEffect(() => {
    if (timer === 0) handleNext();

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSelect = (ans) => {
    setSelected(ans);
  };

  const handleNext = () => {
    const correct = questions[current].correct_answer;

    if (selected === correct) {
      setScore((prev) => prev + 1);
    }

    setAnswers([
      ...answers,
      {
        question: questions[current].question,
        correct,
        selected,
      },
    ]);

    setSelected(null);
    setTimer(15);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", {
        state: { score, total: questions.length, answers },
      });
    }
  };

  if (!questions.length) return <h2 className="quiz-loading">Loading...</h2>;

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-main">
      {/* TOP BAR */}
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

      {/* PROGRESS BAR */}
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* CARD */}
      <div className="quiz-card-new">
        <span className="quiz-tag">QUANTUM PHYSICS</span>

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
              <span className="quiz-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </div>
          ))}
        </div>

        <div className="quiz-bottom">
          <p className="quiz-report">⚑ Report Issue</p>

          <button className="quiz-submit-btn" onClick={handleNext}>
            Submit Answer →
          </button>
        </div>
      </div>

      {/* EXTRA CARDS */}
      <div className="quiz-footer-cards">
        <div className="quiz-hint">
          💡 This principle is a fundamental limit to how much we can know.
        </div>

        <div className="quiz-streak">
          🔥 5 IN A ROW
        </div>
      </div>
    </div>
  );
};

export default Quiz;