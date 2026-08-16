import React from "react";
import { Button, IconButton } from "@mui/material";
import "../Styles/AdminHeader.css";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import MenuIcon from "@mui/icons-material/Menu";
export default function AdminHeader({ setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pagetitle ={
    "/AdminLayout/Employees": " All Employees",
    "/AdminLayout/AdminProjects" : "Projects",
    "/AdminLayout/Statistics" : "Statistics" ,
    "/AdminLayout/UsersManagement"   : "UsersManagement" ,
    "/AdminLayout/UsersManagement/:userId"   : "UserDetails" ,
    "/AdminLayout/RolesPermissions" : "Roles & Permissions",
    "/AdminLayout/AdminContracts" :"Contracts",
    "/AdminLayout/Financial"  :"Financial",
       "/AdminLayout/AddQuestion" : "AddQuestion",
    "/AdminLayout/AssessmentQuestions"  :"Assessment Questions",
      "/AdminLayout/AdminOffers" : "Offers",
            "/AdminLayout/AuditLog" : "AuditLog",
             "/AdminLayout/AdminReviews" : "Reviews",
   
  }
   const backButtonRoutes = ["/createproject","/editproject"];
   const currentTitle = pagetitle[location.pathname] || "overview";
    const showBackButton = backButtonRoutes.includes(location.pathname);
  return (
    <div className="topbar">
    
      <div className="topbar-title">
        <IconButton
    className="menu-btn"
    onClick={() => setSidebarOpen(true)}
>
    <MenuIcon />
</IconButton>
          {showBackButton&&(
        <IconButton 
          onClick={() => navigate(-1)} 
          style={{ 
            backgroundColor: "white",
            border:"1.5px solid rgba(42, 157, 143, 0.14)", 
            // color: "#ffffff", 
            borderRadius: "8px",

          }}
          size="small"
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      )

      }
        <span>{currentTitle}</span>
      </div>

      <div className="topbar-actions">
        {/* <div className="topbar-search">
          <span style={{ color: "#5a7a76", fontSize: "0.85rem" }}>🔍</span>
          <input type="text" placeholder="Search freelancer, project..." className="clean-input" />
        </div> */}

        {/* <Button className="topbar-btn">+ Post a Project</Button> */}

        {/* <div className="notif-wrapper">
          <IconButton className="notif-btn">🔔</IconButton>
          <span className="notif-dot"></span>
        </div>

        <div className="sidebar-avatar">KM</div> */}
      </div>

    </div>
  );
}