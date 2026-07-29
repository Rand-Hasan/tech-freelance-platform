import { Pagination } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import axios from "axios";
import { GetProposedProject } from "../services/projectproposal";
import { useNavigate } from "react-router-dom";
export default function ProjectProposal(){
   const cookies = new Cookies();
  const token = cookies.get('token-freelancer');
  console.log('tttt:',token)
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);         
  const [limit] = useState(4);               
  const [totalPages, setTotalPages] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const fetchProjects = async (currentPage) => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}${GetProposedProject}${currentPage}/${limit}`, {
      
        headers: { Authorization: `Bearer ${token}` }
      });

      setProjects(res.data.proposed_projetcs || []);
      // setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("خطأ أثناء جلب المشاريع المقترحة:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  // const handleOfferSubmit = (project) => {
  //   alert(`تقديم عرض على مشروع: ${project.title}`);
  // };

  return (
    <div style={{ maxWidth: '1300px', margin: '30px auto', padding: '0 15px' }}>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading proposed projetcs...</p>
      ) :projects.length > 0 ? (
        <div>
       { projects.map((proj) => (
          <ProjectCard
            key={proj.id} 
            project={proj} 
             
            // onSubmitOffer={handleOfferSubmit} 
          />
      ))}
      </div>
    ):(
        <div className="empty-invitations">
    <div className="empty-invitations-icon">
        🖥️
    </div>

    <p>No Proposed project found</p>
</div>
      )
      }

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#007a5a !important', 
              color: '#fff'
            }
          }}
        />
      </div>

    </div>
    )
}