import "../styles/FreelancerContractdetailesStyle.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import {
  GetContractById,
  AcceptContract,
  RejectContract,
} from "../services/FreelancerContractsApi";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function FreelancerContractDetailes() {
  const [contractdetailes, setcontractdetailes] = useState(null);
  const {id } = useParams();
  const navigate = useNavigate();
  const cookies = Cookies();
  const token = cookies.get("token-freelancer");
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
        const backendMessage = error.response?.data?.message || "Errorrr";
        alert(backendMessage);
      });
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
      <div className="ContractInfo">
        <div className="StatusAndPrice">
          <div className="Status">{contractdetailes?.status}</div>
          <div className="Price">{contractdetailes?.total_budget}$</div>
        </div>
        <div className="ContractTitleAndDiscription">
          <h1>{contractdetailes?.title}</h1>
          <h3>{contractdetailes?.description}</h3>
          <h4>{contractdetailes?.type}</h4>
        </div>
      </div>
      <span>Phases ({contractdetailes?.phases?.length || 0})</span>

      {contractdetailes?.phases?.map((phase) => (
        <div className="PhaseInfor" key={phase?.id}>
          <div className="TitleAndStatus">
            <div className="Title">{phase?.title}</div>
            <div className="Status">{phase?.status}</div>
          </div>
          <div className="SubInfoAboutPhase">
            <div className="AmmountAndDuration">
              <div className="Ammount">💵 Ammount : {phase?.amount}$</div>
              <div className="duration">
                {" "}
                🕜 Duration : {phase?.duration_in_days} days
              </div>
            </div>
            <div className="DedLineAndRevision">
              <div className="DeadLine">🗓️ deadline : {phase?.deadline}</div>
              <div className="Revision">
                📚 Revisions : {phase?.used_revisions}/
                {phase?.allowed_revisions} used
              </div>
            </div>
          </div>
        </div>
      ))}
      {contractdetailes?.status === "draft" ? (
        <div className="Buttons">
          <button
            onClick={() => handleResponseForContract("Accept")}
            className="Acceptbtn"
          >
            Accept Contract
          </button>
          <button
            onClick={() => handleResponseForContract("Reject")}
            className="Rejectbtn"
          >
            Reject Contract
          </button>
        </div>
      ) : (
        <div className="Buttons">
          <button
            onClick={() =>alert("Cancle btn")}
            className="Cancelbtn"
          >
            Cancel Contract
          </button>
          <button
            onClick={() =>alert("mony btn")}
            className="WithdrowMonybtn"
          >
            Withdrow Money
          </button>
        </div>
      )}
    </div>
  );
}
