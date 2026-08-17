import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { GetFreelancerSkills } from "../services/api_skill";
import Cookies from "universal-cookie";
import "../styles/ShowSkillsStyle.css";
import { useNavigate } from "react-router-dom";

export default function ShowSkills() {
  const cookies = new Cookies();
  const token = cookies.get("token-freelancer");
  const [skills, setskills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}${GetFreelancerSkills}`, {
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
         const flat = (response.skills || []).flat();
                const unique = Array.from(
                    new Map(flat.map((skill) => [skill.id, skill])).values()
                );
                setskills(unique);
      })
      .catch((Error) => {
        console.log(Error.json);
      });
  }, []);
  const addAnotherSkill = () => {
    navigate("/CreateSkillis", {
        state: {
            isEditing: true,
            selectedSkillIds: skills.map((skill) => skill.id), 
        },
    });
};
  return (
    <div className="show-skills-wrapper">
            {skills.length === 0 ? (
                <p className="no-skills">There is no Skills To Show </p>
            ) : (
                skills.map((skill) => (
                    <span key={skill.id} className="skill-chip">
                        {skill.skill_name}
                    </span>
                ))
            )}
            <button className="add-skill-btn" onClick={addAnotherSkill}>
               Add Another Skill 
            </button>
        </div>
     
  );
}
