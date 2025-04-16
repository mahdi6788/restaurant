'use server'

import { prisma } from "@/app/lib/prisma";

export const getUserbyId = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("No user found with this email");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
