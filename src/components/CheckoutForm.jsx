import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const CheckoutForm = ({ coins, price, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { refetchUserData } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setErrorMessage("");

        // Confirm the payment using PaymentElement
        // This handles card, bank, etc. automatically
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                // Return URL is required for some payment methods
                return_url: `${window.location.origin}/dashboard/purchase-coin`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                // Notify backend to credit coins
                await api.post("/payments/confirm", {
                    amount: price,
                    coins: coins,
                    payment_intent_id: paymentIntent.id
                });

                // Refresh coin balance in header/context
                await refetchUserData();

                onSuccess();
            } catch (err) {
                console.error("Server confirmation failed:", err);
                setErrorMessage("Payment was successful but we couldn't update your coins. Please contact support.");
            }
        } else if (paymentIntent && paymentIntent.status === "processing") {
            setErrorMessage("Your payment is processing. Coins will be added once confirmed.");
        } else {
            setErrorMessage("Something went wrong with the payment.");
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} id="payment-form" className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                <p className="text-sm text-gray-500">Securely pay with your credit card or available methods.</p>
            </div>

            <PaymentElement />

            {errorMessage && (
                <div className="p-4 bg-red-50 rounded-xl flex items-start gap-3 border border-red-100">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
                </div>
            )}

            <button
                disabled={!stripe || processing}
                className="w-full relative bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden shadow-lg shadow-indigo-200"
            >
                <div className="relative z-10 flex items-center justify-center gap-3">
                    {processing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Confirm & Pay ${price}.00</span>
                        </>
                    )}
                </div>
                {/* Glossy overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
            </button>

            <p className="text-center text-xs text-gray-400 font-medium">
                Payments are encrypted and processed securely by Stripe. We do not store your card details.
            </p>
        </form>
    );
};

export default CheckoutForm;
