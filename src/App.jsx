import React, { useState, useRef, useEffect } from "react";
import questions from "./questions";
import "./App.css"; // Create this file for custom styles

function App() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [shouldFocusName, setShouldFocusName] = useState(false);

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!showDialog && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showDialog]);

  useEffect(() => {
    if (!submitted && shouldFocusName && nameInputRef.current) {
      nameInputRef.current.focus();
      setShouldFocusName(false);
    }
  }, [submitted, shouldFocusName]);

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
      if (nameInputRef.current) nameInputRef.current.focus();
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
    setShowDialog(false);
    setShouldFocusName(true);
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
            <div className="modal-feedback">
              {questions.map((q, idx) => {
                const userAnswerIdx = answers[idx];
                const isCorrect = userAnswerIdx === q.correct;
                return (
                  <div
                    key={idx}
                    style={{
                      marginBottom: 18,
                      background: isCorrect ? "#e8f7ec" : "#fff1f2",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>
                      {idx + 1}. {q.question}
                    </div>
                    <div>
                      Your answer:{" "}
                      <b style={{ color: isCorrect ? "#217353" : "#d62828" }}>
                        {userAnswerIdx !== null ? (
                          q.options[userAnswerIdx]
                        ) : (
                          <span style={{ color: "#999" }}>No answer</span>
                        )}
                      </b>{" "}
                      {isCorrect ? (
                        <span style={{ color: "#36b37e", fontWeight: 700 }}>
                          ✔ Correct
                        </span>
                      ) : (
                        <span style={{ color: "#d62828", fontWeight: 700 }}>
                          ✗ Incorrect
                        </span>
                      )}
                    </div>
                    {!isCorrect && (
                      <div>
                        Correct answer:{" "}
                        <b style={{ color: "#217353" }}>
                          {q.options[q.correct]}
                        </b>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
                ref={nameInputRef}
                type="text"
                value={name}
                disabled={submitted}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="name-input"
                aria-invalid={
                  !!(error === "Please enter your name before submitting.")
                }
              />
            </label>
            <span className="score-label">
              Score: <b>{score !== null ? score : "____"}</b>
            </span>
            {error === "Please enter your name before submitting." && (
              <div className="error-message" style={{ marginTop: 4 }}>
                {error}
              </div>
            )}
          </div>

          <div className="instructions">Choose the correct answers.</div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-label">
              Progress: {answers.filter((ans) => ans !== null).length} /{" "}
              {questions.length}
            </div>
            <div className="progress-bar-outer">
              <div
                className="progress-bar-inner"
                style={{
                  width: `${
                    (answers.filter((ans) => ans !== null).length /
                      questions.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

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

          {error && error !== "Please enter your name before submitting." && (
            <div className="error-message">{error}</div>
          )}

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
