import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "../../AssessmentQuestions/styles/EditQuestion.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";
import {
  GetQuestionById,
  UpdateQuestion,GetSkills
} from "../../AssessmentQuestions/services/Questionapi";

export default function EditQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = Cookies();

  const [data, setData] = useState({
    level: "",
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
const [skills, setSkills] = useState([]);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function getQuestion() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetQuestionById}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("QUESTION:", response.data);

      const question = response.data.question;

    setData({ 
  level: question.level || "", 
  skill_id: question.skill_id || "", 
  question_text: question.question_text || "", 
  option_a: question.option_a || "", 
  option_b: question.option_b || "", 
  option_c: question.option_c || "", 
  option_d: question.option_d || "", 
  correct_option:
    question.correct_option?.toUpperCase() || "A",
});
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
    console.log(
      "SKILLS ERROR:",
      err.response?.data
    );
  }
}
  async function handleUpdate() {
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
        `${baseURL}${UpdateQuestion}/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE RESPONSE:", response.data);

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

 useEffect(() => {
  getSkills();
  getQuestion();
}, [id]);
const selectedSkill =
  skills.find(
    (skill) =>
      Number(skill.id) === Number(data.skill_id)
  ) || null;

  return (
    <div className="edit-question-page">

      {loading && <Loading />}

      <div className="edit-question-card">

        <div className="edit-question-header">

          <button
            className="back-btnn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <h2>Edit Assessment Question</h2>

        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="edit-form-row">

          <div className="edit-form-group">
            <label>Assessment Level</label>

            <select
              name="level"
              value={data.level}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="junior">Junior</option>
              <option value="middle">Mid-Level</option>
              <option value="expert">Expert</option>
            </select>
          </div>

         <div className="edit-form-group">
  <label>Skill</label>

<Autocomplete
  options={skills}
  value={selectedSkill}
  getOptionLabel={(option) =>
    option.skill_name || ""
  }
  isOptionEqualToValue={(option, value) =>
    Number(option.id) === Number(value.id)
  }
  onChange={(event, newValue) => {
    setData((prev) => ({
      ...prev,
      skill_id: newValue
        ? newValue.id
        : "",
    }));
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Select Skill"
    />
  )}
/>
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

        <div className="edit-answers-grid">

          <div className="edit-answer-field">
            <label>Option A</label>

            <input
              type="text"
              name="option_a"
              value={data.option_a}
              onChange={handleChange}
              placeholder="Enter option A"
            />
          </div>

          <div className="edit-answer-field">
            <label>Option B</label>

            <input
              type="text"
              name="option_b"
              value={data.option_b}
              onChange={handleChange}
              placeholder="Enter option B"
            />
          </div>

          <div className="edit-answer-field">
            <label>Option C</label>

            <input
              type="text"
              name="option_c"
              value={data.option_c}
              onChange={handleChange}
              placeholder="Enter option C"
            />
          </div>

          <div className="edit-answer-field">
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

        <div className="edit-buttons">

          <button
            className="update-btn"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Question"}
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