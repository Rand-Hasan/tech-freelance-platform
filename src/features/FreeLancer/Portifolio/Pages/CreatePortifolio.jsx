import "../../Portifolio/Styles/CreatePortifolio.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import { CreatePortofolio } from "../../Portifolio/Services/CreatePortofolioApi";
import Loading from "../../../../components/Loading/Loading";

export default function CreatePortifolio() {
  const currentStep = 1;
  const totalSteps = 4;

  const navigate = useNavigate();
  const cookies = Cookies();

  const [data, setData] = useState({
    portofolio_title:"",
    description: "",
   github_link: "",
  });
// console.log("TOKEN =", cookies.get("token"));

 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }



  async function handleSave() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token");

 
    const body = new URLSearchParams();



      body.append("portofolio_title", data.portofolio_title);
      body.append("description", data.description);
      body.append("github_link", data.github_link);

    

      await axios.post(baseURL + CreatePortofolio, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/CreateCV");
    } catch (err) {
    console.log("FULL ERROR:", err.response?.data);

    const msg =
      err.response?.data?.errors?.[0]?.message ||
      err.response?.data?.message ||
      "Server Error";

    setError(msg);
  
  }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="portfolio-page">
      {loading && <Loading />}

      <div className="portfolio-card">

        {/* Progress */}
        <div className="progress-wrapper">
          <span className="step-text">
            Step {currentStep} of {totalSteps}
          </span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          <span className="section-name">Portfolio</span>
        </div>

        <h2 className="page-title">Add your Portfolio</h2>

        <p className="subtitle">
          Showcase your previous work. Connect your GitHub account to import
        </p>
        <p className="subtitle2">
          projects automatically.
        </p>
  {/* Error */}
        {error && <div className="error-message">{error}</div>}
        {/* GitHub */}
        <div className="github-box">
          <div className="github-left">
            <span>🐙</span>
            <span>GitHub account detected</span>
          </div>

          <div className="github-badge">
            github.com/yourusername
          </div>
        </div>

        {/* Project Title */}
        <div className="form-group">
          <label>portofolio name </label>
          <input
            type="text"
            name="portofolio_title"
            value={data.portofolio_title}
            onChange={handleChange}
            placeholder="e.g. E-commerce Platform"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label> description</label>
          <textarea
            rows="1"
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Briefly describe what this portofolio_ does..."
          />
        </div>

        {/* GitHub Link */}
        <div className="form-group">
          <label>GitHub link</label>
          <input
            type="text"
            name="github_link"
            value={data.github_link}
            onChange={handleChange}
            placeholder="https://github.com/username/repository-name"
          />
        </div>

      
       
        <div className="preview-list">
         
        </div>

      

        {/* Buttons */}
        <div className="action-row">
        

          <button className="primary-btn" onClick={handleSave}>
            Next → CV
          </button>
        </div>

        <div className="skip-link">
          Skip for now
        </div>

      </div>
    </div>
  );
}