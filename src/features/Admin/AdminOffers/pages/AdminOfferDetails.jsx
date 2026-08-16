import "../../AdminOffers/styles/AdminOfferDetails.css";

import {
  FaArrowLeft,
  FaFileInvoiceDollar,
  FaDollarSign,
  FaClock,
  FaAlignLeft,
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
  GetAnyOffer,
} from "../../AdminOffers/services/AdminOffersapi";


export default function AdminOfferDetails() {

  const navigate = useNavigate();

  const { offerId } = useParams();

  const cookies = Cookies();


  // =========================
  // Offer
  // =========================

  const [offer, setOffer] = useState(null);


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

      pending: "Pending",

      accepted: "Accepted",

      cancelled: "Cancelled",

      canceled: "Cancelled",

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
        return "admin-offer-details-status-pending";

      case "accepted":
        return "admin-offer-details-status-accepted";

      case "cancelled":
      case "canceled":
        return "admin-offer-details-status-cancelled";

      case "rejected":
        return "admin-offer-details-status-rejected";

      default:
        return "admin-offer-details-status-default";
    }
  }


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
  // Get Offer
  // =========================

  async function getOffer() {

    try {

      setLoading(true);

      setError("");


      const token =
        cookies.get("token-employee");


      const response =
        await axios.get(

          `${baseURL}${GetAnyOffer}/${offerId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );


      console.log(
        "OFFER DETAILS:",
        response.data
      );


      setOffer(
        response.data.offer || null
      );


    } catch (err) {

      console.log(
        "OFFER DETAILS ERROR:",
        err.response?.data || err
      );


      if (
        isPermissionError(err)
      ) {

        setError(
          "You don't have permission to view this offer."
        );

        return;
      }


      setError(
        getErrorMessage(
          err,
          "Unable to load offer details."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Offer
  // =========================

  useEffect(() => {

    if (!offerId) {
      return;
    }

    getOffer();

  }, [offerId]);


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="admin-offer-details-page">

        <Loading />

      </div>

    );
  }


  // =========================
  // Error
  // =========================

  if (error) {

    return (

      <div className="admin-offer-details-page">

        <div className="admin-offer-details-top">

          <button
            type="button"
            className="admin-offer-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Offers
            </span>

          </button>

        </div>


        <div className="admin-offer-details-card">

          <div className="admin-offer-details-error">

            {error}

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // No Offer
  // =========================

  if (!offer) {

    return (

      <div className="admin-offer-details-page">

        <div className="admin-offer-details-top">

          <button
            type="button"
            className="admin-offer-details-back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            <span>
              Back to Offers
            </span>

          </button>

        </div>


        <div className="admin-offer-details-card">

          <div className="admin-offer-details-error">

            Offer not found.

          </div>

        </div>

      </div>

    );
  }


  // =========================
  // Render
  // =========================

  return (

    <div className="admin-offer-details-page">


      {/* =========================
          TOP
      ========================= */}

      <div className="admin-offer-details-top">

        <button
          type="button"
          className="admin-offer-details-back-btn"
          onClick={() => navigate(-1)}
        >

          <FaArrowLeft />

          <span>
            Back to Offers
          </span>

        </button>

      </div>


      {/* =========================
          MAIN CARD
      ========================= */}

      <div className="admin-offer-details-card">


        {/* =========================
            HEADER
        ========================= */}

        <div className="admin-offer-details-header">

          <div className="admin-offer-details-header-icon">

            <FaFileInvoiceDollar />

          </div>


          <div className="admin-offer-details-header-content">

            <h1>
              Offer Details
            </h1>

            <p>
              Freelancer proposal
            </p>

          </div>


          <span
            className={`admin-offer-details-status-badge ${getStatusClass(
              offer.offerStatus
            )}`}
          >

            {formatStatus(
              offer.offerStatus
            )}

          </span>

        </div>


        {/* =========================
            PROPOSAL
        ========================= */}

        <div className="admin-offer-details-section">

          <div className="admin-offer-details-section-heading">

            <h2>
              Proposal
            </h2>

            <span>
              Offer details and proposal
            </span>

          </div>


          <div className="admin-offer-details-description">

            {offer.proposalText ||
              "No proposal text available."}

          </div>

        </div>


        {/* =========================
            OFFER INFORMATION
        ========================= */}

        <div className="admin-offer-details-section">

          <div className="admin-offer-details-section-heading">

            <h2>
              Offer Information
            </h2>

            <span>
              Proposed terms
            </span>

          </div>


          <div className="admin-offer-details-info-grid">


            {/* Price */}

            <div className="admin-offer-details-info-item">

              <div className="admin-offer-details-info-icon">

                <FaDollarSign />

              </div>


              <div className="admin-offer-details-info-content">

                <span>
                  Proposed Price
                </span>

                <strong className="admin-offer-details-price">

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

                </strong>

              </div>

            </div>


            {/* Duration */}

            <div className="admin-offer-details-info-item">

              <div className="admin-offer-details-info-icon">

                <FaClock />

              </div>


              <div className="admin-offer-details-info-content">

                <span>
                  Proposed Duration
                </span>

                <strong>

                  {offer.proposed_duration
                    ? `${offer.proposed_duration} days`
                    : "Not specified"}

                </strong>

              </div>

            </div>


            {/* Status */}

            <div className="admin-offer-details-info-item">

              <div className="admin-offer-details-info-icon">

                <FaAlignLeft />

              </div>


              <div className="admin-offer-details-info-content">

                <span>
                  Status
                </span>

                <strong>
                  {formatStatus(
                    offer.offerStatus
                  )}
                </strong>

              </div>

            </div>


          </div>

        </div>


      </div>

    </div>

  );
}