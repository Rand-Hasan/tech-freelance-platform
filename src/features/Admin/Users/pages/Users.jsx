import "../../Users/styles/Users.css";
import { FaTrashAlt } from "react-icons/fa";

const users = [
  {
    id: 1,
    initials: "AZ",
    color: "#2FAE9B",
    name: "Ahmad Al-Zahrani",
    email: "ahmad@dev.com",
    type: "Freelancer",
    level: "Expert",
  },
  {
    id: 2,
    initials: "KM",
    color: "#F39C12",
    name: "Khalid Mansour",
    email: "khalid@techco.com",
    type: "Client",
    level: "-",
  },
  {
    id: 3,
    initials: "SH",
    color: "#7C4DFF",
    name: "Sara Hassan",
    email: "sara@design.io",
    type: "Freelancer",
    level: "Mid-Level",
  },
  {
    id: 4,
    initials: "OB",
    color: "#E74C3C",
    name: "Omar Bashir",
    email: "omar@nexa.com",
    type: "Client",
    level: "-",
  },
];

export default function Users() {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Level</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <div
                    className="avatar"
                    style={{ background: user.color }}
                  >
                    {user.initials}
                  </div>

                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
              </td>

              <td>
                <span
                  className={`badge ${
                    user.type === "Freelancer"
                      ? "freelancer"
                      : "client"
                  }`}
                >
                  {user.type}
                </span>
              </td>

              <td>
                <span
                  className={`badge ${
                    user.level === "Expert"
                      ? "expert"
                      : user.level === "Mid-Level"
                      ? "mid"
                      : "none"
                  }`}
                >
                  {user.level}
                </span>
              </td>

              <td>
                <button className="ban-btn">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}