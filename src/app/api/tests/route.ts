import { NextResponse } from "next/server";
import { query } from "@/lib/db";
//write a test api
export async function POST(req: Request) {
    const { deviceId } = await req.json();
    const result = await query("SELECT * FROM device WHERE device_id = $1", [deviceId]);
    return NextResponse.json({
        isUnderMaintenance: false,
        currentVersion: "1.4.0",
        minimumRequiredVersion: "1.1.0",
        maintenanceMessage: "We are currently performing scheduled maintenance to improve your experience.",
        maintenanceEndTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        isAllowedDevice: result.rowCount != null,
    });
}
