import "../../Portifolio/Styles/CreatePortifolio.css";
import { useNavigate } from "react-router-dom";
export default function CreatePortifolio() {
     const currentStep = 1;
  const totalSteps = 4;
const navigate = useNavigate();

  return (
    <div className="portfolio-page">
      <div className="portfolio-card">

        {/* Progress */}
    <div className="progress-wrapper">
  <span className="step-text">
    Step {currentStep} of {totalSteps}
  </span>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${(currentStep / totalSteps) * 100}%`,
      }}
    ></div>
  </div>

  <span className="section-name">Portfolio</span>
</div>

        {/* Title */}
        <h2 className="page-title">Add your Portfolio</h2>

        <p className="subtitle">
          Showcase your previous work. Connect your GitHub account to import

        </p>
          <p className="subtitle2">
          projects automatically.
        </p>


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

        {/* Project Name */}
        <div className="form-group">
          <label>Project name</label>

          <input
            type="text"
            placeholder="e.g. E-commerce Platform"
          />
        </div>

        {/* Project Description */}
        <div className="form-group">
          <label>Project description</label>

          <textarea
            rows="1"
            placeholder="Briefly describe what this project does and the technologies used..."
          />
        </div>

        {/* GitHub Link */}
        <div className="form-group">
          <label>GitHub link</label>

          <input
            type="text"
            placeholder="https://github.com/username/repository-name"
          />
        </div>

        {/* Upload Screenshots */}
        <div className="form-group">
          <label>
            Project screenshots 
            {/* <span className="optional">(optional)</span> */}
          </label>

          <div className="upload-box">
            <div className="upload-content">
              <span className="upload-icon">📸</span>

              <p>Click to upload screenshots</p>

              <small>PNG, JPG up to 5MB each</small>
            </div>
          </div>
        </div>

        {/* Preview Images */}
        <div className="preview-list">
          <div className="preview-item">
            🖼️
          </div>

          <div className="preview-item">
            🖼️
          </div>

          <div className="preview-item add">
            +
          </div>
        </div>

        {/* Buttons */}
        <div className="action-row">
          <button className="secondary-btn">
            + Add Another Project
          </button>

         <button
  className="primary-btn"
  onClick={() => navigate("/CreateCv")}
>
  Next → CV
</button>
        </div>

        {/* Skip */}
        <div className="skip-link">
          Skip for now
        </div>

      </div>
    </div>
  );
}