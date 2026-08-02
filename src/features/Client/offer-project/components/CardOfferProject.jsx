export default function CardOfferProject({offers,onOpen}){
    return(
        <div className="offer-card">

            <div className="offer-id-box">
                📤
            </div>

            <div className="offer-info">

                <p className="offer-label">
                    OFFER 
                </p>

                <h3 className="offer-client-name">
                    {offers.freelancdr_name}
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
    )
}