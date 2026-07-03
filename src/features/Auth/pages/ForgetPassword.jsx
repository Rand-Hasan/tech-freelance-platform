import { useRef, useState, useEffect } from "react";
import "../styles/forgetPassword.css";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../../services/Api/api";
import {ResetPassword,VerfiyResetPassword } from "../Services/api_auth";


export default function ForgetPassword() {
  const [error, setError] = useState({});
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

  // ===== Resend OTP timer (نفس منطق صفحة الـ Otp) =====
  const [timeLeft, setTimeLeft] = useState(300); // 5 دقايق

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
    if (timeLeft > 0) return; // ممنوع الريسيند قبل ما ينتهي الوقت

    // TODO: هون بنحط استدعاء الـ API تبع الريسيند لما تبعتيلي اسم الـ endpoint
    setTimeLeft(300); // تصفير التايمر من جديد بعد الريسيند
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

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
// هادا التابع لازم يتأكد انو رمز ال فيريفاي نفسو وحقول الكلمات 
// طيب والتابع مابياخد غير الحقول ...لهيك انا ساويت تابع الفيريفاي 
// وجواتو حطيت تابع الريسيت
   
    const email = Cookies.get("reset_email");
    const verificationCode = code.join(""); 
  
    if (verificationCode.length < 6) {
     alert("verfy is less than 6 digit ");
      return;
    }

   
    axios.post(baseURL+VerfiyResetPassword, {
        email: email,
        otp: verificationCode
      })
      .then((verifyRes) => {
      
        console.log("done", verifyRes.data);
        alert("doneverfying");
        const resetBodyData = {
          email:email,
          new_password: data.new_password,
          new_password_confirmation: data.new_password_confirmation,
        };

        return axios.post(baseURL+ResetPassword, resetBodyData);
      })
      .then((resetRes) => {
        console.log(resetRes.data);
       alert("reset done ");
        
        setError({});
        Cookies.remove("reset_email"); 
        
       
      })
      .catch((err) => {
        console.log("Errrorrrrr", err.response?.data);
        
        const errors = err.response?.data?.errors;
        
        if (Array.isArray(errors)) {
          setError(
            errors.reduce(
              (acc, e) => ({
                ...acc,
                [e.path || e.param || e.field]: e.msg || e.message,
              }),
              {}
            )
          );
        } else {
          alert(err.response?.data?.message);
         
        }
      });
  }
  //===================================================
  return (
    <div className="FatherDiv">
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
         <div style={{display:"flex",gap:"200px",}}>
           <label className="VerificationLabel">Verification Code</label>
          <label
            style={{
              color: timeLeft > 0 ? "#a0a0a0" : "#5caea0",
              cursor: timeLeft > 0 ? "not-allowed" : "pointer",
            }}
            onClick={HandleResendCode}
          >
            {timeLeft > 0 ? `resend code (${formatTime(timeLeft)})` : "resend code"}
          </label>
         </div>
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
            {/* <div className="ResendOtp">
              <h6 style={{color:"black"}}>I don't recive OTP</h6>
              <h6  style={{color:"black"}}>Resend OTP</h6>
            </div> */}

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
