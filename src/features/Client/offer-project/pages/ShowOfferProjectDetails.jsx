import axios from "axios";
import Cookies from "cookie-universal";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ShowOfferProjectDetails.css";
import { GetOfferDetailes } from "../../../FreeLancer/offers/services/api_offers";
import { ReposedOffer } from "../services/api-offerproject";

export default function ShowOfferProjectDetails({ onClose, refreshOffers, offerdetails }) {

    const cookies = new Cookies();
    const token = cookies.get("token-client");

    const navigate = useNavigate();
    const [offerDetails, setOfferDetails] = useState(null);

    useEffect(() => {
        showOfferprojectdetail();
    }, [offerdetails.offer_id]);

    const showOfferprojectdetail = async () => {

        try {

            const res = await axios.get(
                `${baseURL}${GetOfferDetailes}${offerdetails.offer_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOfferDetails(res.data.offer);

        } catch (err) {
            console.log(err);
        }

    };

    if (!offerDetails) return null;
    const handlerespond = async (id, reposed) => {
        try {
            const res = await axios.post(`${baseURL}${ReposedOffer}${id}`, {
                reposed: reposed
            }, { headers: { Authorization: `Bearer ${token}` } })
            navigate(`/clientlayout/messageClient/${offerdetails.freelancer_id}`)
            //     onClose();              
            // refreshOffers();   
        } catch (err) {
            console.log(err.message)
        }
    }
    return (

        <div className="client-offer-overlay">

            <div className="client-offer-modal">

                <button
                    className="client-close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="client-offer-title">
                    Offer Details
                </h2>

                <p className="client-name">
                    {offerDetails.freelancer_name}
                </p>

                <span className={`client-status ${offerDetails.offerStatus}`}>
                    ● {offerDetails.offerStatus}
                </span>

                <div className="client-info-row">

                    <div className="client-info-card">

                        <span>
                            💲 Proposed Price
                        </span>

                        <strong>
                            ${offerDetails.proposed_price}
                        </strong>

                    </div>

                    <div className="client-info-card">

                        <span>
                            📅 Duration
                        </span>

                        <strong>
                            {new Date(
                                offerDetails.proposed_duration
                            ).toLocaleDateString()}
                        </strong>

                    </div>

                </div>

                <div className="client-proposal-box">

                    <h4>
                        Proposal
                    </h4>

                    <p>
                        {offerDetails.proposalText}
                    </p>

                </div>

                {offerDetails.offerStatus === "pending" && (

                    <div className="client-offer-actions">

                        <button className="accept-offer-btn" onClick={() => handlerespond(offerdetails.offer_id, 'Ok')}>
                            Accept Offer
                        </button>

                        <button className="reject-offer-btn" onClick={() => handlerespond(offerdetails.offer_id, 'No')}>
                            Reject Offer
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}