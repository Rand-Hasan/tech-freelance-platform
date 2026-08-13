import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { GetPhaseTask, GetPhaseFiles } from "../services/StageAndTaskApi.jsx";
import "../styles/StageAndTasksDetailesStyle.css";
export default function StageAndTasksDetailes() {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token-client");
  const [task, settask] = useState([]);
  const [files, setfiles] = useState([]);
  const [url, seturl] = useState("");

  // get phase tasks
  useEffect(() => {
    fetch(`${baseURL}${GetPhaseTask}/${phaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((response) => {
        console.log("Trueeeee", response);
        settask(response.tasks || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [phaseId]);

  // get phase file
  useEffect(() => {
    fetch(`${baseURL}${GetPhaseFiles}/${phaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((response) => {
        console.log("Trueeeee", response);
        setfiles(response.files || []);
        seturl(response.url || "");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [phaseId]);

  return (
    <div>
      <button
        className="back_to_stageAndtask_btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back To Stages{" "}
      </button>

      <div className="dadOfTasks">
        <h3> 📊 Phase Tasks : </h3>
        {task.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            There is no task to show{" "}
          </p>
        ) : (
          task.map((taskItem, index) => (
            <div className="TheTask" key={taskItem.id || index}>
              <div className="name_of_task"> Task_name : <span>{taskItem?.task_name}</span></div>
              <div className="Checking">
                <div className="IsChecked">is Checked ? </div>
                <div
                  className={taskItem?.check ? "TrueChecked" : "FalseChecked"}
                >
                  {taskItem?.check ? "Yes" : "No"}
                </div>
              </div>
            </div>
          ))
        )}
        <h3 className="projectfileH3">📁 Phase Files : </h3>

        {url && (
          <div className="url-card">
            <div className="url-info">
              <span className="url-icon">🔗</span>
              <div className="url-text">
                <span className="url-label">Project Repository / Link</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  {url}
                </a>
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-btn"
            >
              Open Link
            </a>
          </div>
        )}

        {files.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "15px", color: "#666" }}>
            There are no files to show
          </p>
        ) : (
          <div className="files-list">
            {files.map((fileItem, index) => {
              const fileName = fileItem?.file
                ? fileItem.file.split("/").pop()
                : `Archive_${index + 1}.rar`;

              return (
                <div className="file-card" key={fileItem.id || index}>
                  <div className="file-info">
                    <span className="rar-icon">📦</span>
                    <div className="file-details">
                      <span className="file-name">{fileName}</span>
                      <span className="file-type">RAR Archive</span>
                    </div>
                  </div>

                  <button
                    className="download-rar-btn"
                    onClick={() => {
                      alert("download .rar");
                    }}
                  >
                    Download .rar
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
