import "../styles/Profile.css";
import { useEffect, useState } from "react";
import Cookies from "cookie-universal";
import { ShowProfile } from "../services/MyProfileApi";
import { baseURL } from "../../../../services/Api/api";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
export default function Profile() {
 
  const [PersonalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();
  const unKnownImageURL = new URL(
    "../../../../assets/UnknownPerson.png",
    import.meta.url,
  ).href;
   
  useEffect(() => {
  
   
    fetch(baseURL + ShowProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data from Backend:", data);
        setLoading(false);
        // يعني اذا ماكان في داتا من الاساس راجعة ف كريت بروفايل اول شي
        if (!data.user_profile) {
          setPersonalData({
            isError: true,
            text: data.message || "Create Profile First Please ! ",
          });
        } else {
          setPersonalData(data.user_profile);
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
        // هون معناها في خطأ ضرب ايرور من السيرفر
        setPersonalData({ isError: true, text: "Error Connection ! " });
      });
  }, []);


   const client_email=cookies.get('client_email');

  return (
    <div className="MyProfile">
      {loading && <Loading />}
      <div className="NameAndPhoto">
        <div className="JustPhotoAndName">
          <div className="PhotoDiv">
            <img
              className="Image"
              src={PersonalData?.photo ? PersonalData?.photo : unKnownImageURL}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = unKnownImageURL;
              }}
            />
          </div>
          <div className="NameDiv">
            <h2 className="NameHTag">
              Name : {PersonalData?.first_name} {PersonalData?.last_name}
            </h2>
            <h6 className="NameHTag">Location :  {PersonalData?.location}</h6>
          </div>
        </div>
        <div className="NumbersDiv">
          <div className="ProjectPosted">
            <h1>24</h1>
            <h6> project posteed</h6>
          </div>
          <div className="projectCompleted">
            <h1>13</h1>
            <h6>Completed</h6>
          </div>

          <div className="avgGivin">
            <h1>4.8</h1>
            <h6> AVG.Givin</h6>
          </div>
        </div>

       

     <NavLink to="/clientlayout/setting">
  <button className="EditProfileButton">
    Edit Profile
  </button>
</NavLink>

      </div>

      <div className="ContentUnderNameAndPhotoDiv">
        <div className="LeftDivs">
          <div className="PersonalInfo">
            <h3 className="PersonalInfoTitle">Personal Information</h3>

            <div className="PersonalInfoGrid">
              <div className="InfoFieldGroup">
                <label>Full Name</label>
                <div className="InfoFieldValue">
                  {PersonalData?.first_name} {PersonalData?.last_name}
                </div>
              </div>

              <div className="InfoFieldGroup">
                <label>Email</label>
                
                <div className="InfoFieldValue">{client_email}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Phone number</label>
                <div className="InfoFieldValue">{PersonalData?.phone}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Date of birth</label>
                <div className="InfoFieldValue">{PersonalData?.birthday}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Country</label>
                <div className="InfoFieldValue">{PersonalData?.location}</div>
              </div>

            </div>
          </div>
         
         
        </div>

       
      </div>
    </div>
  );
}
