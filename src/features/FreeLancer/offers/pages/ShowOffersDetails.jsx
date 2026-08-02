import axios from "axios";
import { useEffect, useState } from "react"
import { baseURL } from "../../../../services/Api/api";
import { Cancel_Offer, GetOfferDetailes } from "../services/api_offers";
import '../styles/ShowOffersDetails.css';
import Cookies from "universal-cookie";
import CreateOffers from "./CreateOffers";

export default function ShowOffersDetails({ onClose, offerdetails }) {
    const cookies = new Cookies();
    const token = cookies.get('token-freelancer');
    const [offerDetails, setOfferDetails] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        if (offerdetails) {
            showofferdetails();
        }
    }, [offerdetails]);

    const showofferdetails = async () => {
        try {
            const res = await axios.get(`${baseURL}${GetOfferDetailes}${offerdetails.offer_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOfferDetails(res.data.offer);
        } catch (err) {
            console.log(err)
        }
    }
    const handleDeleteOffer = async (id) => {
        try {
            const res = await axios.post(`${baseURL}${Cancel_Offer}${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('truuuuuuio')
            setOfferDetails({
                ...offerDetails,
                offerStatus: "canceled"
            });
        } catch (err) {
            console.log(err)
        }
    }
    return (

        <div className="offer-modal-overlay">

            <div className="offer-details-modal">




                <div className="offer-modal-header">

                    <div>
                        <h2 className="offer-title">
                            Offer Details
                        </h2>

                        <p className="offer-client">
                            {offerDetails.client_name}
                        </p>

                        <span className={`offer-status ${offerDetails.offerStatus}`}>
                            ● {offerDetails.offerStatus}
                        </span>
                    </div>

                    <button
                        className="offer-close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <div className="offer-details-content">


                    <div className="offer-info-row">

                        <div className="offer-info-box">

                            <span className="offer-label">
                                💲 Proposed Price
                            </span>

                            <strong>
                                ${offerDetails.proposed_price}
                            </strong>

                        </div>

                        <div className="offer-info-box">

                            <span className="offer-label">
                                📅 Proposed Duration
                            </span>

                            <strong>
                                {new Date(
                                    offerDetails.proposed_duration
                                ).toLocaleDateString()}
                            </strong>

                        </div>

                    </div>



                    <div className="proposal-section">

                        <h4>
                            📄 PROPOSAL TEXT
                        </h4>

                        <p>
                            {offerDetails.proposalText}
                        </p>

                    </div>

                </div>



                {offerDetails.offerStatus === "pending" && (

                    <div className="offer-actions">

                        <button className="edit-offer-btn"
                            onClick={() => setIsEdit(true)}
                        >
                            Edit Offer
                        </button>

                        {isEdit && (
                            <CreateOffers
                                mode="edit"
                                offerId={offerdetails.offer_id}
                                onClose={() => setIsEdit(false)}
                            />
                        )}

                        <button className="delete-offer-btn"
                            onClick={() => handleDeleteOffer(offerdetails.offer_id)}
                        >
                            Delete Offer
                        </button>

                    </div>
                )}


            </div>

        </div>

    );
}