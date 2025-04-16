import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//GET ALL menu
export async function GET() {
  try {
    const menu = await prisma.menuItem.findMany();
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch menu", error },
      { status: 500 }
    );
  }
}

//CREATE A NEW menu
export async function POST(req: NextRequest) {
  const { name, description, price, category, imageUrl } = await req.json();
  try {
    const menu = await prisma.menuItem.create({
      data: { name, description, price, category, imageUrl },
    });
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create menu", error },
      { status: 500 }
    );
  }
}

//UPDATE A menu
export async function PUT(req: NextRequest) {
  const { id, name, description, price, category, imageUrl, isAvailable } =
    await req.json();
  try {
    const updatemenu = await prisma.menuItem.update({
      where: { id: id },
      data: { name, description, price, category, imageUrl, isAvailable },
    });
    return NextResponse.json(updatemenu, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update menu", error },
      { status: 500 }
    );
  }
}

//DELETE A menu
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await prisma.menuItem.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "menu deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete menu", error },
      { status: 500 }
    );
  }
}
