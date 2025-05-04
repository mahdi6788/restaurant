"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentForm: React.FC = () => {
  const connectionError = true

  const { total } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const address = session?.user?.address;
  const phone = session?.user?.phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend to create a PaymentIntent
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          phone,
          address,
          userId,
          paymentMethod: "ONLINE",
        }),
      });
      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error("Failed to create payment intent");
      }

      // Confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        alert("Payment succeeded!");
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while processing your payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen text-orange-500 bg-emerald-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:dark-mode p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Payment Details
          </h2>
          <p className="mt-2 text-center text-sm ">
            Secure payment processing with Stripe
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {connectionError 
          && <p className="text-red-700 animate-bounce">Sorry, online payment is not available now</p>
        }
          <div>
            <label className="block text-sm font-medium ">Card Details</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {paymentSuccess && (
            <div className="text-green-600 text-sm">Payment successful!</div>
          )}
          <button
            type="submit"
            disabled={connectionError ? true : !stripe || isLoading} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : `Pay AED ${total} `}
          </button>
        </form>
      </div>
    </section>
  );
};

// Wrap the component with Stripe Elements provider
const PaymentFormWrapper: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentFormWrapper;
