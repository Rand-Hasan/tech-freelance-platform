import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavbarFreelancer.css"; 

export default function NavbarFreelancer() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("جاري البحث عن:", searchValue);
    
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
        
        {/* <form onSubmit={handleSearchSubmit} className="search-form-free">
          <SearchIcon className="search-icon-free" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input-free" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form> */}
         <form onSubmit={handleSearchSubmit} className="search-form-free">
  {/* 1. حقل الإدخال النصي */}
  <input 
    type="text" 
    placeholder="Search..." 
    className="search-input-free" 
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />

  {/* 2. الخط الفاصل الرمادي */}
  <div className="search-divider"></div>

  {/* 3. القائمة المنسدلة الخيارات */}
  <div className="search-select-wrapper">
    <select className="search-select-free">
      <option value="projects">Projects</option>
      <option value="clients">Clients</option>
    </select>
  </div>

  {/* 4. حاوية الأيقونة الدائرية في أقصى اليمين */}
  <button type="submit" className="search-btn-submit-free">
    <SearchIcon className="search-icon-free" />
  </button>
</form>
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
          <MenuItem onClick={handleMenuClose} style={{ fontSize: '14px', color: 'red', fontFamily: 'inherit' }}>
             Sign Out
          </MenuItem>
        </Menu>

      </div>
    </nav>
  );
}