import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import "../styles/Freelancercontracts.css"
import { GetAllFreelancerContracts } from "../services/FreelancerContractsApi";
export default function ContractFree() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const filteredContracts =
    filterStatus === "all"
      ? contracts
      : contracts.filter((con) => con.status === filterStatus);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(6);
  const [limit] = useState(3);
  const cookies = Cookies();
  const token = cookies.get("token-freelancer");

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    fetch(`${baseURL}${GetAllFreelancerContracts}/${page}/${limit}`, {
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
        setContracts(data.contracts || []);
      })
      .catch((error) => {
        console.log(error.message);
        setContracts([]);
      });
  }, [page]);
  return (
    <div className="DadOfEveryThingInFreelancerContracts">
      <h1 className="MyContractH1">My Contracts</h1>
      <span className="SpanUnderH1">Manage your active and completed contracts</span>
      <div className="contracts-container">
        <div className="contracts-filter">
          <button
            className={filterStatus === "all" ? "active-filter" : ""}
            onClick={() => setFilterStatus("all")}
          >
            All ({contracts.length})
          </button>
          <button
            className={filterStatus === "draft" ? "active-filter" : ""}
            onClick={() => setFilterStatus("draft")}
          >
            Draft
          </button>
          <button
            className={filterStatus === "active" ? "active-filter" : ""}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </button>

          <button
          className={filterStatus === "accepted_pending_fund" ? "active-filter" : ""}
          onClick={() => setFilterStatus("accepted_pending_fund")}
        >
            Accept&pending_Fund
        </button>
      

        <button
          className={filterStatus === "completed" ? "active-filter" : ""}
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </button>
         <button
          className={filterStatus === "disputed" ? "active-filter" : ""}
          onClick={() => setFilterStatus("disputed")}
        >
          Disputed
        </button>
        </div>
        <div className="contracts-list">
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contracts) => (
              <div className="contract-card" key={contracts.id}>
                <div className="contract-info">
                  <div>
                    <span>Contract</span>
                    <strong>{contracts.title}</strong>
                  </div>

                  <div>
                    <span>Client</span>
                    <strong>{contracts.client_name}</strong>
                  </div>
                  <button className="ViewButton"
                  onClick={()=>{
                    navigate(`/FreeLancerLayout/FreelancerContractDetailes/${contracts.id}`);
                  }}
                  >View →</button>
                </div>
              </div>
            ))
          ) : (
            <p>No Contracts Found</p>
          )}
        </div>
      </div>

      <div className="client-pagination">
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#007a5a !important",
              color: "#fff",
            },
          }}
        />
      </div>
    </div>
  );
}
