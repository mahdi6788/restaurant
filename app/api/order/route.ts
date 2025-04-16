'use server'
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  const orders = await prisma.order.findMany({
    where: { userId,
      items: {some:{}}
     },
    //  take: 1, // Limit to one result
     orderBy: {
      createdAt: "desc"  /// Get the most recent
     },
    include: { items: { include: { menuItem: true } } },
  });
  if (!orders) throw new Error("Not found any order")
  return NextResponse.json(orders);
}


export async function DELETE(req:NextRequest) {
  const {orderItemId} = await req.json()
  const session = await auth();
  const userId = session?.user?.id;
  const order = await prisma.order.findFirst({
    where: { userId },
    include: { items: true },
  });
  if (!order) throw new Error ("There is not any order!")

  await prisma.orderItem.delete({
    where: { id: orderItemId, orderId: order?.id },
  });
  return NextResponse.json({message: " Order removed successfully"});
}
