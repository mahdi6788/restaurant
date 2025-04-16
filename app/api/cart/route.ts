import { NextRequest, NextResponse } from "next/server";
import {
  addToCart,
  getOrCreateCart,
  removeFromCart,
} from "@/app/lib/cart";
import { auth } from "@/auth";
import { addToCartSchema } from "@/app/lib/zod";
import { z } from "zod";

/// GET
export async function GET() {
  try {
    /// fetches the session data for the currently authenticated user on the server side, ensuring that sensitive session data is not exposed to the client.
    const session = await auth();
    /// returns an object representing the user's session like ID, email, roles, or other metadata.
    const userId = session?.user?.id;
    const cart = await getOrCreateCart(userId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/// POST
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const body = await req.json();
    const { menuItemId, quantity } = addToCartSchema.parse(body);
    await addToCart(userId, { menuItemId, quantity });
    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { cartItemId } = await req?.json();
    await removeFromCart(userId, cartItemId);
    return NextResponse.json(
      { message: "Item removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
