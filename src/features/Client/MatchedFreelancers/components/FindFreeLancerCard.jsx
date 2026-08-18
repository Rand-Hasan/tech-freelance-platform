import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FindFreeLancerCard.css";
import Cookies from "universal-cookie";

import { InviteFreelancer } from "../services/inviteFreelancer.jsx";
import { baseURL } from "../../../../services/Api/api";
import axios from "axios";
export default function FindFreeLancerCard({ item }) {
     const navigate = useNavigate();
  const [isInvited, setIsInvited] = useState(false);

  const freelancer_id = item.userId;
  const cookies =new Cookies();
  const { id: projectId } = useParams();
  const token = cookies.get("token-client");
  function HanldeInviteFreelancer() {
    axios
      .post(
        `${baseURL}${InviteFreelancer}/${projectId}/${freelancer_id}`,
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
        setIsInvited(true);
      })
      .catch((error) => {
        console.log(error);
      const backendMessage = error.response?.data?.message || "Errorrr";
        alert(backendMessage);
      });
  }

  // بس مشان نعرف ايا تابع نستخدم حسب حالة الستيت
  function HandleButtonClick() {
    if (isInvited) {
      alert("You Invited This Freelancer ! ");
    } else {
      HanldeInviteFreelancer();
    }
  }
  return (
    <Card className="FindFreeLancerCard" onClick={()=>navigate(`/clientlayout/FreeLanceInfo/${freelancer_id}`)}>
      <CardContent className="CardContent">
        <div className="LeftSide">
          <div className="NameAndFirstLater">
            <div className="FirstLaterOfFreeLancer">
  
             {item.photo ? (
              <img
                src={item.photo}
                alt={`${item.first_name} ${item.last_name}`}
              />
            ) : (
              <div className="FreelancerInitials">
                {item.first_name?.[0]}
                {item.last_name?.[0]}
              </div>
            )}
  </div>
            <div className="NameOfFreeLancerAndNickName">
              <h3> {item.first_name} {item.last_name}{freelancer_id} </h3>
              <h6> 📍 {item.location}</h6>
            </div>
          </div>
          <div className="StatusOfFreeLancer">🎂 {item.birthday}</div>
          <div className="SkillsOfFreeLancer">
            <div className="SkillItemOfFreeLancer">📞 {item.phone}</div>
          </div>
          <div className="CountOfProjectCompleted"></div>
        </div>

        <div className="RightSide">
          <div className="monyInHour">⭐ {item.evaluation ?? "New"}</div>
          

          <button
            onClick={HandleButtonClick}
            className={isInvited ? "HadInvitedButton" : "InviteButton"}
          >
            {isInvited ? " Invited" : "Invite"}
          </button>
        </div>
      </CardContent>
    </Card>
  );


}
