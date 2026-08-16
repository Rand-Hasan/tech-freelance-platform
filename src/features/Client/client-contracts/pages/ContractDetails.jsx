import { useNavigate, useParams } from "react-router-dom";
import "../../client-contracts/styles/ContractDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { CancelContract, GetContractById, ReviewsCreateReview } from "../services/api_contract";
import Cookies from "universal-cookie";
import '../styles/ContractDetails.css';
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



  useEffect(() => {

    getContractDetails();

  }, []);



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

 const submitRating=async (rating,feedback)=>{
  try{
    const res = await axios.post(`${baseURL}${ReviewsCreateReview}${contract.id}`,{
      rating:rating,
      comment:comment,
    },{headers:{Authorization:`Bearer ${token}`}})
              setShowRatingModal(false);
             setRating(0);
                  setComment("");
    console.log(res.data)
    console.log('lll',contract.id)
  }catch(err){
    console.log(err.response?.data);
  }
 }
const cancelcontract =async(id)=>{
  try{
    const res = await axios.post(`${baseURL}${CancelContract}${id}`,{},{
      headers:{Authorization:`Bearer ${token}`}
    })
    console.log(res.data)
  }catch(err){
    console.log(err.response?.data)
  }
}
  if (!contract) {

    return <p>Loading...</p>

  }
  return (
    <div className="contract-details-page">

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
              <span>Total Value</span>
              <h3>
                ${contract.total_budget}
              </h3>
            </div>



            <div>
              <span>Work Type</span>
              <h3>
                {
                  contract.type === "multi_phase"
                    ? "Multi Phase"
                    : contract.type
                }
              </h3>
            </div>



            <div>
              <span>Duration</span>

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
              <span>Status</span>

              <h3 className="active-text">
                {contract.status}
              </h3>

            </div>


          </div>

        </div>


        <div className="header-actions">

          <span className="status-pill">
            ● {contract.status}
          </span>


          {contract.status === "draft" ? (

            <div className="draft-actions">

              <button className="editcontract"
                onClick={() => navigate(`/clientlayout/editcontract/${contract.id}`)}
              >
                Edit Contract
              </button>


              <button className="deletecontract" >
                Delete
              </button>
              {/* <button onClick={()=>navigate(`/clientlayout/wallet/${contract.id}`)}>
              PAY
            </button> */}

            </div>

          ) : (
            <div>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(true)}
              >
                Cancel Contract
              </button>
              <button onClick={() => navigate(`/clientlayout/wallet/${contract.id}`)}>
                PAY
              </button>

            </div>
          )}

        </div>

      </div>

      <div className="details-grid">

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

        {/* <div className="card">


          <h2>
            Contract Terms
          </h2>



          <div className="term-row">

            <span>
              Platform commission (5%)
            </span>


            <strong>
              ${(Number(contract.total_budget) * 0.05).toFixed(2)}
            </strong>

          </div>




          <div className="term-row">

            <span>
              Net to freelancer
            </span>


            <strong>
              ${(Number(contract.total_budget) * 0.95).toFixed(2)}
            </strong>

          </div>




          <div className="term-row">

            <span>
              Paid so far
            </span>


            <strong className="green">
              $0.00
            </strong>

          </div>




          <div className="term-row">

            <span>
              Remaining
            </span>


            <strong>
              ${contract.total_budget}
            </strong>

          </div>





          <h3 className="activity-title">
            Activity
          </h3>



          <div className="activity-list">

            <p>
              ✓ Contract created —
              {" "}
              {new Date(contract.createdAt).toLocaleDateString()}
            </p>


            <p>
              Status:
              {" "}
              {contract.status}
            </p>


            <p>
              Expires:
              {" "}
              {new Date(contract.expires_at).toLocaleDateString()}
            </p>


          </div>



        </div> */}

      </div>

      {contract.status === "completed" && (
        <div className="rate-freelancer-box">

          <div className="rate-freelancer-title">
            <span className="completed-check">✓</span>

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
            onClick={() => setShowRatingModal(true)}
          >
            <FaStar />
            Rate Freelancer
          </button>

        </div>
      )}
      {showRatingModal && (
        <div className="rating-modal-overlay">

          <div className="rating-modal">

            {/* HEADER */}

            <div className="rating-modal-header">

              <div>
                <h2>Rate {contract.freelancer?.name || "Freelancer"}'s Work</h2>

                <p>
                  Rate your experience working with this freelancer
                  from 1 to 5 stars.
                </p>
              </div>


            </div>


            {/* STARS */}

            <div className="rating-section">

              <label>Your Rating</label>

              <div className="stars-container">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${star <= rating ? "active-star" : ""
                      }`}
                    onClick={() => setRating(star)}
                  >
                    <FaStar />
                  </button>
                ))}

              </div>

              {rating > 0 && (
                <span className="rating-text">
                  {rating} out of 5
                </span>
              )}

            </div>


            {/* FEEDBACK */}

            <div className="feedback-section">

              <label>
                Additional feedback
                <span> (optional)</span>
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
                  console.log("Rating:", rating);
                  console.log("Feedback:", comment);

                  // هون بعدين منحط API تبع إرسال التقييم
                    submitRating(rating,comment)
                  setShowRatingModal(false);
                }}
              >
                Submit Rating →
              </button>

            </div>

          </div>

        </div>
      )}
      {showModal && (
        <div className="modal-overlay">

          <div className="cancel-modal">


            <div className="modal-header">

              <h2>
                Cancel Contract
              </h2>


              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

            </div>




            <p className="modal-description">

              This will end the contract:
              {" "}
              <strong>
                {contract.title}
              </strong>

              <br />

              This action cannot be undone.

            </p>





            <div className="warning-box">

              ⚠ Cancelling this contract may apply a cancellation fee
              according to the platform policy, and may affect both
              parties' ratings.

            </div>


            {/* <label>
              Reason for cancellation
            </label>


            <textarea
              placeholder="Explain why you're cancelling this contract..."
            /> */}


            <div className="accept-box">

              <input type="checkbox" />


              <span>

                I understand and accept the

                <strong>
                  {" "} cancellation policy
                </strong>

              </span>


            </div>





            <div className="modal-actions">


              <button
                className="confirm-btn"
                onClick={()=>cancelcontract(contract.id)}
              >
                Cancel Contract
              </button>




              <button
                className="back-btn"
                onClick={() => setShowModal(false)}
              >
                Go Back
              </button>


            </div>



          </div>


        </div>
      )}


    </div>
  );

}