import { NextResponse } from "next/server";
// use query from db.ts
import { query } from "@/lib/db";

export async function POST(req: Request) {
    const { deviceId } = await req.json();

    // Check if device already exists
    const existingDevice = await query("SELECT * FROM device WHERE device_id = $1", [deviceId]);

    if (existingDevice.rowCount && existingDevice.rowCount > 0) {
        return NextResponse.json({
            message: "Device already exists",
            success: false,
            data: existingDevice.rows[0],
        }, { status: 409 });
    }

    const result = await query("INSERT INTO device (device_id) VALUES ($1) RETURNING *", [deviceId]);
    if (result.rowCount && result.rowCount === 0) {
        return NextResponse.json({
            message: "Failed to insert device",
            success: false,
        }, { status: 500 });
    }

    return NextResponse.json({
        message: "Device requested successfully",
        success: true,
        data: result.rows[0],
    });
}