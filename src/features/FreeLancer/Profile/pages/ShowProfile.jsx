import { useState } from 'react';
import '../styles/ShowProfile.css';
import ShowCv from '../../CV/pages/ShowCv';
import ShowPortfolio from '../../Portifolio/Pages/ShowPortfolio';
import PersonalInfo from './PersonalInfo';
import ShowSkills from '../../Skills/pages/ShowSkills';
export default function ShowProfile(){
    const [activeTab,setActiveTab]= useState('personal');
    const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "skills":
        return <ShowSkills />;
      case "portfolio":
        return <ShowPortfolio/>;
      case "cv":
        return <ShowCv />;
      default:
        return <PersonalInfo />;
    }
  };
    return (
    <div>
        <div className='hero'></div>
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
    
    <div className='profile-actions-btns'>
      <button className='btn-outline'>Message</button>
      <button className='btn-solid'>Edit Profile</button>
    </div>

  </div>
</div>

      <div className="profile-tabs-bar">
        <button 
          className={`profile-tab-btn ${activeTab === 'personal' ? 'active' : ''}`} 
          onClick={() => setActiveTab('personal')}
        >
          👤 Personal Info
        </button>
        
        <button 
          className={`profile-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} 
          onClick={() => setActiveTab('skills')}
        >
          🛠️ Technical Skills
        </button>

        <button 
          className={`profile-tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`} 
          onClick={() => setActiveTab('portfolio')}
        >
          🖼️ Portfolio
        </button>

        <button 
          className={`profile-tab-btn ${activeTab === 'cv' ? 'active' : ''}`} 
          onClick={() => setActiveTab('cv')}
        >
          📄 CV & Experience
        </button>
      </div>

      <div className="profile-tab-content">
        {renderTabContent()}
      </div>

    </div>
  );
}