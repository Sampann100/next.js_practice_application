import { connectDB } from "@/lib/mongodb";
import Product from "@/models/AddProduct";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const query =
      search.trim() === ""
        ? {}
        : {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { category: { $regex: search, $options: "i" } },
            ],
          };

    const [products, totalItems] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json(
      {
        success: true,
        products,
        totalItems,
        totalPages,
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}
