import { ShowFreelancerFiltered, FilterFreelancer } from "../services/getFreelancersApi.jsx";
import FindFreeLancerCard from "../components/FindFreeLancerCard";
import { baseURL } from "../../../../services/Api/api";
import "../styles/MatchedFreelancers.css";
import { useEffect, useState } from "react";
import Cookies from "cookie-universal";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MatchedFreelancers() {
  const cookies = Cookies();
  const { id: projectId } = useParams();
  const token = cookies.get("token-client");
  const [freelancers, setfreelancers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  
  // 1. أضفنا State جديدة لتخزين رسالة الخطأ
  const [errorMessage, setErrorMessage] = useState("");

  const COOLDOWN_MS = 30 * 60 * 1000;
  const COOLDOWN_KEY = "lastFilterTime";

  const getRemainingMs = () => {
    const lastTime = Number(localStorage.getItem(COOLDOWN_KEY));
    if (!lastTime) return 0;
    return COOLDOWN_MS - (Date.now() - lastTime);
  };

  const [canFilter, setCanFilter] = useState(() => getRemainingMs() <= 0);
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    Math.max(0, Math.ceil(getRemainingMs() / 1000))
  );

  const HandleFiltering = (level) => {
    const remainMs = getRemainingMs();

    if (remainMs > 0) {
      const minutes = Math.ceil(remainMs / 60000);
      setErrorMessage(
        `You can filter only once every 30 minutes. Please wait ${minutes} minute(s).`
      );
      return;
    }

    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    setCanFilter(false);
    setSelectedLevel(level);
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ عند كل محاولة جديدة

    axios.post(`${baseURL}${FilterFreelancer}/${projectId}`, {
      project_level: level
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((error) => {
      const responseData = error.response?.data;

      if (responseData) {
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const errorMessages = responseData.errors.map(err => err.message).join(" | ");
          setErrorMessage(errorMessages);
        } 
        else if (responseData.message) {
          setErrorMessage(responseData.message);
        }
      } else {
        setErrorMessage("Server Error ! ");
      }
    });
  };

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
        console.log(data.freelancer);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [projectId, token]);

  useEffect(() => {
    if (canFilter) return;

    const tick = () => {
      const remainMs = getRemainingMs();

      if (remainMs <= 0) {
        setCanFilter(true);
        setRemainingSeconds(0);
      } else {
        setRemainingSeconds(Math.ceil(remainMs / 1000));
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canFilter]);

  return (
    <div>
      <div className="SubTitleAbovCardContainer">
        <h2>Matched Freelancers</h2>
        <div className="level-filter-buttons">
          <button
            className={`filter-btn ${
              selectedLevel === "expert" ? "active" : ""
            }`}
            onClick={() => HandleFiltering("expert")}
            disabled={!canFilter}
          >
            Expert
          </button>
          <button
            className={`filter-btn ${
              selectedLevel === "junior" ? "active" : ""
            }`}
            onClick={() => HandleFiltering("junior")}
            disabled={!canFilter}
          >
            Junior
          </button>
          <button
            className={`filter-btn ${
              selectedLevel === "middle" ? "active" : ""
            }`}
            onClick={() => HandleFiltering("middle")}
            disabled={!canFilter}
          >
            Mid-Level
          </button>
        </div>

        {/* 2. عرض رسالة الخطأ تحت الأزرار مباشرة إذا كانت موجودة */}
        {!canFilter && (
          <div className="error-message-text" style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            Filtering is on cooldown. Next filter available in{" "}
            {Math.floor(remainingSeconds / 60)}m {remainingSeconds % 60}s.
          </div>
        )}
        {errorMessage && (
          <div className="error-message-text" style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {errorMessage}
          </div>
        )}
      </div>

      <div className="ContainerOfFreelancerCards">
        {freelancers.length === 0 ? (
          <div
            className="NoFreelancersMessage"
            style={{ textAlign: "center", margin: "20px" }}
          >
            <h3>There are no Matched Freelancers</h3>
          </div>
        ) : (
          freelancers.map((item) => (
            <FindFreeLancerCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}