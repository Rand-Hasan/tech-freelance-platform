import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { GetClientProjectById } from "../../../Client/client-projects/services/api_project";
import "../styles/ProjectCardDetails.css";
import CreateOffers from "../../offers/pages/CreateOffers";
import { baseURL } from "../../../../services/Api/api";

export default function ProjectProposalDetails() {
    const cookies = new Cookies();
    const token = cookies.get("token-freelancer");
    const navigate = useNavigate();
    const { id } = useParams();
    const [proposalDetails, setProposalDetails] = useState(null);
    const [message, setMessage] = useState("");
    const [isModel, setIsModel] = useState(false);

    useEffect(() => {
        getProposedDetails();
    }, [id]);

    const getProposedDetails = async () => {
        try {
            const res = await axios.get(
                `${baseURL}${GetClientProjectById}${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProposalDetails(res.data.project);

        } catch (err) {
            console.error(
                "خطأ أثناء جلب تفاصيل المشروع:",
                err
            );
        }
    };

    if (!proposalDetails) {
        return <p>Loading...</p>;
    }

    // const handleSubmit = async (id) => {
    //     try {
    //         const res = await axios.post(`${baseURL}${MakeOffer}${id}`, data, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         console.log('truuuuuuuuuuuuuuuuuuu')
    //     } catch (err) {
    //         console.log('hwidjisjipdoikikdmkjdnsidjs ')
    //     }
    // }

    return (
        <div className="project-details-page">
            <button
                className="back-projects-btn"
                onClick={() => navigate(-1)}
            >
                ← Back to Projects
            </button>

            <div className="project-details-header-card">

                <div className="project-details-title-section">

                    <div className="project-details-icon">
                        🖥️
                    </div>

                    <div>
                        <h1>
                            {proposalDetails.project_name}
                        </h1>

                        <span>
                            Project Details
                        </span>
                    </div>

                </div>

                <div className="project-details-price">
                    ${proposalDetails.price}
                </div>

            </div>
            <div className="project-description-section">

                <h2>
                    📄 About this project
                </h2>

                <p>
                    {proposalDetails.description}
                </p>

            </div>

            <div className="project-details-grid">
                <div className="project-info-card">

                    <h2>
                        Project Information
                    </h2>


                    <div className="project-info-list">

                        <div className="project-info-item">

                            <span className="info-label">
                                ⏱ Duration
                            </span>

                            <strong>
                                {proposalDetails.project_deadline}
                            </strong>

                        </div>


                        <div className="project-info-item">

                            <span className="info-label">
                                ⚡ Experience Level
                            </span>

                            <strong>
                                {proposalDetails.level_project}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="submit-offer-card">

                    <h2>
                        Ready to work?
                    </h2>

                    <p>
                        Submit your offer for this project.
                    </p>

                    <button
                        className="details-submit-offer"
                        onClick={() => setIsModel(true)}>
                        Submit Offer
                    </button>

                </div>

            </div>
            {isModel && (
                <CreateOffers
                    proposalDetails={proposalDetails}
                    onClose={() => setIsModel(false)}
                />
            )}
        </div>

    );
}