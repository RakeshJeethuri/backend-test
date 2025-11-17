import { NextResponse } from "next/server";

//write a test api
export async function GET() {
    return NextResponse.json({
    version: "1.1.1",
    isMaintenance: true,
    isAllowedDevice: true,});
}
