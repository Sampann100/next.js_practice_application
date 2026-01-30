import { connectDB } from "@/lib/mongodb";
import Product from "@/models/AddProduct";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedItem = await Product.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Item was deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log("Delete Item error:", err);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 },
    );
  }
}
