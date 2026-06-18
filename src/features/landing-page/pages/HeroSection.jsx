
import '../styles/HeroSection.css';
import HowItWork from './HowItWork';

export default function HeroSection() {
  return (
    <>
      <div className="hero-container">
        {/* القسم الأيسر */}
        <div className="hero-left">

          <div className="verified-badge">
            <span className="pulsing-dot"></span>
            Verified Tech Talent Platform
          </div>

          <h1 className="hero-title">
            Hire <span className="stroked-text">Verified</span> <br />
            Tech <br />Freelancers
          </h1>


          <p className="hero-description">
            ProLink connects clients with technically assessed,<br /> GitHub-verified freelancers.
            Smart matching, secure contracts, and transparent ratings — all in one platform.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Post a Project <span className="arrow">→</span>
            </button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span> Join as Freelancer
            </button>
          </div>

          <footer className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Verified Freelancers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1.2K</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </footer>
        </div>
        {/* القسم الأيمن */}
        <div className="hero-right">
          <div className='float-card'>
            <div className='check-icon-container'>
              <span className='check-icon'>✓</span>
            </div>
            <div className='card-content'>
              <div className='card-status'>Contract Signed</div>
              <div className='card-title'>API Integration</div>
            </div>
          </div>

          <div className='hero-panel'>
            <div className='hero-header'>
              <h3>🔍 Matched Freelancers</h3>
              <span className="badge">AI Filtered</span>
            </div>
            <div className='freelancer-list'>
              <div className='row'>
                <div className="profile-meta">
                  <div className="avatar">AZ</div>
                  <div className="info">
                    <h4>Ahmad Al-Zahrani</h4>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
                <div className="profile-stats">
                  <span className="price">$45/hr</span>

                  <div className="stars">★★★★★</div>

                  <span className="level-badge">Expert</span>
                </div>
              </div>
              <div className='row'>
                <div className="profile-meta">
                  <div className="avatar">SH</div>
                  <div className="info">
                    <h4>Sara Hassan</h4>
                    <p>UI/UX Designer</p>
                  </div>
                </div>
                <div className="profile-stats">
                  <span className="price">$38/hr</span>

                  <div className="stars">★★★★☆</div>

                  <span className="level-badge">Mid-Level</span>
                </div>
              </div>
              <div className='row'>
                <div className="profile-meta">
                  <div className="avatar">MA</div>
                  <div className="info">
                    <h4>Mohammed Ali</h4>
                    <p>Mobile Developer</p>
                  </div>
                </div>
                <div className="profile-stats">
                  <span className="price">$52/hr</span>

                  <div className="stars">★★★★★</div>

                  <span className="level-badge">Expert</span>
                </div>
              </div>
            </div>
            <div className='hero-footer'>
              <span className='footer-label'>Project Progress</span>
              <div className='progress-bar-container'>
                <div className='progress-bar-fill' style={{ width: '68%' }}></div>
              </div>
              <span className='footer-percentage'>68%</span>
            </div>
          </div>
          <div className='time-card'>
            <div className='check-icon-container'>
              {/* يمكنك استبدال الإيموجي بأيقونة من Lucide أو FontAwesome لاحقاً */}
              <span className='check-icon'>⏱</span>
            </div>
            <div className='card-content'>
              <span className='card-label'>Time Tracked</span>
              <h4 className='card-value'>24h 30m</h4>
            </div>
          </div>
        </div>
      </div>
      <HowItWork />
    </>
  );
}