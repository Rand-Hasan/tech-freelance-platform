import '../styles/CardInvitations.css'
export default function CardInvation({ Invation,onOpen }) {
    return (
        <div className="invitation-card">

            <div className="invitation-icon">
                📩
            </div>

            <div className="invitation-content">

                <h3 className="invitation-title">
                    <span>Direct Invitation:</span>{" "}
                    {Invation.project_name}
                </h3>

                <p className="invitation-client">
                    From: {Invation.client_name}
                </p>

            </div>

            <button className="invitation-arrow"
             onClick={onOpen}
            >
                →
            </button>

        </div>
    );
}


// import { useState } from "react";
// import '../styles/CardInvitations.css'

// export default function CardInvation({ Invation }) {

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     return (
//         <>
//             <div className="invitation-card">

//                 <div className="invitation-icon">
//                     📩
//                 </div>

//                 <div className="invitation-content">

//                     <h3 className="invitation-title">
//                         <span>Direct Invitation:</span>{" "}
//                         {Invation.project_name}
//                     </h3>

//                     <p className="invitation-client">
//                         From: {Invation.client_name}
//                     </p>

//                 </div>

//                 <button
//                     className="invitation-arrow"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     →
//                 </button>

//             </div>


//             {/* Modal */}

//             {isModalOpen && (

//                 <div
//                     className="invitation-modal-overlay"
//                     onClick={() => setIsModalOpen(false)}
//                 >

//                     <div
//                         className="invitation-modal"
//                         onClick={(e) => e.stopPropagation()}
//                     >

//                         <button
//                             className="modal-close-btn"
//                             onClick={() => setIsModalOpen(false)}
//                         >
//                             ×
//                         </button>


//                         <h2 className="modal-title">
//                             Direct Invitation:{" "}
//                             {Invation.project_name}
//                         </h2>


//                         <div className="modal-info">

//                             <span className="modal-badge">
//                                 From: {Invation.client_name}
//                             </span>

//                             <span className="modal-badge">
//                                 ⏱️ {Invation.days} Days
//                             </span>

//                             <span className="modal-price">
//                                 ${Invation.price}
//                             </span>

//                         </div>


//                         <p className="modal-description">
//                             {Invation.description}
//                         </p>


//                         <div className="modal-actions">

//                             <button className="accept-request-btn">
//                                 Accept Request
//                             </button>

//                             <button
//                                 className="decline-request-btn"
//                                 onClick={() => setIsModalOpen(false)}
//                             >
//                                 Decline Request
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </>
//     );
// }