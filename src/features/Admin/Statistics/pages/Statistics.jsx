import "../../../Admin/Statistics/styles/Statistics.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import { GetOverview } from "../../Statistics/services/Statisticsapi";

import Loading from "../../../../components/Loading/Loading";

export default function Statistics() {
  const cookies = Cookies();

  // =========================
  // Overview
  // =========================

  const [overview, setOverview] = useState(null);

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
  // Get Backend Error Message
  // =========================

  function getErrorMessage(err) {
    const responseData = err.response?.data;

    const backendMessage = responseData?.message;

    // =========================
    // Forbidden / Missing Permission
    // =========================

    if (
      err.response?.status === 403 ||
      (
        typeof backendMessage === "string" &&
        (
          backendMessage
            .toLowerCase()
            .includes("forbidden") ||
          backendMessage
            .toLowerCase()
            .includes("missing permission")
        )
      )
    ) {
      return "You don't have permission to view statistics.";
    }

    // =========================
    // Validation Error
    // =========================

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    // =========================
    // Normal Backend Message
    // =========================

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    // =========================
    // Object Message
    // =========================

    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {
      return (
        backendMessage.message ||
        "Failed to load dashboard overview."
      );
    }

    // =========================
    // Default Error
    // =========================

    return "Failed to load dashboard overview.";
  }

  // =========================
  // Get Overview
  // =========================

  async function getOverview() {
    try {
      setLoading(true);
      setError("");
      setAccessDenied(false);

      const token =
        cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetOverview}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      console.log(
        "DASHBOARD OVERVIEW:",
        response.data
      );

      setOverview(
        response.data?.overview || {}
      );

    } catch (err) {
      console.log(
        "GET DASHBOARD OVERVIEW ERROR:",
        err.response?.data
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      const backendMessage =
        err.response?.data?.message;

      // =========================
      // Check Access Denied
      // =========================

      const isForbidden =
        err.response?.status === 403 ||
        (
          typeof backendMessage === "string" &&
          (
            backendMessage
              .toLowerCase()
              .includes("forbidden") ||
            backendMessage
              .toLowerCase()
              .includes("missing permission")
          )
        );

      if (isForbidden) {
        setAccessDenied(true);
        setError("");
        setOverview(null);

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
  // Load Overview
  // =========================

  useEffect(() => {
    getOverview();
  }, []);

  // =========================
  // Access Denied Screen
  // =========================

  if (accessDenied) {
    return (
      <div className="dashboard-page">

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
  // Overview Data
  // =========================

  const users =
    overview?.users || {};

  const projects =
    overview?.projects || {};

  const contracts =
    overview?.contracts || {};

  const offers =
    overview?.offers || {};

  const reviews =
    overview?.reviews || {};

  const reports =
    overview?.reports || {};

  const walletSummary =
    overview?.wallet_summary || {};

  // =========================
  // Users Chart
  // =========================

  const totalUsers =
    Number(users.total || 0);

  const freelancerPercentage =
    totalUsers > 0
      ? (
          Number(
            users.freelancers || 0
          ) / totalUsers
        ) * 100
      : 0;

  const clientPercentage =
    totalUsers > 0
      ? (
          Number(
            users.clients || 0
          ) / totalUsers
        ) * 100
      : 0;

  const employeePercentage =
    totalUsers > 0
      ? (
          Number(
            users.employees || 0
          ) / totalUsers
        ) * 100
      : 0;

  const freelancerEnd =
    freelancerPercentage;

  const clientEnd =
    freelancerPercentage +
    clientPercentage;

  // =========================
  // Project Levels
  // =========================

  const projectTotal =
    Number(projects.total || 0);

  const junior =
    Number(
      projects.by_level?.junior || 0
    );

  const middle =
    Number(
      projects.by_level?.middle || 0
    );

  const expert =
    Number(
      projects.by_level?.expert || 0
    );

  const juniorPercentage =
    projectTotal > 0
      ? (junior / projectTotal) * 100
      : 0;

  const middlePercentage =
    projectTotal > 0
      ? (middle / projectTotal) * 100
      : 0;

  const expertPercentage =
    projectTotal > 0
      ? (expert / projectTotal) * 100
      : 0;

  // =========================
  // Contracts
  // =========================

  const contractStatuses = [
    {
      key: "draft",
      label: "Draft",
      value:
        contracts.by_status?.draft || 0,
    },
    {
      key: "accepted_pending_fund",
      label: "Pending Fund",
      value:
        contracts.by_status
          ?.accepted_pending_fund || 0,
    },
    {
      key: "active",
      label: "Active",
      value:
        contracts.by_status?.active || 0,
    },
    {
      key: "completed",
      label: "Completed",
      value:
        contracts.by_status?.completed || 0,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      value:
        contracts.by_status?.cancelled || 0,
    },
  ];

  // =========================
  // Offers
  // =========================

 const offerStatuses = [
  {
    key: "pending",
    label: "Pending",
    value: offers.by_status?.pending || 0,
  },
  {
    key: "accepted",
    label: "Accepted",
    value: offers.by_status?.accepted || 0,
  },
  {
    key: "rejected",
    label: "Rejected",
    value: offers.by_status?.rejected || 0,
  },
  {
    key: "canceled",
    label: "Canceled",
    value: offers.by_status?.canceled || 0,
  },
];
/////skilees////
const mostRequestedSkills =
  overview?.most_requested_skills || [];
/////

  // =========================
  // Render
  // =========================

  return (
    <div className="dashboard-page">

      {/* =========================
          Loading
      ========================= */}

      {loading && <Loading />}

      {/* =========================
          Normal Error
      ========================= */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          TOP STATISTICS
      ========================= */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-content">

            <span className="dashboard-stat-label">
              Total Users
            </span>

            <strong className="dashboard-stat-value">
              {users.total || 0}
            </strong>

            <span className="dashboard-stat-description">
              {users.active || 0} active users
            </span>

          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-content">

            <span className="dashboard-stat-label">
              Total Projects
            </span>

            <strong className="dashboard-stat-value">
              {projects.total || 0}
            </strong>

            <span className="dashboard-stat-description">
              {projects.suspended || 0} suspended
            </span>

          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-content">

            <span className="dashboard-stat-label">
              Total Contracts
            </span>

            <strong className="dashboard-stat-value">
              {contracts.total || 0}
            </strong>

            <span className="dashboard-stat-description">
              {contracts.by_status?.active || 0} active
            </span>

          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-content">

            <span className="dashboard-stat-label">
              Total Offers
            </span>

            <strong className="dashboard-stat-value">
              {offers.total || 0}
            </strong>

            <span className="dashboard-stat-description">
              {offers.by_status?.accepted || 0} accepted
            </span>

          </div>

        </div>

      </div>

      {/* =========================
          USERS + PROJECTS
      ========================= */}

      <div className="dashboard-grid-two">

        {/* USERS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Users Overview
              </h2>

              <p>
                Distribution of platform users
              </p>

            </div>

          </div>

          <div className="statistics-chart-section">

            <div
              className="donut-chart users-chart"
              style={{
                "--freelancer":
                  `${freelancerEnd}%`,
                "--client":
                  `${clientEnd}%`,
              }}
            >

              <div className="donut-center">

                <strong>
                  {users.total || 0}
                </strong>

                <span>
                  Users
                </span>

              </div>

            </div>

            <div className="chart-legend">

              <div className="legend-item">

                <span className="legend-dot freelancer" />

                <div>

                  <span>
                    Freelancers
                  </span>

                  <strong>
                    {users.freelancers || 0}
                  </strong>

                </div>

              </div>

              <div className="legend-item">

                <span className="legend-dot client" />

                <div>

                  <span>
                    Clients
                  </span>

                  <strong>
                    {users.clients || 0}
                  </strong>

                </div>

              </div>

              <div className="legend-item">

                <span className="legend-dot employee" />

                <div>

                  <span>
                    Employees
                  </span>

                  <strong>
                    {users.employees || 0}
                  </strong>

                </div>

              </div>

            </div>

          </div>

          <div className="user-summary">

            <div>

              <span>
                Active
              </span>

              <strong className="success-text">
                {users.active || 0}
              </strong>

            </div>

            <div>

              <span>
                New This Month
              </span>

              <strong>
                {users.new_this_month || 0}
              </strong>

            </div>

            <div>

              <span>
                Suspended
              </span>

              <strong className="danger-text">
                {users.suspended || 0}
              </strong>

            </div>

          </div>

        </div>

        {/* PROJECTS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Projects by Level
              </h2>

              <p>
                Project distribution according to level
              </p>

            </div>

          </div>

          <div className="project-chart">

            <div className="project-total">

              <span>
                Total Projects
              </span>

              <strong>
                {projects.total || 0}
              </strong>

            </div>

            <div className="project-bars">

              <div className="project-bar-item">

                <div className="project-bar-header">

                  <span>
                    Junior
                  </span>

                  <strong>
                    {junior}
                  </strong>

                </div>

                <div className="progress-track">

                  <div
                    className="progress-fill junior"
                    style={{
                      width:
                        `${juniorPercentage}%`,
                    }}
                  />

                </div>

                <small>
                  {Math.round(
                    juniorPercentage
                  )}%
                </small>

              </div>

              <div className="project-bar-item">

                <div className="project-bar-header">

                  <span>
                    Middle
                  </span>

                  <strong>
                    {middle}
                  </strong>

                </div>

                <div className="progress-track">

                  <div
                    className="progress-fill middle"
                    style={{
                      width:
                        `${middlePercentage}%`,
                    }}
                  />

                </div>

                <small>
                  {Math.round(
                    middlePercentage
                  )}%
                </small>

              </div>

              <div className="project-bar-item">

                <div className="project-bar-header">

                  <span>
                    Expert
                  </span>

                  <strong>
                    {expert}
                  </strong>

                </div>

                <div className="progress-track">

                  <div
                    className="progress-fill expert"
                    style={{
                      width:
                        `${expertPercentage}%`,
                    }}
                  />

                </div>

                <small>
                  {Math.round(
                    expertPercentage
                  )}%
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          CONTRACTS + OFFERS
      ========================= */}

      <div className="dashboard-grid-two">

        {/* CONTRACTS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Contracts
              </h2>

              <p>
                Current contract status
              </p>

            </div>

          </div>

          <div className="contract-chart">

            <div className="contract-donut">

              <div className="donut-center">

                <strong>
                  {contracts.total || 0}
                </strong>

                <span>
                  Contracts
                </span>

              </div>

            </div>

            <div className="chart-legend contract-legend">

              {contractStatuses.map(
                (item) => (
                  <div
                    className="legend-item"
                    key={item.key}
                  >

                    <span
                      className={`legend-dot ${item.key}`}
                    />

                    <div>

                      <span>
                        {item.label}
                      </span>

                      <strong>
                        {item.value}
                      </strong>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* OFFERS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Offers
              </h2>

              <p>
                Offer status distribution
              </p>

            </div>

          </div>

          <div className="offers-chart">

            {offerStatuses.map(
              (item) => {

                const percentage =
                  offers.total > 0
                    ? (
                        item.value /
                        offers.total
                      ) * 100
                    : 0;

                return (
                  <div
                    className="offer-chart-item"
                    key={item.key}
                  >

                    <div className="offer-chart-top">

                      <span>
                        {item.label}
                      </span>

                      <strong>
                        {item.value}
                      </strong>

                    </div>

                    <div className="progress-track">

                      <div
                        className={`progress-fill offer-${item.key}`}
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>

                    <small>
                      {Math.round(
                        percentage
                      )}%
                    </small>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* =========================
          BOTTOM
      ========================= */}

      <div className="dashboard-grid-three">

        {/* WALLET */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Wallet
              </h2>

              <p>
                Escrow balance
              </p>

            </div>

          </div>

          <div className="wallet-card">

            <div className="wallet-icon">
              $
            </div>

            <div className="wallet-info">

              <span>
                Escrow Hold
              </span>

              <strong>
                $
                {Number(
                  walletSummary
                    ?.escrow_hold
                    ?.total || 0
                ).toLocaleString(
                  "en-US"
                )}
              </strong>

              <small>
                {walletSummary
                  ?.escrow_hold
                  ?.count || 0}{" "}
                transactions
              </small>

            </div>

          </div>

        </div>

        {/* REVIEWS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                Reviews
              </h2>

              <p>
                Platform feedback
              </p>

            </div>

          </div>

          <div className="review-content">

            <div className="review-big-number">
              {reviews.total || 0}
            </div>

            <div className="review-details">

              <span>
                Total Reviews
              </span>

              <div className="rating">

                ★

                <strong>
                  {reviews.average_rating ??
                    "-"}
                </strong>

                <span>
                  Average Rating
                </span>

              </div>

            </div>

          </div>

        </div>
        {/* SYSTEM */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>

              <h2>
                System Overview
              </h2>

              <p>
                Platform activity
              </p>

            </div>

          </div>

          <div className="attention-content">


            <div className="attention-item">

              <div className="attention-left">

                <div className="attention-icon suspended">
                  ✓
                </div>

                <div>

                  <strong>
                    Suspended Projects
                  </strong>

                  <span>
                    Currently suspended
                  </span>

                </div>

              </div>

              <strong className="success-number">
                {projects.suspended || 0}
              </strong>

            </div>

            <div className="attention-item">

              <div className="attention-left">

                <div className="attention-icon projects">
                  +
                </div>

                <div>

                  <strong>
                    New Users
                  </strong>

                  <span>
                    This month
                  </span>

                </div>

              </div>

              <strong>
                {users.new_this_month || 0}
              </strong>

            </div>

          </div>

        </div>
{/* =========================
    MOST REQUESTED SKILLS
========================= */}

<div className="dashboard-panel dashboard-skills-panel">

  <div className="dashboard-panel-header">

    <div>

      <h2>
        Most Requested Skills
      </h2>

      <p>
        Skills requested most frequently in projects
      </p>

    </div>

  </div>


  <div className="requested-skills">
{mostRequestedSkills.map((skill, index) => (

  <div
    className="requested-skill-item"
    key={skill.skill_id || index}
  >

    <div className="requested-skill-left">

      <span className="requested-skill-rank">
        {index + 1}
      </span>

      <div className="requested-skill-info">

        <strong>
          {skill.skill_name || "Unknown Skill"}
        </strong>

        <span>
          {skill.usage_count || 0} requests
        </span>

      </div>

    </div>

    <strong className="requested-skill-count">
      {skill.usage_count || 0}
    </strong>

  </div>

))}

  </div>

</div>
        

      </div>

    </div>
  );
}