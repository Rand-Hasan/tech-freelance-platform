import { useState, useEffect } from "react";
import Loading from "../../../../components/Loading/Loading";
import "../styles/ShowProfile.css";
import ShowCv from "../../CV/pages/ShowCv";
import ShowPortfolio from "../../Portifolio/Pages/ShowPortfolio";
import PersonalInfo from "./PersonalInfo";
import ShowSkills from "../../Skills/pages/ShowSkills";
import Showportofoliodetails from "../../Portifolio/Pages/Showportofoliodetails";
import { baseURL } from "../../../../services/Api/api";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from "cookie-universal";
import { Showprofile } from "../../../FreeLancer/Profile/services/freelancerprfileapi";
export default function ShowProfile() {
  const [loading, setLoading] = useState(true);
  const cookies = Cookies();
  const token = cookies.get("token-freelancer");
  const freelancer_email=cookies.get("freelancer_email");
  const [data, setdata] = useState({});
  const [error, seterror] = useState("");
 useEffect(() => {
    fetch(baseURL + Showprofile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message || "errrrror");
        }
        return response.json();
      })
      .then((data) => {
        setdata(data);
        setLoading(false);
      })
      .catch((error) => {
        seterror(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <div>
       {loading && <Loading />}
            {error && (
              <p
                className="error-message"
                style={{ width: "50%", marginLeft: "400px" }}
              >
                {error}
              </p>
            )}
      <div className="hero"></div>

      <div className="container-profile">
        <div className="profile-header">
          <div className="avatar-row">
            <div className="avatar-profile">
              <img
                className="ProfileImage"
                src={data.user_profile?.photo}
                // alt="img"
                onError={(e) => {
                  e.target.onError = null;
                }}
              ></img>
            </div>

            <div className="profile-info-text">
              <h2 className="profile-name">{data.user_profile?.first_name||"no name found"}{data.user_profile?.last_name}</h2>
              {/* <p className='profile-title'>Advisor and Consultant at Stripe Inc.</p> */}
              <div className="profile-meta-row">
                <span>📍{data.user_profile?.location || "no location found"}</span>
                <span>✉️ {freelancer_email}</span>
                <span>
                  ⭐ {data.user_profile?.evaluation || "no evaluation found"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs-bar">
          <NavLink
            to="personal"
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? "active" : ""}`
            }
          >
            👤 Personal Info
          </NavLink>

          <NavLink
            to="skills"
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? "active" : ""}`
            }
          >
            🛠️ Technical Skills
          </NavLink>

          <NavLink
            to="portfolio"
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? "active" : ""}`
            }
          >
            🖼️ Portfolio
          </NavLink>

          <NavLink
            to="cv"
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? "active" : ""}`
            }
          >
            📄 CV & Experience
          </NavLink>
        </div>

        <div className="profile-tab-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
