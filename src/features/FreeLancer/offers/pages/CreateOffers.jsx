import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "../../project-proposal/styles/ProjectCardDetails.css";
import { baseURL } from "../../../../services/Api/api";
import { GetOfferDetailes, MakeOffer, UpdateOffer } from "../services/api_offers";

export default function CreateOffers({ proposalDetails, onClose, mode = 'create', offerId }) {
    const cookies = new Cookies();
    const token = cookies.get("token-freelancer");
    const [message, setMessage] = useState("");
    const [data, setData] = useState({
        proposed_price: "",
        proposed_duration: "",
        proposalText: "",
    });

    function handlechange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async () => {
        try {
            setMessage("");

            const url =
                mode === "create"
                    ? `${baseURL}${MakeOffer}${proposalDetails.id}`
                    : `${baseURL}${UpdateOffer}${offerId}`;

            const successMessage =
                mode === "create"
                    ? "Offer sent successfully."
                    : "Offer updated successfully.";

            await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(successMessage);

        } catch (err) {
            if (err.response?.data?.errors?.length > 0) {
                setMessage(err.response.data.errors[0].message);
            } else {
                setMessage("Something went wrong.");
            }
        }
    };
    useEffect(() => {
        getOfferDetails();
    }, []);
    const getOfferDetails = async () => {
        try {
            const res = await axios.get(`${baseURL}${GetOfferDetailes}${offerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setData({
                proposed_price: res.data.offer.proposed_price,
                proposed_duration: res.data.offer.proposed_duration.split("T")[0],
                proposalText: res.data.offer.proposalText,
            });
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="proposal-modal-overlay">
            <div className="proposal-modal">

                <button
                    className="proposal-close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="proposal-title">
                    {mode === "create"
                        ? "Submit Offer"
                        : "Edit Offer"}
                </h2>

                {message && (
                    <p className="proposal-message">
                        {message}
                    </p>
                )}

                {proposalDetails && (
                    <p className="proposal-project-name">
                        {proposalDetails.project_name}
                    </p>
                )}

                <div className="proposal-inputs-row">

                    <div className="proposal-input-group">
                        <label>Delivery Date</label>

                        <input
                            type="date"
                            name="proposed_duration"
                            value={data.proposed_duration}
                            onChange={handlechange}
                            className="proposal-input"
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    <div className="proposal-input-group">
                        <label>Bid Amount ($)</label>

                        <input
                            type="number"
                            name="proposed_price"
                            value={data.proposed_price}
                            onChange={handlechange}
                            className="proposal-input"
                            placeholder="e.g. 1800"
                        />
                    </div>

                </div>

                <div className="proposal-textarea-group">

                    <label>Proposal & Planning Details</label>

                    <textarea
                        name="proposalText"
                        value={data.proposalText}
                        onChange={handlechange}
                        className="proposal-textarea"
                        placeholder="Describe your approach and implementation plan..."
                    />

                </div>

                <button
                    className="proposal-submit-btn"
                    onClick={handleSubmit}
                >
                    {mode === "create"
                        ? "Send Proposal"
                        : "Save Changes"}
                </button>

            </div>
        </div>
    );
}