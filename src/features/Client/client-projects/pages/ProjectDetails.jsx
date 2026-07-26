import { Outlet, NavLink, useLocation,useParams } from "react-router-dom";
import "../styles/ProjectDetailes.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ProjectDetails() {
   
  const navigate = useNavigate();
    const cookies = new Cookies();
    const ProjectId=cookies.get("projectId");
  return (
    <div className="project-details-containerr">
      <div className="project-info-header">
        <button
          onClick={() => {
            navigate("/clientlayout/projects");
          }}
          className="back-btn"
        >
          ⬅️Back to My Projects
        </button>
        <h2>
           ID Of Project : {ProjectId}
        </h2>
        <p>Complete redesign of the storefront...</p>
        <div className="info-stats">
          <span>Freelancer: Ahmad</span>
          <span>Total Value: $1,800</span>
          <span>Progress: 72%</span>
          <span>Dead Line</span>
        </div>
        <h1></h1>
      </div>

      <div className="project-tabs">
        <NavLink to="" end className="tab-link">
          📁 Stages & Tasks
        </NavLink>

        <NavLink to="progress-monitor" className="tab-link">
          📈 progress monitor
        </NavLink>

        <NavLink to="WorkAndCodeReview" className="tab-link">
          💻 work & Code Review
        </NavLink>

        <NavLink to="matched-freelancers" className="tab-link">
          🤝 Matched Freelancers
        </NavLink>

        {/* <NavLink to="Invaitations" className="tab-link">
          📩 Invaitations 
        </NavLink> */}
      </div>

      <div className="project-tab-content">
        <Outlet />
      </div>
    </div>
  );
}
