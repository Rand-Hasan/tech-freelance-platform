import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { GetProjectHasContracts } from "../services/api-myproject";
import Cookies from "universal-cookie";
import { Pagination } from "@mui/material";
import '../styles/myproject.css'
import { useNavigate } from "react-router-dom";
export default function MyProject() {

    const cookies = new Cookies();
    const token = cookies.get("token-freelancer");

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(6);
    const [limit] = useState(4);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const handlePageChange = (event, value) => {
        setPage(value);
    }
    useEffect(() => {
        ShowMyProject(page);
    }, [page]);

    const ShowMyProject = async (currentPage) => {
        try {

            const res = await axios.get(
                `${baseURL}${GetProjectHasContracts}${currentPage}/${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProjects(res.data.projects);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="my-projects">

            <h2 className="page-title">My Projects</h2>

            <div className="projects-grid">

                {projects.map((item) => (
                    <div className="project-card" key={item.id}>

                        <h3>{item.project_name}</h3>

                        <button className="view-btn" onClick={() => navigate(`/freelancerlayout/projectfree/phaseproject/${item.id}`)}>
                            View Phases
                        </button>

                    </div>
                ))}

            </div>
            <div className="offers-pagination">

                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        "& .Mui-selected": {
                            backgroundColor: "#007a5a !important",
                            color: "#fff",
                        },
                    }}
                />

            </div>



        </div>
    );
}