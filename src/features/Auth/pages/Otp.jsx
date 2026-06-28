import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { useNavigate } from "react-router-dom";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import "../styles/Otp.css";
import { baseURL } from "../../../services/Api/api";
import { VerfiyEmail } from "../../../features/Auth/Services/api_auth";
import Loading from "../../../components/Loading/Loading";
import { useEffect } from "react";
function Otp() {
  const [otp, setOtp] = useState({ otp: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const cookies = Cookies();

 
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    let newOtp = otp.otp.split("");
    newOtp[index] = value;

    const finalOtp = newOtp.join("");

    setOtp({ otp: finalOtp });


    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
useEffect(() => {
  if (timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp.otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

 
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    setOtp({ otp: paste });

    paste.split("").forEach((num, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = num;
      }
    });

    inputsRef.current[5]?.focus();
    e.preventDefault();
  };

  async function handleVerify() {
    const code = otp.otp;

    if (code.length < 6) {
      setError("Please enter full 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = cookies.get("token");

      const res = await axios.post(
        baseURL + VerfiyEmail,
        { otp: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

   
  if (res.status === 200) {
  const role = cookies.get("role");
console.log(res.data);
console.log(res.status);
  if (role === "client") {
    navigate('/SignIn')
    // navigate("clientlayout");
  } else {
    navigate("/questions");
  }
}
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Server Error"
      );
      
    }
  }
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
  return (
    <>
      {loading && <Loading />}

      <nav className="navbar">
        <div className="logo">ProLink</div>
       <div className="back-link" onClick={() => navigate("/CreateAccount")}>
  ← Back
</div>
      </nav>

      <div className="verify-container">
        <div className="verify-card">
          <div className="email-icon">
            <MarkEmailReadOutlinedIcon />
          </div>

          <h1>Check your email</h1>

          <p className="verify-text">
            We sent a 6-digit code
          </p>
<p className="email-address">
            ahmad@example.com
          </p>
          <div className="otp-boxes" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={otp.otp[i] || ""}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>
  <span>{formatTime(timeLeft)}</span>

          <a href="#" className="resend">
            Resend code
          </a>
          {error && <p className="error-message">{error}</p>}

          <button className="verify-btn" onClick={handleVerify}>
            Verify Email →
          </button>
        </div>
      </div>
    </>
  );
}

export default Otp;