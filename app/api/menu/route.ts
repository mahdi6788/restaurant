/// RESTful API approach: use API Route Handlers instead of using Server Actions (more Flexible for External Requests)

import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    /// connect to MongoDB
    const client = await clientPromise;
    /// select the database
    const db = client.db("FoodDatabase");
    /// fetch collections separately
    const foods = await db.collection("foods").find({}).toArray();
    const sideItems = await db.collection("sideItems").find({}).toArray();

    return NextResponse.json({foods, sideItems});
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: `Failed to fetch data: ${error}` },
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
    const food = await db
      .collection("foods")
      .insertOne({ title, description, price, image });
    return NextResponse.json({ id: food.insertedId.toString(), title, description, price, image  });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch data: ${error}` },
      { status: 500 }
    );
  }
}
