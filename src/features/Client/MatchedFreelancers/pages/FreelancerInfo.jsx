import { useEffect, useState } from 'react';
import '../styles/FreelancerInfo.css';
import Cookies from "universal-cookie";
import axios from 'axios';
import { baseURL } from '../../../../services/Api/api';
import { ReviewsGetFreelancerReviews, ShowPortofolioForClient } from '../services/getFreelancersApi';
import { useNavigate, useParams } from 'react-router-dom';
export default function FreeLanceInfo() {
    const { id } = useParams();
    console.log(id)
    const cookies = new Cookies();
    const token = cookies.get("token-client");
    const [showPortfolio, setshowPortfolio] = useState([]);
    const [showRating, setshowRating] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        showPortfoliofree()
    }, []);
     useEffect(() => {
        showRatingfree()
    }, []);
    const showPortfoliofree = async () => {
        try {
            const res = await axios.get(`${baseURL}${ShowPortofolioForClient}${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setshowPortfolio(res.data.freelancer_Portofolio);
        } catch (err) {
            console.log(err.message?.data)
        }
    }
    const[page,setpage]= useState(1);
    const [totalpage,settotalpage]= useState(10);
    const [limit]=useState(10)
    const showRatingfree = async () => {
        try {
            const res = await axios.get(`${baseURL}${ReviewsGetFreelancerReviews}${id}/${page}/${limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setshowRating(res.data.reviews);
            console.log(id)
        } catch (err) {
            console.log(err.message?.data)
        }
    }

    return (
        <div className="freelancer-profile-details">
          <button
        onClick={() => navigate(-1)}
        className="backkkk-btn"
    >
        ← Back 
    </button>
            {/* ================= Portfolio Card ================= */}
            <div className="freelancer-details-card">

                <div className="details-card-header">
                    <div>
                        <h2>Portfolio</h2>
                        <p>Professional work and projects</p>
                    </div>

                    <a
                        href={showPortfolio.github_link}
                        className="github-button"
                    >
                        GitHub ↗
                    </a>
                </div>

                <div className="portfolio-description">
                    <h3>{showPortfolio.portofolio_title}</h3>

                    <p>
                        {showPortfolio.description}
                    </p>
                </div>

                <div className="portfolio-projects-grid">

                    <div className="portfolio-project">
                        <div className="portfolio-project-icon">
                            💼
                        </div>

                        <div>
                            {showPortfolio?.Protofolio_Projects?.map((project) => (
                                <div key={project.id}>
                                    <h4>{project.project_name}</h4>
                                </div>
                            ))}

                            <span>Portfolio Project</span>
                        </div>
                    </div>

                </div>
            </div>


            {/* ================= Reviews Card ================= */}
            <div className="freelancer-details-card">

                <div className="details-card-header">
                    <div>
                        <h2>Reviews</h2>
                        <p>Client feedback and ratings</p>
                    </div>

                    <div className="reviews-count">
                        1 Review
                    </div>
                </div>

               {showRating?.map((rev) => (
  <div className="review-box" key={rev.id}>

    <div className="review-header">

      <div className="review-stars">
        {"★".repeat(rev.rating)}
        {"☆".repeat(5 - rev.rating)}
      </div>

      <span className="review-score">
        {rev.rating}/5
      </span>

    </div>

    <p className="review-text">
      {rev.comment}
    </p>

  </div>
))}

            </div>

        </div>
    );
}