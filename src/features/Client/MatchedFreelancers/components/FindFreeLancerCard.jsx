import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import "../styles/FindFreeLancerCard.css";
import Cookies from "cookie-universal";
import { InviteFreelancer } from "../services/inviteFreelancer.jsx";
import { baseURL } from "../../../../services/Api/api";
import axios from "axios";
export default function FindFreeLancerCard({ item }) {

  const [isInvited, setIsInvited] = useState(false);

  const freelancer_id = item.freelancer_id;
  const cookies = Cookies();
  const projectId = cookies.get("projectId");
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
       alert("trueeee");
        console.log(response);
        setIsInvited(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Errorrr");
      });
  }
  function HandleCancelInvite() {
    alert("Invitation Canceled");
    setIsInvited(false);
  }
  // بس مشان نعرف ايا تابع نستخدم حسب حالة الستيت
  function HandleButtonClick() {
    if (isInvited) {
      HandleCancelInvite();
    } else {
      HanldeInviteFreelancer();
    }
  }
  return (
    <Card className="FindFreeLancerCard">
      <CardContent className="CardContent">
        <div className="LeftSide">
          <div className="NameAndFirstLater">
            <div className="FirstLaterOfFreeLancer">MA</div>
            <div className="NameOfFreeLancerAndNickName">
              <h3>majd mahmoud {freelancer_id} </h3>
              <h6>Full Stack Developer</h6>
            </div>
          </div>
          <div className="StatusOfFreeLancer">🟢Avialable now</div>
          <div className="SkillsOfFreeLancer">
            <div className="SkillItemOfFreeLancer">React</div>
            <div className="SkillItemOfFreeLancer">Node </div>
            <div className="SkillItemOfFreeLancer">AWS</div>
          </div>
          <div className="CountOfProjectCompleted">24 project completed</div>
        </div>

        <div className="RightSide">
          <div className="monyInHour">$45 / hr</div>
          <div className="RaitingOfFreeLancer">{item.score} Expert</div>

          <button
            onClick={HandleButtonClick}
            className={isInvited ? "CancelButton" : "InviteButton"}
          >
            {isInvited ? "Cancel Invite" : "Invite"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
