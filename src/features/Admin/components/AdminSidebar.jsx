import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiBarChart2,
  FiFileText,
  FiFile,
  FiShield,
  FiDollarSign,
  FiFolder,
  FiUser,
  FiSettings,
  FiLogOut,FiStar
} from "react-icons/fi";
import { BsQuestionLg } from "react-icons/bs";

import "../Styles/AdminSidebar.css";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <aside className={`sidebarrr ${sidebarOpen ? "open" : ""}`}>

        {/* ================= Logo ================= */}
        <div className="sidebarrr-logo">
          <div className="sidebarrr-logo-txt">
            Free <em>Link</em>
          </div>
          <div className="sidebarrr-logo-sub">
            Admin Panel
          </div>
        </div>

        {/* ================= User ================= */}
        <div className="sidebarrr-user">
          <div className="sidebarrr-avatar">NB</div>

          <div>
            <div className="sidebarrr-user-name">
              Nermin Bshara
            </div>
          </div>
        </div>

        {/* ================= Navigation ================= */}
        <nav className="nav-sidebarrr">

          {/* MAIN */}
          <div className="navr-group">

            <span className="navr-group-title">
              Main
            </span>

            <NavLink to="Employees" className="navr-item">
              <span className="navr-icon">
               <FiUsers />
              </span>
              <span className="navr-text">
               Employees
              </span>
            </NavLink>

            <NavLink to="Statistics" className="navr-item">
              <span className="navr-icon">
                <FiBarChart2 />
              </span>
              <span className="navr-text">
                Statistics
              </span>
            </NavLink>

            <NavLink to="UsersManagement" className="navr-item">
              <span className="navr-icon">
                <FiUsers />
              </span>
              <span className="navr-text">
                Users
              </span>
            </NavLink>

          
<NavLink to="AdminWallet" className="navr-item">
  <span className="navr-icon">
    <FiDollarSign />
  </span>

  <span className="navr-text">
    Platform Wallet
  </span>
</NavLink>
          </div>

          {/* WORKSPACE */}
          <div className="navr-group">

            <span className="navr-group-title">
              Workspace
            </span>

            <NavLink to="RolesPermissions" className="navr-item">
              <span className="navr-icon">
                <FiShield />
              </span>
              <span className="navr-text">
                Roles & Permissions
              </span>
            </NavLink>

            <NavLink to="Financial" className="navr-item">
              <span className="navr-icon">
                <FiDollarSign />
              </span>
              <span className="navr-text">
               Financial
              </span>
            </NavLink>

            <NavLink to="AdminProjects" className="navr-item">
              <span className="navr-icon">
                <FiFolder />
              </span>
              <span className="navr-text">
                Projects
              </span>
            </NavLink>
  <NavLink to="AdminContracts" className="navr-item">
              <span className="navr-icon">
                <FiFile />
              </span>
              <span className="navr-text">
                Contracts
              </span>
            </NavLink>
             <NavLink to="AssessmentQuestions" className="navr-item">
              <span className="navr-icon assessment-icon">
                <BsQuestionLg/> 
              </span>
              <span className="navr-text">
                Assessment Questions
              </span>
            </NavLink>

          </div>

          {/* ACCOUNT */}
          <div className="navr-group">

            {/* <span className="navr-group-title">
              Account
            </span> */}

            <NavLink to="AdminOffers" className="navr-item">
              <span className="navr-icon">
               <FiFileText />
              </span>
              <span className="navr-text">
           Offers
              </span>
            </NavLink>

            <NavLink to="AdminReviews" className="navr-item">
              <span className="navr-icon">
               <FiStar />
              </span>
              <span className="navr-text">
           Reviews
              </span>
            </NavLink>
            <NavLink to="AuditLog" className="navr-item">
              <span className="navr-icon">
                <FiSettings />
              </span>
              <span className="navr-text">
                AuditLog
              </span>
            </NavLink>

          </div>

        </nav>

        {/* ================= Footer ================= */}
        <div className="sidebarrr-footer">

          <div className="navr-icon">
            <FiLogOut />
          </div>

          <span className="navr-txt">
            Sign Out
          </span>

        </div>

      </aside>

      {/* Overlay */}
      <div
        className={`sidebarrr-overlay ${
          sidebarOpen ? "show" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
}