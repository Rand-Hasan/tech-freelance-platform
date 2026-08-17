import "../../AdminOffers/styles/AdminOffers.css";
import {
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";

import {
  GetAllOffers,
  CancelOffer,
} from "../../AdminOffers/services/AdminOffersapi";


const LIMIT = 10;


export default function AdminOffers() {
 const navigate = useNavigate();
  const cookies = Cookies();


  // =========================
  // Offers
  // =========================

  const [offers, setOffers] = useState([]);


  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);


  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(false);


  // =========================
  // Action Loading
  // =========================

  const [actionLoading, setActionLoading] =
    useState(null);


  // =========================
  // Error
  // =========================

  const [error, setError] = useState("");


  // =========================
  // Access Denied
  // =========================

  const [accessDenied, setAccessDenied] =
    useState(false);


  // =========================
  // Permission Error
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
  // Backend Error
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
  // Get Offers
  // =========================

  async function getOffers() {

    try {

      setLoading(true);
      setError("");


      const token =
        cookies.get("token-employee");


      const response = await axios.get(

        `${baseURL}${GetAllOffers}/${page}/${LIMIT}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      console.log(
        "OFFERS:",
        response.data
      );


      setOffers(
        response.data.offers || []
      );


      setAccessDenied(false);


    } catch (err) {

      console.log(
        "OFFERS ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setOffers([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to load offers."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Offers
  // =========================

  useEffect(() => {

    getOffers();

  }, [page]);


  // =========================
  // Format Status
  // =========================

  function formatStatus(status) {

    if (!status) {
      return "—";
    }


    const statusMap = {

      pending: "Pending",

      accepted: "Accepted",

      cancelled: "Cancelled",

      rejected: "Rejected",

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
    case "pending":
      return "admin-offers-status-pending";

    case "accepted":
      return "admin-offers-status-accepted";

    case "canceled":
      return "admin-offers-status-cancelled";

    case "rejected":
      return "admin-offers-status-rejected";

    default:
      return "admin-offers-status-default";
  }
}


  // =========================
  // Cancel Offer
  // =========================

  async function handleCancelOffer(
    offerId
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this offer?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(offerId);
      setError("");


      const token =
        cookies.get("token-employee");


      const response = await axios.post(

        `${baseURL}${CancelOffer}/${offerId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );


      console.log(
        "CANCEL OFFER RESPONSE:",
        response.data
      );


      // Update UI directly
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === offerId
            ? {
                ...offer,
                  offerStatus: "canceled",
              }
            : offer
        )
      );


    } catch (err) {

      console.log(
        "CANCEL OFFER ERROR:",
        err.response?.data || err
      );


      // =========================
      // Permission Error
      // =========================

      if (isPermissionError(err)) {

        setAccessDenied(true);

        setOffers([]);

        return;
      }


      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(
          err,
          "Unable to cancel offer."
        )
      );


    } finally {

      setActionLoading(null);

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

      <div className="admin-offers-page">

        <Loading />

      </div>

    );
  }


  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {

    return (

      <div className="admin-offers-page">

        <div className="admin-offers-access-denied">

          <div className="admin-offers-access-icon">
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

    <div className="admin-offers-page">


      {loading && <Loading />}


      <div className="admin-offers-card">


        {/* =========================
            Error
        ========================= */}

        {error && (

          <div className="admin-offers-error">

            {error}

          </div>

        )}


        {/* =========================
            Table
        ========================= */}

        <div className="admin-offers-table-container">

          <table className="admin-offers-table">


            <thead>

              <tr>

                <th>
                  Freelancer
                </th>

                <th>
                  Client
                </th>

                <th>
                  Project
                </th>

                <th>
                  Proposed Price
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {!loading &&
              offers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="admin-offers-empty"
                  >

                    No offers found.

                  </td>

                </tr>

              ) : (

                offers.map(
                  (offer) => {

                    const isActionLoading =
                      actionLoading ===
                      offer.id;


                    return (

                      <tr
                        key={offer.id}
                      >


                        {/* Freelancer */}

                       <td>

  <button
    type="button"
    className="admin-offers-offer-link"
    onClick={() =>
      navigate(
        `/AdminLayout/AdminOfferDetails/${offer.id}`
      )
    }
  >

    Freelancer #{offer.freelancer_id}

  </button>

</td>

                        {/* Client */}

                        <td>

                          <span className="admin-offers-user-id">

                            Client #

                            {offer.client_id}

                          </span>

                        </td>


                        {/* Project */}

                        <td>

                          <span className="admin-offers-project-id">

                            Project #

                            {offer.project_id}

                          </span>

                        </td>


                        {/* Price */}

                        <td className="admin-offers-price">

                          $

                          {Number(
                            offer.proposed_price
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
                            className={`admin-offers-badge ${getStatusClass(
                              offer.offerStatus
                            )}`}
                          >

                            {formatStatus(
                              offer.offerStatus
                            )}

                          </span>

                        </td>


                        {/* Action */}

                        <td>

                          {offer.offerStatus === "canceled" ? (

                            <span className="admin-offers-no-action">

                              —

                            </span>

                          ) : (

                            <button
                              type="button"
                              className="admin-offers-cancel-btn"
                              disabled={
                                isActionLoading
                              }
                              onClick={() =>
                                handleCancelOffer(
                                  offer.id
                                )
                              }
                            >

                              {isActionLoading
                                ? "..."
                                : "Cancel"}

                            </button>

                          )}

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

        <div className="admin-offers-pagination">


          <button
            type="button"
            className="admin-offers-pagination-btn"
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


          <div className="admin-offers-pagination-current">

            <span>
              Page
            </span>

            <strong>
              {page}
            </strong>

          </div>


          <button
            type="button"
            className="admin-offers-pagination-btn"
            disabled={
              offers.length <
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