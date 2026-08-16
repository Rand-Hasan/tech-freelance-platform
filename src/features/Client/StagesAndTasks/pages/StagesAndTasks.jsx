import "../styles/StagesAndTasksStyle.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { GetProjectPhases, AcceptPhase ,AddExtraExpires,RejectPhaseOverDue } from "../services/StageAndTaskApi.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function StagesAndTasks() {
  const { id: ProjectId } = useParams();
  const [phase, setphase] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();
  const [extraDays, setExtraDays] = useState(1);
// bring phases of project
  useEffect(() => {
    fetch(`${baseURL}${GetProjectPhases}/${ProjectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch phases");
        }
        return response.json();
      })
      .then((response) => {
        console.log("Trueeeee", response);
        setphase(response.phases || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [ProjectId]);

  // Accept the phase
  function HandleAcceptPhase(phaseId) {
    axios
      .post(
        `${baseURL}${AcceptPhase}/${phaseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("Trueeeeeeeeeeee", response.json);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Erorrrrr", error.json);
      });
  }

  // Add extra time because the due
  function HandleAddExtraTime(phaseId, extraDays) {
    axios.post(`${baseURL}${AddExtraExpires}/${phaseId}`,
      {
        duration_in_days:extraDays
      }
      ,{
        headers:{
           Authorization: `Bearer ${token}`,
        }
      })
      .then((response)=>{
          console.log("trueeee", response.data);
            window.location.reload();
      })
      .catch((error)=>{
        console.log("errorrrr", error.response?.data);
      })
  }


  // Reject the Due and cancle the contract
  function HandleRejectOverdue(phaseId){
    axios.post(`${baseURL}${RejectPhaseOverDue}/${phaseId}`,{},{
      headers:{
         Authorization: `Bearer ${token}`,
      }
    }) .then((response)=>{
          console.log("trueeee", response.data);
            window.location.reload();
      })
      .catch((error)=>{
        console.log("errorrrr", error.response?.data);
      })
  }
  return (
    <div className="dadOfEveryPhases">
      {phase.map((phase) => (
        <div className="Phase" key={phase.id}>
          <div className="title_desc_duration_editings">
            <div className="titleOfPhase">
              {phase?.title || "no title found"}
            </div>
            <div className="description">
              📖{phase?.description || "No description"}
            </div>
            <div className="durationss">🕜{phase?.duration_in_days} Days</div>
            <div className="Editings">
              🧾 {phase?.used_revisions}/{phase?.allowed_revisions} Editings
              used
            </div>
          </div>

          <div className="status_Ammount_deadline">
            <div className="statusOfPhase">{phase?.status}</div>
            <div className="Ammountss">💵{phase?.amount}$</div>
            <div className="deadline">🗓️{phase?.deadline}</div>
            <button
              className="ShowTaskbtn"
              onClick={() => {
                navigate(`${phase?.id}`);
              }}
            >
              Show Tasks & Files
            </button>
            {phase?.status === "in_review" ? (
              <button
                className="AcceptPhaseButton"
                onClick={() => {
                  HandleAcceptPhase(phase?.id);
                }}
              >
                Accept The Phase
              </button>
            ) : phase?.status === "approved" ? (
              <p
                className="AcceptedText"
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: "70px",
                }}
              >
                Accepted ✅
              </p>
            ) : phase?.status === "overdue" ? (
              <div>
                <div className="NumberAddedAndAddbtn"> 
                    <input
                    className="NumberInput"
                  type="number"
                  min="1"
                  value={extraDays}
                  onChange={(e) => setExtraDays(e.target.value)}
                  
                />

                <button
                className="ExtraDaysBtn"
                  onClick={() => {
                    HandleAddExtraTime(phase?.id, extraDays);
                  }}
                >
                  Add Extra Time
                </button>

                </div>
              

                <button
                className="RejectPhaseOverDue"
                  onClick={() => {
                     HandleRejectOverdue(phase?.id);
                  }}
                >
                  Reject The OverDue
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
