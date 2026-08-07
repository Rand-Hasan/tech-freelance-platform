// import {
//     PaymentElement,
//     useStripe,
//     useElements,
// } from "@stripe/react-stripe-js";

// export default function PaymentForm() {

//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         if (!stripe || !elements) return;

//         const { error } = await stripe.confirmPayment({

//             elements,

//             confirmParams: {
//                 return_url:
//                     window.location.origin +
//                     "/clientlayout/payment-success"


//             },

//         });

//         if (error) {
//             alert(error.message);
//         }

//     };

//     return (

//         <form onSubmit={handleSubmit}>

//             <PaymentElement />

//             <button type="submit">
//                 Pay Now
//             </button>

//         </form>

//     );

// }


import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import { useState } from "react";

export default function PaymentForm({ amount }) {

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMessage("");

        const { error } = await stripe.confirmPayment({

            elements,

            confirmParams: {

                return_url:
                    window.location.origin +
                    "/clientlayout/payment-success",

            },

        });

        if (error) {

            setErrorMessage(error.message);
            setLoading(false);

        }

    };

    return (

        <form
            className="payment-form"
            onSubmit={handleSubmit}
        >

            <PaymentElement />

            {
                errorMessage &&

                <p className="payment-error">
                    {errorMessage}
                </p>
            }

            <button
                className="pay-btn"
                type="submit"
                disabled={!stripe || loading}
            >

                {
                    loading
                        ? "Processing..."
                        : `Pay $${amount}`
                }

            </button>

        </form>

    );

}