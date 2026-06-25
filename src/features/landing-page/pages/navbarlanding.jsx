import { Button } from '@mui/material';
import '../styles/navbarlanding.css';
import HeroSection from './HeroSection.jsx';
import { useNavigate } from 'react-router-dom';
export default function NavbarLanding() {
   const navigate = useNavigate();
  return (
    <div className='navbar-landing-wrapper'>
    <nav className="navbar-landing">
     
      <span className="logo">ProLink</span>
      
      <ul className="nav-links">
        <li>Browse Projects</li>
        <li>Find Talent</li>
        <li>How it Works</li>
        <li>About</li>
      </ul>
      
      <div className="nav-actions">
         
        <button className="btn-lang">
          <span className="lang-icon">🌐</span>
          عربي</button>
        <button className="btn-login" onClick={() => navigate("/client")} >Log In</button>
        <button className="btn-started" onClick={()=> navigate("/CreateAccount")}>Get Started</button>
       
        {/* <Button variant='containd' className='btn-started'>Get Started</Button> */}
      </div>
        <button className="menu-btn">
    ☰
  </button>
    </nav>
    <HeroSection/>
    </div>
  );
}