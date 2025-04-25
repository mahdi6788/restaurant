"use server";

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

/// Get all users
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "You are not Admin!" }, { status: 400 });
  }
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

/// Create user
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password, address, phone } = await req.json();
    /// Check if user already exists
    const existInUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existInUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    /// Hash password server side to avoid exposing bcryptjs in the browser
    const hashedPassword = await bcrypt.hash(password, 10);
    /// Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        phone,
        role: "CUSTOMER",
      },
    });
    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

/// Update user
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId, name, address, phone } = await req.json();
    /// Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    /// Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, address, phone },
    });
    return NextResponse.json(
      { message: "User profile updated successfully", userId: updatedUser.id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/// Delete user
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await req.json();
    /// Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    /// Delete user
    await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
