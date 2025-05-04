import { clearCart } from "@/app/lib/cart";
import { createOrder } from "@/app/lib/orederActions";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, phone, address, userId, paymentMethod } = await req.json();

    if(paymentMethod === "ONLINE") {
      // Create a PaymentIntent with the specified amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "aed",
        automatic_payment_methods: { enabled: true },
      });
    
    /// make order after payment
    await createOrder({ phone, address, total: amount, userId, paymentMethod, status: "COMPLETED" });

    /// delete the cart after making order
    await clearCart(userId);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } else if (paymentMethod === "COD"){

    /// make order after payment
    await createOrder({ phone, address, total: amount, userId, paymentMethod, status: "PENDING" });

    /// delete the cart after making order
    await clearCart(userId);

    return NextResponse.json({ message: 'COD order created' });
  }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
