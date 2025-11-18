import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { deviceId } = await req.json();
        const check = await query(
            "SELECT * FROM device WHERE device_id = $1",
            [deviceId]
        );

        if (check.rows.length === 0) {
            return NextResponse.json(
                {
                    message: "Device does not exist",
                    success: false,
                },
                { status: 404 }
            );
        }
        const result = await query(
            "DELETE FROM device WHERE device_id = $1 RETURNING *",
            [deviceId]
        );

        return NextResponse.json({
            message: "Device removed successfully",
            success: true,
            data: result.rows[0],
        });

    } catch (error: any) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
