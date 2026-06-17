import { useRef, useState } from "react";
import "../styles/forgetPassword.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function ForgetPassword() {
  const [error, setError] = useState({});
   const [data, setdata] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  function HanleNewPassword(event) {
    setdata({ ...data, new_password: event.target.value });
  }
  function Hanlenew_password_confirmation(event) {
    setdata({ ...data, new_password_confirmation: event.target.value });
  }
//=========================================
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value !== "" && index < 6) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

//================================================

//================================================
  function HandleResetPassword() {
    const email = Cookies.get("reset_email");

    const bodyData = {
      email: email,
      new_password: data.new_password,
      new_password_confirmation: data.new_password_confirmation,
    };

    axios
      .post("http://localhost:4000/ResetPassword", bodyData)
      .then((res) => {
        console.log("trueeeeeee");
        console.log(res.data);
        alert("done");
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
              {},
            ),
          );
        }
      });
  }

// function HandleResetPassword() {
   
//     const email = Cookies.get("reset_email");
//     const verificationCode = code.join(""); 
   
//     if (verificationCode.length < 6) {
//      alert("verfy is less than 6 digit ");
//       return;
//     }

   
//     axios.post("http://localhost:4000/VerfiyEmail", {
//         email: email,
//         otp: verificationCode
//       })
//       .then((verifyRes) => {
      
//         console.log("done", verifyRes.data);

//         const resetBodyData = {
//           new_password: data.new_password,
//           new_password_confirmation: data.new_password_confirmation,
//         };

//         return axios.post("http://localhost:4000/ResetPassword", resetBodyData);
//       })
//       .then((resetRes) => {
//         console.log(resetRes.data);
//        alert("reset done ");
        
//         setError({});
//         Cookies.remove("reset_email"); 
        
       
//       })
//       .catch((err) => {
//         console.log("Errrorrrrr", err.response?.data);
        
//         const errors = err.response?.data?.errors;
        
//         if (Array.isArray(errors)) {
//           setError(
//             errors.reduce(
//               (acc, e) => ({
//                 ...acc,
//                 [e.path || e.param || e.field]: e.msg || e.message,
//               }),
//               {}
//             )
//           );
//         } else {
//           alert(err.response?.data?.message);
//         }
//       });
//   }
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

        {/* <div className="InputGroup">
          <label>Email address</label>

          <div className="InputWrapper">
            <span className="InputIcon">✉</span>
            <input type="email" placeholder="you@example.com" />
          </div>
        </div> */}

        <div className="contentOfVerefecation">
          <label className="VerificationLabel">Verification Code</label>
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
              placeholder="At least 8 characters"
              value={data.new_password}
              onChange={HanleNewPassword}
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
              placeholder="Re-enter password"
              value={data.new_password_confirmation}
              onChange={Hanlenew_password_confirmation}
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
