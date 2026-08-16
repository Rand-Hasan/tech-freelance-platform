import "../../AdminProjects/styles/AdminProjectDetails.css";

import {
  FaArrowLeft,
  FaProjectDiagram,
  FaDollarSign,
  FaLayerGroup,
  FaCalendarAlt,
  FaLink,
 
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import Loading from "../../../../components/Loading/Loading";

import {
  GetAnyProject,
} from "../../AdminProjects/services/AdminProjectsapi";


export default function AdminProjectDetails() {

  const navigate = useNavigate();

  const { projectId } = useParams();

  const cookies = Cookies();


  // =========================
  // Project
  // =========================

  const [project, setProject] = useState(null);


  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);


  // =========================
  // Error
  // =========================

  const [error, setError] = useState("");


  // =========================
  // Format Level
  // =========================

  const formatLevel = (level) => {

    if (!level) {
      return "—";
    }

    return (
      level.charAt(0).toUpperCase() +
      level.slice(1)
    );
  };


  // =========================
  // Format Date
  // =========================

  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };


  // =========================
  // Check Permission Error
  // =========================

  function isPermissionError(error) {

    const status =
      error.response?.status;

    const backendMessage =
      error.response?.data?.message;


    if (status === 403) {
      return true;
    }


    if (
      typeof backendMessage ===
      "string"
    ) {

      const message =
        backendMessage.toLowerCase();

      return (
        message.includes("forbidden") ||
        message.includes("missing permission") ||
        message.includes("permission denied") ||
        message.includes("access denied")
      );
    }


    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {

      const objectMessage =
        backendMessage.message;


      if (
        typeof objectMessage ===
        "string"
      ) {

        const message =
          objectMessage.toLowerCase();

        return (
          message.includes("forbidden") ||
          message.includes("missing permission") ||
          message.includes("permission denied") ||
          message.includes("access denied")
        );
      }
    }


    return false;
  }


  // =========================
  // Get Backend Error
  // =========================

  function getErrorMessage(
    error,
    defaultMessage
  ) {

    const responseData =
      error.response?.data;

    const backendMessage =
      responseData?.message;


    if (
      typeof backendMessage ===
      "string"
    ) {

      return backendMessage;
    }


    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {

      if (
        typeof backendMessage.message ===
        "string"
      ) {

        return backendMessage.message;
      }
    }


    const validationError =
      responseData?.errors?.[0]?.message;


    if (validationError) {
      return validationError;
    }


    return defaultMessage;
  }


  // =========================
  // Get Project
  // =========================

  async function getProject() {

    try {

      setLoading(true);
      setError("");

      const token =
        cookies.get("token-employee");


      const response =
        await axios.get(
          `${baseURL}${GetAnyProject}/${projectId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      console.log(
        "PROJECT DETAILS:",
        response.data
      );


      setProject(
        response.data.project || null
      );


    } catch (err) {

      console.log(
        "PROJECT DETAILS ERROR:",
        err.response?.data || err
      );


      if (
        isPermissionError(err)
      ) {

        setError(
          "You don't have permission to view this project."
        );

        return;
      }


      setError(
        getErrorMessage(
          err,
          "Unable to load project details."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Project
  // =========================

  useEffect(() => {

    if (!projectId) {
      return;
    }

    getProject();

  }, [projectId]);


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="admin-project-details-page">

        <Loading />

      </div>
    );
  }


  // =========================
  // Error
  // =========================

  if (error) {

    return (

      <div className="admin-project-details-page">

        <div className="admin-project-details-top">

          <button
            type="button"
            className="admin-project-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Projects
            </span>

          </button>

        </div>


        <div className="admin-project-details-card">

          <div className="admin-project-details-error">

            {error}

          </div>

        </div>

      </div>
    );
  }


  // =========================
  // No Project
  // =========================

  if (!project) {

    return (

      <div className="admin-project-details-page">

        <div className="admin-project-details-top">

          <button
            type="button"
            className="admin-project-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Projects
            </span>

          </button>

        </div>


        <div className="admin-project-details-card">

          <div className="admin-project-details-error">

            Project not found.

          </div>

        </div>

      </div>
    );
  }


  // =========================
  // Render
  // =========================

  return (

    <div className="admin-project-details-page">


      {/* =====================================
          TOP
      ===================================== */}

      <div className="admin-project-details-top">

        <button
          type="button"
          className="admin-project-details-back-btn"
          onClick={() => navigate(-1)}
        >

          <FaArrowLeft />

          <span>
            Back to Projects
          </span>

        </button>

      </div>


      {/* =====================================
          MAIN CARD
      ===================================== */}

      <div className="admin-project-details-card">


        {/* ===================================
            PROJECT HEADER
        =================================== */}

        <div className="admin-project-details-header">

          <div className="admin-project-details-header-icon">

            <FaProjectDiagram />

          </div>


          <div className="admin-project-details-header-content">

            <h1>
              {project.project_name}
            </h1>

            <p>
              Project details
            </p>

          </div>


          <span className="admin-project-details-level-badge">

            {formatLevel(
              project.level_project
            )}

          </span>

        </div>


        {/* ===================================
            DESCRIPTION
        =================================== */}

        <div className="admin-project-details-section">

          <div className="admin-project-details-section-heading">

            <h2>
              Project Description
            </h2>

          

          </div>


          <div className="admin-project-details-description">

            {project.description ||
              "No description available"}

          </div>

        </div>


        {/* ===================================
            PROJECT INFORMATION
        =================================== */}

        <div className="admin-project-details-section">

          <div className="admin-project-details-section-heading">

            <h2>
              Project Information
            </h2>

            <span>
              General project details
            </span>

          </div>


          <div className="admin-project-details-info-grid">


            {/* Price */}

            <div className="admin-project-details-info-item">

              <div className="admin-project-details-info-icon">

                <FaDollarSign />

              </div>


              <div className="admin-project-details-info-content">

                <span>
                  Project Price
                </span>

                <strong className="admin-project-details-price">

                  $
                  {Number(
                    project.price
                  ).toLocaleString()}

                </strong>

              </div>

            </div>


            {/* Level */}

            <div className="admin-project-details-info-item">

              <div className="admin-project-details-info-icon">

                <FaLayerGroup />

              </div>


              <div className="admin-project-details-info-content">

                <span>
                  Required Level
                </span>

                <strong>

                  {formatLevel(
                    project.level_project
                  )}

                </strong>

              </div>

            </div>


            


            {/* Deadline */}

            <div className="admin-project-details-info-item">

              <div className="admin-project-details-info-icon">

                <FaCalendarAlt />

              </div>


              <div className="admin-project-details-info-content">

                <span>
                  Deadline
                </span>

                <strong>

                  {formatDate(
                    project.project_deadline
                  )}

                </strong>

              </div>

            </div>


          </div>

        </div>


        {/* ===================================
            PROJECT LINK
        =================================== */}

        <div className="admin-project-details-section">

          <div className="admin-project-details-section-heading">

            <h2>
              Project Link
            </h2>

            <span>
              External project resource
            </span>

          </div>


          <div className="admin-project-details-link-box">

            <FaLink />


            {project.project_link ? (

              <a
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
              >

                {project.project_link}

              </a>

            ) : (

              <span>
                No project link available
              </span>

            )}

          </div>

        </div>


      </div>

    </div>
  );
}