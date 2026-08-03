import React from "react";
import { NavLink } from "react-router-dom";

export default function ContractCard({ item }) {
  return (
    <div className="contract-card-row">
      <div className="contract-title-col">{item.title}</div>
      <div className="freelancer-col">{item.freelancer_name}</div>
      <div className="status-col">
        <span className={`status-badge ${item.status}`}>
          {item.status}
        </span>
      </div>
      <div className="action-col">
        <NavLink to={`/dashboard/contracts/${item.id}`} className="view-link">
          View →
        </NavLink>
      </div>
    </div>
  );
}