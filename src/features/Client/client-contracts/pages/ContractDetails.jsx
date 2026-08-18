import { useNavigate, useParams } from "react-router-dom";
import "../../client-contracts/styles/ContractDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import {
  AcceptCancelContract,
  CancelContract,
  GetContractById,
  GetRespondByContract,
  RejectCancelContract,
  ReturnToCancelContract,
  ReviewsCreateReview
} from "../services/api_contract";
import Cookies from "universal-cookie";
import "../styles/ContractDetails.css";
import { FaStar } from "react-icons/fa";

export default function ContractDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const token = cookies.get("token-client");

  const [showModal, setShowModal] = useState(false);

  const [contract, setContract] = useState(null);

  const [showRatingModal, setShowRatingModal] = useState(false);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [responsefree, setResponse] = useState([]);

  // هل العميل عمل طلب إلغاء بنفسه؟
  const [cancelRequested, setCancelRequested] = useState(false);


  // =========================================
  // GET CONTRACT
  // =========================================

  useEffect(() => {

    getContractDetails();

  }, []);


  // =========================================
  // GET CANCELLATION RESPONSES
  // =========================================

  useEffect(() => {

    RespondContract();

  }, []);


  // =========================================
  // RESTORE CANCEL REQUEST AFTER REFRESH
  // =========================================

  useEffect(() => {

    const savedCancelRequestClient = localStorage.getItem(
      `client-cancel-request-${id}`
    );

    if (savedCancelRequestClient === "true") {

      setCancelRequested(true);

    }

  }, [id]);


  // =========================================
  // GET CONTRACT DETAILS
  // =========================================

  const getContractDetails = async () => {

    try {

      const res = await axios.get(
        `${baseURL}${GetContractById}${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setContract(res.data.contract);

    } catch (err) {

      console.log(err);

    }

  };


  // =========================================
  // SUBMIT RATING
  // =========================================

  const submitRating = async (rating, feedback) => {

    try {

      const res = await axios.post(
        `${baseURL}${ReviewsCreateReview}${contract.id}`,
        {
          rating: rating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setShowRatingModal(false);
      setRating(0);
      setComment("");

      console.log(res.data);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // CANCEL CONTRACT
  // =========================================

  const cancelcontract = async (id) => {

    try {

      const res = await axios.post(
        `${baseURL}${CancelContract}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Cancel response:", res.data);


      if (contract?.status === "active") {

      localStorage.setItem(
        `cancel-request-${id}`,
        "true"
      );

      setCancelRequested(true);

    }

    setShowModal(false);


    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // GET CANCELLATION REQUEST
  // =========================================

  const RespondContract = async () => {

    try {

      const res = await axios.get(
        `${baseURL}${GetRespondByContract}${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Cancellation responses:", res.data.responds);

      setResponse(res.data.responds || []);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // ACCEPT CANCELLATION
  // =========================================

  const handleAccept = async (id) => {

    try {

      const res = await axios.post(
        `${baseURL}${AcceptCancelContract}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
       .then((response) => {
        console.log("Trueeeeeeeeeeee", response.json);
        window.location.reload();
      })
      console.log(res.data);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // REJECT CANCELLATION
  // =========================================

  const handleReject = async (id) => {

    try {

      const res = await axios.post(
        `${baseURL}${RejectCancelContract}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((response) => {
        console.log("Trueeeeeeeeeeee", response.json);
        window.location.reload();
      })

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // WITHDRAW CANCELLATION REQUEST
  // =========================================

  const handleWithdrawRequest = async (id) => {

    try {

      const res = await axios.post(
        `${baseURL}${ReturnToCancelContract}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Withdraw response:", res.data);


      /*
        حذف حالة الطلب من localStorage
      */

      localStorage.removeItem(
        `client-cancel-request-${id}`
      );


      /*
        رجع الزر إلى Cancel Contract
      */

      setCancelRequested(false);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  // =========================================
  // LOADING
  // =========================================

  if (!contract) {

    return <p>Loading...</p>;

  }


  // =========================================
  // CANCELLATION REQUEST
  // =========================================

  const cancellationRequest = responsefree?.find(
    (res) => res?.respond === "want to delete contract"
  );


  const isRequester =
    cancellationRequest?.freelancer_id !== null;


  return (

    <div className="contract-details-page">


      {/* =========================================
          CONTRACT HEADER
      ========================================= */}

      <div className="contract-header-card">

        <div>

          <h1>
            {contract.title} – Contract Name
          </h1>


          <p>

            {contract.description || "No description available."}

            <br />

            Contract type: {contract.type}

            <br />

            Created:
            {" "}
            {new Date(contract.createdAt).toLocaleDateString()}

          </p>


          <div className="contract-stats">


            <div>

              <span>
                Total Value
              </span>

              <h3>
                ${contract.total_budget}
              </h3>

            </div>


            <div>

              <span>
                Work Type
              </span>

              <h3>

                {
                  contract.type === "multi_phase"
                    ? "Multi Phase"
                    : contract.type
                }

              </h3>

            </div>


            <div>

              <span>
                Duration
              </span>

              <h3>

                {
                  contract.phases?.reduce(
                    (total, phase) =>
                      total + phase.duration_in_days,
                    0
                  )
                }

                Days

              </h3>

            </div>


            <div>

              <span>
                Status
              </span>

              <h3 className="active-text">
                {contract.status}
              </h3>

            </div>


          </div>

        </div>


        {/* =========================================
            HEADER ACTIONS
        ========================================= */}

        <div className="header-actions">

          <span className="status-pill">
            ● {contract.status}
          </span>


          <div>


            {/* =====================================
                CANCEL / WITHDRAW
            ===================================== */}
{contract.status === "draft" ? (
  <div className="draft-actions-client">

    <button
      className="editcontract-client"
      onClick={() =>
        navigate(`/clientlayout/editcontract/${contract.id}`)
      }
    >
      Edit Contract
    </button>

    <button
      className="deletecontract-client"
      onClick={() => {
        setContract(null);
      }}
    >
      Delete
    </button>

  </div>
) : (
  <div className="contract-actions-client">

    {contract.status === "active" && cancelRequested ? (
      <button
        className="withdraw-btn-client"
        onClick={() =>
          handleWithdrawRequest(contract.id)
        }
      >
        Withdraw Request
      </button>
    ) : (
      <button
        className="cancel-btn-client"
        onClick={() => setShowModal(true)}
      >
        Cancel Contract
      </button>
    )}

    <button
      className="pay-btn-client"
      onClick={() =>
        navigate(`/clientlayout/wallet/${contract.id}`)
      }
    >
      PAY
    </button>

  </div>
)}
          </div>

        </div>

      </div>


      {/* =========================================
          DETAILS GRID
      ========================================= */}

      <div className="details-grid">


        {/* =========================================
            STAGE BREAKDOWN
        ========================================= */}

        <div className="card">

          <h2>
            Stage Breakdown
          </h2>


          {
            contract.phases?.map((phase) => (

              <div
                className="stage-item"
                key={phase.id}
              >

                <div>

                  <h4>
                    {phase.title}
                  </h4>

                  <p>
                    {phase.duration_in_days} days · {phase.status}
                  </p>

                </div>


                <span>
                  ${phase.amount}
                </span>

              </div>

            ))
          }


          <button className="workspace-btn">
            Go to Project Workspace →
          </button>


        </div>


        {/* =========================================
            CANCELLATION RESPONSE
        ========================================= */}

        {
          contract.status === "active" &&
          cancellationRequest && (

            <div className="cancel-request-card">


              {/* =====================================
                  HEADER
              ===================================== */}

              <div className="cancel-request-header">

                <div>

                  <h3>
                    Cancellation Request
                  </h3>

                  <span>
                    Contract cancellation request
                  </span>

                </div>


              </div>


              {/* =====================================
                  REQUEST MESSAGE
              ===================================== */}

              <div className="cancel-request-message">

                <span className="cancel-request-label">
                  Request
                </span>


                <p>

                  {
                    isRequester
                      ? "You requested to cancel this contract."
                      : "The freelancer requested to cancel this contract."
                  }

                </p>

              </div>


              {/* =====================================
                  ACTIVITY
              ===================================== */}

              <div className="cancel-request-activity">

                <span className="cancel-request-label">
                  Activity
                </span>


                <div className="cancel-request-list">

                  {
                    responsefree?.map((res, index) => (

                      <div
                        className="cancel-request-item"
                        key={res?.id || index}
                      >

                        {res?.respond}

                      </div>

                    ))
                  }

                </div>

              </div>


              {/* =====================================
                  ACTIONS
              ===================================== */}

              {
                !isRequester && (

                  /*
                    أنا لست صاحب الطلب
                    → Accept + Reject
                  */

                  <div className="cancel-request-actions">


                    <button
                      className="cancel-request-accept"
                      onClick={() =>
                        handleAccept(contract.id)
                      }
                    >
                      Accept Cancellation
                    </button>


                    <button
                      className="cancel-request-reject"
                      onClick={() =>
                        handleReject(contract.id)
                      }
                    >
                      Reject Cancellation
                    </button>


                  </div>

                )
              }


            </div>

          )
        }


      </div>


      {/* =========================================
          RATING
      ========================================= */}

      {contract.status === "completed" && (

        <div className="rate-freelancer-box">

          <div className="rate-freelancer-title">

            <span className="completed-check">
              ✓
            </span>

            <strong>
              All Phases completed — Rate this freelancer
            </strong>

          </div>


          <p>
            Once you approve the final task, you'll be asked to rate
            the freelancer's performance on this project.
          </p>


          <button
            className="rate-freelancer-btn"
            onClick={() =>
              setShowRatingModal(true)
            }
          >

            <FaStar />

            Rate Freelancer

          </button>

        </div>

      )}


      {/* =========================================
          RATING MODAL
      ========================================= */}

      {showRatingModal && (

        <div className="rating-modal-overlay">

          <div className="rating-modal">


            {/* HEADER */}

            <div className="rating-modal-header">

              <div>

                <h2>
                  Rate {contract.freelancer?.name || "Freelancer"}'s Work
                </h2>


                <p>
                  Rate your experience working with this freelancer
                  from 1 to 5 stars.
                </p>

              </div>

            </div>


            {/* STARS */}

            <div className="rating-section">

              <label>
                Your Rating
              </label>


              <div className="stars-container">

                {
                  [1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      className={
                        `star-btn ${
                          star <= rating
                            ? "active-star"
                            : ""
                        }`
                      }
                      onClick={() =>
                        setRating(star)
                      }
                    >

                      <FaStar />

                    </button>

                  ))
                }

              </div>


              {
                rating > 0 && (

                  <span className="rating-text">
                    {rating} out of 5
                  </span>

                )
              }

            </div>


            {/* FEEDBACK */}

            <div className="feedback-section">

              <label>

                Additional feedback

                <span>
                  {" "}
                  (optional)
                </span>

              </label>


              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Share more about working with this freelancer..."
                rows={5}
              />

            </div>


            {/* ACTIONS */}

            <div className="rating-modal-actions">


              <button
                className="rating-cancel-btn"
                type="button"
                onClick={() => {

                  setShowRatingModal(false);

                  setRating(0);

                  setComment("");

                }}
              >
                Cancel
              </button>


              <button
                className="submit-rating-btn"
                type="button"
                disabled={rating === 0}
                onClick={() => {

                  console.log(
                    "Rating:",
                    rating
                  );

                  console.log(
                    "Feedback:",
                    comment
                  );

                  submitRating(
                    rating,
                    comment
                  );

                }}
              >
                Submit Rating →
              </button>


            </div>


          </div>

        </div>

      )}


      {/* =========================================
          CANCEL MODAL
      ========================================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="cancel-modal">


            {/* HEADER */}

            <div className="modal-header">

              <h2>
                Cancel Contract
              </h2>


              <button
                className="close-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>


            {/* DESCRIPTION */}

            <p className="modal-description">

              {
                contract.status === "active"
                  ? (
                    <>
                      This will send a cancellation request for:

                      {" "}

                      <strong>
                        {contract.title}
                      </strong>

                      <br />

                      The other party will need to accept or reject
                      the cancellation.
                    </>
                  )
                  : (
                    <>
                      This will cancel the contract:

                      {" "}

                      <strong>
                        {contract.title}
                      </strong>

                      <br />

                      This action will cancel the contract immediately.
                    </>
                  )
              }

            </p>


            {/* WARNING */}

            <div className="warning-box">

              ⚠ Cancelling this contract may apply a cancellation fee
              according to the platform policy, and may affect both
              parties' ratings.

            </div>


            {/* ACCEPT POLICY */}

            <div className="accept-box">

              <input
                type="checkbox"
              />


              <span>

                I understand and accept the

                <strong>
                  {" "}
                  cancellation policy
                </strong>

              </span>

            </div>


            {/* MODAL ACTIONS */}

            <div className="modal-actions">


              <button
                className="confirm-btn"
                onClick={() =>
                  cancelcontract(contract.id)
                }
              >
                Cancel Contract
              </button>


            </div>


          </div>

        </div>

      )}


    </div>

  );

}