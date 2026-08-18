import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaTrash, FaFileAlt, FaLink, FaUpload, FaTimes, FaFileArchive } from "react-icons/fa";
import '../styles/PhaseDetails.css';
import Cookies from "universal-cookie";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { AddTask, CheckTask, DeleteFiles, DeleteTask, DeleteUrl, GetPhaseFiles, GetPhaseTask, UploadProjectsFile } from "../services/api-myproject";
export default function PhaseDetails() {

   const { id: phaseId } = useParams();
   console.log('lll:',phaseId)
   const navigate = useNavigate();
    return (
  <div className="phase-page">
    <div className="phase-details-container">

      {/* Phase Navigation */}
      <div className="phase-tabs">

        <NavLink
          to=""
          className={({ isActive }) =>
            `phase-tab ${isActive ? "phase-tab-active" : ""}`
          }
        >
          <span className="phase-tab-icon">📂</span>
          <span>Phase Details & Work</span>
        </NavLink>

        <NavLink
          to={`clientrespond`}
          className={({ isActive }) =>
            `phase-tab ${isActive ? "phase-tab-active" : ""}`
          }
        >
          <span className="phase-tab-icon">💬</span>
          <span>Client Requests & Activity</span>
        </NavLink>

      </div>

      {/* Sub Page */}
       {/* className="phase-content" */}
      <div className="phase-content" >
        <Outlet />
      </div>

    </div>
  </div>
);
}