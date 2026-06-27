
import "../../client-contracts/styles/Contracts.css";
import { NavLink } from "react-router-dom";
const contracts = [
 
  {
    id: 3,
    contract: "Brand Identity & Landing Page",
    freelancer: "Rami Haddad",
    initials: "RH",
    type: "Instant",
    value: "$1,500",
    status: "pending",
  },
  {
    id: 4,
    contract: "AI Analytics Dashboard",
    freelancer: "Mohammed Ali",
    initials: "MA",
    type: "Instant",
    value: "$950",
    status: "completed",
  },
  {
    id: 5,
    contract: "Logo & Brand Guidelines",
    freelancer: "Rana Tamimi",
    initials: "RT",
    type: "Instant",
    value: "$320",
    status: "cancelled",
  }
  
];

export default function Contracts() {
  return (
    <div className="contracts-page">
      <div className="tabs">
        <button className="tab-btn">All (5)</button>
        <button className="tab-btn">Active (2)</button>
        <button className="tab-btn active">Pending (1)</button>
        <button className="tab-btn">Completed (1)</button>
        <button className="tab-btn">Cancelled (1)</button>
      </div>

      <div className="contracts-table">
        <div className="table-header">
          <div>CONTRACT</div>
          <div>FREELANCER</div>
          <div>TYPE</div>
          <div>VALUE</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>

        {contracts.map((item) => (
          <div key={item.id} className="table-row">
            <div className="contract-name">{item.contract}</div>

            <div className="freelancer">
              <div className="avatarr">{item.initials}</div>
              <span>{item.freelancer}</span>
            </div>

            <div>
              <span className="type-badge">{item.type}</span>
            </div>

            <div className="value">{item.value}</div>

            <div>
              <span className={`status ${item.status}`}>
                {item.status === "pending"
                  ? "Pending acceptance"
                  : item.status.charAt(0).toUpperCase() +
                    item.status.slice(1)}
              </span>
            </div>

            <div>
             <NavLink to="/ContractDetails" className="view-btn">
  View →
</NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}