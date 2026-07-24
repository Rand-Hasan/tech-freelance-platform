import { NavLink, Outlet } from "react-router-dom";
import '../styles/ProjectFree.css'
export default function ProjectFree(){
    return(
       <div className="project-free">
        <div className="page-head">
            <div className="">
                <h1>Projects</h1>
                <p>Browse open work, manage client invitations, and track your active contracts.</p>
            </div>
            </div>
            <div className="project-tabs">
                <NavLink to="projectproposal">🔍 Available Projects</NavLink>
                <NavLink to="clientrequest">📩 Client Requests</NavLink>
                 <NavLink to="myproject">💼 My Projects</NavLink>
            </div>
            <div className="view-project">
                <Outlet/>
            </div>
       
       </div>
    )
}