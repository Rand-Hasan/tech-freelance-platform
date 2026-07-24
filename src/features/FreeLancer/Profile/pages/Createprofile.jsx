import "../../Profile/styles/CreateProfile.css";
import { useState,useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import axios from "axios";
import Cookies from "cookie-universal";
import Loading from "../../../../components/Loading/Loading";
import { CreateProfile,UpdateProfile} from "../../../FreeLancer/Profile/services/freelancerprfileapi";
import { baseURL } from "../../../../services/Api/api";
import { useNavigate,useLocation } from "react-router-dom";

export default function CreateProfilee() {
  
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    birthday: "",
    location: "",
    photo: null,
  });
  /////////////////////for update//////////////////////////////////
  const location = useLocation();
  const isEdit=location.state?.isEdit ||false;
  const profiledata=location.state?.profiledata||null;
   useEffect(() => {
      if (isEdit && profiledata) {
        setData({
          first_name: profiledata?.first_name || "",
          last_name:profiledata?.last_name||"",
          phone:profiledata?.phone||"",
          birthday:profiledata?.birthday||"",
          location:profiledata?.location||"",
        });
      }
    }, [isEdit, profiledata]);

  ///////////////////for update/////////////////////////////
  const currentStep = 4;
  const totalSteps = 4;


  const [preview, setPreview] = useState("");
const cookies = Cookies();
const navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];

    if (file) {
      setData({
        ...data,
        photo: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  }

async function handleSubmit() {
  try {
    setLoading(true);
    setError("");

    const token = cookies.get("token-freelancer");

    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("birthday", data.birthday);
    formData.append("location", data.location);

    if (data.photo) {
      formData.append("photo", data.photo);
    }
console.log("TOKEN:", token);


// for (let pair of formData.entries()) {
//   console.log(pair[0], pair[1]);
// }
const ApiEndPoint=isEdit?(baseURL+UpdateProfile):(baseURL+CreateProfile);
    const response = await axios.post(
     ApiEndPoint,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

   if(isEdit){
    navigate("/FreeLancerLayout/ShowProfile/personal")
   }
   else{
    navigate("/FreeLancerLayout/ShowProfile")
   }
  } catch (err) {
    console.log("FULL ERROR:", err.response?.data);


    let msg =
  err.response?.data?.errors?.[0]?.message ||
  err.response?.data?.message?.[0]?.message ||
  err.response?.data?.message ||
  "Server Error";
       if (msg === "faild to create profile") {
    msg = "You already have a profile";
  }

    setError(msg);
  } finally {
    setLoading(false);
    
  }
}

  return (
    
    <div className="create-profile-page">
         {loading && <Loading />}
      <div className="create-profile-card">

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
            />
          </div>

          <span className="section-name">
            Almost done! 🎉
          </span>
        </div>

        <h1 className="profile-title">
          Create your Profile
        </h1>

        <p className="profile-subtitle">
          Add a personal photo and complete your profile
          details so clients can find and trust you.
        </p>

        {/* Upload Photo */}
        <div className="photo-section">

         <div className="photo-preview">
  {preview ? (
    <img src={preview} alt="profile" />
  ) : (
    <BsPersonFill className="default-avatar-icon" />
  )}
</div>

          <div className="photo-info">
            <h4>Upload a profile photo</h4>

            <p>
              JPG or PNG — min 200×200px, max 5MB
            </p>

            <label className="upload-btn">
              Upload Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </label>
          </div>

        </div>
{error && (
  <div className="error-message">
    {error}
  </div>
)}
       

          <div className="row">

            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
               
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
            
              />
            </div>

          </div>

          <div className="row">

            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="birthday"
                value={data.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="Riyadh"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+966 5X XXX XXXX"
            />
          </div>
<button
  className="create-profile-btn"
  onClick={handleSubmit}
>
  {isEdit?"Save Changes":"Create Profile"}
</button>
       
      </div>
    </div>
  );
}