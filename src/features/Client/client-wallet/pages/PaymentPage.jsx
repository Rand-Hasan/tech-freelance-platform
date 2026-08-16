import { useLocation, useNavigate } from "react-router-dom";

import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import { stripePromise } from "../services/stripe";

import { useState } from "react";

import "../styles/Payment.css";


function PaymentContent() {

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const { state } = useLocation();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setErrorMessage("");


        const { error } = await stripe.confirmPayment({

            elements,

            confirmParams: {

                return_url:
                    window.location.origin +
                    "/clientlayout/payment-success"

            }

        });


        if (error) {

            setErrorMessage(
                error.message || "Payment failed."
            );

            setLoading(false);

        }

    };


    return (

        <div className="payment-page">

            <div className="payment-card">

                <div className="payment-header">

                    <h1>
                        Fund Contract
                    </h1>

                    <p>
                        Secure payment powered by Stripe.
                    </p>

                </div>


                <div className="payment-summary">

                    <div className="summary-row">

                        <span>
                            Contract
                        </span>

                        <strong>
                            #{state.contractId}
                        </strong>

                    </div>


                    <div className="summary-row">

                        <span>
                            Phase
                        </span>

                        <strong>
                            {state.phaseTitle}
                        </strong>

                    </div>


                    <div className="summary-row">

                        <span>
                            Amount
                        </span>

                        <strong>
                            ${state.amountToPay}
                        </strong>

                    </div>

                </div>


                <form
                    className="payment-form"
                    onSubmit={handleSubmit}
                >

                    <PaymentElement />


                    {errorMessage && (

                        <div className="payment-error">
                            {errorMessage}
                        </div>

                    )}


                    <button
                        type="submit"
                        className="pay-btn"
                        disabled={!stripe || !elements || loading}
                    >

                        {loading
                            ? "Processing..."
                            : `Pay $${state.amountToPay}`
                        }

                    </button>

                </form>


                <div className="payment-security">

                    🔒 Secure payment powered by Stripe.
                    Your card information is never stored
                    on our platform.

                </div>

            </div>

        </div>

    );

}


export default function PaymentPage() {

    const { state } = useLocation();


    if (!state?.clientSecret) {

        return (

            <div className="payment-page">

                <div className="payment-card">

                    <h2>
                        Invalid Payment Session
                    </h2>

                    <p>
                        Please start the payment again.
                    </p>

                </div>

            </div>

        );

    }


    return (

        <Elements

            stripe={stripePromise}

            options={{
                clientSecret: state.clientSecret
            }}

        >

            <PaymentContent />

        </Elements>

    );

}