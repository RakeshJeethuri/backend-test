import { NextResponse } from "next/server";

//write a test api
export async function GET() {
    return NextResponse.json({
        isUnderMaintenance: false,
        currentVersion: "1.4.0",
        minimumRequiredVersion: "1.1.0",
        maintenanceMessage: "We are currently performing scheduled maintenance to improve your experience.",
        maintenanceEndTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        isAllowedDevice: false,
    });
}
