import { NavLink } from "react-router-dom";
import "../styles/ClientSidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-txt">
          pro <em>Link</em>
        </div>
        <div className="sidebar-logo-sub">Client Portal</div>
      </div>

      {/* User */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">KM</div>
        <div>
          <div className="sidebar-user-name">RAND HASAN</div>
          <div className="sidebar-user-level">🏢 Teach Solution CO.</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-sidebar">

        {/* MAIN */}
        <div className="nav-group">
          <span className="nav-group-title">MAIN</span>

          <NavLink to="/client/dashboard" className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink to="/client/projects" className="nav-item">
            <span className="nav-icon">📋</span>
            <span className="nav-text">My Projects</span>
            <span className="nav-badge">4</span>
          </NavLink>

          <NavLink to="/client/find-freelancers" className="nav-item">
            <span className="nav-icon">🔍</span>
            <span className="nav-text">Find Freelancers</span>
          </NavLink>

          <NavLink to="/client/contracts" className="nav-item">
            <span className="nav-icon">📄</span>
            <span className="nav-text">Contracts</span>
          </NavLink>
        </div>

        {/* Workspace */}
        <div className="nav-group">
          <span className="nav-group-title">Workspace</span>

          <NavLink to="/client/messages" className="nav-item">
            <span className="nav-icon">💬</span>
            <span className="nav-text">Messages</span>
          </NavLink>

          <NavLink to="/client/wallet" className="nav-item">
            <span className="nav-icon">💰</span>
            <span className="nav-text">Wallet</span>
          </NavLink>
        </div>

        {/* Account */}
        <div className="nav-group">
          <span className="nav-group-title">Account</span>

          <NavLink to="/client/profile" className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-text">My Profile</span>
          </NavLink>

          <NavLink to="/client/setting" className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </NavLink>
        </div>

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <span className="nav-icon">🚪</span>
        <span className="nav-text">Sign Out</span>
      </div>
    </aside>
  );
}