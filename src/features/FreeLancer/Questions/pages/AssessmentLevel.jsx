import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { GetSkills } from "../services/api_quiz";
import Loading from "../../../../components/Loading/Loading";
import "../../Questions/styles/Assessment.css";

function AssessmentLevel() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("junior");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${baseURL}${GetSkills}`)
      .then((response) => {
        if (!mounted) return;
        const list = response.data.skills || [];
        setSkills(list);
        if (list.length > 0) setSelectedSkillId(list[0].id);
      })
      .catch((err) => {
        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.errors?.[0]?.message ||
              "Failed to load skills"
          );
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleStart = () => {
    if (!selectedSkillId) {
      alert("Please select a specialization first.");
      return;
    }
    navigate("/AssessmentQuestionsf", {
      state: {
        level: selectedLevel,
        skillId: selectedSkillId,
      },
    });
  };

  return (
    <div className="assessment-container">
      {loading && <Loading />}

      <header className="assessment-header">
        <div className="assessment-title">
          <h2>Technical Assessment</h2>
          <p>Select your level, then answer 10 questions</p>
        </div>

        <div className="assessment-progress">
          <div className="progress-top">
            <span>Progress</span>
            <span>Get ready</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "0%" }} />
          </div>
        </div>
      </header>

      <main className="assessment-main">
        <div className="level-content">
          <h1>What's your technical level?</h1>
          <p className="level-subtitle">
            We'll tailor the questions to match your experience
          </p>

          <div className="skill-selector">
            <label className="skill-selector-label">
              Specialization
            </label>
            <select
              className="skill-select"
              value={selectedSkillId}
              onChange={(event) =>
                setSelectedSkillId(event.target.value)
              }
            >
              {skills.length === 0 && (
                <option value="">No skills available</option>
              )}
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skill_name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="level-error">{error}</p>}

          <div className="level-options">
            <div
              className={`level-card ${
                selectedLevel === "junior" ? "active" : ""
              }`}
              onClick={() => setSelectedLevel("junior")}
            >
              <div className="level-icon">🌱</div>
              <h3>Junior</h3>
              <p>Less than 1 year exp.</p>
            </div>

            <div
              className={`level-card ${
                selectedLevel === "middle" ? "active" : ""
              }`}
              onClick={() => setSelectedLevel("middle")}
            >
              <div className="level-icon">⚡</div>
              <h3>Mid-Level</h3>
              <p>1–3 years exp.</p>
            </div>

            <div
              className={`level-card ${
                selectedLevel === "expert" ? "active" : ""
              }`}
              onClick={() => setSelectedLevel("expert")}
            >
              <div className="level-icon">🏆</div>
              <h3>Expert</h3>
              <p>3+ years exp.</p>
            </div>
          </div>

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