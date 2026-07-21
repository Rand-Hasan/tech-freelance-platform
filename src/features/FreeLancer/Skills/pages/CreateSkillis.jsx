import { useEffect, useState } from "react";
import SkillCategory from "../components/SkillCategory";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { AddFreelancerSkills, GetFreelancerSkills } from "../services/api_skill";
import Cookies from "universal-cookie";
import { GetSkills } from "../../../Client/client-projects/services/api_project";
import '../styles/CreateSkillis.css';
import GitHubIcon from "@mui/icons-material/GitHub";

export default function CreateSkill() {
    const currentStep = 3;
    const totalSteps = 4;
    const cookies = new Cookies();
    
    const token = cookies.get('token-freelancer');
    console.log('coooooooooo:', token);
    const [allSkill, setallSkill] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}${GetSkills}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setallSkill(res.data.skills);
                console.log("dataaaaa:", res.data.skills);
                console.log("iddddddddddddddddd:",res.data.skills.id)
            })
            .catch((err) => {
                console.error("حدث خطأ أثناء جلب البيانات:", err);
            })
    }, []);

    const frontSkill = allSkill.slice(0, 4);
    const backSkill = allSkill.slice(4, 5);
    const dataSkill = allSkill.slice(5, 7);


    const handleSkillChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedSkills((prev) => [...prev, id]);
        } else {
            setSelectedSkills((prev) => prev.filter((skillId) => skillId !== id));
        }
    };


    function handleSubmit()  {
        
        const dataToSend = {
            skill_id:  selectedSkills
        };
        console.log(selectedSkills)
        
        axios.post(`${baseURL}${AddFreelancerSkills}`, dataToSend, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        
        .then((res) => {
            console.log("تم حفظ المهارات بنجاح:", res.data);
            navigate("/CreateProfile");
        })
        .catch((err) => {
            console.error("خطأ أثناء إرسال المهارات:", err);
        });
    };
    return (
        <div className="portfolio-page">
            <div className="portfolio-card">

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
                <div className="portfolio-header">
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


                <div className="skills-wrapper">
                    <SkillCategory 
                        title={"frontend"} 
                        skills={frontSkill} 
                        onSkillChange={handleSkillChange}
                        selectedSkills={selectedSkills}
                    />
                    <SkillCategory 
                        title={"backend"} 
                        skills={backSkill} 
                        onSkillChange={handleSkillChange}
                        selectedSkills={selectedSkills}
                    />
                    <SkillCategory 
                        title={"database"} 
                        skills={dataSkill} 
                        onSkillChange={handleSkillChange}
                        selectedSkills={selectedSkills}
                    />
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