import { useNavigate, useParams } from "react-router-dom";
import "../../client-contracts/styles/ContractDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { GetContractById } from "../services/api_contract";
import Cookies from "universal-cookie";
import '../styles/ContractDetails.css'

export default function ContractDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const token = cookies.get("token-client");


  const [showModal, setShowModal] = useState(false);

  const [contract, setContract] = useState(null);



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

            </div>

          ) : (

            <button
              className="cancel-btn"
              onClick={() => setShowModal(true)}
            >
              Cancel Contract
            </button>

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





            <label>
              Reason for cancellation
            </label>


            <textarea
              placeholder="Explain why you're cancelling this contract..."
            />





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