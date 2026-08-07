import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripe";
import PaymentForm from "./PaymentForm";
import "../styles/Payment.css";

export default function PaymentPage() {

    const { state } = useLocation();

    if (!state) {
        return (
            <div className="payment-page">
                <div className="payment-card">
                    <h2>Invalid Payment Session</h2>
                </div>
            </div>
        );
    }

    return (

        <div className="payment-page">

            <div className="payment-card">

                <h1 className="payment-title">
                    Fund Contract
                </h1>

                <p className="payment-description">
                    Complete your payment securely through Stripe.
                    Your payment will be held safely in escrow until the freelancer completes the phase.
                </p>

                <div className="payment-summary">

                    <div className="summary-row">
                        <span>Contract</span>
                        <strong>#{state.contractId}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Phase</span>
                        <strong>{state.phaseTitle}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Amount</span>
                        <strong>${state.amountToPay}</strong>
                    </div>

                </div>

                <div className="payment-security">
                    🔒 Secure payment powered by Stripe.
                    Your card information is never stored on our platform.
                </div>

                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: state.clientSecret,
                    }}
                >
                    <PaymentForm amount={state.amountToPay} />
                </Elements>

            </div>

        </div>

    );

}