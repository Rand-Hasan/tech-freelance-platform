import "../styles/Employees.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import { GetEmployees } from "../services/Employee";

import Loading from "../../../../components/Loading/Loading";

export default function Employees() {
  const navigate = useNavigate();
  const cookies = Cookies();

  // =========================
  // Employees
  // =========================

  const [employees, setEmployees] = useState([]);

  // =========================
  // Loading / Error
  // =========================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Access Denied
  // =========================

  const [accessDenied, setAccessDenied] = useState(false);

  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  // =========================
  // Position Filter
  // =========================

  const [positionId, setPositionId] = useState("");

  // =========================
  // Get Backend Error Message
  // =========================

  function getErrorMessage(err) {
    const backendMessage =
      err.response?.data?.message;

    // =========================
    // Validation Error
    // =========================

    const validationError =
      err.response?.data?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    // =========================
    // Normal Backend Message
    // =========================

    if (
      typeof backendMessage === "string"
    ) {
      return backendMessage;
    }

    // =========================
    // Object Message
    // =========================

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

    // =========================
    // Default Error
    // =========================

    return "Failed to load employees.";
  }

  // =========================
  // Check Permission Error
  // =========================

  function isPermissionError(err) {
    const status = err.response?.status;

    const backendMessage =
      err.response?.data?.message;

    if (status === 403) {
      return true;
    }

    if (
      typeof backendMessage !== "string"
    ) {
      return false;
    }

    const message =
      backendMessage.toLowerCase();

    return (
      message.includes("forbidden") ||
      message.includes("missing permission")
    );
  }

  // =========================
  // Get Employees
  // =========================

  async function getEmployees() {
    try {
      setLoading(true);
      setError("");
      setAccessDenied(false);

      const token =
        cookies.get("token-employee");

      let url =
        `${baseURL}${GetEmployees}/${page}/${limit}`;

      if (positionId) {
        url += `?position_id=${positionId}`;
      }

      console.log(
        "GET EMPLOYEES URL:",
        url
      );

      const response =
        await axios.get(url, {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      console.log(
        "GET EMPLOYEES RESPONSE:",
        response.data
      );

      setEmployees(
        response.data?.employees || []
      );
    } catch (err) {
      console.log(
        "GET EMPLOYEES ERROR:",
        err.response?.data
      );

      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {
        setEmployees([]);
        setAccessDenied(true);
        setError("");
        return;
      }

      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Load Employees
  // =========================

  useEffect(() => {
    getEmployees();
  }, [page, positionId]);

  // =========================
  // Avatar Initials
  // =========================

  function getInitials(name) {
    if (!name) {
      return "EM";
    }

    return name
      .split(" ")
      .map((word) =>
        word.charAt(0)
      )
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  // =========================
  // Open Employee Details
  // =========================

  function openEmployeeDetails(
    employeeId
  ) {
    navigate(
      `/AdminLayout/employees/${employeeId}`
    );
  }

  // =========================
  // Change Position
  // =========================

  function handlePositionChange(e) {
    setPositionId(e.target.value);
    setPage(1);
  }

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="admin-employees-page">
        <div className="admin-employees-loading">
          <Loading />
        </div>
      </div>
    );
  }

  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {
    return (
      <div className="admin-employees-page">

        <div className="admin-employees-access-denied">

          <div className="admin-employees-access-icon">
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
    <div className="admin-employees-page">

      {/* =========================
          Header
      ========================= */}

      <div className="admin-employees-header">

        <div>

          <h1>
            Employees
          </h1>

          <p>
            Manage platform employees
            and their roles.
          </p>

        </div>

      </div>

      {/* =========================
          Error
      ========================= */}

      {error && (
        <div className="admin-employees-error">
          {error}
        </div>
      )}

      {/* =========================
          Table
      ========================= */}

      <div className="admin-employees-table-container">

        <table className="admin-employees-table">

          <thead>

            <tr>

              <th>
                Employee
              </th>

              <th>
                Role
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="admin-employees-empty"
                >
                  {error
                    ? ""
                    : "No employees found."}
                </td>

              </tr>

            ) : (

              employees.map(
                (employee) => (

                  <tr
                    key={employee.id}
                    className="admin-employees-row"
                    onClick={() =>
                      openEmployeeDetails(
                        employee.id
                      )
                    }
                  >

                    {/* =========================
                        Employee
                    ========================= */}

                    <td>

                      <div className="admin-employees-user">

                        <div className="admin-employees-avatar">

                          {getInitials(
                            employee.user_name
                          )}

                        </div>

                        <div className="admin-employees-user-info">

                          <h4>
                            {employee.user_name}
                          </h4>

                          <p>
                            {employee.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* =========================
                        Role
                    ========================= */}

                    <td>

                      <span className="admin-employees-badge admin-employees-role">

                        {employee.position
                          ?.display_name ||
                          employee.position
                            ?.name ||
                          "No Role"}

                      </span>

                    </td>

                    {/* =========================
                        Status
                    ========================= */}

                    <td>

                      <span
                        className={`admin-employees-badge ${
                          employee.isActive
                            ? "admin-employees-active"
                            : "admin-employees-inactive"
                        }`}
                      >

                        <span className="admin-employees-status-dot" />

                        {employee.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

        {/* =========================
            Pagination
        ========================= */}

        <div className="admin-employees-pagination">

          <button
            disabled={
              loading ||
              page === 1 ||
              !!error
            }
            onClick={() =>
              setPage((prev) =>
                Math.max(
                  1,
                  prev - 1
                )
              )
            }
          >
            Previous
          </button>

          <span>

            Page{" "}

            <strong>
              {page}
            </strong>

          </span>

          <button
            disabled={
              loading ||
              !!error ||
              employees.length < limit
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