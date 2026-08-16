import "../../Contracts/styles/Contracts.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";

import {
  GetAllContracts,
} from "../../Contracts/services/AdminContractsapi";


const LIMIT = 10;


export default function AdminContracts() {
const navigate = useNavigate();
  const cookies = Cookies();


  // =========================
  // Contracts
  // =========================

  const [contracts, setContracts] = useState([]);


  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);


  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);


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

    const status =
      error.response?.status;

    const backendMessage =
      error.response?.data?.message;


    // Backend 403

    if (status === 403) {
      return true;
    }


    // Backend message

    if (
      typeof backendMessage === "string"
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
  // Get Contracts
  // =========================

  async function getContracts() {

    try {

      setLoading(true);
      setError("");


      const token =
        cookies.get("token-employee");


      const response = await axios.get(

        `${baseURL}${GetAllContracts}/${page}/${LIMIT}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      console.log(
        "CONTRACTS:",
        response.data
      );


      setContracts(
        response.data.contracts || []
      );


      // Request succeeded

      setAccessDenied(false);


    } catch (err) {

      console.log(
        "CONTRACTS ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setContracts([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to load contracts."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Contracts
  // =========================

  useEffect(() => {

    getContracts();

  }, [page]);


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
        return "admin-contracts-status-active";

      case "completed":
        return "admin-contracts-status-completed";

      case "cancelled":
        return "admin-contracts-status-cancelled";

      case "in_review":
        return "admin-contracts-status-review";

      case "accepted_pending_fund":
        return "admin-contracts-status-review";

      case "pending":
        return "admin-contracts-status-review";

      case "draft":
        return "admin-contracts-status-draft";

      default:
        return "admin-contracts-status-draft";
    }
  }


  // =========================
  // Initial Loading
  // =========================

  if (
    loading &&
    !accessDenied
  ) {

    return (

      <div className="admin-contracts-page">

        <Loading />

      </div>

    );
  }


  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {

    return (

      <div className="admin-contracts-page">

        <div className="admin-contracts-access-denied">

          <div className="admin-contracts-access-icon">
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

    <div className="admin-contracts-page">


      {loading && <Loading />}


      <div className="admin-contracts-card">


        {/* =========================
            Error
        ========================= */}

        {error && (

          <div className="admin-contracts-error">

            {error}

          </div>

        )}


        {/* =========================
            Table
        ========================= */}

        <div className="admin-contracts-table-container">

          <table className="admin-contracts-table">


            <thead>

              <tr>

                <th>
                  Contract
                </th>

                <th>
                  Client
                </th>

                <th>
                  Freelancer
                </th>

                <th>
                  Value
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>


              {!loading &&
              contracts.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="admin-contracts-empty"
                  >

                    No contracts found.

                  </td>

                </tr>

              ) : (

                contracts.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >


                      {/* Contract */}

                      <td className="admin-contracts-name">

  <button
    type="button"
    className="admin-contracts-contract-link"
    onClick={() =>
    navigate(
    `/AdminLayout/AdminContractDetails/${item.id}`
)
    }
  >
    {item.title}
  </button>

</td>


                      {/* Client */}

                      <td>

                        Client #{item.client_id}

                      </td>


                      {/* Freelancer */}

                      <td>

                        Freelancer #{item.freelancer_id}

                      </td>


                      {/* Value */}

                      <td className="admin-contracts-price">

                        $
                        {Number(
                          item.total_budget
                        ).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}

                      </td>


                      {/* Status */}

                      <td>

                        <span
                          className={`admin-contracts-badge ${getStatusClass(
                            item.status
                          )}`}
                        >

                          {formatStatus(
                            item.status
                          )}

                        </span>

                      </td>


                    </tr>

                  )
                )

              )}


            </tbody>

          </table>

        </div>


        {/* =========================
            Pagination
        ========================= */}

        <div className="admin-contracts-pagination">


          <button
            type="button"
            className="admin-contracts-pagination-btn"
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

            ← Previous

          </button>


          <div className="admin-contracts-pagination-current">

            <span>
              Page
            </span>

            <strong>
              {page}
            </strong>

          </div>


          <button
            type="button"
            className="admin-contracts-pagination-btn"
            disabled={
              contracts.length <
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

            Next →

          </button>


        </div>


      </div>

    </div>

  );
}