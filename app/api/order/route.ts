"use server";
import { prisma } from "@/app/lib/prisma";
import { checkoutSchema } from "@/app/lib/zod";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.nextUrl);
    const search = searchParams.get("search") ?? "";
    const sortby = searchParams.get("sortby") ?? "createdAt-desc";
    const createdAt = searchParams.get("createdAt") ?? "All";
    const id = searchParams.get("id") ?? "";

    let userId: string | undefined = session?.user?.id;

    if (session?.user.role === "ADMIN") {
      if (id) {
        userId = id;
      } else {
        userId = undefined; // Admins can see all orders
      }
    }

    let where: {
      userId: string | undefined;
      OR?: Array<
        | { id: { contains: string; mode: "insensitive" } }
        | { user: { name: { contains: string; mode: "insensitive" } } }
        | {
            items?: {
              some: {
                menuItem: {
                  OR?: Array<
                    | { farsiName: { contains: string; mode: "insensitive" } }
                    | { englishName: { contains: string; mode: "insensitive" } }
                  >;
                };
              };
            };
          }
      >;
      createdAt: { gte: Date; lte: Date };
    } = { userId, createdAt: { gte: new Date(0), lte: new Date() } };

    if (search && search.length > 2) {
      where = {
        ...where,
        OR: [
          { id: { contains: search, mode: "insensitive" } },
          { user: { name: { contains: search, mode: "insensitive" } } },
          {
            items: {
              some: {
                menuItem: {
                  OR: [
                    { farsiName: { contains: search, mode: "insensitive" } },
                    { englishName: { contains: search, mode: "insensitive" } },
                  ],
                },
              },
            },
          },
        ],
      };
    }

    if (createdAt === "today") {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const tomarrow = new Date(new Date(today).setDate(today.getDate() + 1));
      where = { ...where, createdAt: { gte: today, lte: tomarrow } };
    }

    const orderBy: { createdAt?: "asc" | "desc" } = {};
    if (sortby) {
      const [field, direction] = sortby.split("-");
      orderBy[field as "createdAt"] = direction as "asc" | "desc";
    }

    const orders = await prisma.order.findMany({
      where,
      //  take: 1, // Limit to one result
      orderBy,
      include: { user: true, items: { include: { menuItem: true } } },
    });

    if (!orders) throw new Error("Not found any order");
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { phone, address, total, userId } = checkoutSchema.parse(body);

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
        phone,
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


export async function DELETE(req: NextRequest) {
  const { orderItemId } = await req.json();
  const session = await auth();
  const userId = session?.user?.id;
  const order = await prisma.order.findFirst({
    where: { userId },
    include: { items: true },
  });
  if (!order) throw new Error("There is not any order!");

  await prisma.orderItem.delete({
    where: { id: orderItemId, orderId: order?.id },
  });
  return NextResponse.json({ message: " Order removed successfully" });
}
