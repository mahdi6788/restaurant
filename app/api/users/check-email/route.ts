import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req:NextRequest) {
  try {
    // Parse the request body to get the email
    const { email } = await req.json();

    // Validate email presence
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if the email exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { exists: true, message: 'Email already in use' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { exists: false, message: 'Email is available' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects
  }
}