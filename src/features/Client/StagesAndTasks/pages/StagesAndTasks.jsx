import "../styles/StagesAndTasksStyle.css";
import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { GetProjectPhases } from "../services/StageAndTaskApi.jsx";
import { useNavigate } from "react-router-dom";
export default function StagesAndTasks() {
  const { id: ProjectId } = useParams();
  const [phase, setphase] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();

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

  return (
    <div className="dadOfEveryPhases">
      {phase.map((phase) => (
        <div className="Phase" key={phase.id}>
          <div className="title_desc_duration_editings">
            <div className="titleOfPhase">{phase?.title || "no title found"}</div>
            <div className="description">📖{phase?.description || "No description"}</div>
            <div className="durationss">🕜{phase?.duration_in_days} Days</div>
            <div className="Editings">
             🧾 {phase?.used_revisions}/{phase?.allowed_revisions} Editings used
            </div>
          </div>
         
            <div className="status_Ammount_deadline">
              <div className="statusOfPhase">{phase?.status}</div>
              <div className="Ammountss">💵{phase?.amount}$</div>
              <div className="deadline">🗓️{phase?.deadline}</div>
              <button className="ShowTaskbtn" onClick={()=>{
                navigate(`${phase?.id}`);
              }}>Show Task</button>
            </div>
          
         
        </div>
      ))}
    </div>
  );
}
