import "../../../Admin/RolesPermissions/styles/RolesPermissions.css";
import { FaCrown, FaShieldAlt, FaChartBar, FaComments, FaQuestion } from "react-icons/fa";

const roles = [
  {
    name: "Super Admin",
    desc: "Full access — all modules, settings, and data",
    icon: <FaCrown />,
    active: true,
  },
  {
    name: "Moderator",
    desc: "Reports, flags, user warnings & suspensions",
    icon: <FaShieldAlt />,
    active: true,
  },
  {
    name: "Analyst",
    desc: "View reports & statistics only — no actions",
    icon: <FaChartBar />,
    active: true,
  },
  {
    name: "Support",
    desc: "User queries, basic account management",
    icon: <FaComments />,
    active: false,
  },
  {
    name: "Question Manager",
    desc: "Manage assessment questions only",
    icon: <FaQuestion />,
    active: false,
  },
];

export default function RolesPermissions() {
  return (
    <div className="roles-page">

      {/* Left Side */}

      <div className="roles-card">

        <div className="card-header">
          <h2>Platform Roles</h2>

          <button className="add-btn">
            + Add Role
          </button>

        </div>

        {roles.map((role, index) => (
          <div className="role-item" key={index}>

            <div className="role-left">

              <div className="icon-box">
                {role.icon}
              </div>

              <div>
                <h3>{role.name}</h3>
                <p>{role.desc}</p>
              </div>

            </div>

          

          </div>
        ))}

      </div>

      {/* Right Side */}

      <div className="assign-card">

        <h2>Assign Role to User</h2>

        <label>Search user</label>

        <input
          type="text"
          placeholder="Enter username or email..."
        />

        <label>Select role</label>

        <select>
          <option>Super Admin</option>
          <option>Moderator</option>
          <option>Analyst</option>
          <option>Support</option>
          <option>Question Manager</option>
        </select>

        <button className="confirm-btn">
          Confirm Role Assignment
        </button>

      </div>

    </div>
  );
}