import "../../AdminProjects/styles/AdminProjects.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import {
  GetAllProjects,
  SuspendProject,
  UnsuspendProject,
  DeleteProject,
} from "../../AdminProjects/services/AdminProjectsapi";

import Loading from "../../../../components/Loading/Loading";


const LIMIT = 10;


const formatLevel = (level) => {
  if (!level) return "—";

  return level.charAt(0).toUpperCase() + level.slice(1);
};


export default function AdminProjects() {
 const navigate = useNavigate();
  const cookies = Cookies();

  // =========================
  // Projects
  // =========================

  const [projects, setProjects] = useState([]);


  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);


  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);


  // =========================
  // Error
  // =========================

  const [error, setError] = useState("");


  // =========================
  // Access Denied
  // =========================

  const [accessDenied, setAccessDenied] = useState(false);


  // =========================
  // Check Permission Error
  // =========================

  function isPermissionError(error) {

    const status = error.response?.status;

    const backendMessage =
      error.response?.data?.message;


    // Backend 403
    if (status === 403) {
      return true;
    }


    // Backend message
    if (typeof backendMessage === "string") {

      const message =
        backendMessage.toLowerCase();

      return (
        message.includes("forbidden") ||
        message.includes("missing permission") ||
        message.includes("permission denied") ||
        message.includes("access denied")
      );
    }


    // Backend object message
    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {

      const objectMessage =
        backendMessage.message;


      if (
        typeof objectMessage === "string"
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
      typeof backendMessage === "string"
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
  // Get Projects
  // =========================

  async function getProjects() {

    try {

      setLoading(true);
      setError("");

      const token =
        cookies.get("token-employee");


      const response = await axios.get(
        `${baseURL}${GetAllProjects}/${page}/${LIMIT}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "PROJECTS:",
        response.data
      );


      setProjects(
        response.data.projects || []
      );


      // Request succeeded
      setAccessDenied(false);


    } catch (err) {

      console.log(
        "PROJECTS ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setProjects([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to load projects."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Suspend Project
  // =========================

  async function handleSuspend(projectId) {

    try {

      setActionLoading(projectId);
      setError("");

      const token =
        cookies.get("token-employee");


      const response = await axios.post(
        `${baseURL}${SuspendProject}/${projectId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "SUSPEND RESPONSE:",
        response.data
      );


      // Update UI immediately
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                is_suspended: 1,
              }
            : project
        )
      );


    } catch (err) {

      console.log(
        "SUSPEND ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setProjects([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to suspend project."
        )
      );


    } finally {

      setActionLoading(null);

    }
  }


  // =========================
  // Unsuspend Project
  // =========================

  async function handleUnsuspend(projectId) {

    try {

      setActionLoading(projectId);
      setError("");

      const token =
        cookies.get("token-employee");


      const response = await axios.post(
        `${baseURL}${UnsuspendProject}/${projectId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "UNSUSPEND RESPONSE:",
        response.data
      );


      // Update UI immediately
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                is_suspended: 0,
              }
            : project
        )
      );


    } catch (err) {

      console.log(
        "UNSUSPEND ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setProjects([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to unsuspend project."
        )
      );


    } finally {

      setActionLoading(null);

    }
  }


  // =========================
  // Delete Project
  // =========================

  async function handleDelete(projectId) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(projectId);
      setError("");

      const token =
        cookies.get("token-employee");


      const response = await axios.post(
        `${baseURL}${DeleteProject}/${projectId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "DELETE RESPONSE:",
        response.data
      );


      // Remove project from UI
      setProjects((prev) =>
        prev.filter(
          (project) =>
            project.id !== projectId
        )
      );


    } catch (err) {

      console.log(
        "DELETE ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setProjects([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to delete project."
        )
      );


    } finally {

      setActionLoading(null);

    }
  }


  // =========================
  // Load Projects
  // =========================

  useEffect(() => {

    getProjects();

  }, [page]);


  // =========================
  // Initial Loading
  // =========================

  if (
    loading &&
    !accessDenied
  ) {

    return (

      <div className="admin-projects-wrapper">

        <Loading />

      </div>
    );
  }


  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {

    return (

      <div className="admin-projects-wrapper">

        <div className="access-denied">

          <div className="access-denied-icon">
            🔒
          </div>


          <h1>
            Access Denied
          </h1>


          <p>
            You don't have permission
            to access this page.
          </p>


          <span>
            Please contact your administrator
            if you believe you should have access.
          </span>

        </div>

      </div>
    );
  }


  // =========================
  // Render
  // =========================

  return (

    <div className="admin-projects-wrapper">


      {/* Page Loading */}

      {loading && <Loading />}


      <div className="admin-projects-card">


        {/* =========================
            Header
        ========================= */}

        <div className="admin-projects-heading">

          <div>

            <h2 className="admin-projects-title">
              Projects
            </h2>

            <p className="admin-projects-subtitle">
              Manage and monitor platform projects
            </p>

          </div>

        </div>


        {/* =========================
            Error
        ========================= */}

        {error && (

          <div className="admin-projects-error">

            {error}

          </div>

        )}


        {/* =========================
            Table
        ========================= */}

        <div className="admin-projects-table-container">

          <table className="admin-projects-table">


            <thead>

              <tr>

                <th>
                  Project
                </th>

                <th>
                  Client
                </th>

                <th>
                  Price
                </th>

                <th>
                  Level
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>


              {!loading &&
              projects.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="admin-projects-empty"
                  >

                    No projects found.

                  </td>

                </tr>

              ) : (

                projects.map(
                  (project) => {

                    const isSuspended =
                      Number(
                        project.is_suspended
                      ) === 1;


                    const isActionLoading =
                      actionLoading ===
                      project.id;


                    return (

                      <tr
                        key={project.id}
                      >


                        {/* Project */}

                   <td className="admin-projects-name">
    <button
        type="button"
        className="admin-projects-project-link"
        onClick={() =>
          navigate(
  `/AdminLayout/AdminProjectDetails/${project.id}`
)
        }
    >
        {project.project_name}
    </button>
</td>


                        {/* Client */}

                        <td className="admin-projects-client">

                          {project.client_name}

                        </td>


                        {/* Price */}

                        <td className="admin-projects-price">

                          $
                          {Number(
                            project.price
                          ).toLocaleString()}

                        </td>


                        {/* Level */}

                        <td>

                          <span
                            className={`admin-projects-level admin-projects-level-${project.level_project}`}
                          >

                            {formatLevel(
                              project.level_project
                            )}

                          </span>

                        </td>


                        {/* Actions */}

                        <td>

                          <div className="admin-projects-actions">


                            {/* Suspend / Unsuspend */}

                            {isSuspended ? (

                              <button
                                type="button"
                                className="admin-projects-action admin-projects-unsuspend"
                                disabled={
                                  isActionLoading
                                }
                                onClick={() =>
                                  handleUnsuspend(
                                    project.id
                                  )
                                }
                              >

                                {isActionLoading
                                  ? "..."
                                  : "Unsuspend"}

                              </button>

                            ) : (

                              <button
                                type="button"
                                className="admin-projects-action admin-projects-suspend"
                                disabled={
                                  isActionLoading
                                }
                                onClick={() =>
                                  handleSuspend(
                                    project.id
                                  )
                                }
                              >

                                {isActionLoading
                                  ? "..."
                                  : "Suspend"}

                              </button>

                            )}


                            {/* Delete */}

                            <button
                              type="button"
                              className="admin-projects-action admin-projects-delete"
                              disabled={
                                isActionLoading
                              }
                              onClick={() =>
                                handleDelete(
                                  project.id
                                )
                              }
                            >

                              {isActionLoading
                                ? "..."
                                : "Delete"}

                            </button>


                          </div>

                        </td>


                      </tr>

                    );
                  }
                )

              )}


            </tbody>

          </table>

        </div>


        {/* =========================
            Pagination
        ========================= */}

        <div className="admin-projects-pagination">


          <button
            type="button"
            className="admin-projects-page-btn"
            disabled={
              page === 1 ||
              loading
            }
            onClick={() =>
              setPage(
                (prev) =>
                  prev - 1
              )
            }
          >

            Previous

          </button>


          <span className="admin-projects-page-number">

            Page {page}

          </span>


          <button
            type="button"
            className="admin-projects-page-btn"
            disabled={
              projects.length <
                LIMIT ||
              loading
            }
            onClick={() =>
              setPage(
                (prev) =>
                  prev + 1
              )
            }
          >

            Next

          </button>


        </div>


      </div>


    </div>
  );
}