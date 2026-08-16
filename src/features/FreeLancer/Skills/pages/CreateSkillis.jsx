import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { AddFreelancerSkills } from "../services/api_skill";
import Cookies from "universal-cookie";
import { GetSkills } from "../../../Client/client-projects/services/api_project";
import '../styles/CreateSkillis.css';
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate, useLocation } from "react-router-dom";
export default function CreateSkill() {
    const currentStep = 3;
    const totalSteps = 4;
    const cookies = new Cookies();
    const navigate = useNavigate();
      const location = useLocation();
       const isEditing = location.state?.isEditing || false;
    const preSelectedIds = location.state?.selectedSkillIds || [];
    const token = cookies.get('token-freelancer');

    const [allSkill, setallSkill] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState(preSelectedIds);

    useEffect(() => {
        axios.get(`${baseURL}${GetSkills}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setallSkill(res.data.skills);
            })
            .catch((err) => {
                console.error("حدث خطأ أثناء جلب البيانات:", err);
            })
    }, []);

    const handleSkillChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedSkills((prev) => [...prev, id]);
        } else {
            setSelectedSkills((prev) => prev.filter((skillId) => skillId !== id));
        }
    };

    function handleSubmit() {
        const dataToSend = {
            skill_id: selectedSkills
        };

        axios.post(`${baseURL}${AddFreelancerSkills}`, dataToSend, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            navigate(isEditing ? "/freelancerlayout/showprofile/skills" : "/CreateProfile");
        })
        .catch((err) => {
            console.error("خطأ أثناء إرسال المهارات:", err);
        });
    }

    return (
        <div className="Skill-page">
            <div className="Skill-card">

                {/* Progress */}
                <div className="progress-wrapper">
                    <span className="step-text">
                        Step {currentStep} of {totalSteps}
                    </span>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${(currentStep / totalSteps) * 100}%`,
                            }}
                        ></div>
                    </div>

                    <span className="section-name">skill</span>
                </div>

                <div className="Skill-header">
                    <h1>Add your skills</h1>
                    <p>
                        List your technical skills. These are used to match you with the
                        right,<br /> projects on the platform.
                    </p>
                </div>

                <div className="github-box">
                    <div className="github-header">
                        <GitHubIcon className="github-icon" />
                        <div>
                            <strong>Skills auto-detected from your GitHub</strong>
                            <p>Pre-selected below – uncheck any that don't apply.</p>
                        </div>
                    </div>
                </div>

                <div className="skills-grid">
                    {allSkill.map((skill) => {
                        const isChecked = selectedSkills.includes(skill.id);
                        return (
                            <label
                                key={skill.id}
                                className={`checkbox-card ${isChecked ? "checked" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
                                    hidden
                                />
                                <span className="box-icon"></span>
                                <span>{skill.skill_name}</span>
                            </label>
                        );
                    })}
                </div>

                <button
                    className="primary-btn"
                    onClick={handleSubmit}
                >
                    Next → profile
                </button>
            </div>
        </div>
    );
}
