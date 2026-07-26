import "../styles/Invaitations.css";
import DialogForInvitDetailes from "../components/DialogForInvitDetailes.jsx";
import { ShowCLientInitaions } from "../services/InvaitationsApi.jsx";
import { useState, useEffect } from "react";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
export default function Invaitations() {
  const [invaitations, setinvaitations] = useState([]);
  const cookies = Cookies();
  const token = cookies.get("token-client");
  useEffect(() => {
    fetch(baseURL + ShowCLientInitaions, {
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
      });
  }, []);

  const [selectedInvite, setSelectedInvite] = useState(null);

  function HandleShowInvaitDetailes(item) {
    setSelectedInvite(item);
  }
  return (
    <div className="DadOfContainer">
      {invaitations.map((item) => (
        <div className="Container">
          <div
            onClick={() => HandleShowInvaitDetailes(item.id)}
            key={item.id}
            className="FreelacneAndProjectName"
          >
            <h3> 🤝Invaitation ID : {item.id}</h3>
            <h3> 🧑🏼‍🎓Freelancer Name : {item.freelancer_name} </h3>
            <h4> 📊Project Name : {item.project_name} </h4>
          </div>
          {/* <button onClick={HandleCancleInvitation} className="CancleButton">
            Cancel Invite
          </button> */}
        </div>
      ))}
      <DialogForInvitDetailes
        open={!!selectedInvite}
        onClose={() => setSelectedInvite(null)}
        invite={selectedInvite}
      />
    </div>
  );
}
