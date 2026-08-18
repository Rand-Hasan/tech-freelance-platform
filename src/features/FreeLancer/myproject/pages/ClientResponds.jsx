import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie"
import { baseURL } from "../../../../services/Api/api";
import { AcceptDeletePhase, AcceptUpdateInPhase, GetClientRespond, RejectDeletePhase, RejectUpdatePhase } from "../services/api-myproject";
import { useParams } from "react-router-dom";
import { FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
import '../styles/ClientResponds.css';
export default function ClientRespond(){
     const { id: phaseId } = useParams();
     console.log("ll",phaseId);
    const cookies = new Cookies();
    const token = cookies.get("token-freelancer");
    const[showrespond,setrespond]=useState([]);
   const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectSuccess, setRejectSuccess] = useState(null); 
  const [selectedRequest, setSelectedRequest] = useState(null);
    
    useEffect(()=>{
        ShowResponds();
    },[phaseId]);
    const ShowResponds= async ()=>
    {
        try{
            const res = await axios.get(`${baseURL}${GetClientRespond}${phaseId}`,{
                headers:{Authorization:`Bearer ${token}`}
            })

    const clientRequests = res.data.responds?.filter(
      (item) =>
        item?.types === "delete" ||
        item?.types === "update"
    );

    setrespond(clientRequests);

            
        }catch(err){
             console.log(err.response?.data);
        }
    }
    const acceptdelete =async(id)=>{
        try{
            const res = await axios.post(`${baseURL}${AcceptDeletePhase}${id}`,{},{
                headers:{Authorization:`Bearer ${token}`}
            })
        }catch(err){
            console.log(err.response?.data)
        }
    }
    const rejectdeletePhase = async (id, content) => {
    try {
      const res = await axios.post(`${baseURL}${RejectDeletePhase}${id}`, { content: content }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(res.data)
      setRejectSuccess(id);
     await ShowResponds();
      setTimeout(() => {
        setRejectSuccess(null);
      }, 6000);

    } catch (err) {
      console.log(err.response?.data);
    }
  }
   const acceptupdate =async(id)=>{
        try{
            const res = await axios.post(`${baseURL}${AcceptUpdateInPhase}${id}`,{},{
                headers:{Authorization:`Bearer ${token}`}
            })
            await ShowResponds();
        }catch(err){
            console.log(err.response?.data)
        }
    }
   const rejectupdatePhase = async (id, content) => {
    try {
      const res = await axios.post(`${baseURL}${RejectUpdatePhase}${id}`, { content: content }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(res.data)
      setRejectSuccess(id);
      await ShowResponds();
      setTimeout(() => {
        setRejectSuccess(null);
      }, 6000);

    } catch (err) {
      console.log(err.response?.data);
    }
  }
    return (
  <div className="client-respond-page">
    <div className="client-respond-header">
      <h2>Client Requests</h2>
      <p>Review and respond to requests from your client.</p>
    </div>

    {showrespond?.map((responds) => (
      <div
        className={`request-card ${
          responds?.types === "delete"
            ? "delete-card"
            : "update-card"
        }`}
        key={responds?.phase_id}
      >
          {rejectSuccess === responds?.phase_id && (
            <div className="reject-success">
              ✓ Rejection sent successfully. Please wait for the client's response.
            </div>
          )}
       
        <div className="request-top">
           
          <div className="request-info">
            <div className="request-icon">
              {responds?.types === "delete" ? (
                <FaTrashAlt />
              ) : (
                <FaPen />
              )}
            </div>

            <div>
              <h3>
                {responds?.types === "delete"
                  ? "Delete Phase Request"
                  : "Update Phase Request"}
              </h3>

              <p>
                {responds?.types === "delete"
                  ? "The client requested to delete this phase."
                  : "The client requested changes to this phase."}
              </p>
            </div>
          </div>

          <span className="request-label">
            {responds?.types === "delete" ? "DELETE" : "UPDATE"}
          </span>
        </div>

        <div className="client-message">
          <span>CLIENT MESSAGE</span>
          <p>{responds?.respond}</p>
        </div>

        <div className="request-buttons">

          {/* REJECT */}
          <button
            className="reject-button"
            onClick={() => {
              setSelectedRequest(responds);
              setShowRejectModal(true);
            }}
          >
            Reject
          </button>

          {/* ACCEPT */}
          {responds?.types === "delete" ? (
            <button
              className="accept-button"
              onClick={() => acceptdelete(responds?.phase_id)}
            >
              <FaCheck />
              Accept Delete
            </button>
          ) : (
            <button
              className="accept-button"
              onClick={() => acceptupdate(responds?.phase_id)}
            >
              <FaCheck />
              Accept Update
            </button>
          )}

        </div>
      </div>
    ))}


    {/* =========================
        REJECT MODAL
    ========================= */}

    {showRejectModal && selectedRequest && (
      <div className="reject-modal-overlay">

        <div className="reject-modal">

          <div className="reject-modal-header">
            <div>
              <h3>Reject Client Request</h3>

              <p>
                Why are you rejecting this request?
              </p>
            </div>
          </div>


          <div className="reject-modal-body">

            <p className="reject-modal-description">
              Please provide a reason so the client understands
              your decision.
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter your reason..."
              rows={5}
            />

          </div>


          <div className="reject-modal-actions">

            {/* CANCEL */}
            <button
              type="button"
              className="reject-cancel-btn"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason("");
                setSelectedRequest(null);
              }}
            >
              Cancel
            </button>


            {/* CONFIRM */}
            {selectedRequest?.types === "delete" ? (

              <button
                type="button"
                className="reject-confirm-btn"
                disabled={!rejectReason.trim()}
                onClick={() => {
                  rejectdeletePhase(
                    selectedRequest?.phase_id,
                    rejectReason
                  );

                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedRequest(null);
                }}
              >
                Reject Delete
              </button>

            ) : (

              <button
                type="button"
                className="reject-confirm-btn"
                disabled={!rejectReason.trim()}
                onClick={() => {
                  rejectupdatePhase(
                    selectedRequest?.phase_id,
                    rejectReason
                  );

                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedRequest(null);
                }}
              >
                Reject Update
              </button>

            )}

          </div>

        </div>
      </div>
    )}

  </div>
);
}
