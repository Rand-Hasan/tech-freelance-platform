import "../../Portifolio/Styles/CreatePortifolio.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { CreateCV } from "../services/CvAPI";
import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";
import "../styles/CreateCv.css";
import SelectLanguage from "../components/SelectLanguage";

export default function CreateCv() {
const cookies = Cookies();
const token = cookies.get("token-freelancer");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const education_level_value = [
    "High school diploma",
    "University degree",
    "PhD",
    "Master's Degree",
  ];

  const techMajors = [
    "Software Engineering",
    "Full Stack Development",
    "Backend Development",
    "Frontend Development",
    "Mobile Application Development",
    "DevOps Engineering",

    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Data Engineering",

    "UI/UX Design",
    "Product Design",
    "Interaction Design",

    "Cybersecurity",
    "Cloud Computing",
    "Information Technology",
    "Computer Science",
    "Network Engineering",
  ];
  const [data, setData] = useState({
    experience_title: "",
    education_level: "",
    specialization: "",
    current_company: "",
    past_companies: "",
    languages: [],
    cv_file: null,
  });
  // كرمال الحقول التكست
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  // كرمال ملف السيرة الذاتية
  function handleFileChange(e) {
    const file = e.target.files[0];
    setData({
      ...data,
      cv_file: file,
    });
  }
  // كرمال حقل اللغات لانو ملف منفصل
  function handleLanguageChange(newValue) {
    setData({
      ...data,
      languages: newValue,
    });
  }

  function HanleGoToSkills() {
    seterror("");
    setLoading(true);
    const formdata = new FormData();
    formdata.append("experience_title", data.experience_title);
    formdata.append("education_level", data.education_level);
    formdata.append("specialization", data.specialization);
    formdata.append("current_company", data.current_company);
    formdata.append("past_companies", data.past_companies);

    data.languages.forEach((lang) => {
      formdata.append("languages", lang.label);
    });

    if (data.cv_file) {
      formdata.append("cv_file", data.cv_file);
    }
    axios
      .post(baseURL + CreateCV, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("trueeeeeeeee");
        console.log(res.data.json);
        setLoading(false);
         navigate("/CreateSkillis")
      })
     
      .catch((err) => {
        console.log("errrror", err);
        setLoading(false);
        if (err.response && err.response.data) {
          const responseData = err.response.data;
          if (
            responseData.errors &&
            Array.isArray(responseData.errors) &&
            responseData.errors.length > 0
          ) {
            seterror(responseData.errors[0].message);
          } else if (responseData.message) {
            seterror(responseData.message);
          } else {
            seterror("Error ocured Reviw your data pls ! ");
          }
        } else {
          seterror("Error Connection ! ");
        }
      });
  }

  const currentStep = 2;
  const totalSteps = 4;
      const navigate = useNavigate();
  return (
    <div className="portfolio-page">
      {loading && <Loading />}
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


   
          <span className="section-name">CV</span>
        </div>
        <h1
          style={{ color: "black", marginTop: "10px", marginBottom: "10px" }}
          className="AddYourCv"
        >
          Add your CV
        </h1>
        <h5 style={{ color: "gray" }}>
          Tell us about your experince,education and background so client can
        </h5>
        <h5 style={{ color: "gray" }}>better understand your portifolio</h5>
        {error && <p className="error-message">{error}</p>}
        <label
          style={{ fontWeight: "bold", marginTop: "10px" }}
          className="ExperinceName"
        >
          Experince Name
        </label>
        <input
          name="experience_title"
          value={data.experience_title}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Full Stack Developer"
        ></input>
        <div className="Companies">
          <div className="CompanisLabels">
            <label style={{ fontWeight: "bold" }}>current company</label>
            <label style={{ fontWeight: "bold" }}>previous company</label>
          </div>
          <div className="CompanisInputs">
            <input
              name="current_company"
              value={data.current_company}
              onChange={handleChange}
              type="text"
              placeholder="e.g . TechCorp "
            />
            <input
              name="past_companies"
              value={data.past_companies}
              onChange={handleChange}
              type="text"
              placeholder="e.g StartUp X , ProNet"
            />
          </div>
        </div>
        <div className="EduAndSpecialization">
          <div className="EduAndSpecializationLabel">
            <label style={{ fontWeight: "bold" }}>Education Level</label>
            <label style={{ fontWeight: "bold" }}>Specialization</label>
          </div>
          <div className="SpecializationAndEduSelections">
            <select
              name="education_level"
              value={data.education_level}
              onChange={handleChange}
              className="EduLevelSelect"
            >
              {education_level_value.map((major, index) => (
                <option key={index} value={major}>
                  {major}
                </option>
              ))}
            </select>

            <select
              name="specialization"
              value={data.specialization}
              onChange={handleChange}
              className="specializSelect"
            >
              {techMajors.map((major, index) => (
                <option key={index} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label style={{ fontWeight: "bold", marginTop: "10px" }}>
          Languages (also choose your native language )
        </label>
        
        <SelectLanguage
          value={data.languages}
          onChange={handleLanguageChange}
        />

        <label style={{ fontWeight: "bold", marginTop: "10px" }}>
          Upload CV (optional)
        </label>

        <div className="UploadYourCv">
          <input
            id="cv_upload"
            onChange={handleFileChange}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
          />

          <label
            htmlFor="cv_upload"
            className="upload-content"
            style={{ cursor: "pointer" }}
          >
            <span>📁</span>
            <span className="upload-title">Upload your CV as PDF</span>
            <span className="upload-subtitle">PDF only - max 5MB</span>
          </label>
        </div>

        <button onClick={HanleGoToSkills} className="NextToSkillsButton" >
          {" "}
          Next → Skills
        </button>
      </div>{" "}
    </div>
  );
}
