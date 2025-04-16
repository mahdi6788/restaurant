import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await req.json();
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      }
    );
    if (twoFactorConfirmation) {
      await prisma.twoFactorConfirmation.delete({
        where: { id: twoFactorConfirmation.id },
      });
    }

    await prisma.twoFactorConfirmation.create({
      data: { userId: userId },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null);
  }
};
