import { Outlet, NavLink, useParams } from "react-router-dom";
import "../styles/ProjectDetailes.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { GetClientProjectById } from "../services/api_project";
import Cookies from "universal-cookie";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id: ProjectId } = useParams();
  const [project, setdetailsProject] = useState(null);
const [skills, setSkills] = useState([]);
   const cookies= new Cookies();
   const token = cookies.get('token-client');
   useEffect(()=>{
    ShowDetails();
   },[ProjectId])
   const ShowDetails=async ()=>{
    try{
      const res = await axios.get(`${baseURL}${GetClientProjectById}${ProjectId}`,{
        headers:{Authorization:`Bearer ${token}`}
      })
      setdetailsProject(res.data.project);
      setSkills(res.data.skill);
    }catch(err){

    }
   }
   if (!project) {
    return <p>Loading...</p>;
}
  return (
    <div className="project-details-containerr">
     <div className="project-info-header">

    <button
        onClick={() => navigate("/clientlayout/projects")}
        className="backkkk-btn"
    >
        ← Back to My Projects
    </button>

    <h2>{project?.project_name}</h2>

    <p>{project?.description}</p>

    <div className="info-stats">

        <span>
            💰 <strong>Budget:</strong> ${project?.price}
        </span>

        <span>
            ⭐ <strong>Level:</strong> {project?.level_project}
        </span>

        <span>
            📅 <strong>Deadline:</strong>{" "}
            {new Date(project?.project_deadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}
        </span>

    </div>

    <div className="project-skills">

        <h4>Required Skills</h4>

        <div className="skills-list">

            {skills?.map((skill) => (
                <span
                    key={skill.id}
                    className="skill-tag"
                >
                    {skill.skill_name}
                </span>
            ))}

        </div>

    </div>

    {/* <button
        className="create-contract-btn"
        onClick={() => navigate("/clientlayout/createcontract")}
    >
        Create Contract
    </button> */}

</div>
      <div className="project-tabs">
        <NavLink to="" end className="tab-link">
          📁 Stages & Tasks
        </NavLink>

        <NavLink to="progress-monitor" className="tab-link">
          🗑️ FreeLancer Response 
        </NavLink>

        <NavLink to="WorkAndCodeReview" className="tab-link">
          💻 work & Code Review
        </NavLink>

        <NavLink to="matched-freelancers" className="tab-link">
          🤝 Matched Freelancers
        </NavLink>

        <NavLink to="offer-project" className="tab-link">
          ☑️ Submitted Proposal 
        </NavLink>
      </div>

      <div className="project-tab-content">
        <Outlet />
      </div>
    </div>
  );
}
