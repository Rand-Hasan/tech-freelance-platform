import "../styles/AddPhaseDetailesStyle.css";
import { baseURL } from "../../../../services/Api/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddPhaseOffer } from "../services/StageAndTaskApi";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AddPhaseDetailes() {
    const [errors, setErrors] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [phase, setPhase] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
    allowed_revisions: "",
    duration_in_days: "",
  });
  const { contract_id } = useParams();

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handlePhaseChange(e) {
    setPhase({
      ...phase,
      [e.target.name]: e.target.value,
    });
  }

  function HandleAddPhaseOffer() {
  const bodyData = {
    content: content,
    phase: phase,
  };
  axios.post(`${baseURL}${AddPhaseOffer}/${contract_id}`, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("trueeee", response.data);
       setErrors([]);
      navigate("..");
    })
    .catch((error) => {
      console.log("errorrrr", error.response?.data);
       setErrors(error.response?.data?.errors || []);
    });
}

  return (
    <div className="AddPhaseDetailesContainer">
      <h2 className="AddPhaseDetailesTitle">Add New Phase Offer</h2>

      {errors.length > 0 && (
    <div className="ErrorsBox">
      {errors.map((err, index) => (
        <p key={index} className="ErrorLine">
          {err.message}
        </p>
      ))}
    </div>
  )}

      <div className="FormGroup">
        <label>Content</label>
        <textarea
          name="content"
          value={content}
          onChange={handleContentChange}
          placeholder="e.g. Adding a new phase for the reporting dashboard feature"
        />
      </div>

      <div className="FormGroup">
        <label>Phase Title</label>
        <input
          type="text"
          name="title"
          value={phase.title}
          onChange={handlePhaseChange}
          placeholder="e.g. Reporting Dashboard"
        />
      </div>

      <div className="FormGroup">
        <label>Phase Description</label>
        <textarea
          name="description"
          value={phase.description}
          onChange={handlePhaseChange}
          placeholder="e.g. Build analytics charts and export functionality"
        />
      </div>

      <div className="FormRow">
        <div className="FormGroup">
          <label>Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={phase.amount}
            onChange={handlePhaseChange}
            placeholder="150"
          />
        </div>

        <div className="FormGroup">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={phase.deadline}
            onChange={handlePhaseChange}
          />
        </div>
      </div>

      <div className="FormRow">
        <div className="FormGroup">
          <label>Allowed Revisions</label>
          <input
            type="number"
            name="allowed_revisions"
            value={phase.allowed_revisions}
            onChange={handlePhaseChange}
            placeholder="2"
          />
        </div>

        <div className="FormGroup">
          <label>Duration (days)</label>
          <input
            type="number"
            name="duration_in_days"
            value={phase.duration_in_days}
            onChange={handlePhaseChange}
            placeholder="4"
          />
        </div>
      </div>

      <button className="SubmitPhaseOfferBtn" onClick={HandleAddPhaseOffer}>
        Add Phase Offer
      </button>
    </div>
  );
}
