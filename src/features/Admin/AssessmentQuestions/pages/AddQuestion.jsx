
import "../../../Admin/AssessmentQuestions/styles/AddQuestion.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import { AddQuestions } from "../../AssessmentQuestions/services/Questionapi";
import {  GetSkills, } from '../../../Client/client-projects/services/api_project';
import Loading from "../../../../components/Loading/Loading";

export default function AddQuestion() {
  const navigate = useNavigate();
  const cookies = Cookies();
const [skills, setSkills] = useState([]);
  const [data, setData] = useState({
    level: "junior",
    skill_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
  async function getSkills() {
    try {
      const token = cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetSkills}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("SKILLS:", response.data);

      setSkills(response.data.skills || []);
    } catch (err) {
      console.log("SKILLS ERROR:", err.response?.data);

      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Failed to load skills";

      setError(msg);
    }
  }

  getSkills();
}, []);
  async function handleSave() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token-employee");

      const body = new URLSearchParams();

      body.append("skill_id", data.skill_id);
      body.append("level", data.level);
      body.append("question_text", data.question_text);
      body.append("option_a", data.option_a);
      body.append("option_b", data.option_b);
      body.append("option_c", data.option_c);
      body.append("option_d", data.option_d);
      body.append("correct_option", data.correct_option);

      const response = await axios.post(
       `${baseURL}${AddQuestions}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("QUESTION CREATED:", response.data);

      navigate(-1);
    } catch (err) {
      console.log("FULL ERROR:", err.response?.data);

      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Server Error";

      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-question-page">
      {loading && <Loading />}

      <div className="add-question-card">

        <div className="page-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <h2>Add Assessment Question</h2>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-row">

          <div>
            <label>Assessment Level</label>

            <select
              name="level"
              value={data.level}
              onChange={handleChange}
            >
              <option value="junior">Junior</option>
              <option value="middle">Mid-Level</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label>Specialization</label>

          <select
  name="skill_id"
  value={data.skill_id}
  onChange={handleChange}
>
  <option value="">Select Specialization</option>

  {skills.map((skill) => (
    <option
      key={skill.id}
      value={skill.id}
    >
      {skill.skill_name}
    </option>
  ))}
</select>
          </div>

        </div>

        <label>Question</label>

        <textarea
          rows="4"
          name="question_text"
          value={data.question_text}
          onChange={handleChange}
          placeholder="Write your question..."
        />

        <div className="answers-grid">

          <div className="answer-field">
            <label>Option A</label>
            <input
              type="text"
              name="option_a"
              value={data.option_a}
              onChange={handleChange}
              placeholder="Enter option A"
            />
          </div>

          <div className="answer-field">
            <label>Option B</label>
            <input
              type="text"
              name="option_b"
              value={data.option_b}
              onChange={handleChange}
              placeholder="Enter option B"
            />
          </div>

          <div className="answer-field">
            <label>Option C</label>
            <input
              type="text"
              name="option_c"
              value={data.option_c}
              onChange={handleChange}
              placeholder="Enter option C"
            />
          </div>

          <div className="answer-field">
            <label>Option D</label>
            <input
              type="text"
              name="option_d"
              value={data.option_d}
              onChange={handleChange}
              placeholder="Enter option D"
            />
          </div>

        </div>

        <label>Correct Answer</label>

        <select
          name="correct_option"
          value={data.correct_option}
          onChange={handleChange}
        >
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        <div className="buttons">

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Question"}
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}