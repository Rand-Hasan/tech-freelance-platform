import "../styles/PersonalInfo.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import { baseURL } from "../../../../services/Api/api";
import { Showprofile } from "../../../FreeLancer/Profile/services/freelancerprfileapi";
import Cookies from "cookie-universal";
export default function PersonalInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const cookies = Cookies();
  const token = cookies.get("token-freelancer");
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

        if (data.user_profile) {
          localStorage.setItem("location", data.user_profile.location || "");
          const fullName = `${data.user_profile.first_name || ""} ${data.user_profile.last_name || ""}`;
          localStorage.setItem("FullName", fullName);
          localStorage.setItem(
            "evaluation",
            data.user_profile.evaluation || "",
          );
          localStorage.setItem("photo", data.user_profile.photo || "");
          window.dispatchEvent(new Event("storage_updated"));
        } else {
          localStorage.removeItem("location");
          localStorage.removeItem("FullName");
          localStorage.removeItem("evaluation");
          localStorage.removeItem("photo");
        }
      })
      .catch((error) => {
        seterror(error.message);
        setLoading(false);
      });
  }, []);

  function HandleEditButton(){
    navigate("/createprofile",{
      state:{
        isEdit:true,
        profiledata:data.user_profile
      }
    })
  }
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
      <div className="personalInfoAndEditButton">
        <h3>PERSONAL INFORMATION</h3>
        <button onClick={HandleEditButton} className="EditButton">Edit</button>
      </div>

      <div className="divThatContain2div">
        <div className="FullNameAndLocationDiv">
          <h2>Full Name</h2>
          <h5>
            {data.user_profile?.first_name||"no name found"} {data.user_profile?.last_name}
          </h5>
          <h2>Location</h2>
          <h5>{data.user_profile?.location||"no location found"}</h5>
        </div>
        <div className="phoneNumberAndBirthdayDiv">
          <h2>Phone Number</h2>
          <h5>{data.user_profile?.phone||"no phone number found"}</h5>
          <h2>birthday</h2>
          <h5>{data.user_profile?.birthday||"no birthday found"}</h5>
        </div>
      </div>
    </div>
  );
}
