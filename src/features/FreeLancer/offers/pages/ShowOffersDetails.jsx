import axios from "axios";
import { useEffect, useState } from "react"
import { baseURL } from "../../../../services/Api/api";
import { GetOfferDetailes } from "../services/api_offers";
import '../styles/ShowOffersDetails.css';
import Cookies from "universal-cookie";

export default function ShowOffersDetails({onClose,offerdetails}){
    const cookies= new Cookies();
    const token= cookies.get('token-freelancer');
    const [offerDetails,setOfferDetails]=useState([]);
   useEffect(() => {
    if (offerdetails) {
        showofferdetails();
    }
}, [offerdetails]);
    const showofferdetails=async ()=>{
        try{
        const res= await axios.get(`${baseURL}${GetOfferDetailes}${offerdetails.offer_id}`,{
            headers:{Authorization:`Bearer ${token}`}
        });
        setOfferDetails(res.data.offer);
        }catch(err){
            console.log(err)
        }
    }
    return (

        <div className="offer-modal-overlay">

            <div className="offer-details-modal">

                <button 
                    className="offer-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>


                <div className="offer-modal-header">

                    <h2>
                        Offer Details
                    </h2>


                    <span className={`offer-status ${offerDetails.offerStatus}`}>
                        {offerDetails.offerStatus}
                    </span>

                </div>



                <div className="offer-details-content">


                    <div className="offer-detail-box">

                        <span>
                            💰 Price
                        </span>

                        <strong>
                            ${offerDetails.proposed_price}
                        </strong>

                    </div>



                    <div className="offer-detail-box">

                        <span>
                            📅 Duration
                        </span>

                        <strong>
                            {new Date(
                                offerDetails.proposed_duration
                            ).toLocaleDateString()}
                        </strong>

                    </div>



                    <div className="offer-detail-description">

                        <h3>
                            Proposal
                        </h3>

                        <p>
                            {offerDetails.proposalText}
                        </p>

                    </div>


                </div>



                {offerDetails.offerStatus === "pending" && (

                    <div className="offer-actions">

                        <button className="offer-edit-btn">
                            Edit Offer
                        </button>


                        <button className="offer-delete-btn">
                            Delete Offer
                        </button>

                    </div>

                )}


            </div>

        </div>

    );
}