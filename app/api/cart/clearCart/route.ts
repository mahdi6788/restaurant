import { clearCart } from "@/app/lib/cart";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    await clearCart(userId);
    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}