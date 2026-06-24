import React from "react";
import { Button, IconButton } from "@mui/material";
import "../styles/ClientHeader.css";

export default function ClientHeader() {
  return (
    <div className="topbar">
      
      <div className="topbar-title">
        <span>Overview</span>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <span style={{ color: "#5a7a76", fontSize: "0.85rem" }}>🔍</span>
          <input type="text" placeholder="Search freelancer, project..." className="clean-input" />
        </div>

        <Button className="topbar-btn">+ Post a Project</Button>

        <div className="notif-wrapper">
          <IconButton className="notif-btn">🔔</IconButton>
          <span className="notif-dot"></span>
        </div>

        <div className="sidebar-avatar">KM</div>
      </div>

    </div>
  );
}