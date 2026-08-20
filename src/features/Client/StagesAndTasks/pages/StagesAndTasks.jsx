import "../styles/StagesAndTasksStyle.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import {
  GetProjectPhases,
  AcceptPhase,
  AddExtraExpires,
  RejectPhaseOverDue,
  DeletePhase,
} from "../services/StageAndTaskApi.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function StagesAndTasks() {
  const { id: ProjectId } = useParams();
  const [deleteErrors, setDeleteErrors] = useState({});
  const [phase, setphase] = useState([]);
  const [contractStatus, setContractStatus] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();
  const [extraDays, setExtraDays] = useState({});
  // Three dots
  const [activeMenuId, setActiveMenuId] = useState(null);
  const toggleMenu = (phaseId) => {
    setActiveMenuId(activeMenuId === phaseId ? null : phaseId);
  };
  function HandleUpdatePhase(phaseId) {
    navigate(`update-phase/${phaseId}`);
    setActiveMenuId(null);
  }
  // Three dots

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
        setContractStatus(response.contract_status || "");
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
    axios
      .post(
        `${baseURL}${AddExtraExpires}/${phaseId}`,
        {
          duration_in_days: extraDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("trueeee", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("errorrrr", error.response?.data);
      });
  }

  // Reject the Due and cancle the contract
  function HandleRejectOverdue(phaseId) {
    axios
      .post(
        `${baseURL}${RejectPhaseOverDue}/${phaseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("trueeee", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("errorrrr", error.response?.data);
      });
  }
  // Delete phase
  function HandleDeletePhase(phaseId) {
    axios
      .post(
        `${baseURL}${DeletePhase}/${phaseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("trueeee", response.data);
        window.location.reload();
        // navigate(`progress-monitor/${phase.id}`);
      })
      .catch((error) => {
        console.log("errorrrr", error.response?.data);
        if (error.response && error.response.data) {
          setDeleteErrors((prev) => ({
            ...prev,
            [phaseId]: error.response.data.message,
          }));
        }
      });
  }
  function HandleAddPhase() {
    navigate(`add-phase/${phase[0]?.contract_id}`);
  }
  return (
    <div className="dadOfEveryPhases">
      {contractStatus !== "completed" && (
        <div onClick={HandleAddPhase} className="AddPhase">
          +
        </div>
      )}

      {phase.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          ❗ There Are No Phases To Show
        </div>
      ) : (
        phase.map((phase) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`progress-monitor/${phase.id}`);
            }}
            className="Phase"
            key={phase.id}
          >
            {/* Three dots */}
            {phase?.status === "in_review" && (
              <div className="phase_menu_container">
                <button
                  className="phase_dots_btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(phase.id);
                    
                  }}
                >
                  ⋮
                </button>

                {activeMenuId === phase.id && (
                  <div className="phase_dropdown_menu" >
                    <button
                      onClick={(e) => {
                        HandleUpdatePhase(phase.id);
                        e.stopPropagation();
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* End Three dots  */}

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
              <div className="Ammountss">💵{phase?.amount}$</div>
              <div className="deadline">🗓️{phase?.deadline}</div>
            </div>

            <div className="statusAndDelete">
              <div className="status_Ammount_deadline">
                <div className="statusOfPhase">{phase?.status}</div>

                <button
                  className="ShowTaskbtn"
                  onClick={(e) => {
                    navigate(`${phase?.id}`);
                    e.stopPropagation();
                  }}
                >
                  Show Tasks & Files
                </button>
                {phase?.status === "in_review" ? (
                  <button
                    className="AcceptPhaseButton"
                    onClick={(e) => {
                      HandleAcceptPhase(phase?.id);
                      e.stopPropagation();
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
                        value={extraDays[phase.id] || 1}
                        onChange={(e) =>
                          setExtraDays({
                            ...extraDays,
                            [phase.id]: e.target.value,
                          })
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />

                      <button
                        className="ExtraDaysBtn"
                        onClick={(e) => {
                          HandleAddExtraTime(
                            phase?.id,
                            extraDays[phase.id] || 1,
                          );
                          e.stopPropagation();
                        }}
                      >
                        Add Extra Time
                      </button>
                    </div>

                    <button
                      className="RejectPhaseOverDue"
                      onClick={(e) => {
                        HandleRejectOverdue(phase?.id);
                        e.stopPropagation();
                      }}
                    >
                      Reject The OverDue
                    </button>
                  </div>
                ) : null}
                {(phase?.status === "pending" ||
                  phase?.status === "in_progress") && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // alignItems: "center",
                      // width:"100%"
                     
                    }}
                  >
                     {deleteErrors[phase?.id] && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginBottom: "4px",
                          fontWeight: "bold",
                          marginLeft:"20px"
                        }}
                      >
                        {deleteErrors[phase?.id]}
                      </span>
                    )}
                    <button
                      className="DeletePhaseBtn"
                      onClick={(e) => {
                        HandleDeletePhase(phase?.id);
                        e.stopPropagation();
                      }}
                    >
                      Delete Phase
                    </button>

                   
                  </div>
                  
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
