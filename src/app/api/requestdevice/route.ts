import { NextResponse } from "next/server";
// use query from db.ts
import { query } from "@/lib/db";

export async function POST(req: Request) {
    const { deviceId } = await req.json();
    const result = await query("INSERT INTO device (device_id) VALUES ($1) RETURNING *", [deviceId]);
    if (result.rowCount === 0) {
        return NextResponse.json({
            message: "Device not found",
            success: false,
        }, { status: 404 });
    }

    return NextResponse.json({
        message: "Device requested successfully",
        success: true,
        status: 200,
    });
}