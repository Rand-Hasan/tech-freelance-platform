import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { data, Link, useNavigate, } from "react-router-dom";
import { baseURL } from "../../../../services/Api/api";
import { DeleteProject, GetClientProjects } from "../services/api_project";
import Cookies from "universal-cookie";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import '../styles/Project.css';
import { Delete, DeleteForever } from "@mui/icons-material";
import axios from "axios";
export default function Projects() {
  const navigate = useNavigate();
  const [Allprojects, setAllprojects] = useState([]);
  const [filterproject, setfilterproject] = useState([]);
  const [activeTab, setactiveTab] = useState("all");
  const cookies = new Cookies();
  const token = cookies.get('token');


  useEffect(() => {
    fetch(`${baseURL}${GetClientProjects}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setAllprojects(data.projects);
        console.log(data.projects)
        setfilterproject(data.projects);
      });
  }, []);


  useEffect(() => {
    if (activeTab == 'all') {
      setfilterproject(Allprojects);
    } else {

      // if (!Allprojects[0]?.status) {
      //     setfilterproject(Allprojects);
      //     return;
      // }

      const result = Allprojects.filter(
        project => project.status === activeTab
      );

      setfilterproject(result);

    }
  }, [activeTab, Allprojects]);

  async function handleDelete(id) {
    if (!window.confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    try {
      const res = await axios.post(
        `${baseURL}${DeleteProject}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted:", res.data);

      setAllprojects(prev => prev.filter(p => p.id !== id));

    } catch (error) {
      console.error("خطأ أثناء الحذف:", error.response?.data || error);
      alert("فشل حذف المشروع");
    }
  }


  function getInitial(name) {
    if (!name) return "?";

    return name.charAt(0).toUpperCase();
  }
  const colors = [
    "#2A9D8F",
    "#4361EE",
    "#F4A261",
    "#E76F51",
    "#8E44AD",
    "#16A085",
    "#D35400",
    "#27AE60",
    "#C0392B"
  ];
  function stringToColor(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];

  }
  return (
    <div className="page-view-project">

      <div className="filter-bar">
        <button
          onClick={() => setactiveTab('all')}
          className={activeTab === 'all' ? 'tab-btn active' : 'tab-btn'}
        >
          All
        </button>

        <button
          onClick={() => setactiveTab('in_progress')}
          className={activeTab === 'in_progress' ? 'tab-btn active' : 'tab-btn'}
        >
          In Progress
        </button>

        <button
          onClick={() => setactiveTab('in_review')}
          className={activeTab === 'in_review' ? 'tab-btn active' : 'tab-btn'}
        >
          In Review
        </button>

        <button
          onClick={() => setactiveTab('open')}
          className={activeTab === 'open' ? 'tab-btn active' : 'tab-btn'}
        >
          Open
        </button>

        <button
          onClick={() => setactiveTab('completed')}
          className={activeTab === 'completed' ? 'tab-btn active' : 'tab-btn'}
        >
          Completed
        </button>
        <div style={{ flex: 1 }}></div>
        <button className="tobar-btn" onClick={() => navigate('/createproject')}>+ post project</button>
      </div>

      <div className="card-project">

        {filterproject?.map((project) => (

          <div key={project.id} className="project-item">

            {/* أيقونة المشروع */}
            <div
              className="project-icon"
              style={{
                backgroundColor: stringToColor(project.project_name)
              }}
            >
              {getInitial(project.project_name)}

            </div>

            {/* معلومات المشروع */}
            <div className="project-details">

              <h3 className="project-name">
                {project.project_name}
              </h3>

              <p className="project-freelancer">
                {project.freelancer
                  ? `Freelancer: ${project.freelancer}`
                  : "Open for bids"}
              </p>


            </div>

            <div className="project-meta">

              <span className="project-price">
                {/* 💰 */}
                ${project.price}
              </span>

              <span className={`status-badge ${project.status}`}>
                📌{project.status || "Open"}
              </span>

            </div>

            <div className="project-actions">

              <div
                className="action-btn" style={{ color: "#5ea0cc" }}
                onClick={() => navigate(`/editproject/${project.id}`)}
              >
                <EditIcon fontSize="small" />
              </div>

              <div
                className="action-btn" style={{ color: "red" }}
                onClick={() => handleDelete(project.id)}
              >
                <DeleteForever fontSize="small" />
              </div>

            </div>

          </div>

        ))}

        {filterproject?.length === 0 && (
          <p className="no-projects-text">
            No projects found in this section.
          </p>
        )}

      </div>

    </div>
  );
}