import "../../Portifolio/Styles/CreatePortifolio.css";
import { useNavigate } from "react-router-dom";

export default function CreateCv() {
     const currentStep = 2;
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

  <span className="section-name">CV</span>

    <button
  className="primary-btn"
  onClick={() => navigate("/CreateSkillis")}
>
  Next →Skill
</button>
</div> </div> </div> 
  );
}