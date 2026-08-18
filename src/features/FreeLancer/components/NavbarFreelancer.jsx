import  { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavbarFreelancer.css"; 
import axios from "axios";
import { baseURL } from "../../../services/Api/api";
import Cookies from "universal-cookie";
export default function NavbarFreelancer() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token-freelancer');
 
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    handleMenuClose();
    navigate("/freelancerlayout/showprofile"); 
  };

 const Logout = () => {
  cookies.remove("token-freelancer", {
    path: "/",
  });

  navigate("/");
};
  return (
    <nav className="navbar-freelancer">
     
      <div className="logo">FreeLink</div>

      <div className="div-link-free">
        <NavLink to="projectfree" className="nav-link-free">My Project</NavLink>
        <NavLink to="contractfree" className="nav-link-free">Contract</NavLink>
        <NavLink to="messagefree" className="nav-link-free">Messages</NavLink>
        <NavLink to="walletfree" className="nav-link-free">Wallet</NavLink>
      </div>

     
      <div className="rightfree">
        
      
         

        <div className="notif-wrapper-free">
          <IconButton className="notif-btn-free" style={{ color: "#5a7a76" }}>
            <Badge color="error" variant="dot" invisible={false}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>

        <div 
          className="avatar-free" 
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        >
          KM
        </div>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            style: {
              marginTop: '10px',
              borderRadius: '12px',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.08)',
              border: '1px solid #eef2f1'
            }
          }}
        >
          <MenuItem onClick={handleAccountClick} style={{ fontSize: '14px', color: '#333', fontFamily: 'inherit' }}>
             Account (My Profile)
          </MenuItem>
          <MenuItem onClick={handleMenuClose} style={{ fontSize: '14px', color: '#333', fontFamily: 'inherit' }}>
             Settings
          </MenuItem>
          <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #eee' }} />
          <MenuItem onClick={handleMenuClose} style={{ fontSize: '14px', color: 'red', fontFamily: 'inherit' }} 
          onClick ={()=>Logout()}>
             Sign Out
          </MenuItem>
        </Menu>

      </div>
    </nav>
  );
}