import React from "react";
import "../styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
    const navigate = useNavigate();

    return (
        <div
            className="project-card"
            
        >
            <div className="project-card-main">

                <div className="project-icon">
                    🖥️
                </div>

                <h3 className="project-title">
                    {project.project_name}
                </h3>

            </div>

            <div className="project-card-arrow"  onClick={() =>
                navigate(
                    `/freelancerlayout/projectfree/projectproposaldetails/${project.id}`
                )
            }>
                →
            </div>
        </div>
    );
}