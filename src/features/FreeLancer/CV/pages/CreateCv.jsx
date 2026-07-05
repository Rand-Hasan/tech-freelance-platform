import "../../Portifolio/Styles/CreatePortifolio.css";

export default function CreateCv() {
     const currentStep = 2;
  const totalSteps = 4;

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
</div> </div> </div> 
  );
}