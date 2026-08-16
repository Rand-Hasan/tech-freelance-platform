import "../../UsersManagement/styles/UsersManagement.css";

import {
  FaUser,
  FaCheck,
  FaEye,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import Loading from "../../../../components/Loading/Loading";
import { GetAllUsers } from "../../UsersManagement/services/UsersManagementapi";
export default function UsersManagement() {
  const navigate = useNavigate();
  const cookies = Cookies();

  

  const [users, setUsers] = useState([]);

 

  const [loading, setLoading] = useState(true);



  const [error, setError] = useState("");



  const [accessDenied, setAccessDenied] =
    useState(false);



  const [page, setPage] = useState(1);

  const limit = 6;

  // =========================================
  // API Endpoint
  // =========================================

 
  // =========================================
  // Backend Error Message
  // =========================================

  const getErrorMessage = (err) => {
    const responseData =
      err.response?.data;

    const backendMessage =
      responseData?.message;

    // =========================================
    // String Message
    // =========================================

    if (
      typeof backendMessage ===
      "string"
    ) {
      return backendMessage;
    }

    // =========================================
    // Object Message
    // =========================================

    if (
      backendMessage &&
      typeof backendMessage ===
        "object"
    ) {
      if (
        typeof backendMessage.message ===
        "string"
      ) {
        return backendMessage.message;
      }
    }

    // =========================================
    // Validation Error
    // =========================================

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    // =========================================
    // Default
    // =========================================

    return "Unable to load users.";
  };

  // =========================================
  // Permission Error
  // =========================================

  const isPermissionError = (err) => {
    const status =
      err.response?.status;

    const message =
      err.response?.data?.message;

    if (status === 403) {
      return true;
    }

    if (
      typeof message === "string"
    ) {
      const lowerMessage =
        message.toLowerCase();

      return (
        lowerMessage.includes(
          "forbidden"
        ) ||
        lowerMessage.includes(
          "missing permission"
        )
      );
    }

    return false;
  };

  // =========================================
  // Get Users
  // =========================================

  const getUsers = async () => {
    try {
      setLoading(true);

      setError("");
      setAccessDenied(false);

      const token =
        cookies.get(
          "token-employee"
        );

      const url =
        `${baseURL}${GetAllUsers}/${page}/${limit}`;

      console.log(
        "GET ALL USERS URL:",
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
        "GET ALL USERS RESPONSE:",
        response.data
      );

      // =========================================
      // Users
      // =========================================

      setUsers(
        response.data?.users || []
      );

    } catch (err) {
      console.error(
        "GET ALL USERS ERROR:",
        err
      );

      console.error(
        "GET ALL USERS ERROR DATA:",
        err.response?.data
      );

      // =========================================
      // Access Denied
      // =========================================

      if (
        isPermissionError(err)
      ) {
        setUsers([]);
        setAccessDenied(true);
        setError("");

        return;
      }

      // =========================================
      // Normal Error
      // =========================================

      setUsers([]);

      setError(
        getErrorMessage(err)
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // Load Users
  // =========================================

  useEffect(() => {
    getUsers();
  }, [page]);

  // =========================================
  // Role
  // =========================================

  const getRoleName = (roleId) => {
    if (roleId === 1) {
      return "Freelancer";
    }

    if (roleId === 2) {
      return "Client";
    }

    return "Unknown";
  };

  // =========================================
  // Open User Details
  // =========================================

  const openDetails = (userId) => {
    navigate(
      `/AdminLayout/UsersManagement/${userId}`
    );
  };

  // =========================================
  // Loading
  // =========================================

  if (loading) {
    return (
      <div className="users-page">
        <Loading />
      </div>
    );
  }

  // =========================================
  // Access Denied
  // =========================================

  if (accessDenied) {
    return (
      <div className="users-page">

        <div className="users-access-denied">

          <div className="users-access-denied-icon">
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

  // =========================================
  // Render
  // =========================================

  return (
    <div className="users-page">

      {/* =====================================
          Header
      ===================================== */}

      <div className="users-header">

        <div>

          <h1>
            Users
          </h1>

          <p>
            Manage platform users and
            their account status.
          </p>

        </div>

      </div>

      {/* =====================================
          Error
      ===================================== */}

      {error && (
        <div className="users-error">
          {error}
        </div>
      )}

      {/* =====================================
          Users Card
      ===================================== */}

      <div className="users-card">

        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>

              <tr>

                <th>
                  User
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Status
                </th>

                <th>
                  Verified
                </th>

                <th>
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="users-empty-state"
                  >
                    No users found.
                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user.id}
                  >

                    {/* =================================
                        User
                    ================================= */}

                    <td>

                      <div className="users-user-cell">

                        <div className="users-user-avatar">

                          <FaUser />

                        </div>

                        <div className="users-user-info">

                          <strong>
                            {user.user_name}
                          </strong>

                          <span>
                            ID: {user.id}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* =================================
                        Email
                    ================================= */}

                    <td>

                      <span className="users-email-text">

                        {user.email}

                      </span>

                    </td>

                    {/* =================================
                        Role
                    ================================= */}

                    <td>

                      <span
                        className={`users-role-badge ${
                          user.rolId === 1
                            ? "users-role-freelancer"
                            : user.rolId === 2
                            ? "users-role-client"
                            : "users-role-unknown"
                        }`}
                      >

                        {getRoleName(
                          user.rolId
                        )}

                      </span>

                    </td>

                    {/* =================================
                        Status
                    ================================= */}

                    <td>

                      <span
                        className={`users-status-badge ${
                          user.isActive
                            ? "users-status-active"
                            : "users-status-suspended"
                        }`}
                      >

                        <span className="users-status-dot" />

                        {user.isActive
                          ? "Active"
                          : "Suspended"}

                      </span>

                    </td>

                    {/* =================================
                        Verified
                    ================================= */}

                    <td>

                      {user.isVerfied ? (

                        <span className="users-verified">

                          <FaCheck />

                          Verified

                        </span>

                      ) : (

                        <span className="users-not-verified">

                          Not Verified

                        </span>

                      )}

                    </td>

                    {/* =================================
                        View
                    ================================= */}

                    <td>

                      <button
                        className="users-view-btn"
                        onClick={() =>
                          openDetails(
                            user.id
                          )
                        }
                      >

                        <FaEye />

                        View

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* =====================================
            Pagination
        ===================================== */}

        <div className="users-pagination">

          <button
            disabled={
              page === 1 ||
              loading ||
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
              users.length < limit
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