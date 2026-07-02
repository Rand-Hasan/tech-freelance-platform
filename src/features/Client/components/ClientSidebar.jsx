import { NavLink } from "react-router-dom";
import '../styles/ClientSidebar.css'

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen
}) {
    return (
        <>
        <aside  className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-txt"> pro <em>Link</em></div>
                <div className="sidebar-logo-sub">Client Portal</div>
            </div>
            
            {/* user */}
            <div className="sidebar-user">
                <div className="sidebar-avatar">KM</div>
                <div>
                    <div className="sidebar-user-name">RAND HASAN</div>
                    <div className="sidebar-user-level">🏢teach solution CO.</div>
                </div>
            </div>
            
            {/* nav */}
            <nav className="nav-sidebar">
                {/* MAIN */}
                <div className="nav-group">
                    <span className="nav-group-title">MAIN</span>

                    <NavLink to="dashboard" className="nav-item">
                        <span className="nav-icon">📊</span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>

                    <NavLink to="projects" className="nav-item">
                        <span className="nav-icon">📋</span>
                        <span className="nav-text">My Projects</span>
                        <span className="nav-badge">4</span>
                    </NavLink>


                    <NavLink to="find-freelancers" className="nav-item">
                    {/* <NavLink to="/FindFreelancers" className="nav-item"> */}
                        <span className="nav-icon">🔍</span>
                        <span className="nav-text">Find Freelancers</span>
                    </NavLink>

                    <NavLink to="contracts" className="nav-item">
                        <span className="nav-icon">📄</span>
                        <span className="nav-text">Contracts</span>
                    </NavLink>
                </div>
                
                {/* workspace */}
                <div className="nav-group">
                    <span className="nav-group-title">Workspace</span>
                    <NavLink to="messages" className="nav-item">
                        <span className="nav-icon">💬</span>
                        <span className="nav-text">Messages</span>
                    </NavLink>
                    <NavLink to="wallet" className="nav-item">
                        <span className="nav-icon">💰</span>
                        <span className="nav-text">Wallet</span>
                    </NavLink>
                </div>
                
                {/* Account */}
                <div className="nav-group">
                    <span className="nav-group-title">Account</span>
                    <NavLink to="profile" className="nav-item">
                        <span className="nav-icon">👤</span>
                        <span className="nav-text">My Profile</span>
                    </NavLink>
                    <NavLink to="setting" className="nav-item">
                        <span className="nav-icon">⚙️</span>
                        <span className="nav-text">Settings</span>
                    </NavLink>
                </div>
            </nav>
            
            {/* footer */}
            <div className="sidebar-footer">
                <div className="nav-icon">
                    🚪
                </div>
                <span className="nav-txt">Sign Out</span>
            </div>
        </aside>
        <div
    className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
    onClick={() => setSidebarOpen(false)}
></div>
        </>
    )
}