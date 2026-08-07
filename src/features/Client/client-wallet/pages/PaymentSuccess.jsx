import { Link } from "react-router-dom";
import "../styles/PaymentSuccess.css";

export default function PaymentSuccess() {

    return (

        <div className="payment-success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>
                    Payment Successful
                </h1>

                <p>
                    Your payment has been processed successfully.
                    The contract has been funded and the freelancer
                    can now begin working on the project.
                </p>

                <div className="success-actions">

                    <Link
                        to="/clientlayout/contracts"
                        className="success-btn"
                    >
                        Back to Contracts
                    </Link>

                </div>

            </div>

        </div>

    );

}