import "../styles/SignIn.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../services/Api/api";
import { LogIn, ForgetPassword } from "../Services/api_auth";
export default function SignIn() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const onSuccessGoogle = (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    Cookies.set("user_token", googleToken, {
      expires: 7,
      secure: true,
    });
    const decoded = jwtDecode(credentialResponse.credential);
    const googleEmail = decoded.email;
    axios
      .post(baseURL + LogIn, {
        email: googleEmail,
        password: "majdmajdmajdmajdmajdmajd_________",
      })
      .then((res) => {
        console.log(res.data);
        navigate("/Dashboard");
      })
      .catch((err) => {
        const message = err.response?.data?.message || "";
        const lowerCaseMsg = message.toLowerCase();

        if (lowerCaseMsg.includes("password")) {
          console.log("Email in data base");

          navigate("/HomeScreen");
        } else {
          console.log("new Account on google");

          navigate("/CreateProfile");
        }
      });
  };

  const onFailureGoogle = () => {
    console.log("Errrrorrrrr");
  };

  function handleChange(event) {
    setdata({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  function handleLogIn(event) {
    event.preventDefault();
    setError({});

    const bodyData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(baseURL + LogIn, bodyData)
      .then((res) => {
        console.log("trueeeeeeeeeeee", res.data);

        alert("LogIn Successfully ! ");
       navigate("/clientlayout");
    
        
        setError({});
      //   Cookies.set("token", res.data.token, {
      //     expires: 7, 
      //   setError({});
      //     expires: 7,
      //     secure: true,
      //   }
        
      //   Cookies.set("user_token", res.data.token, {
      //   );
       })
      .catch((err) => {
        const { errors, message } = err.response?.data || {};

        if (Array.isArray(errors)) {
          setError(
            errors.reduce(
              (acc, e) => ({ ...acc, [e.path || e.field]: e.msg || e.message }),
              {},
            ),
          );
        } else if (message) {
          const isPwd = message.toLowerCase().includes("password");
          const isEmail = /email|user|found/i.test(message);

          if (isPwd || isEmail)
            setError({ [isPwd ? "password" : "email"]: message });
          else console.log(message);
        }
      });
  }
  function HandleForgetPassword() {
    setError({});
    if (!data.email) {
      setError({ email: "Please enter your email address first." });
      return;
    }
    axios
      .post(baseURL + ForgetPassword, {
        // هي مو مصادقة
        email: data.email,
      })
      .then((res) => {
        console.log(res.data);
        Cookies.set("reset_email", data.email);
        navigate("/ForgetPassword");
      })
      .catch((err) => {
        console.log(err.response?.data);
        const backendMessage =
          err.response?.data?.message || "An error occurred. Please try again.";

        setError({ email: backendMessage });
      });
  }
  return (
    <div className="FatherDiv">
      <div className="LikeNavBar">
        <h3 className="TileOnNav">CodeLance</h3>
        <h3 className="BackToHomeNav">
          <a className="BackToHomeNavA" href="#Home">
            ⬅BackToHome
          </a>
        </h3>
      </div>

      <div className="MainContent">
        <div className="greenSignInSection">
          <div className="ContentInsideGreenSection">🟢 welcome back</div>
          <h1 className="h1ContentInsideGreenSection">
            Sign in and get back to work
          </h1>
          <div>
            <h6 className="h6ContentInsideGreenSection">
              Hundred of tech projects are waiting . Sign in and
            </h6>
            <h6 className="h6ContentInsideGreenSection">
              pick up where you left off.
            </h6>
          </div>

          <div className="ThreeCheckPoint">
            <h5 className="h5ContentInsideGreenSection">
              <CheckBoxIcon
                className="CheckBoxIcon"
                style={{
                  fontSize: "15px",
                  backgroundColor: "#46A095",
                  borderRadius: "10px",
                }}
              />
              Full Featured DashBord
            </h5>
            <h5 className="h5ContentInsideGreenSection">
              <CheckBoxIcon
                className="CheckBoxIcon"
                style={{
                  fontSize: "15px",
                  backgroundColor: "#46A095",
                  borderRadius: "10px",
                }}
              />
              Real Time Project notification
            </h5>
            <h5 className="h5ContentInsideGreenSection">
              <CheckBoxIcon
                className="CheckBoxIcon"
                style={{
                  fontSize: "15px",
                  backgroundColor: "#46A095",
                  borderRadius: "10px",
                }}
              />
              time tracking & task managment
            </h5>
          </div>
        </div>

        <div className="SignInSection">
          <div className="ContentofSingInSection">
            <h1 className="FormTitle">Sign in</h1>
            <p className="FormSubtitle">
              Welcome back! Enter your details to continue.
            </p>

            <GoogleLogin
              onSuccess={onSuccessGoogle}
              onError={onFailureGoogle}
            />

            <div className="Separator">
              <span>or with email</span>
            </div>

            <form className="AuthForm">
              <div className="InputGroup">
                <label>Email address</label>
                {error.email && <p className="error-message">{error.email}</p>}
                <div className="InputWrapper">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="InputGroup">
                <div className="LabelRow">
                  <label>Password</label>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={HandleForgetPassword}
                    className="ForgotLink"
                  >
                    Forgot password?
                  </a>
                </div>
                {error.password && (
                  <p className="error-message">{error.password}</p>
                )}
                <div className="InputWrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="SubmitBtn" onClick={handleLogIn}>
                Sign In
              </button>
            </form>

            <p className="RegisterRedirect">
              Don't have an account? <a href="#create">Create one</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
