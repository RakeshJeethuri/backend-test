import { NextResponse } from "next/server";
// import { query } from "@/lib/db";
import { users } from "@/app/userdata";
// POST request: login or create user
export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const result = users.find(
      (user: { email: string; password_hash: string; }) => user.email === email && user.password_hash === password
    );

    if (result) {
      const { password_hash, ...userWithoutPassword } = result;
      return NextResponse.json({ result: userWithoutPassword, success: true });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
