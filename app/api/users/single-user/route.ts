import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/// Get specific user by email
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const email = searchParams.get("email") ?? "";
    const id = searchParams.get("id") ?? "";

    let user
    if(email && !id){
      user = await prisma.user.findUnique({
        where: {email}
      });
    }
    if(!email && id){
      user = await prisma.user.findUnique({
        where: {id}
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch the user" });
  }
}
