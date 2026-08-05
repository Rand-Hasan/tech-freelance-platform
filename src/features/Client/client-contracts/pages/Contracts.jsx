// import { useEffect, useState } from "react";
// import "../../client-contracts/styles/Contracts.css";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { baseURL } from "../../../../services/Api/api";
// import { GetAllClientsContracts } from "../services/api_contract";
// import Cookies from "universal-cookie";

// export default function Contracts() {
//   const cookies = new Cookies();
//   const token = cookies.get('token-client');
//   const[page,setPage]= useState(1);
//   const [totalPage,setTotalPage]= useState(6);
//   const [limit]= useState(3);
//   const[Contract,setContract]= useState(null);
//   const [filterStatus,setFilterStatus]= useState('all');

//   useEffect(()=>{
//     ShowContarct(page);
//   },[page]);

//   const ShowContarct= async(currentpage)=>{
//     try{
//       const res = await axios.get(`${baseURL}${GetAllClientsContracts}${currentpage}/${limit}`,{
//         headers:{Authorization:`Bearer ${token}`}
//       })
//       setContract(res.data.contracts);

//     }catch(err){
//       console.log(err)
//     }
//   }

//   const filtercontract = filterStatus==='all' ? Contract : Contract.filter((con)=>con.status===filterStatus)
//   const handleChangePage = (event,value)=>{
//     setPage(value);
//   }
//   return (
//    <div>

//     <h2>Contract</h2>
//     <div>{Contract.title}</div>

//      <h2>Freelancer Name</h2>
//      <div>{Contract.freelancer_name}</div>
//    </div>
//   );
// }

import { useEffect, useState } from "react";
import "../../client-contracts/styles/Contracts.css";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { GetAllClientsContracts } from "../services/api_contract";
import Cookies from "universal-cookie";
import Pagination from "@mui/material/Pagination";
import '../styles/Contracts.css';
import { useNavigate } from "react-router-dom";

export default function Contracts() {

  const cookies = new Cookies();
  const token = cookies.get("token-client");
   const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(6);
  const [limit] = useState(3);

  const [contracts, setContracts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");


  useEffect(() => {
    ShowContracts(page);
  }, [page]);


  const ShowContracts = async (currentPage) => {

    try {

      const res = await axios.get(
        `${baseURL}${GetAllClientsContracts}${currentPage}/${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      setContracts(res.data.contracts || []);


    } catch (err) {
      console.log(err);
    }

  };


  const filteredContracts =
    filterStatus === "all"
      ? contracts
      : contracts.filter(
        (con) => con.status === filterStatus
      );


  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (

    <div className="contracts-container">


      <div className="contracts-filter">

        <button
          className={filterStatus === "all" ? "active-filter" : ""}
          onClick={() => setFilterStatus("all")}
        >
          All ({contracts.length})
        </button>


        <button
          className={filterStatus === "active" ? "active-filter" : ""}
          onClick={() => setFilterStatus("active")}
        >
          Active
        </button>


        <button
          className={filterStatus === "pending" ? "active-filter" : ""}
          onClick={() => setFilterStatus("pending")}
        >
          Pending
        </button>


        <button
          className={filterStatus === "completed" ? "active-filter" : ""}
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </button>

      </div>



      <div className="contracts-list">


        {
          filteredContracts.length > 0 ?

            filteredContracts.map((contract) => (

              <div
                className="contract-card"
                key={contract.id}
              >


                <div className="contract-info">


                  <div>
                    <span>Contract</span>
                    <strong>
                      {contract.title}
                    </strong>
                  </div>



                  <div>
                    <span>Freelancer</span>
                    <strong>
                      {contract.freelancer_name}
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong className={`status-${contract.status}`}>
                      ● {contract.status}
                    </strong>
                  </div>



                  <div>
                    <button className="view-btn" onClick={()=>navigate(`/clientlayout/ContractDetails/${contract.id}`)}>
                      View →
                    </button>
                  </div>


                </div>


              </div>


            ))

            :

            <p>No Contracts Found</p>
        }


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