import "../styles/ShowCv.css";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { ShowCV } from "../services/CvAPI";
import Cookies from "cookie-universal";
import Loading from "../../../../components/Loading/Loading";

export default function ShowCv() {
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
        console.log("res from back : " , data.cv);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
        seterror(error.message);
      });
  }, []);
  return (
    <div>
      {loading && <Loading />}
       {error && <p className="error-message" style={{width:"50%"}}>{error}</p>}
      <h3 className="CVAndWorkExperince">CV & Work Experince</h3>
      <div className="ExperinceTitle">{data.cv?.experience_title}</div>
      <div className="CurrentPastEduSpecilize">
        <div className="CurrentPast">
          <h4>Current Company</h4>
          <h4>Past Companies</h4>
        </div>
        <div className="dataofCurrentPast">
          <h5>{data.cv?.current_company}</h5>
          <h5 style={{ marginRight: "80px" }}>{data.cv?.past_companies}</h5>
        </div>
        <div className="EduSpecilize">
          <h4>Education level</h4>
          <h4 style={{ marginRight: "18px" }}>Specialization</h4>
        </div>
        <div className="dataofEduSpecilize">
          <h5>{data.cv?.education_level}</h5>
          <h5 style={{marginRight:"35px" }}>{data.cv?.specialization}</h5>
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
        <button className="viewCVButton">Show CV</button>
      </div>
    </div>
  );
}
