import "../../Portifolio/Styles/Showportofoliodetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";
import { ShowProjectDetailes} from "../../../FreeLancer/Portifolio/Services/CreatePortofolioApi";
import { useNavigate } from "react-router-dom";
export default function Showportofoliodetails() {
  const cookies = Cookies();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
const navigate = useNavigate();
  async function getProjectDetails() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token-freelancer");
      const projectId = cookies.get("project-id");

      const response = await axios.get(
        `${baseURL}${ShowProjectDetailes}${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setProject(response.data.projects);
    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
        "Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <div className="project-details-container">

      {loading && <Loading />}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

     <button
  className="back-btn"
  onClick={() => navigate("/freelancerlayout/showprofile/portfolio")}
>
  ← Back to Portfolio
</button>

      <div className="project-header">

        <h1 className="project-title">
          {project?.project_name}
        </h1>

        <button
    className="edit-project-btn"
  >
    Edit Project
  </button>


      </div>

      <div className="images-section">

        <h2 className="section-title">
          PROJECT IMAGES
        </h2>

        <div className="images-grid">

          {project?.Images?.map((image) => (
            <div
              className="image-card"
              key={image.id}
            >
              <img
                src={image.image}
                alt="Project"
              />

             
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}