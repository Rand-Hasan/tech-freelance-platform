import "../../../Admin/FinesCommission/styles/Financial.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import {
  GetAllTransactions,
  GetFinancialReport,
} from "../../FinesCommission/services/Financialapi";

import Loading from "../../../../components/Loading/Loading";

export default function Financial() {
  const cookies = Cookies();

  // =========================
  // Transactions
  // =========================

  const [transactions, setTransactions] = useState([]);

  // =========================
  // Financial Report
  // =========================

  const [financialReport, setFinancialReport] = useState({});

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
  // Page
  // =========================

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

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
      return "You don't have permission to view financial information.";
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
        "Failed to load financial information."
      );
    }

    // =========================
    // Default Error
    // =========================

    return "Failed to load financial information.";
  }

  // =========================
  // Check Permission Error
  // =========================

  function isPermissionError(err) {
    const backendMessage =
      err.response?.data?.message;

    return (
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
    );
  }

  // =========================
  // Get All Transactions
  // =========================

  async function getTransactions() {
    try {
      setLoading(true);
      setError("");
      setAccessDenied(false);

      const token =
        cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetAllTransactions}/${page}/${limit}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      console.log(
        "FINANCIAL TRANSACTIONS:",
        response.data
      );

      setTransactions(
        response.data?.transactions || []
      );

    } catch (err) {
      console.log(
        "GET TRANSACTIONS ERROR:",
        err.response?.data
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      // =========================
      // Access Denied
      // =========================

      if (isPermissionError(err)) {
        setAccessDenied(true);
        setError("");
        setTransactions([]);

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
  // Get Financial Report
  // =========================

  async function getFinancialReport() {
    try {
      const token =
        cookies.get("token-employee");

      const response = await axios.get(
        `${baseURL}${GetFinancialReport}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      console.log(
        "FINANCIAL REPORT:",
        response.data
      );

      setFinancialReport(
        response.data?.summary || {}
      );

    } catch (err) {
      console.log(
        "GET FINANCIAL REPORT ERROR:",
        err.response?.data
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      // =========================
      // Access Denied
      // =========================

      if (isPermissionError(err)) {
        setAccessDenied(true);
        setError("");
        setFinancialReport({});

        return;
      }

      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(err)
      );
    }
  }

  // =========================
  // Load Transactions
  // =========================

  useEffect(() => {
    getTransactions();
  }, [page]);

  // =========================
  // Load Financial Report
  // =========================

  useEffect(() => {
    getFinancialReport();
  }, []);

  // =========================
  // Format Type
  // =========================

  function formatType(type) {
    if (!type) {
      return "-";
    }

    switch (type) {
      case "escrow_hold":
        return "Escrow Hold";

      case "escrow_release":
        return "Escrow Release";

      case "deposit":
        return "Deposit";

      case "withdrawal":
        return "Withdrawal";

      case "platform_fee":
        return "Platform Fee";

      case "refund":
        return "Refund";

      default:
        return type
          .replaceAll("_", " ")
          .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
          );
    }
  }

  // =========================
  // Format Date
  // =========================

  function formatDate(date) {
    if (!date) {
      return "-";
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
  // Format Amount
  // =========================

  function formatAmount(amount) {
    return `$${Number(
      amount || 0
    ).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  // =========================
  // Financial Report Data
  // =========================

  const reportItems =
    Object.entries(
      financialReport
    );

  const totalVolume =
    reportItems.reduce(
      (total, [, item]) => {
        return (
          total +
          Number(item?.total || 0)
        );
      },
      0
    );

  const totalCompletedTransactions =
    reportItems.reduce(
      (total, [, item]) => {
        return (
          total +
          Number(item?.count || 0)
        );
      },
      0
    );

  // =========================
  // Failed Transactions
  // =========================

  const failedTransactions =
    transactions.filter(
      (transaction) =>
        transaction.status === "failed"
    );

  const failedCount =
    failedTransactions.length;

  // =========================
  // Access Denied Screen
  // =========================

  if (accessDenied) {
    return (
      <div className="finance-page">

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
    <div className="finance-page">

      {/* =========================
          Loading
      ========================= */}

      {loading && <Loading />}

      {/* =========================
          Error
      ========================= */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          Statistics
      ========================= */}

      <div className="finance-stats">

        {/* Total Volume */}

        <div className="finance-stat-card volume-card">

          <div className="finance-stat-content">

            <span className="finance-stat-label">
              Total Volume
            </span>

            <strong className="finance-stat-value">
              {formatAmount(totalVolume)}
            </strong>

            <span className="finance-stat-description">
              Completed transactions
            </span>

          </div>

          <div className="stat-decoration" />

        </div>

        {/* Completed Transactions */}

        <div className="finance-stat-card completed-card">

          <div className="finance-stat-content">

            <span className="finance-stat-label">
              Completed Transactions
            </span>

            <strong className="finance-stat-value">
              {totalCompletedTransactions}
            </strong>

            <span className="finance-stat-description">
              Successfully processed
            </span>

          </div>

          <div className="stat-decoration" />

        </div>

        {/* Failed Transactions */}

        <div className="finance-stat-card failed-card">

          <div className="finance-stat-content">

            <span className="finance-stat-label">
              Failed Transactions
            </span>

            <strong className="finance-stat-value">
              {failedCount}
            </strong>

            <span className="finance-stat-description">
              Failed transactions
            </span>

          </div>

          <div className="stat-decoration" />

        </div>

      </div>

      {/* =========================
          Transactions Table
      ========================= */}

      <div className="finance-table-card">

        <div className="finance-table-wrapper">

          <table className="finance-table">

            <thead>

              <tr>

                <th>
                  TRANSACTION
                </th>

                <th>
                  TYPE
                </th>

                <th>
                  AMOUNT
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  DATE
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="finance-empty"
                  >
                    No transactions found.
                  </td>

                </tr>

              ) : (

                transactions.map(
                  (transaction) => (

                    <tr
                      key={transaction.id}
                    >

                      {/* Transaction */}

                      <td>

                        <div className="transaction-description">

                          <strong>
                            Wallet #
                            {transaction.wallet_id}
                          </strong>

                          <span>
                            Contract #
                            {transaction.contract_id}
                            {" "}
                            ·
                            {" "}
                            Phase #
                            {transaction.phase_id}
                          </span>

                        </div>

                      </td>

                      {/* Type */}

                      <td>

                        <span
                          className={`transaction-type ${transaction.type}`}
                        >
                          {formatType(
                            transaction.type
                          )}
                        </span>

                      </td>

                      {/* Amount */}

                      <td>

                        <span
                          className={`transaction-amount ${transaction.status}`}
                        >
                          {formatAmount(
                            transaction.amount
                          )}
                        </span>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`transaction-status ${transaction.status}`}
                        >

                          {transaction.status ===
                            "completed" && (
                            <span>
                              ✓
                            </span>
                          )}

                          {transaction.status ===
                            "failed" && (
                            <span>
                              ✕
                            </span>
                          )}

                          {transaction.status ===
                          "completed"
                            ? "Success"
                            : transaction.status ===
                              "failed"
                            ? "Failed"
                            : transaction.status}

                        </span>

                      </td>

                      {/* Date */}

                      <td>

                        <span className="transaction-date">

                          {formatDate(
                            transaction.createdAt
                          )}

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

          {transactions.length > 0 && (

            <div className="pagination">

              <button
                disabled={
                  loading ||
                  page === 1
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

              <span>
                Page {page}
              </span>

              <button
                disabled={
                  loading ||
                  transactions.length <
                    limit
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

          )}

        </div>

      </div>

    </div>
  );
}