import axios from "axios";
import { ShowFreelancerFiltered } from "../services/getFreelancersApi.jsx";
import FindFreeLancerCard from "../components/FindFreeLancerCard";
import { baseURL } from "../../../../services/Api/api";
import "../styles/MatchedFreelancers.css";
import { useEffect, useState } from "react";
import Cookies from "cookie-universal";
export default function MatchedFreelancers() {
  const cookies = Cookies();
  const projectId = cookies.get("projectId");
  const token = cookies.get("token-client");
  const [freelancers, setfreelancers] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}${ShowFreelancerFiltered}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("errror");
        }
        return response.json();
      })
      .then((data) => {
        setfreelancers(data.freelancer || []);
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div>
      <div className="SubTitleAbovCardContainer">
        <h2>Matched Freelancers</h2>
        <h4>Based on skills required for this project</h4>
      </div>

    

        <div className="ContainerOfFreelancerCards">
          {freelancers?.map((item) => (
            <FindFreeLancerCard key={item.id} item={item} />
          ))}
        
      </div>
    </div>
  );
}
