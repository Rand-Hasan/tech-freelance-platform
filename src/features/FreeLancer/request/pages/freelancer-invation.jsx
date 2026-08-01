import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { RespondToInvitation, ShowInitaions, ShowInvitaionById } from "../services/api-invit";
import CardInvation from "../components/CardInvation";
import { Pagination } from "@mui/material";
import '../styles/ShowInvationFree.css';
import { useNavigate } from "react-router-dom";
export default function ShowInvationFree() {
    const cookies = new Cookies();
    const token = cookies.get('token-freelancer');
    const navigate = useNavigate();
    console.log(token)
    const [Invitations, setInvitations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(6);
    const [limit] = useState(4);
    const [loading, setLoading] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    useEffect(() => {
        showInvitation(page);
    }, [page])

    const showInvitation = async (currentPage) => {
        setLoading(true);
        setInvitations([]);

        try {
            const res = await axios.get(
                `${baseURL}${ShowInitaions}${currentPage}/${limit}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const filteredInvitations = res.data.invitations.filter(
                (invitation) =>
                    invitation.status === "pending" ||
                    invitation.status === "canceled"
            );

            setInvitations(filteredInvitations);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    }
    const showInvitationDetails = async (id) => {
        try {
            const res = await axios.get(`${baseURL}${ShowInvitaionById}${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSelectedInvitation(res.data.invitation)
        } catch (err) {
            console(err)
        }
    }
    const RespondInvitation = async (id, respond) => {
        try {
            const res = await axios.post(`${baseURL}${RespondToInvitation}${id}`, { respond: respond }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res.data)
            setSelectedInvitation(null);

            showInvitation(page);
            if (respond == 'Ok') {
                navigate(`/freelancerlayout/messagefree/${selectedInvitation.project.clientId}`)
            }
        } catch (err) {
            console.log('hfujfdjjfiojdoiskdksdssklklsdksljdjf')
        }
    }

    return (
        <div>
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading invitations...</p>
            ) : Invitations.length > 0 ? (
                <div className="invitations-list">
                    {Invitations.map((invit) => (
                        <CardInvation
                            key={invit.id}
                            Invation={invit}
                            onOpen={() => showInvitationDetails(invit.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-invitations">
                    <div className="empty-invitations-icon">
                        📩
                    </div>

                    <p>No invitations found</p>
                </div>
            )}
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
            {selectedInvitation && (
                <div
                    className="invitation-modal-overlay"
                    onClick={() => setSelectedInvitation(null)}
                >

                    <div
                        className="invitation-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="modal-close-btn"
                            onClick={() => setSelectedInvitation(null)}
                        >
                            ×
                        </button>


                        <h2 className="modal-title">
                            Direct Invitation: {selectedInvitation.project.project_name}
                        </h2>

                        <div className="modal-info">

                            <span className="modal-badge">
                                👤 From: {selectedInvitation.client_name}
                            </span>

                            <span className="modal-badge">
                                🕒 {new Date(selectedInvitation.project.project_deadline).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </span>

                            <span className="modal-price">
                                ${selectedInvitation.project.price}
                            </span>

                        </div>

                        <p className="modal-description">
                            {selectedInvitation.project.description}
                        </p>

                        <div className="modal-actions">

                            <button className="accept-request-btn"
                                onClick={() => RespondInvitation(selectedInvitation.id, 'Ok')}
                            >
                                Accept Request
                            </button>

                            <button
                                className="decline-request-btn"
                                onClick={() => RespondInvitation(selectedInvitation.id, 'No')}
                            >
                                Decline Request
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}