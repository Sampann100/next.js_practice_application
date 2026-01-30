import { connectDB } from "@/lib/mongodb";
import Product from "@/models/AddProduct";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, price, category, rating, imageUrl } = await req.json();

    if (!name || !price || !category || !rating || !imageUrl) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const product = await Product.create({
      name,
      price,
      category,
      rating,
      imageUrl,
    });

    return NextResponse.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error in add product route:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
