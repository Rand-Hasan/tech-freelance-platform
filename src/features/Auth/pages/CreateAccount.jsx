import "../styles/CreateAccount.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../services/Api/api";
import { FreelancerRegister, ClientRegister } from "../Services/api_auth";
import Loading from "../../../components/Loading/Loading";
function CreateAccount() {
  const [role, setRole] = useState("freelancer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = Cookies();
  const [data, setData] = useState({
    user_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  function handleChange(e) {
    setError("");

    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  async function handleSubmit() {
    setLoading(true);

    try {
      const endpoint =
        role === "freelancer"
          ? FreelancerRegister
          : ClientRegister;

      const res = await axios.post(baseURL + endpoint, data);

      console.log("SUCCESS RESPONSE:", res.data);
      
cookies.set("email", data.email, {
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});



      if (role === "freelancer") {
  cookies.set("token-freelancer", res.data.token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
} else {
  cookies.set("token-client", res.data.token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}



      cookies.set("role", role, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      setError("");

      setLoading(false);
      navigate("/Otp");

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message?.[0]?.message ||
        err.response?.data?.message ||
        "Server Error";

      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className="create-account-content">
      {loading && <Loading />}
      <nav className="navbar">
        <div className="logo">ProLink</div>
      </nav>



      <div className="container">
        <div className="left-section">
          <div className="badge">✓ Verified Tech Platform</div>

          <h1>
            Join the verified tech
            <br />
            freelancer community
          </h1>

          <p>
            Create your account and start your journey with
            <br />
            the most trusted tech freelancing platform
          </p>

          <ul>
            <li>Technical assessment to verify your skills</li>
            <li>GitHub integration to showcase your work</li>
            <li>Secure contracts and digital wallet</li>
            <li>Automated, fair ratings based on performance</li>
          </ul>
        </div>

        <div className="right-section">

          <div className="form-wrapper">
            <h2>Create </h2>
            <h2> an account</h2>

            <p className="subtitle">
              Choose your account type to get started
            </p>

            <div className="account-types">

              <button
                type="button"
                className={role === "freelancer" ? "account-card active" : "account-card"}
                onClick={() => setRole("freelancer")}
              >
                <span className="icon">👨‍💻</span>
                <h4>Freelancer</h4>
                <p>Offer your skills and find projects</p>
              </button>

              <button
                type="button"
                className={role === "client" ? "account-card active" : "account-card"}
                onClick={() => setRole("client")}
              >
                <span className="icon">🏢</span>
                <h4>Client</h4>
                <p>Hire top tech talent</p>
              </button>

            </div>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <label>Username</label>
            <input type="text"
              name="user_name"
              value={data.user_name}
              onChange={handleChange}
              placeholder="e.g ahmad-dev" />

            <label>Email Address</label>
            <input type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com" />

            <label>Password</label>
            <input type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="At least 8 characters" />

            <label>Confirm Password</label>
            <input type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={handleChange}
              placeholder="Re-enter your password" />

            <button className="create-btn" onClick={handleSubmit}>
              Create Account
            </button>
            <p className="signin"> Already have an account?
          <a href="#" onClick={() => navigate('/signin')}>
  Sign In
</a>
</p>
          </div>
        </div>

      </div>
    </div>

  );
}

export default CreateAccount;