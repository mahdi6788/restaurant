import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/// Get specific user by email
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: "Failed to fetch the user"})
  }
}