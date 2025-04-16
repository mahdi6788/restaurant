import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({
    where:{email}
  })
  if(!user) throw new Error ("User not found")
  try {
    await prisma.user.delete({
      where: { email },
    });
    return NextResponse.json({status: 204});
  } catch (error) {
    console.error(error)
    return NextResponse.json({status:404});
  }
}
