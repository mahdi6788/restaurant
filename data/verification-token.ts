'use server'

import { prisma } from "@/app/lib/prisma";

export const getVerificationTokenbyToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    console.log("verificationTokenError: ", error)
    return null;
  }
};

export const getVerificationTokenbyEmail = async (email: string) => {
  try {
    const VerificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return VerificationToken;
  } catch {
    return null;
  }
};
