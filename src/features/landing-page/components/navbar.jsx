import { Button } from '@mui/material';
import '../styles/navbar.css'
export default function Navbar() {
  return (
    <nav className="navbar">
     
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
        <button className="btn-login">Log In</button>
        <button className="btn-started">Get Started</button>
       
        {/* <Button variant='containd' className='btn-started'>Get Started</Button> */}
      </div>
        <button className="menu-btn">
    ☰
  </button>
    </nav>
    
  );
}