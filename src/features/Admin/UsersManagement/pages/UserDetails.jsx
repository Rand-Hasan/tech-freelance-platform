import "../../UsersManagement/styles/UserDetails.css";

import {
  FaArrowLeft,
  FaUser,
  FaCheck,
  FaBan,
  FaUserCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaStar,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import {
  GetUserDetailes,
  BanUser,
  UnbanUser,
} from "../../UsersManagement/services/UsersManagementapi";

import Loading from "../../../../components/Loading/Loading";

export default function UserDetails() {
  const navigate = useNavigate();

  // =========================================
  // Route Parameter
  // Route:
  // UsersManagement/:userId
  // =========================================

  const { userId } = useParams();

  const cookies = Cookies();

  // =========================================
  // User
  // =========================================

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  // =========================================
  // Loading
  // =========================================

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  // =========================================
  // Error
  // =========================================

  const [error, setError] = useState("");

  // =========================================
  // Success
  // =========================================

  const [success, setSuccess] = useState("");

  // =========================================
  // Access Denied
  // =========================================

  const [accessDenied, setAccessDenied] =
    useState(false);

  // =========================================
  // Get Backend Message
  // =========================================

  const getBackendMessage = (err) => {
    const message =
      err?.response?.data?.message;

    if (typeof message === "string") {
      return message;
    }

    if (
      message &&
      typeof message === "object"
    ) {
      if (
        typeof message.message === "string"
      ) {
        return message.message;
      }
    }

    const validationMessage =
      err?.response?.data?.errors?.[0]?.message;

    if (
      typeof validationMessage === "string"
    ) {
      return validationMessage;
    }

    return "";
  };

  // =========================================
  // Permission Error
  // =========================================

  const isPermissionError = (err) => {
    const status =
      err?.response?.status;

    if (status === 403) {
      return true;
    }

    const message =
      getBackendMessage(err);

    if (!message) {
      return false;
    }

    const normalizedMessage =
      message.toLowerCase();

    return (
      normalizedMessage.includes(
        "forbidden"
      ) ||
      normalizedMessage.includes(
        "missing permission"
      ) ||
      normalizedMessage.includes(
        "permission denied"
      ) ||
      normalizedMessage.includes(
        "access denied"
      )
    );
  };

  // =========================================
  // Get User Details
  // =========================================

  const getUserDetails = async () => {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      setAccessDenied(false);

      const token =
        cookies.get("token-employee");

      const url =
        `${baseURL}${GetUserDetailes}/${userId}`;

      console.log(
        "GET USER DETAILS URL:",
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
        "GET USER DETAILS RESPONSE:",
        response.data
      );

      const responseUser =
        response.data?.user;

      const responseProfile =
        response.data?.profile;

      setUser(
        responseUser || null
      );

      setProfile(
        responseProfile || null
      );

    } catch (err) {
      console.error(
        "GET USER DETAILS ERROR:",
        err?.response?.data || err
      );

      if (
        isPermissionError(err)
      ) {
        setAccessDenied(true);

        setError("");

        return;
      }

      const backendMessage =
        getBackendMessage(err);

      setError(
        backendMessage
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // Load User Details
  // =========================================

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    getUserDetails();
  }, [userId]);

  // =========================================
  // Success Message Auto Hide
  // =========================================

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer =
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

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
  // Format Date
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  // =========================================
  // Ban / Unban User
  // =========================================

  const handleUserStatus = async () => {
    if (!userId || !user) {
      return;
    }

    try {
      setActionLoading(true);

      setError("");

      setSuccess("");

      const token =
        cookies.get("token-employee");

      const isCurrentlyActive =
        Boolean(user.isActive);

      const endpoint =
        isCurrentlyActive
          ? BanUser
          : UnbanUser;

      const url =
        `${baseURL}${endpoint}/${userId}`;

      console.log(
        isCurrentlyActive
          ? "BAN USER URL:"
          : "UNBAN USER URL:",
        url
      );

      const response =
        await axios.post(
          url,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "USER STATUS RESPONSE:",
        response.data
      );

      // =====================================
      // ONLY BACKEND SUCCESS MESSAGE
      // =====================================

      const backendMessage =
        response.data?.message;

      if (
        typeof backendMessage === "string"
      ) {
        setSuccess(
          backendMessage
        );
      }

      // =====================================
      // Update Local User Status
      // =====================================

      setUser((currentUser) => {
        if (!currentUser) {
          return currentUser;
        }

        return {
          ...currentUser,

          isActive:
            !isCurrentlyActive,
        };
      });

    } catch (err) {
      console.error(
        "USER STATUS ERROR:",
        err?.response?.data || err
      );

      if (
        isPermissionError(err)
      ) {
        setAccessDenied(true);

        setError("");

        return;
      }

      // =====================================
      // ONLY BACKEND ERROR MESSAGE
      // =====================================

      const backendMessage =
        getBackendMessage(err);

      setError(
        backendMessage
      );

    } finally {
      setActionLoading(false);
    }
  };

  // =========================================
  // Missing User ID
  // =========================================

  if (!userId) {
    return (
      <div className="user-details-admin-page">

        <div className="user-details-admin-error">
          User ID is missing.
        </div>

      </div>
    );
  }

  // =========================================
  // Loading
  // =========================================

  if (loading) {
    return (
      <div className="user-details-admin-page">

        <div className="user-details-admin-loading">
          <Loading />
        </div>

      </div>
    );
  }

  // =========================================
  // Access Denied
  // =========================================

  if (accessDenied) {
    return (
      <div className="user-details-admin-page">

        <div className="user-details-admin-access-denied">

          <div className="user-details-admin-access-denied-icon">
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
  // User Not Found
  // =========================================

  if (!user) {
    return (
      <div className="user-details-admin-page">

        <div className="user-details-admin-error">
          {error}
        </div>

      </div>
    );
  }

  // =========================================
  // Render
  // =========================================

  return (
    <div className="user-details-admin-page">

      {/* =====================================
          Top
      ===================================== */}

      <div className="user-details-admin-top">

        <button
          type="button"
          className="user-details-admin-back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />

          <span>
            Back to Users
          </span>
        </button>

      </div>

      {/* =====================================
          Error
      ===================================== */}

      {error && (
        <div className="user-details-admin-error">
          {error}
        </div>
      )}

      {/* =====================================
          Success
      ===================================== */}

      {success && (
        <div className="user-details-admin-success">

          <FaCheck />

          <span>
            {success}
          </span>

        </div>
      )}

      {/* =====================================
          Main Card
      ===================================== */}

      <div className="user-details-admin-card">

        {/* ===================================
            Profile Header
        =================================== */}

        <div className="user-details-admin-profile-section">

          {/* Profile Photo */}

          <div className="user-details-admin-profile-photo">

            {profile?.photo ? (
              <img
                src={profile.photo}
                alt={
                  user.user_name ||
                  "User"
                }
              />
            ) : (
              <FaUser />
            )}

          </div>

          {/* Profile Main */}

          <div className="user-details-admin-profile-main">

            <h2>
              {user.user_name || "—"}
            </h2>

            <p className="user-details-admin-profile-email">

              <FaEnvelope />

              <span>
                {user.email || "—"}
              </span>

            </p>

            <div className="user-details-admin-profile-status">

              {/* Status */}

              <span
                className={`user-details-admin-status-badge ${
                  user.isActive
                    ? "user-details-admin-status-active"
                    : "user-details-admin-status-suspended"
                }`}
              >

                <span className="user-details-admin-status-dot" />

                {user.isActive
                  ? "Active"
                  : "Suspended"}

              </span>

              {/* Verified */}

              {user.isVerfied && (
                <span className="user-details-admin-verified-badge">

                  <FaCheck />

                  Verified

                </span>
              )}

              {/* Role */}

              <span className="user-details-admin-role-badge">

                {getRoleName(
                  user.rolId
                )}

              </span>

            </div>

          </div>

        </div>

        {/* =====================================
            Personal Information
        ===================================== */}

        <div className="user-details-admin-section">

          <div className="user-details-admin-section-title">

            <div>

              <h3>
                Personal Information
              </h3>

              <span>
                Profile details
              </span>

            </div>

          </div>

          <div className="user-details-admin-info-grid">

            {/* First Name */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaUser />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  First Name
                </span>

                <strong>
                  {profile?.first_name || "—"}
                </strong>

              </div>

            </div>

            {/* Last Name */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaUser />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  Last Name
                </span>

                <strong>
                  {profile?.last_name || "—"}
                </strong>

              </div>

            </div>

            {/* Birthday */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaCalendarAlt />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  Birthday
                </span>

                <strong>
                  {formatDate(
                    profile?.birthday
                  )}
                </strong>

              </div>

            </div>

            {/* Phone */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaPhone />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  Phone
                </span>

                <strong>
                  {profile?.phone || "—"}
                </strong>

              </div>

            </div>

            {/* Location */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  Location
                </span>

                <strong>
                  {profile?.location || "—"}
                </strong>

              </div>

            </div>

            {/* Evaluation */}

            <div className="user-details-admin-info-item">

              <div className="user-details-admin-info-icon">
                <FaStar />
              </div>

              <div className="user-details-admin-info-content">

                <span>
                  Evaluation
                </span>

                <strong>
                  {profile?.evaluation ??
                    "No evaluation"}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            Account Information
        ===================================== */}

      

        {/* =====================================
            Actions
        ===================================== */}

        <div className="user-details-admin-actions">

          {user.isActive ? (

            <button
              type="button"
              className="user-details-admin-suspend-btn"
              onClick={handleUserStatus}
              disabled={actionLoading}
            >

              <FaBan />

              <span>
                {actionLoading
                  ? "Suspending..."
                  : "Suspend User"}
              </span>

            </button>

          ) : (

            <button
              type="button"
              className="user-details-admin-activate-btn"
              onClick={handleUserStatus}
              disabled={actionLoading}
            >

              <FaUserCheck />

              <span>
                {actionLoading
                  ? "Activating..."
                  : "Activate User"}
              </span>

            </button>

          )}

        </div>

      </div>

    </div>
  );
}