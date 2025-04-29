import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/// Get specific user by email
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const email = searchParams.get("email") ?? "";
    console.log(email)

    if (!email) throw new Error("The E-mail has problem ");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch the user" });
  }
}
