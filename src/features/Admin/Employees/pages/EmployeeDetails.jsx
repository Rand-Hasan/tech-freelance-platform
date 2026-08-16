
import "../../Employees/styles/EmployeeDetails.css";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";

import {
  GetEmployeeById,
  UpdateEmployeePosition,
  ActivateEmployee,
  DeactivateEmployee,
} from "../../Employees/services/Employee";
import { GetPositions } from "../../RolesPermissions/services/RolesPermissionsapi";
export default function EmployeeDetails() {
  const { employeeId } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // Update Role
  // =========================

  const [positionId, setPositionId] = useState("");

  const [updatingRole, setUpdatingRole] = useState(false);

  const [updateMessage, setUpdateMessage] = useState("");

  const [updateError, setUpdateError] = useState("");

  // =========================
  // Activate / Deactivate
  // =========================

  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");

  const [statusError, setStatusError] = useState("");

  // =========================
  // Token
  // =========================

  const cookies = Cookies();
    
    const token = cookies.get("token-employee");
  

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // Get Employee By ID
  // =========================
  const getPositions = async () => {
  try {
    const response = await axios.get(
      `${baseURL}${GetPositions}`,
      authConfig
    );

    console.log(
      "Positions Response:",
      response.data
    );

    const positionsData = response.data;

    setRoles(
      positionsData?.positions ||
        positionsData?.data ||
        []
    );
  } catch (error) {
    console.error(
      "Get Positions Error:",
      error
    );

    console.log(
      "Status:",
      error.response?.status
    );

    console.log(
      "Backend Response:",
      error.response?.data
    );

    setError(
      error.response?.data?.message ||
        "Failed to load roles"
    );
  }
};
 //////////////////
  const getEmployee = async () => {
    try {
      setLoading(true);
      setError("");

      if (!employeeId) {
        setError("Employee ID is missing");
        return;
      }

      const url =
        `${baseURL}${GetEmployeeById}/${employeeId}`;

      console.log(
        "Get Employee By ID URL:",
        url
      );

      const response = await axios.get(
        url,
        authConfig
      );

      console.log(
        "Get Employee By ID Response:",
        response.data
      );

      const employeeData =
        response.data?.employee;

      if (!employeeData) {
        setError(
          response.data?.message ||
            "Employee not found"
        );

        return;
      }

      setEmployee(employeeData);

      // Current role ID
      setPositionId(
        employeeData.positionId || ""
      );

    } catch (error) {
      console.error(
        "Get Employee By ID Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Failed to load employee"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load Employee
  // =========================

 useEffect(() => {
  getEmployee();
  getPositions();
}, [employeeId]);
  // =========================
  // Update Employee Position
  // =========================

  const updateEmployeePosition = async () => {
    try {
      setUpdatingRole(true);

      setUpdateMessage("");
      setUpdateError("");

      if (!positionId) {
        setUpdateError(
          "Please enter a position ID."
        );

        return;
      }

      const url =
        `${baseURL}${UpdateEmployeePosition}/${employeeId}`;

      const body = {
        position_id: Number(positionId),
      };

      console.log(
        "Update Employee Position URL:",
        url
      );

      console.log(
        "Update Employee Position Body:",
        body
      );

      const response = await axios.post(
        url,
        body,
        authConfig
      );

      console.log(
        "Update Employee Position Response:",
        response.data
      );

      setUpdateMessage(
        response.data?.message ||
          "Employee role updated successfully."
      );

      await getEmployee();

    } catch (error) {
      console.error(
        "Update Employee Position Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      setUpdateError(
        error.response?.data?.message ||
          "Failed to update employee role."
      );

    } finally {
      setUpdatingRole(false);
    }
  };

  // =========================
  // Activate Employee
  // =========================

  const activateEmployee = async () => {
    try {
      setUpdatingStatus(true);

      setStatusMessage("");
      setStatusError("");

      const url =
        `${baseURL}${ActivateEmployee}/${employeeId}`;

      console.log(
        "Activate Employee URL:",
        url
      );

      const response = await axios.post(
        url,
        {},
        authConfig
      );

      console.log(
        "Activate Employee Response:",
        response.data
      );

      setStatusMessage(
        response.data?.message ||
          "Employee activated successfully."
      );

      await getEmployee();

    } catch (error) {
      console.error(
        "Activate Employee Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      setStatusError(
        error.response?.data?.message ||
          "Failed to activate employee."
      );

    } finally {
      setUpdatingStatus(false);
    }
  };

  // =========================
  // Deactivate Employee
  // =========================

  const deactivateEmployee = async () => {
    try {
      setUpdatingStatus(true);

      setStatusMessage("");
      setStatusError("");

      const url =
        `${baseURL}${DeactivateEmployee}/${employeeId}`;

      console.log(
        "Deactivate Employee URL:",
        url
      );

      const response = await axios.post(
        url,
        {},
        authConfig
      );

      console.log(
        "Deactivate Employee Response:",
        response.data
      );

      setStatusMessage(
        response.data?.message ||
          "Employee deactivated successfully."
      );

      await getEmployee();

    } catch (error) {
      console.error(
        "Deactivate Employee Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );

      setStatusError(
        error.response?.data?.message ||
          "Failed to deactivate employee."
      );

    } finally {
      setUpdatingStatus(false);
    }
  };

  // =========================
  // Initials
  // =========================

  const getInitials = (name) => {
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
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="employees-state">
        <p>
          Loading employee...
        </p>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <div className="employee-details-page">

        <button
          className="back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back to Employees
        </button>

        <div className="employees-error">
          {error}
        </div>

      </div>
    );
  }

  // =========================
  // No Employee
  // =========================

  if (!employee) {
    return (
      <div className="employees-state">
        <p>
          Employee not found.
        </p>
      </div>
    );
  }

  return (
    <div className="employee-details-page">

      {/* =========================
          Back
      ========================= */}

      <button
        className="back-btn"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Back to Employees
      </button>

      {/* =========================
          Header
      ========================= */}

      <div className="employee-details-header">

        <div>

          <h1>
            Employee Details
          </h1>

          <p>
            View employee information
            and assigned role.
          </p>

        </div>

      </div>

      {/* =========================
          Employee Card
      ========================= */}

      <div className="employee-details-card">

        {/* =========================
            Employee Header
        ========================= */}

        <div className="employee-profile">

          <div className="employee-large-avatar">

            {getInitials(
              employee.user_name
            )}

          </div>

          <div className="employee-profile-info">

            <h2>
              {employee.user_name}
            </h2>

            <p>
              {employee.email}
            </p>

          </div>

          <div className="employee-profile-status">

            <span
              className={`badge ${
                employee.isActive
                  ? "active"
                  : "inactive"
              }`}
            >

              <span className="status-dot" />

              {employee.isActive
                ? "Active"
                : "Inactive"}

            </span>

          </div>

        </div>

        {/* =========================
            Information
        ========================= */}

        <div className="employee-info-grid">

          {/* Username */}

          <div className="employee-info-item">

            <span>
              Username
            </span>

            <strong>
              {employee.user_name}
            </strong>

          </div>

          {/* Email */}

          <div className="employee-info-item">

            <span>
              Email
            </span>

            <strong>
              {employee.email}
            </strong>

          </div>

          {/* Role */}

          <div className="employee-info-item">

            <span>
              Role
            </span>

            <strong>
              {employee.position
                ?.display_name ||
                employee.position
                  ?.name ||
                "No Role"}
            </strong>

          </div>

          {/* Status */}

          <div className="employee-info-item">

            <span>
              Status
            </span>

            <strong>
              {employee.isActive
                ? "Active"
                : "Inactive"}
            </strong>

          </div>

          {/* Role Description */}

          <div className="employee-info-item full">

            <span>
              Role Description
            </span>

            <p>
              {employee.position
                ?.description ||
                "No role description available."}
            </p>

          </div>

          {/* =========================
              Actions Row
          ========================= */}

          <div
            className="employee-info-item full"
          >

            <span>
              Employee Actions
            </span>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1fr) minmax(0, 1fr)",
                gap: "20px",
                marginTop: "14px",
              }}
            >

              {/* =========================
                  Change Role
              ========================= */}

              <div
                style={{
                  padding: "18px",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: "14px",
                  background: "#ffffff",
                }}
              >

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Change Role
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >

             

                <select
  value={positionId}
  onChange={(e) =>
    setPositionId(e.target.value)
  }
  disabled={updatingRole}
  style={{
    flex: 1,
    minWidth: 0,
    padding: "10px 12px",
    border: "1px solid #dbe4ea",
    borderRadius: "10px",
    outline: "none",
    fontSize: "14px",
    background: "#fff",
  }}
>
  <option value="">
    Select a role
  </option>

  {roles.map((role) => (
    <option
      key={role.id}
      value={role.id}
    >
      {role.display_name}
    </option>
  ))}
</select>

<button
  type="button"
  onClick={updateEmployeePosition}
  disabled={
    updatingRole || !positionId
  }
  style={{
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    cursor:
      updatingRole || !positionId
        ? "not-allowed"
        : "pointer",
    fontWeight: "600",
    whiteSpace: "nowrap",
    opacity:
      updatingRole || !positionId
        ? 0.7
        : 1,
  }}
>
  {updatingRole
    ? "Updating..."
    : "Update Role"}
</button>

                </div>

                {updateMessage && (
                  <div
                    style={{
                      marginTop:
                        "12px",
                      padding:
                        "10px 12px",
                      borderRadius:
                        "8px",
                      background:
                        "#edf9f1",
                      color:
                        "#25803d",
                      fontSize:
                        "14px",
                      fontWeight:
                        "500",
                    }}
                  >
                    {updateMessage}
                  </div>
                )}

                {updateError && (
                  <div
                    style={{
                      marginTop:
                        "12px",
                      padding:
                        "10px 12px",
                      borderRadius:
                        "8px",
                      background:
                        "#fff1f1",
                      color:
                        "#dc2626",
                      fontSize:
                        "14px",
                      fontWeight:
                        "500",
                    }}
                  >
                    {updateError}
                  </div>
                )}

              </div>

              {/* =========================
                  Employee Status
              ========================= */}

              <div
                style={{
                  padding: "18px",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: "14px",
                  background: "#ffffff",
                }}
              >

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Employee Status
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "12px",
                    flexWrap:
                      "wrap",
                  }}
                >

                  {/* Current Status */}

                  <span
                    className={`badge ${
                      employee.isActive
                        ? "active"
                        : "inactive"
                    }`}
                  >

                    <span className="status-dot" />

                    {employee.isActive
                      ? "Active"
                      : "Inactive"}

                  </span>

                  {/* Activate */}

                  {!employee.isActive && (

                    <button
                      type="button"
                      onClick={
                        activateEmployee
                      }
                      disabled={
                        updatingStatus
                      }
                      style={{
                        padding:
                          "10px 16px",
                        border:
                          "1px solid #2fae9b",
                        borderRadius:
                          "10px",
                        background:
                          "#e8f8f7",
                        color:
                          "#1f9d8a",
                        cursor:
                          updatingStatus
                            ? "not-allowed"
                            : "pointer",
                        fontWeight:
                          "600",
                        whiteSpace:
                          "nowrap",
                        opacity:
                          updatingStatus
                            ? 0.7
                            : 1,
                      }}
                    >

                      {updatingStatus
                        ? "Activating..."
                        : "Activate"}

                    </button>

                  )}

                  {/* Deactivate */}

                  {employee.isActive && (

                    <button
                      type="button"
                      onClick={
                        deactivateEmployee
                      }
                      disabled={
                        updatingStatus
                      }
                      style={{
                        padding:
                          "10px 16px",
                        border:
                          "1px solid #ef4444",
                        borderRadius:
                          "10px",
                        background:
                          "#fff1f1",
                        color:
                          "#dc2626",
                        cursor:
                          updatingStatus
                            ? "not-allowed"
                            : "pointer",
                        fontWeight:
                          "600",
                        whiteSpace:
                          "nowrap",
                        opacity:
                          updatingStatus
                            ? 0.7
                            : 1,
                      }}
                    >

                      {updatingStatus
                        ? "Deactivating..."
                        : "Deactivate"}

                    </button>

                  )}

                </div>

                {statusMessage && (
                  <div
                    style={{
                      marginTop:
                        "12px",
                      padding:
                        "10px 12px",
                      borderRadius:
                        "8px",
                      background:
                        "#edf9f1",
                      color:
                        "#25803d",
                      fontSize:
                        "14px",
                      fontWeight:
                        "500",
                    }}
                  >
                    {statusMessage}
                  </div>
                )}

                {statusError && (
                  <div
                    style={{
                      marginTop:
                        "12px",
                      padding:
                        "10px 12px",
                      borderRadius:
                        "8px",
                      background:
                        "#fff1f1",
                      color:
                        "#dc2626",
                      fontSize:
                        "14px",
                      fontWeight:
                        "500",
                    }}
                  >
                    {statusError}
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

