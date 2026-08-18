import "../styles/FreelancerContractdetailesStyle.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import {
  GetContractById,
  AcceptContract,
  RejectContract,
  AcceptAddPhase,
  RejectAddPhase,
  CancelContract,
} from "../services/FreelancerContractsApi";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  AcceptCancelContract,
  GetRespondByContract,
  RejectCancelContract,
  ReturnToCancelContract,
} from "../../../Client/client-contracts/services/api_contract";

export default function FreelancerContractDetailes() {

  const [contractdetailes, setcontractdetailes] = useState(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectSuccess, setRejectSuccess] = useState(null);


  const { id } = useParams();
  const navigate = useNavigate();

  const cookies = Cookies();

  const [showModal, setShowModal] = useState(false);

  const token = cookies.get("token-freelancer");

  const [responsefree, setResponse] = useState([]);

  // حالة زر Cancel / Withdraw لهذا العقد
  const [cancelRequested, setCancelRequested] = useState(false);
  const hasCancellationResponse = responsefree?.length > 0;

  useEffect(() => {

    const savedCancelRequestFreelancer = localStorage.getItem(
      `freelancer-cancel-request-${id}`
    );

    setCancelRequested(savedCancelRequestFreelancer === "true");

  }, [id]);


  /*
  ============================================================
  جلب تفاصيل العقد
  ============================================================
  */

  useEffect(() => {

    fetch(`${baseURL}${GetContractById}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error("Errrrorrrrr");
        }

        return response.json();

      })
      .then((data) => {

        setcontractdetailes(data.contract || null);

      })
      .catch((error) => {

        console.log(error.message);

        setcontractdetailes(null);

      });

  }, [id]);


  /*
  ============================================================
  Accept / Reject Contract
  ============================================================
  */

  function handleResponseForContract(TheResponse) {

    var EndPoint = "";

    if (TheResponse === "Accept") {

      EndPoint = AcceptContract;

    } else if (TheResponse === "Reject") {

      EndPoint = RejectContract;

    }

    axios
      .post(
        `${baseURL}${EndPoint}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {

        alert(response.data.message || "done ");

        console.log(response);

        window.location.reload();

      })
      .catch((error) => {

        console.log(error);

        const backendMessage =
          error.response?.data?.message || "Errorrr";

        alert(backendMessage);

      });

  }


  /*
  ============================================================
  Accept Add Phase
  ============================================================
  */

  const acceptaddphase = async (id) => {

    try {

      const res = await axios.post(
        `${baseURL}${AcceptAddPhase}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

    } catch (err) {

      console.log(err.data?.message);

    }

  };


  /*
  ============================================================
  Reject Phase
  ============================================================
  */

  const rejectPhase = async (id, content) => {

    try {

      const res = await axios.post(
        `${baseURL}${RejectAddPhase}${id}`,
        {
          content: content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setRejectSuccess(id);

      setTimeout(() => {
        setRejectSuccess(null);
      }, 6000);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  /*
  ============================================================
  Cancel Contract
  ============================================================
  */

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

      if (contractdetailes?.status === "active") {

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


  /*
  ============================================================
  Get Contract Respond
  ============================================================
  */

  useEffect(() => {

    RespondContract();

  }, []);


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

      console.log("Contract Respond:", res.data);

      /*
        إذا ما في responses
        رح تكون []

        وإذا في responses
        رح نحطهم بالـ state.
      */

      setResponse(res.data.responds || []);

    } catch (err) {

      console.log(err.response?.data);

      /*
        إذا صار error
        نخليها فاضية
        وبالتالي الكارد ما يظهر.
      */

      setResponse([]);

    }

  };


  /*
  ============================================================
  Accept Cancellation
  ============================================================
  */

  const handleAccept = async () => {

    try {

      const res = await axios.post(
        `${baseURL}${AcceptCancelContract}${id}`,
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

      console.log(res.data);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  /*
  ============================================================
  Reject Cancellation
  ============================================================
  */

  const handleReject = async () => {

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



  const handleWithdrawRequest = async () => {

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
        فقط إذا الـ API نجح:

        نحذف حالة الطلب من localStorage
        ونرجع زر Cancel Contract.
      */

      localStorage.removeItem(
        `cancel-request-${id}`
      );

      setCancelRequested(false);

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  /*
  ============================================================
  Loading
  ============================================================
  */

  if (!contractdetailes) {

    return <p>Loading...</p>;

  }


  return (

    <div className="DadOfEveryThing">

      <button
        className="BacktoContract"
        onClick={() => {
          navigate("/FreeLancerLayout/contractfree");
        }}
      >
        back to contracts{" "}
      </button>


      {/* =====================================================
          CONTRACT INFO
      ===================================================== */}

      <div className="ContractInfo">

        <div className="StatusAndPrice">

          <div className="Status">
            {contractdetailes?.status}
          </div>

          <div className="Price">
            {contractdetailes?.total_budget}$
          </div>

        </div>


        <div className="ContractTitleAndDiscription">

          <h1>
            {contractdetailes?.title}
          </h1>

          <h3>
            {contractdetailes?.description}
          </h3>

          <h4>
            {contractdetailes?.type}
          </h4>

        </div>

      </div>



      {contractdetailes?.status === "active" &&
        responsefree?.length > 0 && (

          <div className="cancel-request-card">

            <div className="cancel-request-header">
              <div>
                <h3>Cancellation Request</h3>
                <span>Contract cancellation request</span>
              </div>

              <span className="cancel-request-badge">
                Pending
              </span>
            </div>


            <div className="cancel-request-activity">

              <span className="cancel-request-label">
                Activity
              </span>

              <div className="cancel-request-list">

                {responsefree?.map((res, index) => (

                  <div
                    className="cancel-request-item"
                    key={res?.id || index}
                  >
                    {res?.respond}
                  </div>

                ))}

              </div>

            </div>


            <div className="cancel-request-actions">

              <button
                className="cancel-request-accept"
                onClick={handleAccept}
              >
                Accept
              </button>


              <button
                className="cancel-request-reject"
                onClick={handleReject}
              >
                Reject
              </button>

            </div>

          </div>

        )}

      {/* =====================================================
          PHASES
      ===================================================== */}

      <span>
        Phases ({contractdetailes?.phases?.length || 0})
      </span>


      {contractdetailes?.phases?.map((phase) => (

        <div
          className="PhaseInfor"
          key={phase?.id}
        >

          {rejectSuccess === phase?.id && (

            <div className="reject-success">

              ✓ Rejection sent successfully.
              Please wait for the client's response.

            </div>

          )}


          <div className="TitleAndStatus">

            <div className="Title">
              {phase?.title}
            </div>

            <div className="Status">
              {phase?.status}
            </div>

          </div>


          <div className="SubInfoAboutPhase">

            <div className="AmmountAndDuration">

              <div className="Ammount">
                💵 Ammount : {phase?.amount}$
              </div>

              <div className="duration">
                {" "}
                🕜 Duration : {phase?.duration_in_days} days
              </div>

            </div>


            <div className="DedLineAndRevision">

              <div className="DeadLine">
                🗓️ deadline : {phase?.deadline}
              </div>

              <div className="Revision">

                📚 Revisions : {phase?.used_revisions}/
                {phase?.allowed_revisions} used

              </div>

            </div>

          </div>


          {/* =================================================
              NEW PHASE REQUEST
          ================================================= */}

          {phase?.status === "new_phase" && (

            <div className="phase-client-request">

              <div className="phase-request-content">

                <div className="phase-request-icon">
                  💬
                </div>


                <div className="phase-request-text">

                  <div className="phase-request-title">
                    New Client Request
                  </div>

                  <div className="phase-request-description">
                    The client has requested to add this phase
                    to the project.
                  </div>

                </div>

              </div>


              <div className="phase-request-actions">

                <button
                  type="button"
                  className="phase-reject-btn"
                  onClick={() => setShowRejectModal(true)}
                >
                  Reject
                </button>


                <button
                  type="button"
                  className="phase-accept-btn"
                  onClick={() => acceptaddphase(phase.id)}
                >
                  ✓ Accept Request
                </button>

              </div>


              {showRejectModal && (

                <div className="reject-modal-overlay">

                  <div className="reject-modal">

                    <div className="reject-modal-header">

                      <div>

                        <h3>
                          Reject Client Request
                        </h3>

                        <p>
                          Why are you rejecting this request?
                        </p>

                      </div>

                    </div>


                    <div className="reject-modal-body">

                      <p className="reject-modal-description">

                        Please provide a reason so the client
                        understands your decision.

                      </p>


                      <textarea
                        value={rejectReason}
                        onChange={(e) =>
                          setRejectReason(e.target.value)
                        }
                        placeholder="Enter your reason..."
                        rows={5}
                      />

                    </div>


                    {/* Actions */}

                    <div className="reject-modal-actions">

                      <button
                        type="button"
                        className="reject-cancel-btn"
                        onClick={() => {

                          setShowRejectModal(false);
                          setRejectReason("");

                        }}
                      >
                        Cancel
                      </button>


                      <button
                        type="button"
                        className="reject-confirm-btn"
                        disabled={!rejectReason.trim()}
                        onClick={() => {

                          rejectPhase(
                            phase.id,
                            rejectReason
                          );

                          setShowRejectModal(false);
                          setRejectReason("");

                        }}
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      ))}



      {contractdetailes?.status === "draft" ? (

        <div className="Buttons">

          <button
            onClick={() =>
              handleResponseForContract("Accept")
            }
            className="Acceptbtn"
          >
            Accept Contract
          </button>


          <button
            onClick={() =>
              handleResponseForContract("Reject")
            }
            className="Rejectbtn"
          >
            Reject Contract
          </button>

        </div>

      ) : (

        <div className="Buttons">

          {contractdetailes?.status === "active" && cancelRequested ? (

            <button
              className="Cancelbtncontract"
              onClick={handleWithdrawRequest}
            >
              Withdraw Request
            </button>

          ) : (

            <button
              className="Cancelbtncontract"
              onClick={() => setShowModal(true)}
            >
              Cancel Contract
            </button>

          )}


          <button
            onClick={() => alert("mony btn")}
            className="WithdrowMonybtn"
          >
            Withdrow Money
          </button>

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
                {contractdetailes.title}
              </strong>

              <br />

              This action cannot be undone.

            </p>


            <div className="warning-box">

              ⚠ Cancelling this contract may apply a
              cancellation fee according to the platform
              policy, and may affect both parties' ratings.

            </div>


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
                onClick={() =>
                  cancelcontract(contractdetailes.id)
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