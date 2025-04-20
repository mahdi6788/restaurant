"use server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.nextUrl);
  const search = searchParams.get("search");
  const sortby = searchParams.get("sortby");

  try {
    let where: {
      userId: string;
      OR?: Array<
        | { id: { contains: string; mode: "insensitive" } }
        | {
            items?: {
              some: {
                menuItem: { name: { contains: string; mode: "insensitive" } };
              };
            };
          }
      >;
    } = { userId };

    if (search && search.length > 2) {
      where = {
        ...where,
        OR: [
          { id: { contains: search, mode: "insensitive" } },
          {
            items: {
              some: {
                menuItem: {
                  name: { contains: search, mode: "insensitive" },
                },
              },
            },
          },
        ],
      };
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
      include: { items: { include: { menuItem: true } } },
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
