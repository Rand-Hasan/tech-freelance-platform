import  { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/UpdatePhaseOfferStyle.css"; 
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { UpdatePhaseOffer } from "../services/StageAndTaskApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function UpdatePhaseOfferPage() {
  const { phaseId } = useParams();
    const cookies = new Cookies();
    const token = cookies.get("token-client");
    const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");

  const [errors, setErrors] = useState({});

  const HandleUpdatePhaseOffer = (e) => {
    const bodydata={
        content:content,
        duration_day:duration
    }
    e.preventDefault();
   axios.post(`${baseURL}${UpdatePhaseOffer}/${phaseId}`,bodydata,{
    headers:{
         Authorization: `Bearer ${token}`,
    }
   })
   .then((response) => {
        console.log("Trueeeeeeeeeeee", response.json);
        setErrors({});
        navigate("..");
      })
   .catch((error) => {
   if (error.response) {
       const status = error.response.status;
       const message = error.response.data.message;
       
       if(status === 403 || status === 404) {
           alert(message); 
       } else if (error.response.data.errors) {
           const errs = {};
           error.response.data.errors.forEach(e => {
               errs[e.field === "duration_day" ? "duration" : e.field] = e.message;
           });
           setErrors(errs);
       }
   }
});

  };

  return (
    <div className="update-phase-container">
      <h2 className="page-title">Update Phase Offer #{phaseId}</h2>
      
     
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className={`form-input ${errors.content ? "input-error" : ""}`}
            rows="5"
            placeholder="Enter the phase content or description..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label >Duration (in days)</label>
          <input
            type="number"
            id="duration"
            className={`form-input ${errors.duration ? "input-error" : ""}`}
            placeholder="e.g., 7"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {errors.duration && <span className="error-text">{errors.duration}</span>}
        </div>

        <button  onClick={HandleUpdatePhaseOffer} className="submit-btn">
          Update Phase
        </button>
      
    </div>
  );
}