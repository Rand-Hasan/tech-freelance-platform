import "../../AdminProjects/styles/AdminProjects.css";
import { FaTrashAlt } from "react-icons/fa";
const projects = [
  {
    id:1,
    project:"E-commerce Platform Redesign",
    client:"Khalid Mansour",
    freelancer:"Ahmad Al-Zahrani",
    budget:"$1,800",
    progress:75,
    status:"Active",
    date:"Jun 1"
  },
  {
    id:2,
    project:"Mobile Banking App",
    client:"Rana Tamimi",
    freelancer:"Sara Hassan",
    budget:"$2,400",
    progress:45,
    status:"In Progress",
    date:"Jun 3"
  },
  {
    id:3,
    project:"AI Analytics Dashboard",
    client:"Omar Bashir",
    freelancer:"Mohammed Ali",
    budget:"$950",
    progress:100,
    status:"Completed",
    date:"May 28"
  },
  {
    id:4,
    project:"Brand Identity Design",
    client:"Khalid Mansour",
    freelancer:"Rana Tamimi",
    budget:"$600",
    progress:20,
    status:"Pending",
    date:"Jun 10"
  }
];


export default function AdminProjects(){

return(

<div className="projects-card">

<table className="projects-table">

<thead>
<tr>
<th>Project</th>
<th>Client</th>
<th>Freelancer</th>
<th>Budget</th>
<th>Progress</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>
</tr>
</thead>


<tbody>

{
projects.map((item)=>(
<tr key={item.id}>


<td className="project-name">
{item.project}
</td>


<td>
{item.client}
</td>


<td>
{item.freelancer}
</td>


<td className="budget">
{item.budget}
</td>


<td>

<div className="progress-box">

<div className="progress-line">

<span
style={{
width:`${item.progress}%`
}}
></span>

</div>

<small>
{item.progress}%
</small>

</div>

</td>


<td>

<span
className={`status ${
    item.status === "Active"
    ? "project-active"
    : item.status === "Completed"
    ? "project-completed"
    : item.status === "Pending"
    ? "project-pending"
    : "project-progress"
}`}
>
    {item.status}
</span>

</td>


<td>
{item.date}
</td>


<td>

<div className="actions">


  <button className="ban-btn">
                  <FaTrashAlt />
                </button>

</div>

</td>


</tr>
))
}


</tbody>


</table>

</div>

)

}