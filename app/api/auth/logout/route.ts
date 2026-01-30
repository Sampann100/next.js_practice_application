import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json(
      {
        message: "Successfully logout",
      },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (err) {
    console.log("logout error: ", err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
