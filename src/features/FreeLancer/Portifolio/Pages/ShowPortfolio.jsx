import "../../Portifolio/Styles/ShowPortfolio.css";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import { ShowPortofolio ,UpdatePortofolio,DeleteProjectFromPortofolio,AddProjectToPortofolio} from "../../Portifolio/Services/CreatePortofolioApi";
import Loading from "../../../../components/Loading/Loading";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function ShowPortfolio() {

  const cookies = Cookies();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [projectToDelete, setProjectToDelete] = useState(null);
  const [addError, setAddError] = useState("");
const [deleteId, setDeleteId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [showModal, setShowModal] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);

const [isAdding, setIsAdding] = useState(false);
const [projectName, setProjectName] = useState("");
const [photos, setPhotos] = useState([]);
const navigate = useNavigate();
  async function getPortfolio() {
    try {
      setLoading(true);
      setError("");

      const token = cookies.get("token-freelancer");


      const response = await axios.get(
        baseURL + ShowPortofolio,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      console.log(response.data);


      setProjects([response.data.freelancer_Portofolio]);


    } catch(err){

      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
        "Server Error"
      );

    } finally {
      setLoading(false);
    }
  }



  useEffect(()=>{
    getPortfolio();
  },[]);

async function handleUpdate(){

try{

const token = cookies.get("token-freelancer");


const body = new URLSearchParams();

body.append(
 "portofolio_title",
 selectedProject.portofolio_title
);

body.append(
 "description",
 selectedProject.description
);

body.append(
 "github_link",
 selectedProject.github_link
);




const response = await axios.post(
 baseURL + UpdatePortofolio,
 body,
 {
  headers:{
    Authorization:`Bearer ${token}`
  }
 }
);

console.log("UPDATE RESPONSE:", response.data);

await getPortfolio();
setShowModal(false);


}catch(err){

console.log(err.response?.data);

}

}
async function handleDeleteProject(){

  try{

    const token = cookies.get("token-freelancer");

    await axios.post(
      `${baseURL}${DeleteProjectFromPortofolio}${projectToDelete}`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    await getPortfolio();

    setShowDeleteModal(false);
    setProjectToDelete(null);

  }catch(err){

    console.log(err.response?.data || err.message);

  }



}async function handleAddProject(){

  try{

    setAddError("");

    const token = cookies.get("token-freelancer");

    const formData = new FormData();

    formData.append(
      "project_name",
      projectName
    );


    photos.forEach((photo)=>{
      formData.append(
        "photo",
        photo
      );
    });


    const response = await axios.post(
      baseURL + AddProjectToPortofolio,
      formData,
      {
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
      }
    );


    console.log("ADD PROJECT:", response.data);


    await getPortfolio();

    setIsAdding(false);
    setProjectName("");
    setPhotos([]);


  }catch (erro) {
    console.log("FULL ERROR:", erro.response?.data);

    const msg =
      erro.response?.data?.errors?.[0]?.message ||
      erro.response?.data?.message ||
      "Server Error";

  setAddError(msg);
  
  }finally {
      setLoading(false);
    }

  }

  return (
  <div className="portfolio-container">

      {loading && <Loading />}


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}



     
<div className="portfolio-layout">

  {/* Portfolio Info */}
  <div className="portfolio-side">

    <span className="portfolio-label">
      FEATURED PORTFOLIO
    </span>
{projects.map((item) => (
  <div key={item.id} className="featured-card-inner">
    <button
      className="edit-btn side-edit-btn"
      onClick={() => { setSelectedProject(item); setShowModal(true); }}
    >
      <FiEdit2 />
    </button>
    
   
    
    <h2>{item.portofolio_title}</h2>
    
    <p>{item.description}</p>
    
    <div className="portfolio-footer">
   <a
  href={item.github_link}
  target="_blank"
  rel="noreferrer"
  className="github-link"
>
  <FaGithub style={{ marginRight: '8px' ,fontSize:'20px'}} /> View Github 
</a>
    </div>
  </div>
))}

  </div>

 {/* Projects */}
{/* Projects */}
<div className="portfolio-grid">

  {projects[0]?.Protofolio_Projects?.map((project, index) => (
    <div className="portfolio-card" key={project.id}
    onClick={() => {
    cookies.set("project-id", project.id);
    navigate("/freelancerlayout/showprofile/showportofoliodetails");
  }}
   >
<button
 className="delete-project-btn"
onClick={(e)=>{
  e.stopPropagation();

  setProjectToDelete(project.id);
  setShowDeleteModal(true);
}}
>
 ×
</button>
      <div className="project-placeholder">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="card-body">
        <h3>{project.project_name}</h3>
      </div>
    </div>
  ))}

 {/* كارد الإضافة المتوسع */}
  {isAdding ? (
    <div className="add-project-form-card">
    {addError && (
  <div className="error-message">
    {addError}
  </div>
)}
     <input
  type="text"
  placeholder="Project Name"
  value={projectName}
  onChange={(e)=>setProjectName(e.target.value)}
/>
      <textarea placeholder="Description" />
      {/* منطقة رفع الصور */}
    <div className="upload-section">
      <label htmlFor="file-upload" className="custom-file-upload">
        <span>📷 Upload Screenshots</span>
      </label>
    <input
  id="file-upload"
  type="file"
  multiple
  accept="image/*"
  onChange={(e)=>{
    const files = Array.from(e.target.files);
    setPhotos(files);
  }}
/><div className="preview-images">

{
photos.map((image,index)=>(
  <img
    key={index}
    src={URL.createObjectURL(image)}
    alt="preview"
  />
))
}

</div>
    </div>
      <div className="form-actions">
      <button
  className="my-cancel-btn"
 onClick={() => {
  setIsAdding(false);
  setProjectName("");
  setPhotos([]);
  setAddError("");
}}
>
  Cancel
</button>
  <button
 className="my-save-btn"
 onClick={handleAddProject}
>
Add
</button>
      </div>
    </div>
  ) : (
    <div className="add-card" onClick={() => setIsAdding(true)}>
      <span>+</span>
      <p>Add Project</p>
    </div>
  )}
</div>
      
   

 
</div>
{showModal && (
  <div className="modal-overlay">

    <div className="modal-box">

      <h2>Edit Portfolio</h2>


    <input
  type="text"
  value={selectedProject.portofolio_title}
  onChange={(e)=>{
    setSelectedProject({
      ...selectedProject,
      portofolio_title:e.target.value
    });

    console.log("NEW TITLE:", e.target.value);
  }}
/>


      <textarea
        value={selectedProject.description}
        onChange={(e)=>
          setSelectedProject({
            ...selectedProject,
            description:e.target.value
          })
        }
      />


      <input
        type="text"
        value={selectedProject.github_link}
        onChange={(e)=>
          setSelectedProject({
            ...selectedProject,
            github_link:e.target.value
          })
        }
      />



      <div className="modal-actions">

      <button  className="cancel-btn"
  onClick={()=>{
    setShowModal(false)
  }}
>
  Cancel
</button>


       <button
  className="save-btn"
  onClick={handleUpdate}
>
  Save
</button>

      </div>


    </div>

  </div>
)}
{showDeleteModal && (
  <div className="modal-overlay">

    <div className="modal-box">

      <h2>Delete Project</h2>

      <p>
        Are you sure you want to delete this project?
      </p>

      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={()=>{
            setShowDeleteModal(false);
            setProjectToDelete(null);
          }}
        >
          Cancel
        </button>

        <button
          className="delete-btn"
          onClick={handleDeleteProject}
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}