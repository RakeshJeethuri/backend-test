import { NextResponse } from "next/server";

//write a test api
export async function GET() {
    return NextResponse.json({ message: "Hello, world!" });
}
