import { useState, useEffect } from "react";
import "../styles/ShowProfile.css";
import ShowCv from "../../CV/pages/ShowCv";
import ShowPortfolio from "../../Portifolio/Pages/ShowPortfolio";
import PersonalInfo from "./PersonalInfo";
import ShowSkills from "../../Skills/pages/ShowSkills";
import Showportofoliodetails from "../../Portifolio/Pages/Showportofoliodetails";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from "cookie-universal";
export default function ShowProfile() {
  const cookies = Cookies();
  const freelancer_email = cookies.get("freelancer_email");

  const [profileHeader, setProfileHeader] = useState({
    FullName: localStorage.getItem("FullName") || "",
    location: localStorage.getItem("location") || "",
    evaluation: localStorage.getItem("evaluation") || "",
    photo: localStorage.getItem("photo") || "",
  });

  useEffect(() => {
    const updateHeader = () => {
      setProfileHeader({
        FullName: localStorage.getItem("FullName") || "",
        location: localStorage.getItem("location") || "",
        evaluation: localStorage.getItem("evaluation") || "",
        photo: localStorage.getItem("photo") || "",
      });
    };
    window.addEventListener("storage_updated", updateHeader);
    return () => window.removeEventListener("storage_updated", updateHeader);
  }, []);

  return (
    <div>
      <div className="hero"></div>

      <div className="container-profile">
        <div className="profile-header">
          <div className="avatar-row">
            <div className="avatar-profile">
              <img
                className="ProfileImage"
                src={profileHeader.photo}
                // alt="img"
                onError={(e) => {
                  e.target.onError = null;
                }}
              ></img>
            </div>

            <div className="profile-info-text">
              <h2 className="profile-name">{profileHeader.FullName||"no name found"}</h2>
              {/* <p className='profile-title'>Advisor and Consultant at Stripe Inc.</p> */}
              <div className="profile-meta-row">
                <span>📍{profileHeader.location || "no location found"}</span>
                <span>✉️ {freelancer_email}</span>
                <span>
                  ⭐ {profileHeader.evaluation || "no evaluation found"}
                </span>
              </div>
            </div>

            {/* <div className='profile-actions-btns'>
      <button className='btn-outline'>Message</button>
      <button className='btn-solid'>Edit Profile</button>
    </div> */}
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
