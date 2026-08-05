import "../../../Admin/AssessmentQuestions/styles/AddQuestion.css";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {

  const navigate = useNavigate();

  return (

    <div className="add-question-page">

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

        <div className="form-row">

          <div>
            <label>Assessment Level</label>

            <select>
              <option>Junior</option>
              <option>Mid-Level</option>
              <option>Expert</option>
            </select>
          </div>

          <div>
            <label>Specialization</label>

            <select>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Mobile</option>
              <option>DevOps</option>
            </select>
          </div>

        </div>

        <label>Question</label>

        <textarea
          rows="4"
          placeholder="Write your question..."
        />

       <div className="answers-grid">

  <div className="answer-field">
    <label>Option A</label>
    <input type="text" placeholder="Enter option A" />
  </div>

  <div className="answer-field">
    <label>Option B</label>
    <input type="text" placeholder="Enter option B" />
  </div>

  <div className="answer-field">
    <label>Option C</label>
    <input type="text" placeholder="Enter option C" />
  </div>

  <div className="answer-field">
    <label>Option D</label>
    <input type="text" placeholder="Enter option D" />
  </div>

</div>

        <label>Correct Answer</label>

        <select>
          <option>Option A</option>
          <option>Option B</option>
          <option>Option C</option>
          <option>Option D</option>
        </select>

        <div className="buttons">

          <button className="save-btn">
            Add Question
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