/// RESTful API approach: use API Route Handlers instead of using Server Actions (more Flexible for External Requests)

import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /// connect to MongoDB
    const client = await clientPromise;
    /// select the database
    const db = client.db("FoodDatabase");
    /// fetch collections separately
    const sideFoods = await db.collection("sideFoods").find({}).toArray();
    return NextResponse.json(sideFoods);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { title, description, price, image } = await req.json();
  try {
    /// connect to MongoDB
    const client = await clientPromise;
    /// select the database
    const db = client.db("FoodDatabase");
    /// fetch collections separately
    const sideFood = await db
      .collection("sideFoods")
      .insertOne({ title, description, price, image });
    return NextResponse.json({
      id: sideFood.insertedId.toString(),
      title,
      description,
      price,
      image,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create data", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, title, description, price, image } = await req.json();
  try {
    /// connect to MongoDB
    const client = await clientPromise;
    /// select the database
    const db = client.db("FoodDatabase");
    /// fetch collections separately
    const sideFood = await db
      .collection("sideFoods")
      .updateOne({ _id: new ObjectId(id) }, { $set: { title, description, price, image } });
    return NextResponse.json({
      id: sideFood.upsertedId?.toString(),
      title,
      description,
      price,
      image,
    });
  } catch(error){
    return NextResponse.json(
      { message: "Failed to update data", error },
      { status: 500 }
    );

  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try { 
    /// connect to MongoDB
    const client = await clientPromise;
    /// select the database
    const db = client.db("FoodDatabase");
    /// fetch collections separately
    const sideFood = await db.collection("sideFoods").deleteOne({ _id: new ObjectId(id) });
  }
}