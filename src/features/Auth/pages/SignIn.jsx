import "../styles/SignIn.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    console.log("trueeee:", decoded);
  };

  const onFailureGoogle = () => {
    console.log("Errrrorrrrr");
  };

  function handleEmail(event) {
    setdata({ ...data, email: event.target.value });
  }
  function handlePassword(event) {
    setdata({ ...data, password: event.target.value });
  }

  function handleLogIn(event) {
    event.preventDefault();
    setError({}); 
    
    const bodyData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("http://localhost:4000/LogIn", bodyData)
      .then((res) => {
        console.log("trueeeeeeeeeeee", res.data);
        alert("LogIn Successfully ! ");
       navigate("/clientlayout")
        setError({});
        Cookies.set("token", res.data.token, {
          expires: 7, 
          secure: true,
        });
      })
     .catch((err) => {
      
        const { errors, message } = err.response?.data || {};

        if (Array.isArray(errors)) {
         
          setError(errors.reduce((acc, e) => ({ ...acc, [e.path || e.field]: e.msg || e.message }), {}));
        } else if (message) {
        
          const isPwd = message.toLowerCase().includes("password");
          const isEmail = /email|user|found/i.test(message);
          
          if (isPwd || isEmail) setError({ [isPwd ? "password" : "email"]: message });
          else alert(message);
        }
      });
  }
  function HandleForgetPassword(){
    if (!data.email) {
    alert("Enter Email First");
    return;
  }
    axios.post('http://localhost:4000/ForgetPassword',{
     email:data.email 
    })
    .then((res)=>{
      console.log(res.data);
      Cookies.set("reset_email",data.email);
      navigate("/ForgetPassword");
    }).catch((err)=>{
      console.log(err.response?.data);
    })
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
                    value={data.email}
                    onChange={handleEmail}
                  />
                </div>
              </div>

              <div className="InputGroup">
                <div className="LabelRow">
                  <label>Password</label>
                  <a style={{cursor:"pointer"}} onClick={HandleForgetPassword}  className="ForgotLink">
                    Forgot password?
                  </a>
                </div>
                {error.password && (
                  <p className="error-message">{error.password}</p>
                )}
                <div className="InputWrapper">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={handlePassword}
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
