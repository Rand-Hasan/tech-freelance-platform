import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Questions/styles/Assessment.css";

function AssessmentLevel() {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState("mid");

  const handleStart = () => {
    navigate("/AssessmentQuestionsf", {
      state: {
        level: selectedLevel,
      },
    });
  };

  return (
    
    <div className="assessment-container">
  
      {/* =========================
          HEADER
      ========================= */}

      <header className="assessment-header">

        <div className="assessment-title">
          <h2>Technical Assessment</h2>

          <p>
            Select your level, then answer 10 questions
          </p>
        </div>

        {/* Progress is 0% on level page */}
        <div className="assessment-progress">

          <div className="progress-top">
            <span>Progress</span>
            <span>Get ready</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "0%" }}
            />
          </div>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="assessment-main">

        <div className="level-content">

          <h1>
            What's your technical level?
          </h1>

          <p className="level-subtitle">
            We'll tailor the questions to match your experience
          </p>


          {/* =========================
              LEVEL CARDS
          ========================= */}

          <div className="level-options">

            {/* Junior */}

            <div
              className={`level-card ${
                selectedLevel === "junior"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedLevel("junior")
              }
            >

              <div className="level-icon">
                🌱
              </div>

              <h3>
                Junior
              </h3>

              <p>
                Less than 1 year exp.
              </p>

            </div>


            {/* Mid-Level */}

            <div
              className={`level-card ${
                selectedLevel === "mid"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedLevel("mid")
              }
            >

              <div className="level-icon">
                ⚡
              </div>

              <h3>
                Mid-Level
              </h3>

              <p>
                1–3 years exp.
              </p>

            </div>


            {/* Expert */}

            <div
              className={`level-card ${
                selectedLevel === "expert"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedLevel("expert")
              }
            >

              <div className="level-icon">
                🏆
              </div>

              <h3>
                Expert
              </h3>

              <p>
                3+ years exp.
              </p>

            </div>

          </div>


          {/* =========================
              START
          ========================= */}

          <button
            className="assessment-button"
            onClick={handleStart}
          >
            Start Assessment →
          </button>

        </div>

      </main>

    </div>
  );
}

export default AssessmentLevel;