import { useEffect, useState } from "react";
import "../../AssessmentQuestions/styles/AssessmentQuestions.css";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaPen,
  FaTrash,
  FaCheck,
  FaBolt,
  FaTrophy,
  FaSeedling,
} from "react-icons/fa";

import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";

import {
  GetQuestions,
  DeleteQuestion,
} from "../../AssessmentQuestions/services/Questionapi";

export default function AssessmentQuestions() {
  const navigate = useNavigate();
  const cookies = Cookies();

  // =========================
  // Filter
  // =========================

  const [filter, setFilter] = useState("All");

  // =========================
  // Questions
  // =========================

  const [questions, setQuestions] = useState([]);

  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);

  // =========================
  // Error
  // =========================

  const [error, setError] = useState("");

  // =========================
  // Access Denied
  // =========================

  const [accessDenied, setAccessDenied] = useState(false);

  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // =========================
  // Check Permission Error
  // =========================

  function isPermissionError(error) {
    const status = error.response?.status;

    const backendMessage = error.response?.data?.message;

    // Backend 403
    if (status === 403) {
      return true;
    }

    // Backend message
    if (typeof backendMessage === "string") {
      const message = backendMessage.toLowerCase();

      return (
        message.includes("forbidden") ||
        message.includes("missing permission") ||
        message.includes("permission denied") ||
        message.includes("access denied")
      );
    }

    // Backend object message
    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {
      const objectMessage = backendMessage.message;

      if (typeof objectMessage === "string") {
        const message = objectMessage.toLowerCase();

        return (
          message.includes("forbidden") ||
          message.includes("missing permission") ||
          message.includes("permission denied") ||
          message.includes("access denied")
        );
      }
    }

    return false;
  }

  // =========================
  // Get Backend Error
  // =========================

  function getErrorMessage(error, defaultMessage) {
    const responseData = error.response?.data;

    const backendMessage = responseData?.message;

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {
      if (
        typeof backendMessage.message === "string"
      ) {
        return backendMessage.message;
      }
    }

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    return defaultMessage;
  }

  // =========================
  // Get Questions
  // =========================

  async function getQuestions() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetQuestions}/${page}/${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "QUESTIONS:",
        response.data
      );

      setQuestions(
        response.data.questions || []
      );

      setTotal(
        response.data.total || 0
      );

      // If request succeeds, remove access denied
      setAccessDenied(false);

    } catch (err) {
      console.log(
        "FULL ERROR:",
        err.response?.data
      );

      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {
        setAccessDenied(true);
        setQuestions([]);
        setTotal(0);
        return;
      }

      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to load assessment questions."
        )
      );

    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Delete Question
  // =========================

  async function handleDelete(questionId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token =
        cookies.get("token-employee");

      const response = await axios.post(
        `${baseURL}${DeleteQuestion}/${questionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "DELETE RESPONSE:",
        response.data
      );

      await getQuestions();

    } catch (err) {
      console.log(
        "FULL ERROR:",
        err.response?.data
      );

      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {
        setAccessDenied(true);
        setQuestions([]);
        setTotal(0);
        return;
      }

      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to delete question."
        )
      );

    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Load Questions
  // =========================

  useEffect(() => {
    getQuestions();
  }, [page]);

  // =========================
  // Badge
  // =========================

  function getBadge(level) {
    switch (level) {
      case "junior":
        return (
          <>
            <FaSeedling /> Junior
          </>
        );

      case "middle":
        return (
          <>
            <FaBolt /> Mid-Level
          </>
        );

      case "expert":
        return (
          <>
            <FaTrophy /> Expert
          </>
        );

      default:
        return level;
    }
  }

  // =========================
  // Filter Questions
  // =========================

  function getFilteredQuestions() {
    if (filter === "All") {
      return questions;
    }

    const levelMap = {
      Junior: "junior",
      "Mid-Level": "middle",
      Expert: "expert",
    };

    return questions.filter(
      (question) =>
        question.level ===
        levelMap[filter]
    );
  }

  const filteredQuestions =
    getFilteredQuestions();

  // =========================
  // Initial Loading
  // =========================

  if (loading && !accessDenied) {
    return (
      <div className="assessment-page">
        <Loading />
      </div>
    );
  }

  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {
    return (
      <div className="assessment-page">

        <div className="access-denied">

          <div className="access-denied-icon">
            🔒
          </div>

          <h1>
            Access Denied
          </h1>

          <p>
            You don't have permission
            to access this page.
          </p>

          <span>
            Please contact your administrator
            if you believe you should have access.
          </span>

        </div>

      </div>
    );
  }

  // =========================
  // Render
  // =========================

  return (
    <div className="assessment-page">

      {loading && <Loading />}

      {/* =========================
          Top
      ========================= */}

      <div className="assessment-top">

        <div className="filters">

          <button
            className={
              filter === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("All")
            }
          >
            All Levels
          </button>

          <button
            className={
              filter === "Junior"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Junior")
            }
          >
            <FaSeedling />
            Junior
          </button>

          <button
            className={
              filter === "Mid-Level"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Mid-Level")
            }
          >
            <FaBolt />
            Mid-Level
          </button>

          <button
            className={
              filter === "Expert"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Expert")
            }
          >
            <FaTrophy />
            Expert
          </button>

        </div>

        <button
          className="add-question-btn"
          onClick={() =>
            navigate(
              "/AdminLayout/AddQuestion"
            )
          }
        >
          <FaPlus />
          Add Question
        </button>

      </div>

      {/* =========================
          Error
      ========================= */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          Questions
      ========================= */}

      <div className="questions-wrapper">

        <h3>
          Showing{" "}
          {filteredQuestions.length}{" "}
          Questions
        </h3>

        {filteredQuestions.map((q) => {

          const answers = [
            {
              letter: "A",
              text: q.option_a,
            },
            {
              letter: "B",
              text: q.option_b,
            },
            {
              letter: "C",
              text: q.option_c,
            },
            {
              letter: "D",
              text: q.option_d,
            },
          ];

          return (
            <div
              className="question-card"
              key={q.id}
            >

              {/* =========================
                  Header
              ========================= */}

              <div className="question-header">

                <span className="badge">

                  {getBadge(q.level)}

                  {" - "}

                  {q.skill?.skill_name ||
                    "Unknown Skill"}

                </span>

                <div className="actions">

                  {/* Edit */}

                  <button
                    onClick={() =>
                      navigate(
                        `/AdminLayout/EditQuestion/${q.id}`
                      )
                    }
                  >
                    <FaPen />
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() =>
                      handleDelete(q.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

              {/* =========================
                  Question
              ========================= */}

              <h2>
                {q.question_text}
              </h2>

              {/* =========================
                  Answers
              ========================= */}

              <div className="answers">

                {answers.map(
                  (answer) => (

                    <div
                      key={
                        answer.letter
                      }
                      className={
                        answer.letter ===
                        q.correct_option
                          ? "answer correct"
                          : "answer"
                      }
                    >

                      {answer.letter ===
                        q.correct_option && (
                        <FaCheck />
                      )}

                      {answer.letter}:{" "}
                      {answer.text}

                    </div>

                  )
                )}

              </div>

            </div>
          );
        })}

        {/* =========================
            Empty
        ========================= */}

        {!loading &&
          filteredQuestions.length ===
            0 && (
            <div className="empty-message">
              No questions found.
            </div>
          )}

        {/* =========================
            Pagination
        ========================= */}

        {total > limit && (
          <div className="pagination">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) => prev - 1
                )
              }
            >
              Previous
            </button>

            <span>
              Page {page}
            </span>

            <button
              disabled={
                page * limit >= total
              }
              onClick={() =>
                setPage(
                  (prev) => prev + 1
                )
              }
            >
              Next
            </button>

          </div>
        )}

      </div>

    </div>
  );
}