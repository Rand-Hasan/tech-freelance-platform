import "../../Contracts/styles/AdminContractDetails.css";

import {
  FaArrowLeft,
  FaFileContract,
  FaDollarSign,
  FaLayerGroup,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaLink,
  FaRedo,
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
  GetAnyContract,
} from "../../Contracts/services/AdminContractsapi";


export default function AdminContractDetails() {

  const navigate = useNavigate();

  const { contractId } = useParams();

  const cookies = Cookies();


  // =========================
  // Contract
  // =========================

  const [contract, setContract] = useState(null);


  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);


  // =========================
  // Error
  // =========================

  const [error, setError] = useState("");


  // =========================
  // Format Status
  // =========================

  function formatStatus(status) {

    if (!status) {
      return "—";
    }


    const statusMap = {

      active: "Active",

      cancelled: "Cancelled",

      completed: "Completed",

      draft: "Draft",

      accepted_pending_fund:
        "Pending Fund",

      in_review:
        "In Review",

      pending:
        "Pending",

      paid:
        "Paid",

      in_progress:
        "In Progress",

    };


    return (
      statusMap[status] ||
      status
        .replaceAll("_", " ")
        .replace(
          /\b\w/g,
          (letter) =>
            letter.toUpperCase()
        )
    );
  }


  // =========================
  // Status Class
  // =========================

  function getStatusClass(status) {

    switch (status) {

      case "active":
        return "admin-contract-details-status-active";

      case "completed":
        return "admin-contract-details-status-completed";

      case "cancelled":
        return "admin-contract-details-status-cancelled";

      case "in_review":
      case "accepted_pending_fund":
      case "pending":
        return "admin-contract-details-status-review";

      case "paid":
        return "admin-contract-details-status-paid";

      case "in_progress":
        return "admin-contract-details-status-progress";

      case "draft":
        return "admin-contract-details-status-draft";

      default:
        return "admin-contract-details-status-draft";
    }
  }


  // =========================
  // Format Type
  // =========================

  function formatType(type) {

    if (!type) {
      return "—";
    }


    return type
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );
  }


  // =========================
  // Format Date
  // =========================

  function formatDate(date) {

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
  }


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
  // Get Contract
  // =========================

  async function getContract() {

    try {

      setLoading(true);
      setError("");


      const token =
        cookies.get("token-employee");


      const response =
        await axios.get(

          `${baseURL}${GetAnyContract}/${contractId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );


      console.log(
        "CONTRACT DETAILS:",
        response.data
      );


      setContract(
        response.data.contract || null
      );


    } catch (err) {

      console.log(
        "CONTRACT DETAILS ERROR:",
        err.response?.data || err
      );


      if (
        isPermissionError(err)
      ) {

        setError(
          "You don't have permission to view this contract."
        );

        return;
      }


      setError(
        getErrorMessage(
          err,
          "Unable to load contract details."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Contract
  // =========================

  useEffect(() => {

    if (!contractId) {
      return;
    }

    getContract();

  }, [contractId]);


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="admin-contract-details-page">

        <Loading />

      </div>

    );
  }


  // =========================
  // Error
  // =========================

  if (error) {

    return (

      <div className="admin-contract-details-page">

        <div className="admin-contract-details-top">

          <button
            type="button"
            className="admin-contract-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Contracts
            </span>

          </button>

        </div>


        <div className="admin-contract-details-card">

          <div className="admin-contract-details-error">

            {error}

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // No Contract
  // =========================

  if (!contract) {

    return (

      <div className="admin-contract-details-page">

        <div className="admin-contract-details-top">

          <button
            type="button"
            className="admin-contract-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Contracts
            </span>

          </button>

        </div>


        <div className="admin-contract-details-card">

          <div className="admin-contract-details-error">

            Contract not found.

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // Render
  // =========================

  return (

    <div className="admin-contract-details-page">


      {/* =====================================
          TOP
      ===================================== */}

      <div className="admin-contract-details-top">

        <button
          type="button"
          className="admin-contract-details-back-btn"
          onClick={() => navigate(-1)}
        >

          <FaArrowLeft />

          <span>
            Back to Contracts
          </span>

        </button>

      </div>


      {/* =====================================
          MAIN CARD
      ===================================== */}

      <div className="admin-contract-details-card">


        {/* ===================================
            CONTRACT HEADER
        =================================== */}

        <div className="admin-contract-details-header">

          <div className="admin-contract-details-header-icon">

            <FaFileContract />

          </div>


          <div className="admin-contract-details-header-content">

            <h1>
              {contract.title}
            </h1>

            <p>
              Contract details
            </p>

          </div>


          <span
            className={`admin-contract-details-status-badge ${getStatusClass(
              contract.status
            )}`}
          >

            {formatStatus(
              contract.status
            )}

          </span>

        </div>


        {/* ===================================
            DESCRIPTION
        =================================== */}

        <div className="admin-contract-details-section">

          <div className="admin-contract-details-section-heading">

            <h2>
              Contract Description
            </h2>

            <span>
              Contract overview
            </span>

          </div>


          <div className="admin-contract-details-description">

            {contract.description ||
              "No description available"}

          </div>

        </div>


        {/* ===================================
            CONTRACT INFORMATION
        =================================== */}

        <div className="admin-contract-details-section">

          <div className="admin-contract-details-section-heading">

            <h2>
              Contract Information
            </h2>

            <span>
              General contract details
            </span>

          </div>


          <div className="admin-contract-details-info-grid">


            {/* Total Budget */}

            <div className="admin-contract-details-info-item">

              <div className="admin-contract-details-info-icon">

                <FaDollarSign />

              </div>


              <div className="admin-contract-details-info-content">

                <span>
                  Total Budget
                </span>

                <strong className="admin-contract-details-price">

                  $
                  {Number(
                    contract.total_budget
                  ).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}

                </strong>

              </div>

            </div>


            {/* Contract Type */}

            <div className="admin-contract-details-info-item">

              <div className="admin-contract-details-info-icon">

                <FaLayerGroup />

              </div>


              <div className="admin-contract-details-info-content">

                <span>
                  Contract Type
                </span>

                <strong>

                  {formatType(
                    contract.type
                  )}

                </strong>

              </div>

            </div>


            {/* Expires */}

            <div className="admin-contract-details-info-item">

              <div className="admin-contract-details-info-icon">

                <FaCalendarAlt />

              </div>


              <div className="admin-contract-details-info-content">

                <span>
                  Expires At
                </span>

                <strong>

                  {formatDate(
                    contract.expires_at
                  )}

                </strong>

              </div>

            </div>


          </div>

        </div>


        {/* ===================================
            PHASES
        =================================== */}

        <div className="admin-contract-details-section">

          <div className="admin-contract-details-section-heading">

            <h2>
              Contract Phases
            </h2>

            <span>
              Work phases and payment details
            </span>

          </div>


          <div className="admin-contract-details-phases">


            {contract.phases &&
            contract.phases.length > 0 ? (

              contract.phases.map(
                (phase, index) => (

                  <div
                    className="admin-contract-details-phase"
                    key={phase.id}
                  >


                    {/* Phase Header */}

                    <div className="admin-contract-details-phase-header">

                      <div>

                        <span className="admin-contract-details-phase-number">

                          Phase {index + 1}

                        </span>

                        <h3>

                          {phase.title}

                        </h3>

                      </div>


                      <span
                        className={`admin-contract-details-status-badge ${getStatusClass(
                          phase.status
                        )}`}
                      >

                        {formatStatus(
                          phase.status
                        )}

                      </span>

                    </div>


                    {/* Phase Description */}

                    <div className="admin-contract-details-phase-description">

                      {phase.description ||
                        "No description available"}

                    </div>


                    {/* Phase Information */}

                    <div className="admin-contract-details-phase-info">


                      {/* Amount */}

                      <div className="admin-contract-details-phase-item">

                        <FaDollarSign />

                        <div>

                          <span>
                            Amount
                          </span>

                          <strong>

                            $
                            {Number(
                              phase.amount
                            ).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}

                          </strong>

                        </div>

                      </div>


                      {/* Deadline */}

                      <div className="admin-contract-details-phase-item">

                        <FaCalendarAlt />

                        <div>

                          <span>
                            Deadline
                          </span>

                          <strong>

                            {formatDate(
                              phase.deadline
                            )}

                          </strong>

                        </div>

                      </div>


                      {/* Duration */}

                      <div className="admin-contract-details-phase-item">

                        <FaClock />

                        <div>

                          <span>
                            Duration
                          </span>

                          <strong>

                            {phase.duration_in_days
                              ? `${phase.duration_in_days} days`
                              : "—"}

                          </strong>

                        </div>

                      </div>


                      {/* Revisions */}

                      <div className="admin-contract-details-phase-item">

                        <FaRedo />

                        <div>

                          <span>
                            Revisions
                          </span>

                          <strong>

                            {phase.used_revisions} /{" "}
                            {phase.allowed_revisions}

                          </strong>

                        </div>

                      </div>


                    </div>


                    {/* Phase URL */}

                    {phase.url && (

                      <div className="admin-contract-details-phase-link">

                        <FaLink />

                        <a
                          href={phase.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          Open Phase Resource

                        </a>

                      </div>

                    )}


                  </div>

                )
              )

            ) : (

              <div className="admin-contract-details-no-phases">

                No phases available.

              </div>

            )}

          </div>

        </div>


      </div>

    </div>

  );
}