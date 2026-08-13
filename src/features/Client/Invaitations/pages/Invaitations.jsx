import "../styles/Invaitations.css";
import DialogForInvitDetailes from "../components/DialogForInvitDetailes.jsx";
import { ShowCLientInitaions } from "../services/InvaitationsApi.jsx";
import { useState, useEffect } from "react";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import Pagination from "@mui/material/Pagination";
export default function Invaitations() {
  const [invaitations, setinvaitations] = useState([]);
  const cookies = Cookies();
  const token = cookies.get("token-client");
 
  const [page, setPage] = useState(1);
  const [limit] = useState(3); 
  const [totalPage, setTotalPage] = useState(6);
 
  useEffect(() => {
   fetch(`${baseURL}${ShowCLientInitaions}/${page}/${limit}`, {
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
        setinvaitations(data.invitations || []);
      })
      .catch((error) => {
        console.log(error.message);
        setinvaitations([]);
      });
  }, [page]);

  const [selectedInvite, setSelectedInvite] = useState(null);

  function HandleShowInvaitDetailes(item) {
    setSelectedInvite(item);
  }
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="DadOfContainer">
      {invaitations.length === 0 ? (
        <div className="NoInvitationsDiv" >
          <h2>🧾</h2>
          <h2>No invitations found</h2>
        </div>
      ) : (
        invaitations.map((item) => (
          <div className="Container" key={item.id}>
            <div
              onClick={() => HandleShowInvaitDetailes(item)}
              className="FreelacneAndProjectName"
            >
              {/* <h3> 🤝Invaitation ID : {item.id}</h3> */}
              <h3> 🧑🏼‍🎓Freelancer Name : {item.freelancer_name} </h3>
              <h4> 📊Project Name : {item.project_name} </h4>
            </div>
          </div>
        ))
      )}
      {/* حاوية الـ Pagination */}
      <div className="pagination-container">
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

      <DialogForInvitDetailes
        open={!!selectedInvite}
        onClose={() => setSelectedInvite(null)}
        invite={selectedInvite}
      />
    </div>
  );
}
