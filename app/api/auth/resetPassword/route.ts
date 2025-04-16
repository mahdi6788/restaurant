'use server'

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { getUserbyEmail } from '@/data/user';


export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
  
    /// check there is token in database and if it is valid
    const existingToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!existingToken || existingToken.expires < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
  
    /// check if there is user with this email related to the token
    const user = await getUserbyEmail(existingToken.email)
    if(!user) return NextResponse.json({error: "Email does not exist!"}, {status: 401});
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await prisma.user.update({
      where: { email: existingToken.email },
      data: { password: hashedPassword },
    });
  
    await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
  
    return NextResponse.json({ message: 'Password reset successfully' }, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: "Something went wrong!"}, {status: 500})
  }
}