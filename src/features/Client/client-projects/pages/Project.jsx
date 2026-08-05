import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../services/Api/api";
import { DeleteProject, GetClientProjects } from "../services/api_project";
import Cookies from "universal-cookie";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteForever } from "@mui/icons-material";
import "../styles/Project.css";
import axios from "axios";

export default function Projects() {

  const navigate = useNavigate();

  const [Allprojects, setAllprojects] = useState([]);
  const [filterproject, setfilterproject] = useState([]);
  const [activeTabbb, setactiveTabbb] = useState("all");

  const cookies = new Cookies();
  const token = cookies.get("token-client");


  useEffect(() => {

    fetch(`${baseURL}${GetClientProjects}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllprojects(data.projects);
        setfilterproject(data.projects);
      });

  }, []);



  useEffect(() => {

    if (activeTabbb === "all") {

      setfilterproject(Allprojects);

    } else {

      const result = Allprojects.filter(
        (project) => project.status === activeTabbb
      );

      setfilterproject(result);

    }

  }, [activeTabbb, Allprojects]);




  async function handleDelete(id) {

    if (!window.confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;


    try {

      await axios.post(
        `${baseURL}${DeleteProject}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setAllprojects((prev) =>
        prev.filter((p) => p.id !== id)
      );


    } catch (error) {

      console.error(error);
      alert("Failed delete project");

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
    "#C0392B",
  ];



  function stringToColor(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {

      hash = str.charCodeAt(i) + ((hash << 5) - hash);

    }


    return colors[Math.abs(hash) % colors.length];

  }



  return (

    <div className="client-project-page">


      <div className="client-project-filter-bar">


        <button
          onClick={() => setactiveTabbb("all")}
          className={
            activeTabbb === "all"
              ? "client-project-tab-btn client-project-active"
              : "client-project-tab-btn"
          }
        >
          All
        </button>



        <button
          onClick={() => setactiveTabbb("in_progress")}
          className={
            activeTabbb === "in_progress"
              ? "client-project-tab-btn client-project-active"
              : "client-project-tab-btn"
          }
        >
          In Progress
        </button>



        <button
          onClick={() => setactiveTabbb("in_review")}
          className={
            activeTabbb === "in_review"
              ? "client-project-tab-btn client-project-active"
              : "client-project-tab-btn"
          }
        >
          In Review
        </button>




        <button
          onClick={() => setactiveTabbb("open")}
          className={
            activeTabbb === "open"
              ? "client-project-tab-btn client-project-active"
              : "client-project-tab-btn"
          }
        >
          Open
        </button>




        <button
          onClick={() => setactiveTabbb("completed")}
          className={
            activeTabbb === "completed"
              ? "client-project-tab-btn client-project-active"
              : "client-project-tab-btn"
          }
        >
          Completed
        </button>




        <div style={{ flex: 1 }}></div>



        <button
          className="client-project-post-btn"
          onClick={() =>
            navigate("/clientlayout/createproject")
          }
        >
          + Post Project
        </button>


      </div>





      <div className="client-project-card">


        {
          filterproject?.map((project)=>(


            <div
              key={project.id}
              className="client-project-item"
            >



              <div
                className="client-project-icon"
                style={{
                  backgroundColor:
                    stringToColor(project.project_name)
                }}
              >

                {getInitial(project.project_name)}

              </div>





              <div
                className="client-project-details"
                onClick={() =>
                  navigate(
                    `/clientlayout/projectdetails/${project.id}`
                  )
                }
              >


                <h3 className="client-project-name">

                  {project.project_name}

                </h3>




                <p className="client-project-freelancer">

                  {
                    project.freelancer
                    ?
                    `Freelancer: ${project.freelancer}`
                    :
                    "Open for bids"
                  }

                </p>



              </div>





              <div className="client-project-meta">


                <span className="client-project-price">

                  ${project.price}

                </span>



                <span
                  className={
                    `client-project-status ${project.status}`
                  }
                >

                  📌 {project.status || "Open"}

                </span>



              </div>





              <div className="client-project-actions">


                <div
                  className="client-project-action-btn"
                  style={{
                    color:"#5ea0cc"
                  }}
                  onClick={() =>
                    navigate(
                      `/clientlayout/editproject/${project.id}`
                    )
                  }
                >

                  <EditIcon fontSize="small"/>

                </div>





                <div
                  className="client-project-action-btn"
                  style={{
                    color:"red"
                  }}
                  onClick={() =>
                    handleDelete(project.id)
                  }
                >

                  <DeleteForever fontSize="small"/>

                </div>


              </div>



            </div>


          ))
        }





        {
          filterproject?.length === 0 &&

          <p className="client-project-empty">

            No projects found in this section.

          </p>

        }


      </div>



    </div>

  );

}