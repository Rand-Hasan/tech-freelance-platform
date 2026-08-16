import "../../Reviews/styles/AdminReviews.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";

import {
  GetAllReviews,
  DeleteReview,
} from "../../Reviews/services/AdminReviewsapi";

import {
  FaStar,
  FaTrash,
} from "react-icons/fa";


const LIMIT = 10;


export default function AdminReviews() {

  const cookies = Cookies();


  // =========================
  // Reviews
  // =========================

  const [reviews, setReviews] = useState([]);


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
  // Get Reviews
  // =========================

  async function getReviews() {

    try {

      setLoading(true);
      setError("");


      const token =
        cookies.get("token-employee");


      const response =
        await axios.get(

          `${baseURL}${GetAllReviews}/${page}/${LIMIT}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );


      console.log(
        "REVIEWS:",
        response.data
      );


      setReviews(
        response.data.reviews || []
      );


      setAccessDenied(false);


    } catch (err) {

      console.log(
        "REVIEWS ERROR:",
        err.response?.data || err
      );


      if (isPermissionError(err)) {

        setAccessDenied(true);

        setReviews([]);

        return;
      }


      setError(
        getErrorMessage(
          err,
          "Unable to load reviews."
        )
      );


    } finally {

      setLoading(false);

    }
  }


  // =========================
  // Load Reviews
  // =========================

  useEffect(() => {

    getReviews();

  }, [page]);


  // =========================
  // Delete Review
  // =========================

  async function handleDeleteReview(
    reviewId
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this review?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(reviewId);
      setError("");


      const token =
        cookies.get("token-employee");


      const response =
     axios.post(
  `${baseURL}${DeleteReview}/${reviewId}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      console.log(
        "DELETE REVIEW RESPONSE:",
        response.data
      );


      setReviews((prev) =>
        prev.filter(
          (review) =>
            review.id !== reviewId
        )
      );


    } catch (err) {

      console.log(
        "DELETE REVIEW ERROR:",
        err.response?.data || err
      );


      if (isPermissionError(err)) {

        setAccessDenied(true);

        setReviews([]);

        return;
      }


      setError(
        getErrorMessage(
          err,
          "Unable to delete review."
        )
      );


    } finally {

      setActionLoading(null);

    }
  }


  // =========================
  // Render Stars
  // =========================

  function renderRating(rating) {

    const value =
      Number(rating) || 0;


    return (

      <div className="admin-reviews-rating">

        {[1, 2, 3, 4, 5].map(
          (star) => (

            <FaStar
              key={star}
              className={
                star <= value
                  ? "admin-reviews-star-filled"
                  : "admin-reviews-star-empty"
              }
            />

          )
        )}

        <span>
          {value}/5
        </span>

      </div>

    );
  }


  // =========================
  // Initial Loading
  // =========================

  if (
    loading &&
    !accessDenied
  ) {

    return (

      <div className="admin-reviews-page">

        <Loading />

      </div>

    );
  }


  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {

    return (

      <div className="admin-reviews-page">

        <div className="admin-reviews-access-denied">

          <div className="admin-reviews-access-icon">
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

    <div className="admin-reviews-page">


      {loading && <Loading />}


      <div className="admin-reviews-card">


        {/* =========================
            Error
        ========================= */}

        {error && (

          <div className="admin-reviews-error">

            {error}

          </div>

        )}


        {/* =========================
            Table
        ========================= */}

        <div className="admin-reviews-table-container">

          <table className="admin-reviews-table">


            <thead>

              <tr>

                <th>
                  Rating
                </th>

                <th>
                  Client
                </th>

                <th>
                  Freelancer
                </th>

                <th>
                  Comment
                </th>

               

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {!loading &&
              reviews.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="admin-reviews-empty"
                  >

                    No reviews found.

                  </td>

                </tr>

              ) : (

                reviews.map(
                  (review) => {

                    const isActionLoading =
                      actionLoading ===
                      review.id;


                    return (

                      <tr
                        key={review.id}
                      >


                        {/* Rating */}

                        <td>

                          {renderRating(
                            review.rating
                          )}

                        </td>


                        {/* Client */}

                        <td>

                          Client #
                          {review.client_id}

                        </td>


                        {/* Freelancer */}

                        <td>

                          Freelancer #
                          {review.freelancer_id}

                        </td>


                        {/* Comment */}

                        <td className="admin-reviews-comment">

                          {review.comment ||
                            "No comment"}

                        </td>


                        {/* Date */}

                      


                        {/* Action */}

                        <td>

                          <button
                            type="button"
                            className="admin-reviews-delete-btn"
                            disabled={
                              isActionLoading
                            }
                            onClick={() =>
                              handleDeleteReview(
                                review.id
                              )
                            }
                          >

                            <FaTrash />

                            {isActionLoading
                              ? "..."
                              : "Delete"}

                          </button>

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

        <div className="admin-reviews-pagination">


          <button
            type="button"
            className="admin-reviews-pagination-btn"
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


          <div className="admin-reviews-pagination-current">

            <span>
              Page
            </span>

            <strong>
              {page}
            </strong>

          </div>


          <button
            type="button"
            className="admin-reviews-pagination-btn"
            disabled={
              reviews.length <
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