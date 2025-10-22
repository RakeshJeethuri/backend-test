// app/api/logs/route.ts
import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { level, message, meta, device, timestamp } = await req.json();

    await query(
      `INSERT INTO logs (level, message, meta, device, timestamp)
       VALUES ($1, $2, $3, $4, $5)`,
      [level, message, meta, device, timestamp || new Date()],
    );

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Error saving log:", err);
    return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
  }
}
