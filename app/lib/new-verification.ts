'use server'

import { getUserbyEmail } from "@/data/user";
import { getVerificationTokenbyToken } from "@/data/verification-token";
import { prisma } from "./prisma";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenbyToken(token);

    if (!existingToken?.token) {
      return { error: "Token does not exist" };
    }
  
    const hasExpired = new Date(existingToken.expires) < new Date();
  
    if (hasExpired) {
      return { error: "Token has expired!" };
    }
  
    const existingUser = await getUserbyEmail(existingToken.email);
  
    if (!existingUser) {
      return { error: "Email does not exist" };
    }
  
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), email: existingToken.email },
    });
  
    await prisma.verificationToken.delete({
      where:{id: existingToken.id}
    })
  
    return {success: 'Email verified!'}
  } catch (error) {
    console.error("Error in newVerification:", error)
    return {error: "An unexpected error occured"}
  }
};
