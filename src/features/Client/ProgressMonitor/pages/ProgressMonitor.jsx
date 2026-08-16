import "../styles/ProgressMonitorStyle.css";
import { baseURL } from "../../../../services/Api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { GetFreelancerRespond,ReturnToDeletePhase,DeleteAnyWay,AddAnyWayAndCancelContract,ReturnToAddPhase,ReturnToUpdatePhase } from "../services/ProgressMonitorApi";
import axios from "axios";

export default function ProgressMonitor() {
  const { id: phaseId } = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const [respond, setrespond] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!phaseId) return;

    fetch(`${baseURL}${GetFreelancerRespond}/${phaseId}`, {
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
        setrespond(response.responds || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [phaseId]);

  function HandleDeleteAnyWay() {
      axios.post(`${baseURL}${DeleteAnyWay}/${phaseId}`,{},{
      headers:{
         Authorization: `Bearer ${token}`,
      }
    })  
    .then((response) => {
        console.log("trueeee", response.data);
        navigate("..");
      })
      .catch((error) => {
        console.log("errorrrr", error.response?.data);
      });
  }

  function HandleReturnToDelete() {
    axios.post(`${baseURL}${ReturnToDeletePhase}/${phaseId}`,{},{
      headers:{
         Authorization: `Bearer ${token}`,
      }
    })  
    .then((response) => {
        console.log("trueeee", response.data);
        navigate("..");
      })
      .catch((error) => {
        console.log("errorrrr", error.response?.data);
      });
  }

  function HandleAddAnyWay() {
  axios.post(`${baseURL}${AddAnyWayAndCancelContract}/${phaseId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      console.log("trueeee", response.data);
      navigate("..");
    })
    .catch((error) => {
      console.log("errorrrr", error.response?.data);
    });
}

function HandleReturnToAdd() {
  axios.post(`${baseURL}${ReturnToAddPhase}/${phaseId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      console.log("trueeee", response.data);
      navigate("..");
    })
    .catch((error) => {
      console.log("errorrrr", error.response?.data);
    });
}

function HandleReturnToUpdate() {
  axios.post(`${baseURL}${ReturnToUpdatePhase}/${phaseId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      console.log("trueeee", response.data);
      navigate("..");
    })
    .catch((error) => {
      console.log("errorrrr", error.response?.data);
    });
}
 
  if (!phaseId) {
    return (
      <div className="ProgressMonitorContainer">
        <div className="NoRespondsBox" style={{ textAlign: "center", padding: "40px 20px" }}>
          👉 Please select a phase from the <strong>Stages & Tasks</strong> tab first.
        </div>
      </div>
    );
  }

return (
  <div className="ProgressMonitorContainer">
    {respond.length === 0 ? (
      <div className="NoRespondsBox">❗ There Are No Responds !</div>
    ) : (
      respond.map((r) => (
        <div key={r.id} className="RespondCard">
          <p className="RespondText">{r.respond}</p>
          <p className="RespondDate">
            🕒{" "}
            {new Date(r.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      ))
    )}

    {respond.length > 0 && (
      <div className="RespondActionsRow">
        {respond[0]?.types === "delete" ? (
          <>
            <button className="DeleteAnyWayBtn" onClick={HandleDeleteAnyWay}>
              Delete Any Way
            </button>
            <button className="ReturnToDeleteBtn" onClick={HandleReturnToDelete}>
              Return To Delete
            </button>
          </>
        ) : respond[0]?.types === "update" ? (
          <>
            <button className="ReturnToDeleteBtn" onClick={HandleReturnToUpdate}>
              Return To Update Phase
            </button>
          </>
        ) : (
          <>
            <button className="DeleteAnyWayBtn" onClick={HandleAddAnyWay}>
              Add Any Way
            </button>
            <button className="ReturnToDeleteBtn" onClick={HandleReturnToAdd}>
              Return To Add
            </button>
          </>
        )}
      </div>
    )}
  </div>
);
}