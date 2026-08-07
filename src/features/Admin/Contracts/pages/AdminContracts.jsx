import "../../Contracts/styles/Contracts.css";

const contracts = [
  {
    id: 1,
    contract: "E-commerce Platform Redesign",
    client: "Khalid Mansour",
    freelancer: "Ahmad Al-Zahrani",
    value: "$1,800",
    type: "Staged",
    status: "Active",
    date: "Jun 1",
  },
  {
    id: 2,
    contract: "Mobile Banking App",
    client: "Khalid Mansour",
    freelancer: "Sara Hassan",
    value: "$2,400",
    type: "Staged",
    status: "Active",
    date: "Jun 3",
  },
  {
    id: 3,
    contract: "Fintech API Integration",
    client: "Rana Tamimi",
    freelancer: "Mohammed Ali",
    value: "$3,200",
    type: "Staged",
    status: "In Review",
    date: "May 20",
  },
  {
    id: 4,
    contract: "AI Analytics Dashboard",
    client: "Khalid Mansour",
    freelancer: "Mohammed Ali",
    value: "$950",
    type: "Instant",
    status: "Completed",
    date: "Jun 10",
  },
  {
    id: 5,
    contract: "Logo & Brand Guidelines",
    client: "Omar Bashir",
    freelancer: "Rana Tamimi",
    value: "$320",
    type: "Instant",
    status: "Cancelled",
    date: "May 28",
  },
];

export default function AdminContracts() {
  return (
    <div className="contracts-card">

      <table className="contracts-table">

        <thead>
          <tr>
            <th>Contract</th>
            <th>Client</th>
            <th>Freelancer</th>
            <th>Value</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {contracts.map((item) => (
            <tr key={item.id}>

              <td className="contract-name">
                {item.contract}
              </td>

              <td>{item.client}</td>

              <td>{item.freelancer}</td>

              <td className="price">
                {item.value}
              </td>

              <td>
                <span
                  className={`badge ${
                    item.type === "Staged"
                      ? "type-stage"
                      : "type-instant"
                  }`}
                >
                  {item.type}
                </span>
              </td>

              <td>

            <span
className={`badge ${
item.status === "Active"
? "contract-active"
: item.status === "Completed"
? "contract-completed"
: item.status === "Cancelled"
? "contract-cancelled"
: "contract-review"
}`}
>
{item.status}
</span>

              </td>

              <td>{item.date}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}