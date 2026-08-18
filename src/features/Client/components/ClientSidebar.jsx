import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ClientSidebar.css";
import Cookies from "universal-cookie";
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const handleLogout = () => {
  cookies.remove("token-client", {
    path: "/",
  });

  navigate("/");
};
  return (
    <>
      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : "closed"
        }`}
      >
        {/* Desktop Collapse Button */}
        <button
          className="ssssss"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-txt">
            Free <em>Link</em>
          </div>

          <div className="sidebar-logo-sub">
            Client Portal
          </div>
        </div>

        {/* User */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            CL
          </div>

          <div>
            <div className="sidebar-user-name">
              Client
            </div>

            <div className="sidebar-user-level">
              🏢teach solution CO.
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-sidebar">

          {/* MAIN */}
          <div className="nav-group">
            <span className="nav-group-title">
              MAIN
            </span>

            <NavLink
              to="dashboard"
              className="nav-item"
            >
              <span className="nav-icon">
                📊
              </span>

              <span className="nav-text">
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to="projects"
              className="nav-item"
            >
              <span className="nav-icon">
                📋
              </span>

              <span className="nav-text">
                My Projects
              </span>
            </NavLink>

            <NavLink
              to="contracts"
              className="nav-item"
            >
              <span className="nav-icon">
                📄
              </span>

              <span className="nav-text">
                Contracts
              </span>
            </NavLink>
          </div>

          {/* WORKSPACE */}
          <div className="nav-group">

            <span className="nav-group-title">
              Workspace
            </span>

            <NavLink
              to="messageClient"
              className="nav-item"
            >
              <span className="nav-icon">
                💬
              </span>

              <span className="nav-text">
                Messages
              </span>
            </NavLink>

            <NavLink
              to="wallet"
              className="nav-item"
            >
              <span className="nav-icon">
                💰
              </span>

              <span className="nav-text">
                Wallet
              </span>
            </NavLink>

            <NavLink
              to="invaitations"
              className="nav-item"
            >
              <span className="nav-icon">
                📩
              </span>

              <span className="nav-text">
                Invaitations
              </span>
            </NavLink>

          </div>

          {/* ACCOUNT */}
          <div className="nav-group">

            <span className="nav-group-title">
              Account
            </span>

            <NavLink
              to="profile"
              className="nav-item"
            >
              <span className="nav-icon">
                👤
              </span>

              <span className="nav-text">
                My Profile
              </span>
            </NavLink>

            <NavLink
              to="setting"
              className="nav-item"
            >
              <span className="nav-icon">
                ⚙️
              </span>

              <span className="nav-text">
                Settings
              </span>
            </NavLink>

          </div>

        </nav>

        {/* Footer */}
        <div className="sidebar-footer">

          <div className="nav-icon">
            🚪
          </div>

          <span className="nav-txt" onClick={()=>handleLogout()}>
            Sign Out
          </span>

        </div>

      </aside>

      {/* Mobile Menu Button */}
      <button
        className="menu-btn"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "show" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

    </>
  );
}