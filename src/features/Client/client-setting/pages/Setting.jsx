import "../../client-setting/styles/Settings.css";
import "../../client-setting/styles/Settings.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import Loading from "../../../../components/Loading/Loading";
import {   ShowProfile, UpdateProfile, DeleteProfile,CreateProfile} from "../../client-profile/services/MyProfileApi";
import { baseURL } from "../../../../services/Api/api";
import { useNavigate } from "react-router-dom";
 
function Settings() {
  const cookies = Cookies();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const [data, setData] = useState({
  first_name: "",
  last_name: "",
  phone: "",
  birthday: "",
  location: "",
   photo: null,
});

const [photoPreview, setPhotoPreview] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);
useEffect(() => {
  const getProfile = async () => {
    try {
      setLoading(true);

      const token = cookies.get("token");

      const res = await axios.get(baseURL + ShowProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = res.data.user_profile;

      if (!profile) return;

      setIsEditMode(true);

      setData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        birthday: profile.birthday || "",
        location: profile.location || "",
         photo: null,
      });

      setPhotoPreview(profile.photo || "");
       console.log(res.data);
    } catch (err) {
  console.log(err.response?.data);
}finally {
      setLoading(false);
    }
  };

  getProfile();
}, []);
function handleChange(e) {
 setData((prev) => ({
  ...prev,
  [e.target.name]: e.target.value,
}));
}

function handlePhotoChange(e) {
  const file = e.target.files[0];

  if (!file) return;

  setData({
    ...data,
    photo: file,
  });

  setPhotoPreview(URL.createObjectURL(file));
}

// async function handleSave() {
//   try {
//     setLoading(true);

//     const token = cookies.get("token");

//     // =========================
//     // 1. SEND TEXT DATA (encoded)
//     // =========================
//     const body = new URLSearchParams();

//     body.append("first_name", data.first_name);
//     body.append("last_name", data.last_name);
//     body.append("phone", data.phone);
//     body.append("birthday", data.birthday);
//     body.append("location", data.location);

//     const url = isEditMode
//       ? baseURL + UpdateProfile
//       : baseURL + CreateProfile;

//     const dataRes = await axios.post(url, body, {
//       headers: {
//         Authorization: `Bearer ${token}`,
   
//       },
//     });

//     console.log("TEXT RESPONSE:", dataRes.data);

//     // =========================
//     // 2. SEND PHOTO (FormData)
//     // =========================
//     if (data.photo) {
//       const formData = new FormData();
//       formData.append("photo", data.photo);

//       const photoRes = await axios.post(url, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
         
//         },
//       });

//       console.log("PHOTO RESPONSE:", photoRes.data);
//     }

//     // =========================
//     // SUCCESS
//     // =========================
//     setSuccess(dataRes.data.message || "Profile saved successfully!");
//     setError("");

//     setTimeout(() => {
//       navigate("/profile");
//     }, 1500);

//   } catch (err) {
//     console.log("FULL ERROR:", err.response?.data);

//     const msg =
//       err.response?.data?.errors?.[0]?.message ||
//       err.response?.data?.message ||
//       "Server Error";

//     setError(msg);
//     setSuccess("");
//   } finally {
//     setLoading(false);
//   }
// }

/////////////////////delete///////////////

async function handleSave() {
  try {
    setLoading(true);

    const token = cookies.get("token");

    // const formData = new FormData();
     const formData = new URLSearchParams();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("birthday", data.birthday);
    formData.append("location", data.location);

    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const url = isEditMode
      ? baseURL + UpdateProfile
      : baseURL + CreateProfile;

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    setSuccess(response.data.message || "Profile saved successfully!");
    setError("");

    setTimeout(() => {
      navigate("/clientlayout/profile");
    }, 1500);

  } catch (err) {
    console.log("FULL ERROR:", err.response?.data);

    const msg =
      err.response?.data?.errors?.[0]?.message ||
      err.response?.data?.message ||
      "Server Error";

    setError(msg);
    setSuccess("");
  } finally {
    setLoading(false);
  }
}


async function handleDeleteProfile() {

  try {
    setLoading(true);

    const token = cookies.get("token");

  const res = await axios.post(
      baseURL + DeleteProfile,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log(res.data.message)
    
    navigate("/Profile");
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
  return (
    
    <div className="settings-page">
      {loading && <Loading />}
   
    <div className="settings-container">

      {/* Left Section */}
      <div className="profile-info-card">
        <h2 className="section-title">Profile Information</h2>

        <div className="profile-photo-section">
        <div className="avatar">
  {photoPreview && (
    <img
      src={photoPreview}
      alt="profile"
    />
  )}
</div>

          <div>
          <label className="upload-btn">
  Upload new photo
  <input
    hidden
    type="file"
    accept="image/*"
    onChange={handlePhotoChange}
  />
</label>
            <p className="photo-note">JPG or PNG, max 2MB</p>
          </div>
        </div>
   {success && (
  <div className="success-message">
    ✓ {success}
  </div>
)}

{error && (
  <div className="error-message">
    {error}
  </div>
)}
        <div className="form-grid">
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
<div className="form-group"> <label>Email address</label> 
<input type="email" defaultValue="khalid@techsolutions.com" /> </div>
<div className="form-group">
  <label>Phone Number</label>
  <input
    type="text"
    name="phone"
    value={data.phone}
    onChange={handleChange}
  />
  <small>Minimum 9 digits</small>
</div>

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
  />
</div>
          <div className="form-group">
            <label>Country</label>
             <input
              type="text"
              defaultValue="Saudi Arabia"
            />
          </div>

          <div className="form-group">
            <label>Company name</label>
            <input
              type="text"
              defaultValue="Tech Solutions Co."
            />
          </div>
        </div>

       <button className="save-btn" onClick={handleSave}>
  Save Changes
</button>
      </div>

      {/* Right Section */}
      <div className="right-section">

        <div className="notifications-card">
          <h2>Notifications</h2>

          <div className="notification-item">
            <span>New proposals</span>
           <label className="switch">
  <input type="checkbox" defaultChecked />
  <span className="slider"></span>
</label>
          </div>

          <div className="notification-item">
            <span>Messages</span>
          <label className="switch">
  <input type="checkbox" defaultChecked />
  <span className="slider"></span>
</label>
          </div>

          <div className="notification-item">
            <span>Task & milestone updates</span>
         <label className="switch">
  <input type="checkbox" defaultChecked />
  <span className="slider"></span>
</label>
          </div>

          <div className="notification-item">
            <span>Payment confirmations</span>
        <label className="switch">
  <input type="checkbox" defaultChecked />
  <span className="slider"></span>
</label>
          </div>

          <div className="notification-item">
            <span>Marketing emails</span>
           <label className="switch">
  <input type="checkbox" defaultChecked />
  <span className="slider"></span>
</label>
          </div>
        </div>

        <div className="payment-card">
          <h2>Payment Methods</h2>

          <div className="payment-method">
            <div className="payment-left">
              <div className="card-icon">💳</div>

              <div>
                <h4>Visa •••• 4242</h4>
                <p>Connected via Stripe · Expires 08/27</p>
              </div>
            </div>

            <span className="default-badge">
              Default
            </span>
          </div>

          <button className="add-card-btn">
            + Add Payment Method
          </button>
        </div>

      </div>
      </div>
       {/* settings-container */}
        {/* Row 2 */}
          <div className="settings-container second-row">
    <div className="security-card">
      <h2>Security</h2>

      <div className="form-group full-width">
        <label>Current password</label>
        <input type="password" placeholder="••••••••" />
      </div>

      <div className="security-grid">
        <div className="form-group">
          <label>New password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
          />
        </div>

        <div className="form-group">
          <label>Confirm new password</label>
          <input
            type="password"
            placeholder="Re-enter password"
          />
        </div>
      </div>

      <button className="update-password-btn">
        Update Password
      </button>

      <hr />

      <div className="google-account">
        <div>
          <h4>Google Account</h4>
          <p>
            Connected — sign in with Google enabled
          </p>
        </div>

        <span className="connected-badge">
          ✓ Connected
        </span>
      </div>
    </div>

    <div className="language-card">
      <h2>Language & Region</h2>

      <div className="form-group">
        <label>Interface language</label>
        <select>
          <option>English</option>
           <option>العربية</option>
        </select>
      </div>

      <div className="form-group">
        <label>Currency</label>
        <select>
          <option>USD ($)</option>
             <option>SAR (ريال)</option>
                <option>EUR ( €)</option>
        </select>
      </div>
    </div>

    {/* Row 3 */}
    <div className="danger-card">
      <h2>Danger Zone</h2>

      <div className="danger-row">
        <div>
          <h4>Delete Profile</h4>
          <p>
           Remove your profile and all data
          </p>
        </div>

     <button
  className="deactivate-btn"
  onClick={() => setShowDeleteModal(true)}
>
  Delete Profile
</button>
      </div>

      <div className="danger-row">
        <div>
          <h4>Delete account</h4>
          <p>
            Permanently remove your account and all
            data
          </p>
        </div>

        <button className="delete-btn">
          Delete account
        </button>
      </div>
    </div>
</div>
{showDeleteModal && (
  <div className="modal-overlay">
    <div className="delete-modal">
      <h3>Delete Profile</h3>

      <p>
        Are you sure you want to delete your profile?
      </p>

      <div className="modal-actions">
        <button
          className="cancel-btnn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={handleDeleteProfile}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    
  );
}

export default Settings;