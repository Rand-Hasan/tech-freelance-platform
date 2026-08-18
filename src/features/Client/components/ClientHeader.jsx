// import React from "react";
// import { Button, IconButton } from "@mui/material";
// import "../styles/ClientHeader.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
// import MenuIcon from "@mui/icons-material/Menu";
// export default function ClientHeader({ setSidebarOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pagetitle ={
//     "/dashboard": "overview",
//     "/clientlayout/projects" : "My Projects",
//     "/clientlayout/messageClient" : "Messages" ,
//     "/clientlayout/wallet"   : "Wallet" ,
//     "/clientlayout/find-freelancers" : "Find Freelancers",
//     "/clientlayout/contracts" :"Contracts",
//     "/clientlayout/profile"  :"My Profile",
//     "/clientlayout/setting" : "Settings",
//     "/clientlayout/createproject" : "Post a New Project",
//     "/clientlayout/editproject/:1" : "Edit Project"
//   }
//    const backButtonRoutes = ["/createproject","/editproject"];
//    const currentTitle = pagetitle[location.pathname] || "overview";
//     const showBackButton = backButtonRoutes.includes(location.pathname);
//   return (
//     <div className="topbar">
    
//       <div className="topbar-title">
//         <IconButton
//     className="menu-btn"
//     onClick={() => setSidebarOpen(true)}
// >
//     <MenuIcon />
// </IconButton>
//           {showBackButton&&(
//         <IconButton 
//           onClick={() => navigate(-1)} 
//           style={{ 
//             backgroundColor: "white",
//             border:"1.5px solid rgba(42, 157, 143, 0.14)", 
//             // color: "#ffffff", 
//             borderRadius: "8px",

//           }}
//           size="small"
//         >
//           <ArrowBackIcon fontSize="small" />
//         </IconButton>
//       )

//       }
//         <span>{currentTitle}</span>
//       </div>

//       <div className="topbar-actions">
//         <div className="topbar-search">
//           <span style={{ color: "#5a7a76", fontSize: "0.85rem" }}>🔍</span>
//           <input type="text" placeholder="Search freelancer, project..." className="clean-input" />
//         </div>

//         <Button className="topbar-btn">+ Post a Project</Button>

//         <div className="notif-wrapper">
//           <IconButton className="notif-btn">🔔</IconButton>
//           <span className="notif-dot"></span>
//         </div>

//         <div className="sidebar-avatar">KM</div>
//       </div>

//     </div>
//   );
// }
import React from "react";
import { Button, IconButton } from "@mui/material";
import "../styles/ClientHeader.css";
import {
  useLocation,
  useNavigate,
  matchPath,
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";

export default function ClientHeader({ setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================
  // Page Titles
  // =========================
  const pagetitle = {
    // Dashboard
    "/clientlayout/dashboard": "Overview",

    // Messages
    "/clientlayout/messageClient": "Messages",
    "/clientlayout/messageClient/:freelancer_id": "Messages",

    // Wallet
    "/clientlayout/wallet": "Wallet",
    "/clientlayout/wallet/:contractId": "Wallet",

    // Payment
    "/clientlayout/payment": "Payment",
    "/clientlayout/payment-success": "Payment Successful",

    // Projects
    "/clientlayout/projects": "My Projects",
    "/clientlayout/invaitations": "Invitations",

    // Project Details
    "/clientlayout/projectdetails/:id": "Project Details",

    // Project Details - Inner Pages
    "/clientlayout/projectdetails/:id/add-phase/:contract_id":
      "Add Phase",

    "/clientlayout/projectdetails/:id/update-phase/:phaseId":
      "Update Phase",

    "/clientlayout/projectdetails/:id/:phaseId":
      "Stage & Tasks Details",

    "/clientlayout/projectdetails/:id/matched-freelancers":
      "Matched Freelancers",

    "/clientlayout/projectdetails/:id/progress-monitor":
      "Progress Monitor",

    "/clientlayout/projectdetails/:id/progress-monitor/:id":
      "Progress Monitor Details",

    "/clientlayout/projectdetails/:id/WorkAndCodeReview":
      "Work & Code Review",

    "/clientlayout/projectdetails/:id/offer-project":
      "Project Offer",

    // Create / Edit Project
    "/clientlayout/createproject": "Post a New Project",
    "/clientlayout/editproject/:id": "Edit Project",

    // Contracts
    "/clientlayout/createcontract": "Create Contract",
    "/clientlayout/editcontract/:id": "Edit Contract",
    "/clientlayout/contracts": "Contracts",
    "/clientlayout/ContractDetails/:id": "Contract Details",

    // Freelancers
    "/clientlayout/FindFreelancers": "Find Freelancers",
    "/clientlayout/FreeLanceInfo": "Freelancer Information",

    // Profile
    "/clientlayout/profile": "My Profile",

    // Settings
    "/clientlayout/setting": "Settings",
  };

  // =========================
  // Routes where Back Button
  // should be displayed
  // =========================
  const backButtonRoutes = [
    "/clientlayout/createproject",
    "/clientlayout/editproject/:id",

    "/clientlayout/createcontract",
    "/clientlayout/editcontract/:id",

    "/clientlayout/projectdetails/:id/add-phase/:contract_id",
    "/clientlayout/projectdetails/:id/update-phase/:phaseId",
    "/clientlayout/projectdetails/:id/:phaseId",

    "/clientlayout/projectdetails/:id/matched-freelancers",
    "/clientlayout/projectdetails/:id/progress-monitor",
    "/clientlayout/projectdetails/:id/progress-monitor/:id",
    "/clientlayout/projectdetails/:id/WorkAndCodeReview",
    "/clientlayout/projectdetails/:id/offer-project",

    "/clientlayout/ContractDetails/:id",
  ];

  // =========================
  // Find Current Page Title
  // =========================
  const currentTitle =
    Object.entries(pagetitle).find(([path]) =>
      matchPath(
        {
          path,
          end: true,
        },
        location.pathname
      )
    )?.[1] || "Overview";

  // =========================
  // Check Back Button
  // =========================
  const showBackButton = backButtonRoutes.some((path) =>
    matchPath(
      {
        path,
        end: true,
      },
      location.pathname
    )
  );

  return (
    <div className="topbar">

      {/* =========================
          Left Side
      ========================= */}
      <div className="topbar-title">

        {/* Menu */}
        <IconButton
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Back Button */}
        {showBackButton && (
          <IconButton
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "white",
              border: "1.5px solid rgba(42, 157, 143, 0.14)",
              borderRadius: "8px",
            }}
            size="small"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}

        {/* Page Title */}
        <span>{currentTitle}</span>
      </div>

      {/* =========================
          Right Side
      ========================= */}
      <div className="topbar-actions">

        {/* Search */}
        <div className="topbar-search">
          <span
            style={{
              color: "#5a7a76",
              fontSize: "0.85rem",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search freelancer, project..."
            className="clean-input"
          />
        </div>

        {/* Post Project */}
        <Button className="topbar-btn">
          + Post a Project
        </Button>

        {/* Notifications */}
        <div className="notif-wrapper">
          <IconButton className="notif-btn">
            🔔
          </IconButton>

          <span className="notif-dot"></span>
        </div>

        {/* Avatar */}
        <div className="sidebar-avatar">
          KM
        </div>

      </div>
    </div>
  );
}