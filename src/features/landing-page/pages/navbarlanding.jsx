// import { Button } from '@mui/material';
// import '../styles/navbarlanding.css';
// import HeroSection from './HeroSection.jsx';
// import { useNavigate } from 'react-router-dom';
// export default function NavbarLanding() {
//    const navigate = useNavigate();
//   return (
//     <div className='navbar-landing-wrapper'>
//     <nav className="navbar-landing">
     
//       <span className="logo">FreeLink</span>
      
//       <ul className="nav-links">
//         <li>Browse Projects</li>
//         <li>Find Talent</li>
//         <li>How it Works</li>
//         <li>About</li>
//       </ul>
      
//       <div className="nav-actions">
         
//         <button className="btn-lang">
//           <span className="lang-icon">🌐</span>
//           عربي</button>
//         <button className="btn-login" onClick={() => navigate("/SignIn")} >Log In</button>
//         <button className="btn-started" onClick={()=> navigate("/CreateAccount")}>Get Started</button>
       
//         {/* <Button variant='containd' className='btn-started'>Get Started</Button> */}
//       </div>
//         <button className="menu-btn">
//     ☰
//   </button>
//     </nav>
//     <HeroSection/>
//     </div>
//   );
// }
import { useState } from "react";
import "../styles/navbarlanding.css";
import HeroSection from "./HeroSection.jsx";
import { useNavigate } from "react-router-dom";

export default function NavbarLanding() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-landing-wrapper">

      <nav className="navbar-landing">

        {/* LOGO */}
        <span className="logo">
          FreeLink
        </span>


        {/* DESKTOP LINKS */}
        <ul className="nav-links">

          <li>Browse Projects</li>

          <li>Find Talent</li>

          <li>How it Works</li>

          <li>About</li>

        </ul>


        {/* ACTIONS */}
        <div className="nav-actions">

          <button className="btn-lang">
            <span className="lang-icon">
              🌐
            </span>
            عربي
          </button>


          <button
            className="btn-login"
            onClick={() => navigate("/SignIn")}
          >
            Log In
          </button>


          <button
            className="btn-started"
            onClick={() => navigate("/CreateAccount")}
          >
            Get Started
          </button>


          {/* MOBILE MENU BUTTON */}

          {/* <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button> */}

        </div>


        {/* MOBILE LINKS */}

        {menuOpen && (

          <div className="mobile-nav-menu">

            <button>
              Browse Projects
            </button>

            <button>
              Find Talent
            </button>

            <button>
              How it Works
            </button>

            <button>
              About
            </button>

          </div>

        )}

      </nav>


      <HeroSection />

    </div>
  );
}