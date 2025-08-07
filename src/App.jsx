import React, { useState } from "react";
import questions from "./questions";
import "./App.css"; // Create this file for custom styles

function App() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // Handle selecting an answer
  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return; // prevent changes after submit
    const newAnswers = [...answers];
    newAnswers[qIdx] = optIdx;
    setAnswers(newAnswers);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter your name before submitting.");
      return;
    }
    // Prevent submission if any question is unanswered
    if (answers.some((ans) => ans === null)) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setError("");
    let total = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correct) total += 1;
    });
    setScore(total);
    setSubmitted(true);
    setShowDialog(true);
  };

  // Handle reset
  const handleReset = () => {
    setName("");
    setAnswers(Array(questions.length).fill(null));
    setScore(null);
    setSubmitted(false);
    setError("");
  };

  return (
    <>
      {showDialog && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Quiz Completed!</h2>
            <p>
              You scored {score} out of {questions.length}!
            </p>
            <button onClick={() => setShowDialog(false)}>OK</button>
          </div>
        </div>
      )}
      <div className="worksheet-container">
        <h1 className="worksheet-title">Rounding Off to Nearest 10</h1>
        <form
          className="worksheet-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="name-row">
            <label>
              Name:
              <input
                type="text"
                value={name}
                disabled={submitted}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="name-input"
              />
            </label>
            <span className="score-label">
              Score: <b>{score !== null ? score : "____"}</b>
            </span>
          </div>

          <div className="instructions">Choose the correct answers.</div>

          <div className="questions-list">
            {questions.map((q, qIdx) => (
              <div
                className={`question-block${
                  submitted &&
                  answers[qIdx] !== null &&
                  answers[qIdx] !== q.correct
                    ? " wrong-question"
                    : ""
                }`}
                key={qIdx}
              >
                <div className="question-text">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="options-row">
                  {q.options.map((opt, optIdx) => (
                    <button
                      type="button"
                      key={optIdx}
                      className={`option-btn
                        ${answers[qIdx] === optIdx ? "selected" : ""}
                        ${
                          submitted
                            ? optIdx === q.correct
                              ? "correct"
                              : answers[qIdx] === optIdx
                              ? "wrong"
                              : ""
                            : ""
                        }
                      `}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-row">
            <button type="submit" disabled={submitted}>
              Submit
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>

        <div className="copyright">copyright: www.mathinenglish.com</div>
      </div>
    </>
  );
}

export default App;
