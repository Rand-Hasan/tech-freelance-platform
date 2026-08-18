import "../../AuditLog/styles/AuditLog.css";

import {
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import Loading from "../../../../components/Loading/Loading";

import {
  GetLogs,
} from "../../AuditLog/services/AuditLogapi";

export default function AuditLog() {

  const cookies = Cookies();

  // =========================================
  // Logs
  // =========================================

  const [logs, setLogs] = useState([]);

  // =========================================
  // Loading
  // =========================================

  const [loading, setLoading] = useState(true);

  // =========================================
  // Error
  // =========================================

  const [error, setError] = useState("");

  // =========================================
  // Access Denied
  // =========================================

  const [accessDenied, setAccessDenied] =
    useState(false);

  // =========================================
  // Pagination
  // =========================================

  const [page, setPage] = useState(1);

  const limit = 3;

  // =========================================
  // Permission Error
  // =========================================

  const isPermissionError = (err) => {

    const status =
      err.response?.status;

    const backendMessage =
      err.response?.data?.message;

    // Backend 403

    if (status === 403) {
      return true;
    }

    // Backend string message

    if (
      typeof backendMessage === "string"
    ) {
      const message =
        backendMessage.toLowerCase();

      return (
        message.includes("forbidden") ||
        message.includes("missing permission") ||
        message.includes("permission denied") ||
        message.includes("permission key") ||
        message.includes("not configured") ||
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
  };

  // =========================================
  // Backend Error Message
  // =========================================

  const getErrorMessage = (
    err
  ) => {

    const responseData =
      err.response?.data;

    const backendMessage =
      responseData?.message;

    // String message

    if (
      typeof backendMessage ===
      "string"
    ) {
      return backendMessage;
    }

    // Object message

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

    // Validation error

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    return "Unable to load audit logs.";
  };

  // =========================================
  // Get Logs
  // =========================================

  const getLogs = async () => {

    try {

      setLoading(true);

      setError("");

      setAccessDenied(false);

      const token =
        cookies.get(
          "token-employee"
        );

      const url =
        `${baseURL}${GetLogs}/${page}/${limit}`;

      console.log(
        "GET AUDIT LOGS URL:",
        url
      );

      const response =
        await axios.get(
          url,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "AUDIT LOGS RESPONSE:",
        response.data
      );

      console.log(
        "LOGS COUNT:",
        response.data?.logs?.length
      );

      console.log(
        "LOG IDS:",
        response.data?.logs?.map(
          (log) => log.id
        )
      );

      console.log(
        "AUDIT LOGS RESPONSE:",
        response.data
      );

      // =========================================
      // Logs
      // =========================================

      setLogs(
        response.data?.logs || []
      );

      // =========================================
      // Request Success
      // =========================================

      setAccessDenied(false);

    } catch (err) {

      console.error(
        "GET AUDIT LOGS ERROR:",
        err
      );

      console.error(
        "GET AUDIT LOGS ERROR DATA:",
        err.response?.data
      );

      // =========================================
      // Permission Error
      // =========================================

      if (
        isPermissionError(err)
      ) {

        setAccessDenied(true);

        setLogs([]);

        setError("");

        return;
      }

      // =========================================
      // Normal Error
      // =========================================

      setLogs([]);

      setError(
        getErrorMessage(err)
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================
  // Load Logs
  // =========================================

  useEffect(() => {

    getLogs();

  }, [page]);

  // =========================================
  // Parse Metadata
  // =========================================

  const parseMetadata = (
    metadata
  ) => {

    if (!metadata) {
      return null;
    }

    try {

      return JSON.parse(metadata);

    } catch {

      return null;
    }
  };

  // =========================================
  // Format Time
  // =========================================

  const formatTime = (
    date
  ) => {

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

    return parsedDate.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // =========================================
  // Format Date
  // =========================================

  const formatDate = (
    date
  ) => {

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
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =========================================
  // Loading
  // =========================================

  if (
    loading &&
    !accessDenied
  ) {

    return (
      <div className="audit-page">

        <Loading />

      </div>
    );
  }

  // =========================================
  // Access Denied
  // =========================================

  if (accessDenied) {

    return (
      <div className="audit-page">

        <div className="audit-access-denied">

          <div className="audit-access-denied-icon">
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
    <div className="audit-page">

      {/* =====================================
          Loading
      ===================================== */}

      {loading && <Loading />}

      {/* =====================================
          Header
      ===================================== */}

      <div className="audit-header">

        <div className="audit-header-left">

          <div className="audit-header-icon">
            <FaHistory />
          </div>

          <div>

            <h1>
              Audit Logs
            </h1>

            <p>
              Track administrative actions
              and platform activity.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="audit-refresh-btn"
          onClick={getLogs}
          disabled={loading}
        >

          <FaSyncAlt />

          Refresh

        </button>

      </div>

      {/* =====================================
          Error
      ===================================== */}

      {error && (
        <div className="audit-error">
          {error}
        </div>
      )}

      {/* =====================================
          Activity Card
      ===================================== */}

      <div className="audit-card">

        <div className="audit-card-header">

          <div>

            <h2>
              Recent Activity
            </h2>

            <p>
              Latest administrative events
            </p>

          </div>

          <span className="audit-live-badge">

            <span />

            Live Activity

          </span>

        </div>

        {/* =====================================
            Timeline
        ===================================== */}

        <div className="audit-timeline">

          {logs.length === 0 ? (

            <div className="audit-empty">

              <FaHistory />

              <h3>
                No Audit Logs
              </h3>

              <p>
                No administrative activity
                was found.
              </p>

            </div>

          ) : (

            logs.map(
              (log, index) => {

                const metadata =
                  parseMetadata(
                    log.metadata
                  );

                return (

                  <div
                    className="audit-event"
                    key={log.id}
                  >

                    {/* =================================
                        Timeline
                    ================================= */}

                    <div className="audit-timeline-column">

                      <div
                        className="audit-event-dot audit-action-default"
                      >
                        <FaHistory />
                      </div>

                      {index !==
                        logs.length - 1 && (
                        <div className="audit-timeline-line" />
                      )}

                    </div>

                    {/* =================================
                        Event
                    ================================= */}

                    <div className="audit-event-content">

                      <div className="audit-event-top">

                        <div>

                          <h3>
                            {log.action}
                          </h3>

                          <p>

                            Performed by{" "}

                            <strong>
                              {log.actor_position}
                            </strong>

                            {log.actor_id !== null &&
                              log.actor_id !== undefined && (
                                <>
                                  {" "}
                                  (ID: {log.actor_id})
                                </>
                              )}

                          </p>

                        </div>

                        <div className="audit-event-date">

                          <strong>
                            {formatTime(
                              log.createdAt
                            )}
                          </strong>

                          <span>
                            {formatDate(
                              log.createdAt
                            )}
                          </span>

                        </div>

                      </div>

                      {/* =================================
                          Event Bottom
                      ================================= */}

                      <div className="audit-event-bottom">

                        <div className="audit-target">

                          <span className="audit-target-icon">

                            <FaHistory />

                          </span>

                          <div>

                            <span>
                              Target
                            </span>

                            <strong>
                              {log.target_type} #
                              {log.target_id}
                            </strong>

                          </div>

                        </div>

                        <div
                          className="audit-action-badge audit-action-default"
                        >
                          {log.action}
                        </div>

                      </div>

                      {/* =================================
                          Metadata
                      ================================= */}

                      {metadata && (
                        <div className="audit-metadata">

                          {Object.entries(
                            metadata
                          ).map(
                            ([key, value]) => (

                              <div
                                key={key}
                                className="audit-metadata-item"
                              >

                                <span>
                                  {key}
                                </span>

                                <strong>
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : String(value)}
                                </strong>

                              </div>

                            )
                          )}

                        </div>
                      )}

                    </div>

                  </div>
                );
              }
            )
          )}

        </div>

        {/* =====================================
            Pagination
        ===================================== */}

        <div className="audit-pagination">

          <button
            type="button"
            disabled={
              page === 1 ||
              loading ||
              !!error
            }
            onClick={() =>
              setPage(
                (prev) =>
                  Math.max(
                    1,
                    prev - 1
                  )
              )
            }
          >

            <FaChevronLeft />

            Previous

          </button>

          <span>

            Page{" "}

            <strong>
              {page}
            </strong>

          </span>

          <button
            type="button"
            disabled={
              loading ||
              !!error ||
              logs.length < limit
            }
            onClick={() =>
              setPage(
                (prev) =>
                  prev + 1
              )
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      </div>

    </div>
  );
}