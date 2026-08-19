import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { GetProjectPhases } from "../services/api-myproject";
import Cookies from "universal-cookie";
import { FaArrowLeft, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/PhaseProject.css'
export default function PhasesProject(){
    const cookies = new Cookies();
     const token = cookies.get('token-freelancer');
     const{id:projectId} = useParams();
     const navigate = useNavigate();
     const [phases,setPhases]= useState([]);
     useEffect(()=>{
        ShowPhasesProject();
     },[]);
      const ShowPhasesProject =async ()=>{
       try{
        const res = await axios.get(`${baseURL}${GetProjectPhases}${projectId}`,{
            headers:{Authorization:`Bearer ${token}`}
        }) 
        setPhases(res.data.phases);
       }catch(err){
      console.log(err)
       }
      }
     if (!phases) {

    return <p>Loading...</p>

  }
    return (
    <div className="phases-container">

        <Link to="/freelancerlayout/projectfree/myproject" className="back-link">
            <FaArrowLeft />
            <span>Back to My Projects</span>
        </Link>

        <h2 className="page-title-phase">Project Phases</h2>

        <div className="phases-grid">

            {phases?.map((phase) => (

                <div className="phase-card" key={phase.id}>

                  <div className="phase-header">

    <h3>{phase.title}</h3>

    <span className={`status ${phase.status}`}>
        {phase.status}
    </span>

</div>
                    <div className="phase-info">

                        <p>
                            <FaMoneyBillWave />
                            ${phase.amount}
                        </p>

                        <p>
                            <FaCalendarAlt />
                            {phase.deadline}
                        </p>

                        <div className="allowed_revisions">
             🧾 {phase?.used_revisions}/{phase?.allowed_revisions} Editings used
            </div>

                    </div>

                    <button className="tasks-btn"
                    onClick={()=>{
                        sessionStorage.setItem(`phaseStatus_${phase.id}` , phase.status);
                        navigate(`/freelancerlayout/projectfree/phasedetails/${phase.id}` , { state: { phaseStatus: phase.status } });
                    }}
                    >
                        View Tasks
                    </button>

                </div>

            ))}

        </div>

    </div>
);
     
    
}