import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// POST request: login or create user
export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Query the database (replace with password hashing in production!)
    const result = await query(
      "SELECT id, email, full_name FROM users WHERE email = $1 AND password_hash = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      //return success response
      return NextResponse.json({ ...result.rows[0], success: true });
    } else {
      //return error response
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
