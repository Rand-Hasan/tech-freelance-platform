import '../styles/card.css';
export default function Card({ id, icon, title, description }) {
  return (
    <div className="step-card">
      
      <div className="card-border-line"></div>
      
      <div className="card-body-content">
        <span className="step-number">{id}</span>
        
        <div className="step-icon-wrapper">
          <span className="step-emoji-icon">{icon}</span>
        </div>
        
        <h3 className="step-card-title">{title}</h3>
        <p className="step-card-desc">{description}</p>
      </div>
    </div>
  );
}