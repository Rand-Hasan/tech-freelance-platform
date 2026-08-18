import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import {
  StartAttempt,
  SubmitAttempt,
  GetAttemptResult,
  GetMyAttempts,
} from "../services/api_quiz";
import Loading from "../../../../components/Loading/Loading";
import "../../Questions/styles/Assessment.css";

const optionLetters = ["A", "B", "C", "D"];

function AssessmentQuestionsf() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = Cookies();

  const level = location.state?.level || "junior";
  const skillId = location.state?.skillId;
  const missingSkill = !skillId;

  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // ===== Detailed result (GetAttemptResult) =====
  const [detailedAnswers, setDetailedAnswers] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // ===== Attempts history (GetMyAttempts) =====
  const [myAttempts, setMyAttempts] = useState([]);
  const [attemptsPage, setAttemptsPage] = useState(1);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!skillId) return;

    const token = cookies.get("token-freelancer");

    axios
      .post(
        `${baseURL}${StartAttempt}`,
        { skill_id: skillId, level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setAttemptId(response.data.attempt_id);
        setQuestions(response.data.questions || []);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            err.response?.data?.errors?.[0]?.message ||
            "Failed to start the assessment"
        );
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[questionNumber - 1];
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : null;
  const progress =
    questions.length > 0
      ? Math.round((questionNumber / questions.length) * 100)
      : 0;

  const handleAnswer = (option) => {
    if (!currentQuestion) return;
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: option,
    }));
  };

  const handleSubmit = async () => {
    if (!attemptId) return;
    setSubmitting(true);
    setError("");

    const token = cookies.get("token-freelancer");
    const answerRows = questions
      .filter((question) => answers[question.id])
      .map((question) => ({
        question_id: question.id,
        selected_option: answers[question.id],
      }));

    try {
      const response = await axios.post(
        `${baseURL}${SubmitAttempt}/${attemptId}`,
        { answers: answerRows },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data.result);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to submit the assessment"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first.");
      return;
    }

    if (questionNumber < questions.length) {
      setQuestionNumber((previous) => previous + 1);
      return;
    }

    handleSubmit();
  };

  const handlePrevious = () => {
    if (questionNumber === 1) {
      navigate("/AssessmentLevel");
      return;
    }
    setQuestionNumber((previous) => previous - 1);
  };

  // ===================================================
  // GetAttemptResult -> per-question breakdown
  // ===================================================
  const handleShowDetails = async () => {
    if (!attemptId) return;

    // toggle off if already open and already loaded
    if (showDetails) {
      setShowDetails(false);
      return;
    }

    setShowDetails(true);

    if (detailedAnswers.length > 0) return; // already fetched, no need to refetch

    setLoadingDetails(true);
    const token = cookies.get("token-freelancer");

    try {
      const response = await axios.get(
        `${baseURL}${GetAttemptResult}/${attemptId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetailedAnswers(response.data.answers || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to load the detailed result"
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  // ===================================================
  // GetMyAttempts -> attempts history
  // ===================================================
  const handleShowHistory = async (page = 1) => {
    setShowHistory(true);
    setLoadingHistory(true);
    setAttemptsPage(page);

    const token = cookies.get("token-freelancer");
    const limit = 10;

    try {
      const response = await axios.get(
        `${baseURL}${GetMyAttempts}/${page}/${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyAttempts(response.data.attempts || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to load your attempts history"
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  const title =
    questions.length > 0
      ? `Question ${questionNumber} of ${questions.length}`
      : "Assessment";

  const renderHeader = (rightText, progressWidth) => (
    <header className="assessment-header">
      <div className="assessment-title">
        <h2>Technical Assessment</h2>
        <p>Select your level, then answer 10 questions</p>
      </div>

      <div className="assessment-progress">
        <div className="progress-top">
          <span>Progress</span>
          <span>{rightText}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </header>
  );

  if (missingSkill) {
    return (
      <div className="assessment-container">
        {renderHeader("Failed", "0%")}

        <main className="assessment-main">
          <div className="question-content">
            <div className="question-card">
              <div className="question-number">ASSESSMENT</div>

              <h1>
                Missing skill. Please go back and select a
                specialization.
              </h1>

              <div className="question-buttons">
                <button
                  className="previous-button"
                  onClick={() => navigate("/AssessmentLevel")}
                >
                  ← Back to Level
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="assessment-container">
        <Loading />
      </div>
    );
  }

  if (result) {
    return (
      <div className="assessment-container">
        {renderHeader(
          `${result.score_percentage}%`,
          `${result.score_percentage}%`
        )}

        <main className="assessment-main">
          <div className="question-content">
            <div
              className={`question-card result-card ${
                result.passed ? "result-passed" : "result-failed"
              }`}
            >
              <div className="question-number">RESULTS</div>

              <h1>
                {result.passed
                  ? "Congratulation job!"
                  : "Better luck next time"}
              </h1>

              <p className="result-score">
                You scored{" "}
                <strong>{result.score_percentage}%</strong>{" "}
                ({result.correct_answers} /{" "}
                {result.total_questions} questions)
              </p>

              <p className="result-status">
                {result.passed
                  ? "You passed the assessment."
                  : "You did not pass this time."}
              </p>

              <div className="question-buttons">
                <button
                  className="previous-button"
                  onClick={() => navigate("/AssessmentLevel")}
                >
                  ⬅️ Assessment Level
                </button>

                <button
                  className="previous-button"
                  onClick={() => navigate("/CreatePortifolio")}
                >
                  Next to Create Portifolio ➡️
                </button>

                {/* {result.passed && (
                  <button
                    className="next-button"
                    onClick={() => navigate("/freelancerlayout")}
                  >
                    Continue →
                  </button>
                )} */}
              </div>

              {/* ===== GetAttemptResult ===== */}
              <div className="question-buttons" style={{ marginTop: 12 }}>
                <button className="previous-button" onClick={handleShowDetails}>
                  {showDetails ? "Hide answer breakdown" : "View answer breakdown"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => handleShowHistory(1)}
                >
                  {showHistory ? "Refresh my attempts" : "View my attempts history"}
                </button>
              </div>

              {showDetails && (
                <div style={{ marginTop: 16, textAlign: "left" }}>
                  {loadingDetails ? (
                    <Loading />
                  ) : (
                    detailedAnswers.map((row, index) => (
                      <div
                        key={row.id || index}
                        style={{
                          padding: "10px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <p>
                          <strong>
                            Q{index + 1}. {row.question?.question_text}
                          </strong>
                        </p>
                        <p>
                          Your answer:{" "}
                          <strong>{row.selected_option || "—"}</strong>{" "}
                          {row.is_correct ? "✅" : "❌"}
                          {!row.is_correct && (
                            <>
                              {" "}
                              (correct: <strong>{row.question?.correct_option}</strong>)
                            </>
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {showHistory && (
                <div style={{ marginTop: 16, textAlign: "left" }}>
                  {loadingHistory ? (
                    <Loading />
                  ) : myAttempts.length === 0 ? (
                    <p>No previous attempts found.</p>
                  ) : (
                    <>
                      {myAttempts.map((attempt) => (
                        <div
                          key={attempt.id}
                          style={{
                            padding: "10px 0",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          <p>
                            <strong>{attempt.skill?.skill_name}</strong> —{" "}
                            {attempt.level} — {attempt.status}
                          </p>
                          {attempt.status === "completed" && (
                            <p>
                              Score: {attempt.score_percentage}% —{" "}
                              {attempt.passed ? "Passed ✅" : "Failed ❌"}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="question-buttons" style={{ marginTop: 8 }}>
                        <button
                          className="previous-button"
                          disabled={attemptsPage === 1}
                          onClick={() => handleShowHistory(attemptsPage - 1)}
                        >
                          ← Previous page
                        </button>
                        <button
                          className="next-button"
                          disabled={myAttempts.length < 10}
                          onClick={() => handleShowHistory(attemptsPage + 1)}
                        >
                          Next page →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {error && <p className="level-error">{error}</p>}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="assessment-container">
        {renderHeader("Failed", "0%")}

        <main className="assessment-main">
          <div className="question-content">
            <div className="question-card">
              <div className="question-number">ASSESSMENT</div>

              <h1>
                {error || "No questions available for this level yet"}
              </h1>

              <div className="question-buttons">
                <button
                  className="previous-button"
                  onClick={() => navigate("/AssessmentLevel")}
                >
                  ← Back to Level
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      {submitting && <Loading />}

      {renderHeader(title, `${progress}%`)}

      <main className="assessment-main">
        <div className="question-content">
          <div className="question-card">
            <div className="question-number">{title}</div>

            <h1>{currentQuestion.question_text}</h1>

            <div className="answers">
              {optionLetters.map((letter) => {
                const optionText =
                  currentQuestion[`option_${letter.toLowerCase()}`];
                const isSelected = selectedAnswer === letter;

                return (
                  <div
                    key={letter}
                    className={`answer ${isSelected ? "selected" : ""}`}
                    onClick={() => handleAnswer(letter)}
                  >
                    <div className="answer-letter">{letter}</div>
                    <span>{optionText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {error && <p className="level-error">{error}</p>}

          <div className="question-buttons">
            <button className="previous-button" onClick={handlePrevious}>
              ← Previous
            </button>

            <button className="next-button" onClick={handleNext}>
              {questionNumber === questions.length
                ? "Submit Assessment ✓"
                : "Next Question →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AssessmentQuestionsf;
