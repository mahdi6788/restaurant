/*
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { sendPasswordResetEmail } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' });

  const token = randomUUID();
  await prisma.passwordReset.create({
    data: { userId: user.id, token, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  });

  await sendPasswordResetEmail(email, token);
  return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' });
}
*/