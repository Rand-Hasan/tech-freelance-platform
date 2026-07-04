import { useRef, useState, useEffect } from "react";
import "../styles/forgetPassword.css";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../../services/Api/api";
import {
  ResetPassword,
  VerfiyResetPassword,
  ResendOtp,
} from "../Services/api_auth";
import Loading from "../../../components/Loading/Loading";

export default function ForgetPassword() {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const email = Cookies.get("reset_email");
  const [data, setdata] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  function handleChanges(event) {
    setdata({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  //=========================================
  // الن علاقة بالواجهة فقط تبع الفيريفاي
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  function HandleResendCode() {
    setLoading(true);
    if (timeLeft > 0) return;
    axios
      .post(baseURL + ResendOtp, {
        email: email,
      })
      .then(() => {
        setTimeLeft(300);
        console.log("resend successfully ! ");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Resend OTP Error:", err.response?.data);
        const errorMsg =
          err.response?.data?.message ||
          "Error resending code. Please try again.";
        alert(errorMsg);
        setLoading(false);
      });
  }

  // الو علاقة بالبوكسز
  const handleChange = (element, index) => {
    if (!/^\d?$/.test(element.value)) return false;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //================================================
  function HandleResetPassword() {
    setLoading(true);
    const OTP = code.join("");

    if (OTP.length < 6) {
      setLoading(false);
      return setError({ otp: "enter the 6 digits please" });
    }

    setError({});

    axios
      .post(baseURL + VerfiyResetPassword, { email, otp: OTP })
      .then(() => {
        console.log("trueeeeeeeee verifying");
        return axios.post(baseURL + ResetPassword, { email, ...data });
      })
      .then(() => {
        console.log("trueeeeeeeeee resetting ! ");
        setError({});
        Cookies.remove("reset_email");
        setLoading(false);
      })

      .catch((err) => {
        const backendData = err.response?.data;
        console.log("Error from Backend:", backendData);
        setLoading(false);
        if (!backendData) {
          return setError({ new_password: "Connection error with server." });
        }

        if (Array.isArray(backendData.errors)) {
          return setError(
            backendData.errors.reduce(
              (acc, e) => ({
                ...acc,
                [e.path || e.param || e.field]: e.msg || e.message,
              }),
              {},
            ),
          );
        }
        if (backendData.message) {
          const isOtp = /otp|code/.test(backendData.message.toLowerCase());
          return setError(
            isOtp
              ? { otp: backendData.message }
              : { new_password: backendData.message },
          );
        }
        setError(backendData.errors || backendData);
      });
  }
  //===================================================
  return (
    <div className="FatherDiv">
      {loading && <Loading />}
      <div className="LikeNavBar">
        <h3 className="TileOnNav">CodeLance</h3>
        <h3 className="BackToHomeNav">
          <a className="BackToHomeNavA" href="/SignIn">
            ⬅ Back to sign in
          </a>
        </h3>
      </div>

      <div className="Content">
        <h1 className="ResetTitle">Reset your password</h1>
        <p className="ResetSubtitle">
          Follow the steps to recover your account
        </p>

        <div className="StepperWrapper">
          {/*   الإيميل */}
          <div className="StepItem">
            <div className="StepCircle Completed">✓</div>
            <span className="StepLabel CompletedText">Email</span>
          </div>

          <div className="StepLine ActiveLine"></div>

          <div className="StepItem">
            <div className="StepCircle Active">2</div>
            <span className="StepLabel ActiveText">Verify</span>
          </div>

          <div className="StepLine PendingLine"></div>

          <div className="StepItem">
            <div className="StepCircle Pending">3</div>
            <span className="StepLabel PendingText">New Password</span>
          </div>
        </div>

        <div className="contentOfVerefecation">
          <div style={{ display: "flex", gap: "200px" }}>
            <label className="VerificationLabel">Verification Code</label>
            <label
              style={{
                color: timeLeft > 0 ? "#a0a0a0" : "#5caea0",
                cursor: timeLeft > 0 ? "not-allowed" : "pointer",
              }}
              onClick={HandleResendCode}
            >
              {timeLeft > 0
                ? `resend code (${formatTime(timeLeft)})`
                : "resend code"}
            </label>
          </div>
          {error.otp && <p className="error-message">{error.otp}</p>}
          <div className="CodeContainer">
            {code.map((data, index) => (
              <input
                className="CodeSquare"
                type="text"
                name="code"
                maxLength="1"
                key={index}
                value={data}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
        </div>
        <div className="InputGroup">
          <label>New password</label>

          <div className="InputWrapper">
            <span className="InputIcon">🔒</span>
            {error.new_password && (
              <p className="error-message">{error.new_password}</p>
            )}
            <input
              type="password"
              name="new_password"
              placeholder="At least 8 characters"
              value={data.new_password}
              onChange={handleChanges}
            />
          </div>
        </div>

        <div className="InputGroup">
          <label>Confirm new password</label>

          <div className="InputWrapper">
            <span className="InputIcon">🔒</span>
            {error.new_password_confirmation && (
              <p className="error-message">{error.new_password_confirmation}</p>
            )}
            <input
              type="password"
              name="new_password_confirmation"
              placeholder="Re-enter password"
              value={data.new_password_confirmation}
              onChange={handleChanges}
            />
          </div>
        </div>

        <button onClick={HandleResetPassword} className="SaveButton">
          Save New Password →
        </button>
      </div>
    </div>
  );
}
