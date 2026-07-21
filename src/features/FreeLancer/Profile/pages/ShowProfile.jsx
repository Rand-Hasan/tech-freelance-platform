import { useState } from 'react';
import '../styles/ShowProfile.css';
import ShowCv from '../../CV/pages/ShowCv';
import ShowPortfolio from '../../Portifolio/Pages/ShowPortfolio';
import PersonalInfo from './PersonalInfo';
import ShowSkills from '../../Skills/pages/ShowSkills';
import Showportofoliodetails from '../../Portifolio/Pages/Showportofoliodetails';
import { NavLink, Outlet } from 'react-router-dom';
export default function ShowProfile(){   
    return (
    <div>
        <div className='hero'></div>
        <div className='container-profile'>
     <div className='profile-header'>
  <div className='avatar-row'>
    
    <div className='avatar-profile'>RH</div>
    
    <div className='profile-info-text'>
      <h2 className='profile-name'>Kevin Smith</h2>
      <p className='profile-title'>Advisor and Consultant at Stripe Inc.</p>
      <div className='profile-meta-row'>
        <span>📍 Saint-Petersburg, Russia</span>
        <span>✉️ kevin.smith@stripe.com</span>
        <span>⭐ 4.5 • 193 reviews</span>
      </div>
    </div>
    
    {/* <div className='profile-actions-btns'>
      <button className='btn-outline'>Message</button>
      <button className='btn-solid'>Edit Profile</button>
    </div> */}

  </div>
</div>

      <div className="profile-tabs-bar">
         <NavLink
            to='personal'
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? 'active' : ''}`
            }
          >
            👤 Personal Info
          </NavLink>

          <NavLink
            to='skills'
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? 'active' : ''}`
            }
          >
            🛠️ Technical Skills
          </NavLink>

          <NavLink
            to='portfolio'
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? 'active' : ''}`
            }
          >
            🖼️ Portfolio
          </NavLink>

          <NavLink
            to='cv'
            className={({ isActive }) =>
              `profile-tab-btn ${isActive ? 'active' : ''}`
            }
          >
            📄 CV & Experience
          </NavLink>
      </div>
     
      <div className="profile-tab-content">
        <Outlet/>
      </div>
       </div>
    </div>
  );
}