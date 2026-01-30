import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { UserModel } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, address, password, confirmPassword } =
      await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 201 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserModel.create({
      firstName,
      lastName,
      email,
      address,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
