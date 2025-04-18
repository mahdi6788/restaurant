import { prisma } from "@/app/lib/prisma";
import { checkoutSchema } from "@/app/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { address, total, userId } = checkoutSchema.parse(body);

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { menuItem: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    /// if the cart exists, convert cart to order
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        total,
        status: "COMPLETED",
        items: {
          create: cart.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.menuItem.price,
          })),
        },
      },
      include: { items: { include: { menuItem: true } } },
    });

    /// delete the cart item after creating the order
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(", ") },
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
