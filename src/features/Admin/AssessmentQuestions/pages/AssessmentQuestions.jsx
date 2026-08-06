import { useState } from "react";
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

export default function AssessmentQuestions() {
  const [filter, setFilter] = useState("All");
const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      level: "Mid-Level",
      category: "Web Dev",
      title: "What is the difference between let, const, and var in JavaScript?",
      answers: [
        "A: No difference — they all work the same way",
        "B: var has function scope, let and const have block scope",
        "C: const cannot be declared inside functions",
        "D: let is the only one that supports hoisting",
      ],
      correct: 1,
    },
    {
      id: 2,
      level: "Expert",
      category: "DevOps",
      title: "In Kubernetes, what is the difference between a Deployment and a StatefulSet?",
      answers: [
        "A: There is no practical difference",
        "B: StatefulSets are faster to deploy",
        "C: StatefulSets provide stable identity and storage",
        "D: Deployments require persistent volumes",
      ],
      correct: 2,
    },
  ];

  const getBadge = (level) => {
    switch (level) {
      case "Junior":
        return (
          <>
            <FaSeedling /> Junior
          </>
        );

      case "Mid-Level":
        return (
          <>
            <FaBolt /> Mid-Level
          </>
        );

      case "Expert":
        return (
          <>
            <FaTrophy /> Expert
          </>
        );

      default:
        return level;
    }
  };

  return (
    <div className="assessment-page">
      {/* ================= Header ================= */}

      <div className="assessment-top">

        <div className="filters">

          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All Levels
          </button>

          <button
            onClick={() => setFilter("Junior")}
          >
            <FaSeedling /> Junior
          </button>

          <button
            onClick={() => setFilter("Mid-Level")}
          >
            <FaBolt /> Mid-Level
          </button>

          <button
            onClick={() => setFilter("Expert")}
          >
            <FaTrophy /> Expert
          </button>

        </div>

       <button
  className="add-question-btn"
  onClick={() => navigate("/AdminLayout/AddQuestion")}
>
  <FaPlus />
  Add Question
</button>

      </div>

      {/* ================= List ================= */}

      <div className="questions-wrapper">

        <h3>
          Showing {questions.length} Questions
        </h3>

        {questions.map((q) => (
          <div className="question-card" key={q.id}>

            <div className="question-header">

              <span className="badge">
                {getBadge(q.level)} - {q.category}
              </span>

              <div className="actions">

                <button>
                  <FaPen />
                </button>

                <button>
                  <FaTrash />
                </button>

              </div>

            </div>

            <h2>{q.title}</h2>

            <div className="answers">

              {q.answers.map((answer, index) => (

                <div
                  key={index}
                  className={
                    index === q.correct
                      ? "answer correct"
                      : "answer"
                  }
                >
                  {index === q.correct && <FaCheck />}
                  {answer}
                </div>

              ))}

            </div>

          </div>
        ))}

      </div>

      {/* ================= Modal ================= */}

    
    </div>
  );
}