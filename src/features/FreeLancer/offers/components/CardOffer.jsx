import { useState } from 'react';
import '../styles/CardOffer.css';
export default function CardOffer({ offers, onOpen }) {
    
    return (
        <div className="offer-card">

            <div className="offer-id-box">
                📤
            </div>

            <div className="offer-info">

                <p className="offer-label">
                    OFFER 
                </p>

                <h3 className="offer-client-name">
                    {offers.client_name}
                </h3>

            </div>

            <button
                className="offer-details-btn"
                onClick={onOpen}
            >
                View Details
                <span className="offer-arrow">→</span>
            </button>

        </div>
    );
}