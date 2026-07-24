import "../styles/ShowCv.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../services/Api/api";
import { ShowCV } from "../services/CvAPI";
import Cookies from "cookie-universal";
import Loading from "../../../../components/Loading/Loading";

export default function ShowCv() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, seterror] = useState("");
  const cookies = Cookies();
  const token = cookies.get("token-freelancer");
  useEffect(() => {
   fetch(baseURL + ShowCV, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(` server error : ${response.status} (Forbidden)`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        seterror(error.message);
      });
  }, []);
  
  function HanldeShowCV(){
    const fileUrl = data.cv?.cv_file;
    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("No CV file available!");
    }
  }

  function handleEditButton(){
    navigate("/createCV",{
      state: {
        isEdit: true,
        cvData: data
      },
    });
  }
  return (
    <div>
      {loading && <Loading />}
       {error && <p className="error-message" style={{width:"50%"}}>{error}</p>}
      <div className="CVAndWorkExperinceAndButton">
        <h3 className="CVAndWorkExperince">CV & Work Experince</h3>
        <button onClick={handleEditButton}  className="EditButton" >Edit</button>
      </div>
      <div className="ExperinceTitle">{data.cv?.experience_title||"no Experince found"}</div>
     <div className="CurrentPastEduSpecilize">
        <div className="info-group">
          <h2>Current Company</h2>
          <h5>{data.cv?.current_company||"no currnet company found"}</h5>
        </div>
        <div className="info-group">
          <h2>Past Companies</h2>
          <h5>{data.cv?.past_companies||"no past companies found"}</h5>
        </div>
        <div className="info-group">
          <h2>Education level</h2>
          <h5>{data.cv?.education_level||"no edu level found"}</h5>
        </div>
        <div className="info-group">
          <h2>Specialization</h2>
          <h5>{data.cv?.specialization||"no specialization found"}</h5>
        </div>
      </div>

      <h4 className="H2languages">LANGUAGES</h4>
      <div className="languages">
        {data.languages?.map((lang) => (
          <div key={lang.id} className="language">
            {lang.language_name}
          </div>
        ))}
      </div>
      <div className="CV">
        <div className="PDFAndUploadedCv">
          <div className="PDF">PDF</div>
          <div className="UploadedCv">
            <h5>UploadedCV</h5>
            {data.cv?.createdAt
                  ? new Date(data.cv.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "N/A"}
          </div>
        </div>
        <button onClick={HanldeShowCV} className="viewCVButton">Show CV</button>
      </div>
    </div>
  );
}
