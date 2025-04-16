import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    if (!twoFactorToken)
      return NextResponse.json({ error: "Invalid code!" }, { status: 400 });
    if (twoFactorToken.expires < new Date())
      NextResponse.json({ error: "Code expired!" }, { status: 401 });

    await prisma.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null);
  }
};